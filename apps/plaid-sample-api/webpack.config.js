const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');

// These options were migrated by @nx/webpack:convert-to-inferred from
// the project.json file and merged with the options in this file
const configValues = {
  build: {
    default: {
      target: 'node',
      compiler: 'tsc',
      outputPath: '../../dist/apps/plaid-sample-api',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      isolatedConfig: true,
      // Preserve the removed @nx/webpack:webpack executor's default; NxAppWebpackPlugin
      // otherwise hashes production filenames, and `serve` (@nx/js:node) runs main.js.
      outputHashing: 'none',
    },
  },
};

// Determine the correct configValue to use based on the configuration
const configuration = process.env.NX_TASK_TARGET_CONFIGURATION || 'default';

const buildOptions = {
  ...configValues.build.default,
  ...configValues.build[configuration],
};

/**
 * @type{import('webpack').WebpackOptionsNormalized}
 */
module.exports = async () => ({
  plugins: [new NxAppWebpackPlugin(buildOptions)],
});
