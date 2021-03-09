import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const env = process.env.NODE_ENV;
const extensions = ['.js', '.ts', '.tsx'];

const config = {
  input: 'src/index.ts',
  output: {
    file:
      env === 'production'
        ? 'umd/react-vectorgrid-leaflet.min.js'
        : 'umd/react-vectorgrid-leaflet.js',
    format: 'umd',
    globals: {
      leaflet: 'L',
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    name: 'ReactLeaflet',
  },
  external: [
    'leaflet',
    'react',
    'react-dom',
    'react-leaflet',
    '@react-leaflet/core',
  ],
  plugins: [
    nodeResolve({
      browser: true,
      extensions,
    }),
    commonjs(),
    babel({
      exclude: '**/node_modules/**',
      extensions,
      babelHelpers: 'bundled',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
};

if (env === 'production') {
  config.plugins.push(terser());
}

export default config;
