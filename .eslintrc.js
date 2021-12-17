/**
 * Copyright (c) 2021, Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
 */
/*
 * The airbnb lint configuration is out of date, it refers to rules which have been
 * removed.  On extending 'airbnb-angular' we get lots of errors such as
 *   Definition for rule '@typescript-eslint/class-name-casing' was not found
 *   Definition for rule '@typescript-eslint/camelcase' was not found
 *
 * Instead we have copied code directly from the airbnb angular eslint file into this file
 * the bits we have copied are the following
 * - the 2 constants baseStyleRules & dangleRules
 * - some of the rules in the rules section
 * - the overrides section
 *
 * airbnb eslint file for angular:
 * https://github.com/efoken/eslint-config-airbnb-angular/blob/master/rules/angular.js
 */
// eslint-disable-next-line import/no-extraneous-dependencies
const baseStyleRules = require('eslint-config-airbnb-base/rules/style').rules;

const dangleRules = baseStyleRules['no-underscore-dangle'];

module.exports = {
  env: {
    browser: true,
    // es2021: true, // Environment key "es2021" is unknown
    node: true,
  },

  extends: [
    // 'airbnb-angular' // Oct 2020: airbnb needs updating, so we can not use it yet
    'eslint-config-airbnb-base',
  ],

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },

  plugins: [
    '@typescript-eslint',
    'header',
  ],

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.component'],
      },
    },
  },

  // rules for all files (*.ts are overritten below)
  //
  rules: {
    // our own rules
    'no-empty-function': ['error', { allow: ['constructors'] }],
    '@typescript-eslint/naming-convention': 'warn',

    'header/header': [
      2,
      'block',
      [
        '*',
        {
          pattern: ' \\* Copyright \\(c\\) (\\d{4}, )+Oracle and/or its affiliates\\.',
        },
        ' * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/',
        ' ',
      ],
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    // airbnb angular rules
    'class-methods-use-this': 'off',
    'no-underscore-dangle': [
      dangleRules[0],
      {
        ...dangleRules[1],
      },
    ],
    'import/default': 'error',
    'import/namespace': 'error',
    'import/imports-first': 'error',
  },

  // override the above details for .ts files (copied from airbnb angular)
  overrides: [
    {
      files: ['*.ts'],

      parser: '@typescript-eslint/parser',

      plugins: ['@typescript-eslint'],

      rules: {
        'no-unused-vars': ['error', { vars: 'all', args: 'none', ignoreRestSiblings: true }],
        'no-useless-constructor': 'off',

        // IMPORT
        'import/prefer-default-export': 'off',

        // TYPESCRIPT
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        // '@typescript-eslint/class-name-casing': 'error', // no longer valid
        '@typescript-eslint/member-delimiter-style': 'error',
        '@typescript-eslint/member-ordering': [
          'error',
          {
            default: [
              'public-field',
              'private-field',
              'constructor',
              'public-method',
              'private-method',
            ],
          },
        ],
        '@typescript-eslint/no-array-constructor': 'error',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { vars: 'all', args: 'none', ignoreRestSiblings: true },
        ],
        '@typescript-eslint/no-use-before-define': 'error',
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'variable',
            format: [],
          },
        ],

      },
    },
  ],

};
