#!/usr/bin/env node
import { rmSync } from "node:fs";

// Only generated output. The sitemap requires two build passes; retry cleanup
// before each pass instead of letting Next's parallel cleanup fail with
// ENOTEMPTY on thousands of RSC segment folders. Keep the compilation cache,
// source data and public assets (including the sitemap produced by pass one).
for (const path of ["../.next/server/", "../out/"]) {
  rmSync(new URL(path, import.meta.url), {
    recursive: true, force: true, maxRetries: 3, retryDelay: 100,
  });
}
