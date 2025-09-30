import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import {babel} from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";
import {readFileSync} from "fs";

const packageJson = JSON.parse(readFileSync("./package.json", "utf8"));

const extensions = [".js", ".ts", ".tsx"];

const external = ['react',
  'react-dom',
  'react/jsx-runtime',
  'motion',
  'motion/react',
  'framer-motion'];

export default [
  // --------------------------
  // Main library build (CJS + ESM)
  // --------------------------
  {
    input: "src/index.ts",
    external,
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({extensions, preferBuiltins: false, external: ['react', 'react-dom', 'react/jsx-runtime']}),
      commonjs(),
      babel({
        babelHelpers: "bundled",
        extensions,
        exclude: "node_modules/**",
        presets: [
          ["@babel/preset-env", {modules: false}],
          "@babel/preset-react",
          "@babel/preset-typescript"
        ],
      }),
      typescript({tsconfig: "./tsconfig.json"}),
      terser(),
    ],
  },

  // --------------------------
  // Type declarations
  // --------------------------
  {
    input: "dist/types/index.d.ts", // or "src/index.ts" if not prebuilt
    output: [{file: "dist/index.d.ts", format: "es"}],
    plugins: [dts()],
  },
];
