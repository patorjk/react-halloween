import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

const packageJson = require('./package.json');

export default [{
  external: Object.keys(packageJson.peerDependencies),
  input: './src/index.js',
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    }
  ],
  plugins: [
    resolve({
      extensions: ['.mjs', '.js', '.jsx', '.json', '.node']
    }),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/env', '@babel/preset-react']
    }),
    commonjs(),
    terser(),
  ]
}]
