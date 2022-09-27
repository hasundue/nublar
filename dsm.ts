import { join } from "https://deno.land/std@0.157.0/path/mod.ts";
import { Command } from "https://deno.land/x/cliffy@v0.25.1/command/mod.ts";
import { Table } from "https://deno.land/x/cliffy@v0.25.1/table/mod.ts";
import dir from "https://deno.land/x/dir@1.5.1/mod.ts";
import { udd } from "https://deno.land/x/udd@0.7.5/mod.ts";

new Command()
  .name("dsm")
  .version("0.1.0")
  .description("Deno Script Manager")
  .command(
    "update",
    "Update all installed scripts",
  )
  .option("--root <path>", "Installation root of scripts")
  .option("-d, --dry-run", "Don't actually update")
  .action((options) => update(options))
  .command(
    "list",
    "list all installed scripts",
  )
  .option("--root <path>", "Installation root of scripts")
  .action((options) => list(options))
  .parse();

interface GlobalOptions {
  root?: string;
}

// ref: https://deno.land/manual@v1.25.4/tools/script_installer
const getRoot = (options?: GlobalOptions): string => {
  const home = dir("home");
  const dotdeno = home ? join(home, ".deno") : undefined;
  const root = options?.root ?? Deno.env.get("DENO_INSTALL_ROOT") ?? dotdeno;

  if (!root) {
    console.error("Installation root is not defined");
    Deno.exit(1);
  } else {
    return root;
  }
};

const getScriptDir = (options?: GlobalOptions): string =>
  join(getRoot(options), "bin");

type Script = {
  name: string;
  version: string | undefined;
  path: string;
  content: string;
};

const getScriptList = (options: GlobalOptions): Script[] => {
  const scriptDir = getScriptDir(options);
  const scripts: Script[] = [];

  for (const entry of Deno.readDirSync(scriptDir)) {
    const content = Deno.readTextFileSync(join(scriptDir, entry.name));
    const versionMatch = content.match(/(?<=[a-z]@)[v?\d\.]+(?=\/)/);

    scripts.push({
      name: entry.name,
      version: versionMatch ? versionMatch[0] : undefined,
      path: join(scriptDir, entry.name),
      content,
    });
  }

  return scripts;
};

const list = (options: GlobalOptions): void => {
  const scripts = getScriptList(options);
  const table = Table.from(
    scripts.map((script) => [script.name, script.version]),
  );
  console.log(table.toString());
};

type UpdateOptions = GlobalOptions & {
  dryRun?: boolean;
};

const update = async (options: UpdateOptions): Promise<void> => {
  const scripts = getScriptList(options);

  for (const script of scripts) {
    const results = await udd(script.path, {
      dryRun: options?.dryRun,
      quiet: true,
    });

    for (const result of results) {
      if (result.message) {
        const action = options.dryRun ? "Found" : "Updated";
        const newVersion = result.message!.match(/^[v\d\.]+/);
        console.log(
          `${action} ${script.name} ${script.version} => ${newVersion}`,
        );
      }
    }
  }
};
