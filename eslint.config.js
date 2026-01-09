import prettier from 'eslint-config-prettier'
import { includeIgnoreFile } from '@eslint/compat'
import js from '@eslint/js'
import svelte from 'eslint-plugin-svelte'
import tseslint from '@typescript-eslint/eslint-plugin'
import globals from 'globals'
import { fileURLToPath } from 'node:url'
import svelteConfig from './svelte.config.js'
import tsParser from '@typescript-eslint/parser'

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url))

/** @type {import('eslint').Linter.Config[]} */
export default [
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ...svelte.configs.recommended,
  prettier,
  ...svelte.configs.prettier,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      'no-console': 0,
    },
  },
  {
    files: ['**/*.svelte', '**/*.svelte.js'],
    languageOptions: { parserOptions: { svelteConfig, parser: tsParser } },
  },
  {
    files: ['**/*.svelte'],
    plugins: { '@typescript-eslint': tseslint },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
]
