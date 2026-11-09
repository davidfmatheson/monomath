import globals from 'globals';
import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  ...nx.configs['flat/typescript'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // '@typescript-eslint/no-extra-semi' was removed in typescript-eslint v8 (the ESLint core
      // rule now handles TypeScript syntax correctly on its own), so enforce via the core rule.
      'no-extra-semi': 'error',
    },
  },
  ...nx.configs['flat/javascript'],
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {
      // '@typescript-eslint/no-extra-semi' was removed in typescript-eslint v8 (the ESLint core
      // rule now handles TypeScript syntax correctly on its own), so enforce via the core rule.
      'no-extra-semi': 'error',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
    rules: {
      // Enabled by @nx/eslint-plugin's presets but deprecated in typescript-eslint v8; its
      // replacement, '@typescript-eslint/no-empty-object-type', is already enabled.
      '@typescript-eslint/no-empty-interface': 'off',
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.spec.js', '**/*.spec.jsx'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
];
