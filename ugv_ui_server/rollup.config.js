import eslint from '@rollup/plugin-eslint';
import typescript from '@rollup/plugin-typescript';
import run from '@rollup/plugin-run';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
  },
  plugins: [eslint(), typescript(), run()],
};
