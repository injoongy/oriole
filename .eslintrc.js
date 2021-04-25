const { join } = require('path');

const tsconfigPath = join('.', '/tsconfig.json');

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-typescript', 'prettier'],
  rules: {
    semi: ['error', 'always'],
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    // TODO: consider adding e.g. https://github.com/milesj/babel-plugin-typescript-to-proptypes
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
  parserOptions: {
    project: tsconfigPath,
    // https://github.com/typescript-eslint/typescript-eslint/issues/251
    tsconfigRootDir: __dirname,
  },
};
