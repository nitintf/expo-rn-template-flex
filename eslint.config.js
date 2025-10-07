// @ts-check

import eslint from '@eslint/js';
import typescriptParser from '@typescript-eslint/parser';
import { defineConfig } from 'eslint/config';
import checkFile from 'eslint-plugin-check-file';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactNative from 'eslint-plugin-react-native';
import tseslint from 'typescript-eslint';

// ------------------------------------------------------------------
// File-name conventions
// ------------------------------------------------------------------
const filesNameConventions = defineConfig({
  ignores: [
    'node_modules/*',
    'public/mockServiceWorker.js',
    'generators/*',
    'src/lib/api/generated/*',
    'src/routes/**/*',
    './src/app/**',
  ],
  plugins: { 'check-file': checkFile },
  rules: {
    'check-file/filename-naming-convention': [
      'error',
      { '**/*.{ts,tsx}': 'KEBAB_CASE' },
      { ignoreMiddleExtensions: true },
    ],
  },
});

// ------------------------------------------------------------------
// Base JS/TS rules
// ------------------------------------------------------------------
const baseConfig = defineConfig(
  {
    ignores: [
      'node_modules/*',
      'public/mockServiceWorker.js',
      'generators/*',
      '*.config.js',
      'babel.config.js',
      'metro.config.js',
      'app.config.ts',
    ],
  },
  {
    files: ['**/*.{js,ts,tsx}'],
    plugins: {
      prettier,
      import: importPlugin,
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strict,
      ...tseslint.configs.strictTypeChecked,
    ],
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/no-misused-promises': [
        2,
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/no-unnecessary-condition': [
        'error',
        {
          allowConstantLoopConditions: true,
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': ['error', { 'prefer-inline': false }],
      'import/no-restricted-paths': ['error'],
      'linebreak-style': ['error', 'unix'],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'unknown',
            'type',
          ],
          pathGroups: [
            {
              pattern: '*.svg?react',
              group: 'unknown',
              patternOptions: { matchBase: true },
            },
            {
              pattern: '*.d.ts',
              group: 'type',
              patternOptions: { matchBase: true },
            },
            {
              pattern: '*.+(css|scss|sass|less)?(url)',
              group: 'unknown',
              patternOptions: { matchBase: true },
            },
            {
              pattern: '*.+(svg|png|jpg|jpeg|webp|gif)?(url)',
              group: 'unknown',
              patternOptions: { matchBase: true },
            },
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['type'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
      'no-console': ['error', { allow: ['error', 'tron'] }],
      '@typescript-eslint/only-throw-error': 'off',
      // Additional useful rules
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'object-shorthand': 'error',
      'prefer-arrow-callback': 'error',
      'arrow-spacing': 'error',
      'no-duplicate-imports': 'off',
      'no-useless-return': 'error',
      'no-useless-concat': 'error',
      'prefer-destructuring': ['error', { object: true, array: false }],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'eol-last': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-unsafe-call': 'off'
    },
  },
  {
    linterOptions: { reportUnusedDisableDirectives: true },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: { projectService: true, project: './tsconfig.json' },
    },
  },
);

// ------------------------------------------------------------------
// React Native specific rules
// ------------------------------------------------------------------
const reactNativeConfig = defineConfig({
  files: ['**/*.ts', '**/*.tsx'],
  plugins: {
    'react-native': reactNative,
  },
  rules: {
    'react-native/no-unused-styles': 'error',
    'react-native/split-platform-components': 'error',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    'react-native/no-raw-text': 'off', // Can be too strict for some use cases
    'react-native/no-single-element-style-arrays': 'error',
  },
});

// ------------------------------------------------------------------
// React rules
// ------------------------------------------------------------------
const reactConfig = defineConfig({
  files: ['**/*.ts', '**/*.tsx'],
  plugins: {
    react,
    'react-hooks': reactHooks,
  },
  rules: {
    ...react.configs['jsx-runtime'].rules,
    'jsx-a11y/no-autofocus': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never' },
    ],
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-no-useless-fragment': 'error',
    'react/no-array-index-key': 'warn',
    'react/no-unstable-nested-components': 'error',
    'react/self-closing-comp': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  languageOptions: {
    globals: {
      React: 'writable',
    },
    parser: typescriptParser,
    parserOptions: { projectService: true, project: './tsconfig.json' },
  },
});

export default [
  ...filesNameConventions,
  ...baseConfig,
  ...reactConfig,
  ...reactNativeConfig,
];
