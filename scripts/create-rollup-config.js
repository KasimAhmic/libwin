// @ts-check
import { copyFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import typescript from '@rollup/plugin-typescript';

/**
 * @param {string} root
 * @param {string} addon
 *
 * @returns {import('rollup').RollupOptions}
 */
export function createRollupConfig(root, addon) {
  return {
    input: 'lib/index.ts',
    output: {
      dir: 'dist',
      format: 'esm',
      preserveModules: true,
      sourcemap: true,
      entryFileNames: '[name].js',
    },
    external: [new RegExp('^node:.*')],
    plugins: [
      typescript({
        // Let tsc create the declaration files and leave the comments there. Strip it out in the JS code.
        declaration: false,
        declarationMap: false,
        removeComments: true,
        exclude: 'lib/**/*.test.*',
      }),
      copyFilesPlugin(root, addon),
    ],
  };
}

/**
 *
 * @param {string} root
 * @param {string} filename
 *
 * @returns {import('rollup').Plugin}
 */
export function copyFilesPlugin(root, filename) {
  return {
    name: 'copy-files',
    buildEnd(error) {
      if (error) {
        console.warn('Build ended with error, skipping copy files step.');
        return;
      }

      const __dirname = dirname(fileURLToPath(root));

      const srcPath = join(__dirname, 'build', 'Release', filename);
      const destPath = join(__dirname, 'dist');

      console.log(`Copying ${srcPath} -> ${destPath}`);

      const srcFile = statSync(srcPath, { throwIfNoEntry: false });

      if (!srcFile || !srcFile.isFile()) {
        throw new Error(`Source file does not exist: ${srcPath}`);
      }

      const destDir = statSync(destPath, { throwIfNoEntry: false });

      if (!destDir || !destDir.isDirectory()) {
        throw new Error(`Destination directory does not exist: ${destPath}`);
      }

      copyFileSync(srcPath, join(destPath, filename));
    },
  };
}

/**
 * @typedef {Object} CopyTarget
 * @property {string} src - Source file path
 * @property {string} dest - Destination file path
 */
