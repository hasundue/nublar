import { join, resolve } from "https://deno.land/std@0.192.0/path/mod.ts";
import { ensureDirSync } from "https://deno.land/std@0.192.0/fs/mod.ts";
import { Command } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";
import { Table } from "https://deno.land/x/cliffy@v0.25.7/table/mod.ts";
import dir from "https://deno.land/x/dir@1.5.1/mod.ts";
import { udd } from "https://deno.land/x/udd@0.8.2/mod.ts";
import { lookup, REGISTRIES } from "https://deno.land/x/udd@0.8.2/registry.ts";
import { importUrls } from "https://deno.land/x/udd@0.8.2/search.ts";

new Command()
  .name("nublar")
  .version("0.2.2") // @denopendabot hasundue/nublar
  .description(
    "A command-line tool to manage your Deno scripts installed via `deno install`.",
  )
  .command(
    "list",
    "List installed scripts.",
  )
  .option("--root <path>", "Specify an installation root of scripts.")
  .action((options) => list(options))
  .command(
    "update [scripts...]",
    "Update scripts.",
  )
  .option("--root <path>", "Installation root of scripts.")
  .option("-d, --check", "Don't actually update.")
  .action((options, ...scripts) => update(scripts, options))
  .parse();

interface GlobalOptions {
  root?: string;
}

// ref: https://deno.land/manual@v1.25.4/tools/script_installer
const getRoot = (options: GlobalOptions): string => {
  const home = dir("home");
  const dotdeno = home ? join(home, ".deno") : undefined;
  const root = options?.root ?? Deno.env.get("DENO_INSTALL_ROOT") ?? dotdeno;

  if (!root) {
    console.error("Installation root is not defined");
    Deno.exit(1);
  } else {
    ensureDirSync(root);
    return root;
  }
};

const getScriptDir = (options: GlobalOptions): string => {
  const scriptDir = join(getRoot(options), "bin");
  ensureDirSync(scriptDir);
  return scriptDir;
};

type Script = {
  name: string;
  version: string | undefined;
  path: string;
  content: string;
};

const getScriptList = (options: GlobalOptions): Script[] => {
  const scriptDir = getScriptDir(options);
  const scripts: Script[] = [];

  for (const entry of Deno.readDirSync(resolve(scriptDir))) {
    if (entry.name === "deno" || entry.name.startsWith(".")) {
      continue;
    }
    const path = join(scriptDir, entry.name);
    const content = Deno.readTextFileSync(path);
    const urls = importUrls(content, REGISTRIES);

    if (urls.length > 1) {
      console.warn(`More than one importable URLs found in ${path}`);
    }
    const registry = urls.length ? lookup(urls[0], REGISTRIES) : undefined;

    if (urls.length && !registry) {
      console.warn(`Unknown registry: ${urls[0]} in ${path}`);
    }
    scripts.push({
      name: entry.name,
      version: registry?.version(),
      path,
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
  check?: boolean;
};

async function update(
  scriptNames: string[],
  options: UpdateOptions,
): Promise<void> {
  const all = getScriptList(options);

  const scripts = scriptNames.length
    ? all.filter((script) => scriptNames.includes(script.name))
    : all;

  let found = false;

  for (const script of scripts) {
    if (!script.version) {
      continue;
    }
    const results = await udd(script.path, {
      dryRun: options?.check,
      quiet: true,
    });

    for (const result of results) {
      if (result.message) {
        const action = options.check ? "Found" : "Updated";
        const newVersion = result.message.match(/^[v\d\.]+/);
        console.log(
          `${action} ${script.name} ${script.version} => ${newVersion}`,
        );
        found = true;
      }
    }
  }
  if (!found) {
    console.log("No updates found.");
  }
}
