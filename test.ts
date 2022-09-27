import { assertEquals } from "https://deno.land/std@0.157.0/testing/asserts.ts";
import $ from "https://deno.land/x/dax@0.12.0/mod.ts";

Deno.test("help", async () => {
  const result = await $`deno task run --help`;
  assertEquals(result.code, 0);
});
