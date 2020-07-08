module.exports = {
  env: {
    es6: true,
    node: true,
    commonjs: true,
    jest: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended', 'airbnb-base', 'prettier', 'prettier/@typescript-eslint'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
    'eslint-plugin-import-helpers'
  ],
  rules: {
    'class-methods-use-this': 0,
    'no-unused-vars': ['error', { argsIgnorePattern: '[next|^_]' }],
    'no-console': 0,
    camelcase: 'off',
    "import/no-unresolved": "off",
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    '@typescript-eslint/camelcase': ['off', { ignoreDestructuring: true }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        directory: './tsconfig.json',
      },
      node: {
        paths: ['src'],
        extensions: ['.ts'],
      },
    },
  }
};
