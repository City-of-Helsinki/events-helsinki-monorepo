import { sassPlugin } from 'esbuild-sass-plugin';
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false, // types are generated separately via tsc in the build script
  outDir: 'dist',
  tsconfig: './tsconfig.build.json',
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.esm.js' : '.js',
    };
  },
  minify: false,
  splitting: false,
  sourcemap: false,
  clean: false, // rimraf in build script handles cleanup
  treeshake: true,
  esbuildPlugins: [sassPlugin({ type: 'local-css' })],
});
