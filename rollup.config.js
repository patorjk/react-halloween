import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import {babel} from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import {readFileSync} from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

export default [{
  external: [...Object.keys(packageJson.peerDependencies), 'motion/react', 'framer-motion'],
  input: './src/index.ts',
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
    typescript({
      tsconfig: './tsconfig.json',
      // IMPORTANT: Override the declarationDir to match output directories
      outputToFilesystem: true, // This can help with directory conflicts
    }),
    resolve({
      extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.json', '.node']
    }),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/env', '@babel/preset-react', '@babel/preset-typescript'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      babelHelpers: 'bundled'
    }),
    commonjs(),
    terser(),
  ]
}]
