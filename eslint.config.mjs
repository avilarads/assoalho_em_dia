// Lint do Assoalho em Dia. Perfil leve do Vibe Coding Toolkit adaptado a um
// site estático sem build: os arquivos de js/ são scripts clássicos (não ES
// modules) para que o app continue abrindo com dois cliques via file://.
// Regras do toolkit em eslint-rules/ (cópia sem alterações; ver docs/quality.md).
import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

import quality from "./eslint-rules/index.cjs";

const app = ["js/**/*.js", "config.js"];
const node = ["scripts/**/*.{js,mjs}", "testes/**/*.js", "eslint.config.mjs"];

export default defineConfig([
  js.configs.recommended,
  {
    files: app,
    languageOptions: {
      sourceType: "script",
      // `module` só é lido para exportar a lógica pura aos testes no Node.
      globals: { ...globals.browser, module: "readonly" },
    },
  },
  {
    files: ["sw.js"],
    languageOptions: { sourceType: "script", globals: globals.serviceworker },
  },
  {
    files: node,
    languageOptions: { globals: globals.node },
  },
  {
    files: ["**/*.cjs", "scripts/**/*.js", "testes/**/*.js"],
    languageOptions: { sourceType: "commonjs", globals: globals.node },
  },
  {
    files: [...app, "sw.js", "scripts/**/*.{js,mjs}"],
    plugins: { quality },
    rules: {
      "no-empty": ["error", { allowEmptyCatch: true }],
      // Orçamento de tamanho/complexidade do toolkit: "warn" de propósito;
      // promover a "error" quando a contagem de uma regra chegar a zero.
      complexity: ["warn", 12],
      "max-depth": ["warn", 4],
      "max-statements": ["warn", 20],
      "max-params": ["warn", 4],
      "max-lines-per-function": ["warn", { max: 150, skipBlankLines: true, skipComments: true }],
      "max-nested-callbacks": ["warn", 3],
      "quality/max-lines": "error",
      "quality/no-direct-console": "error",
    },
  },
  {
    // Em js/ cada arquivo é um script clássico envolto numa IIFE: a única função de
    // topo é o "módulo", e contar suas declarações como statements mediria o arquivo,
    // não uma função. As funções internas continuam sob o limite de 20.
    files: ["js/**/*.js"],
    rules: { "max-statements": ["warn", 20, { ignoreTopLevelFunctions: true }] },
  },
  {
    // Scripts de linha de comando: a saída no console é a própria interface.
    files: ["scripts/**/*.{js,mjs}"],
    rules: { "quality/no-direct-console": "off" },
  },
  globalIgnores([".claude/**", "node_modules/**", "coverage/**", "docs/**"]),
]);
