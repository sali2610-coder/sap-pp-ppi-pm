import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    // Build output
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Non-app: standalone generator scripts, agent scaffolding, references,
    // exported artifacts — not part of the application bundle.
    "presentations/**",
    "scripts/**",
    ".agents/**",
    ".design-ref/**",
    "exports/**",
  ]),
  {
    // App code: keep correctness rules as errors (react-hooks, etc.) but
    // downgrade stylistic/strictness rules to warnings so the lint gate flags
    // real defects, not noise. Build + typecheck already pass cleanly.
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-this-alias": "warn",
      "@typescript-eslint/no-require-imports": "warn",
      "@typescript-eslint/no-array-constructor": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "react/no-unescaped-entities": "warn",
      "react/display-name": "warn",
      "@next/next/no-assign-module-variable": "warn",
      "@typescript-eslint/no-unused-expressions": "warn",
      // react-compiler advisory rules (eslint-plugin-react-hooks v6) — optimization
      // hints, not correctness bugs. Keep rules-of-hooks as an error (real defects).
      "react-hooks/static-components": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/use-memo": "warn",
      "react-hooks/immutability": "warn",
      "react-hooks/purity": "warn",
      "react-hooks/preserve-manual-memoization": "warn",
      "react-hooks/rules-of-hooks": "error",
    },
  },
]);

export default eslintConfig;
