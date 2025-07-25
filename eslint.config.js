import { defineConfig } from "eslint/config";
import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";

import globals from "globals";
import preact from "eslint-config-preact";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier/flat";

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
export default defineConfig([
  includeIgnoreFile(
    resolve(__dirname, ".gitignore"),
    "Imported .gitignore patterns",
  ),
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended", preact],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,

  {
    files: ["**/*.json"],
    ignores: ["package-lock.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
  },
  {
    files: ["**/*.md"],
    plugins: { markdown },
    language: "markdown/gfm",
    extends: ["markdown/recommended"],
  },
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"],
  },

  // Keep it last
  eslintConfigPrettier,
]);
