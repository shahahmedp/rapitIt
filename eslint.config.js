const path = require('path');

module.exports = [
  {
    files: ["src/**/*.ts"],
    ignores: ["node_modules", "build"],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: path.resolve(__dirname, './tsconfig.json'),
        ecmaVersion: 2021,
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      'prettier': require('eslint-plugin-prettier'),
      'jest': require('eslint-plugin-jest'),
      'import': require('eslint-plugin-import'),
      'simple-import-sort': require('eslint-plugin-simple-import-sort')
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true, // always try to resolve types under `@types` directory even it doesn't contain any source code, like `@types/unist`
          project: path.resolve(__dirname, './tsconfig.json')
        }
      }
    },
    rules: {
      'semi': ['error', 'always'], // Semicolons required at the end of statements
      'indent': ['error', 2], // Indentation size of 2 spaces
      'camelcase': 'error', // Variables must use camelCase
      'prettier/prettier': 'error', // Ensure code formatting consistency with Prettier
      'object-shorthand': 'off', // Use object shorthand when possible
      'no-console': 'off', // Allow console.log statements
      'arrow-spacing': 'error', // Ensure proper spacing around arrow functions
      'no-trailing-spaces': 'error', // No trailing spaces allowed
      'prefer-const': 'error', // Prefer using const for variable declarations
      'func-names': ['error', 'always'], // Require function names
      'space-before-blocks': ['error', 'always'], // Require space before blocks
      'prefer-destructuring': 'off', // Disable preference for object destructuring
      'prefer-template': 'off', // Disable preference for template literals
      'global-require': 'off', // Allow dynamic requires
      'no-path-concat': 'off', // Allow string concatenation with path
      'no-plusplus': 'off', // Allow the ++ operator
      'no-restricted-properties': 'off', // Allow restricted properties
      'no-mixed-operators': 'off', // Allow mixed operators
      'import/no-dynamic-require': 'off', // Allow dynamic requires
      'no-duplicate-imports': 'warn', // Warn on duplicate imports
      'no-restricted-syntax': 'off', // Allow restricted syntax
      'no-useless-escape': 'off', // Allow escape sequences in strings
      'no-param-reassign': 'off', // Allow parameter reassignment
      'array-callback-return': 'off', // Allow missing return in array functions
      'security/detect-unsafe-regex': 'off', // Allow unsafe regular expressions
      'security/detect-non-literal-regexp': 'off', // Allow non-literal regular expressions
      'security/detect-object-injection': 'off', // Allow object injection
      'security/detect-non-literal-require': 'off', // Allow non-literal requires
      'security/detect-non-literal-fs-filename': 'off', // Allow non-literal file system filenames
      'security/detect-child-process': 'off', // Allow child processes
      'no-underscore-dangle': 'off', // Allow underscores in identifiers
      '@typescript-eslint/no-explicit-any': 'error', // Disable explicit any type
      '@typescript-eslint/no-unused-vars': 'off', // Disable unused variables check
      '@typescript-eslint/no-var-requires': 'error', // Disallow require statements except in import statements
      '@typescript-eslint/ban-ts-comment': 'off', // Allow TypeScript triple-slash directives
      'max-len': ['error', { 'code': 150, 'ignoreComments': true }], // Maximum line length of 150 characters

      // Import sorting rules
      'simple-import-sort/imports': ['error', {
        groups: [
          ['^node:'],
          ['^react', '^@?\\w'],
          ['^(@|components|utils|config|vendored-lib)(/.*|$)'],
          ['^\\u0000'],
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ['^.+\\.s?css$']
        ]
      }],
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'off', // Temporarily disable to check if it resolves the error
      'import/no-duplicates': 'error'
    }
  }
];
