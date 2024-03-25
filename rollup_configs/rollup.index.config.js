import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import {nodeResolve} from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    commonjs(),
    nodeResolve(),
    resolve(),
    typescript(),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
    }),
    json(),
  ]
};
