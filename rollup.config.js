/* eslint-disable @typescript-eslint/no-unsafe-call,
                  @typescript-eslint/no-unsafe-assignment,
                  @typescript-eslint/no-unsafe-member-access */
"use strict";

import clear from "rollup-plugin-clear";
import commonjs from "@rollup/plugin-commonjs";
import config from "./screeps.json";
import { optimizeLodashImports } from "@optimize-lodash/rollup-plugin";
import resolve from "@rollup/plugin-node-resolve";
import screeps from "rollup-plugin-screeps";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";

let cfg;
const dest = process.env.DEST;
if (!dest) {
  console.log("No destination specified - code will be compiled but not uploaded");
} else if ((cfg = config[dest]) == null) {
  throw new Error("Invalid upload destination");
}

export default {
  input: "src/main.ts",
  output: {
    file: "dist/main.js",
    format: "cjs",
    sourcemap: true
  },

  plugins: [
    clear({ targets: ["dist"] }),
    optimizeLodashImports(),
    resolve({ rootDir: "src" }),
    commonjs(),
    typescript(),
    terser(),
    screeps({ config: cfg, dryRun: cfg === null })
  ]
};
