import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'src/japanese_video_player.ts',
    output: {
        file: 'dist/japanese_video_player.js',
        format: 'iife',
        sourcemap: true,
    },
    plugins: [
        resolve(),
        typescript(),
        babel({
            babelHelpers: 'bundled',
            presets: ['@babel/preset-env'],
        }),
    ]
};
