import cds from '@sap/cds/eslint.config.mjs';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.js', '**/*.mjs'],
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'warn',
    },
    ignores: ['dist/**', 'gen/**/*'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier,
    },
    rules: {
      'prettier/prettier': 'warn',
    },
  },
  prettierConfig,
  ...cds.recommended,
];
