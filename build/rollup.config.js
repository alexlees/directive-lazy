import typescript from 'rollup-plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import { uglify } from 'rollup-plugin-uglify';

const banner = `
/**
 * directive-lazy
 * author alexlees
 */
`
export default {
  input: 'src/index.ts',
  output: {
      name: 'DirectiveLazy',
      exports: 'named',
  },
  plugins: [
    typescript(),
    postcss({}),
    // uglify({}),
  ],
  banner,
};
