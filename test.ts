import {
  assertMatch,
  assertNotMatch,
} from "https://deno.land/std@0.157.0/testing/asserts.ts";
import $ from "https://deno.land/x/dax@0.12.0/mod.ts";

const cwd = Deno.cwd();

async function installScripts(specs: [name: string, url: string][]) {
  for (const spec of specs) {
    await $`deno install -A --root . --name ${spec[0]} ${spec[1]}`.text();
  }
}

async function createTestEnv() {
  await installScripts([
    ["nublar", "https://deno.land/x/nublar@0.1.2/nublar.ts"],
    ["udd", "https://deno.land/x/udd@0.5.0/main.ts"],
  ]);
  await $`touch bin/deno`;
}

function withTestEnv(
  name: string,
  fn: () => void | Promise<void>,
) {
  Deno.test(name, async () => {
    const tempDir = Deno.makeTempDirSync();
    try {
      Deno.chdir(tempDir);
      await createTestEnv();
      await fn();
    } finally {
      Deno.chdir(cwd);
      Deno.removeSync(tempDir, { recursive: true });
    }
  });
}

withTestEnv("list", async () => {
  const result = await $`bin/nublar list --root .`.text();
  assertMatch(result, /nublar/);
  assertMatch(result, /udd/);
  assertNotMatch(result, /deno/);
});

withTestEnv("update", async () => {
  const result = await $`bin/nublar update --root .`.text();
  assertNotMatch(result, /nublar/);
  assertMatch(result, /udd/);
  assertNotMatch(result, /deno/);
});
