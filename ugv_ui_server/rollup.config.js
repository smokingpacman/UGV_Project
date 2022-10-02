import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import run from '@rollup/plugin-run';

const isProduction = process.env.BUILD === 'production';

export default {
  input: 'src/index.ts',
  output: {
    dir: isProduction ? 'dist' : 'dev',
    format: 'cjs',
  },
  plugins: [typescript(), isProduction && terser(), !isProduction && run()],
};
