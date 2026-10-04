import test from "node:test";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

test("shared shell artifact preserves every search record, real count and destination", () => {
  execFileSync(process.execPath, ["--experimental-strip-types", "--no-warnings", "--loader", "./scripts/alias-loader.mjs", "scripts/gen-neo-shell.mjs", "--check"], {
    cwd: fileURLToPath(new URL("..", import.meta.url)), encoding: "utf8", timeout: 60_000,
  });
});
