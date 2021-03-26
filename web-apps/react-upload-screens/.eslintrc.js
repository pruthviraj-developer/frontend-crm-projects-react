module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/camelcase': 'off',
    'constructor-super': 2,
    'for-direction': 2,
    'getter-return': 2,
    'no-case-declarations': 2,
    'no-class-assign': 2,
    'no-compare-neg-zero': 2,
    'no-const-assign': 2,
    'no-constant-condition': 2,
    'no-control-regex': 2,
    'no-debugger': 2,
    'no-delete-var': 2,
    'no-dupe-args': 2,
    'no-dupe-class-members': 2,
    'no-dupe-else-if': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty': 2,
    'no-empty-character-class': 2,
    'no-empty-pattern': 2,
    'no-ex-assign': 2,
    'no-extra-boolean-cast': 2,
    'no-extra-semi': 2,
    'no-fallthrough': 2,
    'no-func-assign': 2,
    'no-global-assign': 2,
    'no-import-assign': 2,
    'no-inner-declarations': 2,
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2,
    'no-misleading-character-class': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-new-symbol': 2,
    'no-obj-calls': 2,
    'no-octal': 2,
    'no-prototype-builtins': 2,
    'no-redeclare': 2,
    'no-regex-spaces': 2,
    'no-self-assign': 2,
    'no-setter-return': 2,
    'no-shadow-restricted-names': 2,
    'no-sparse-arrays': 2,
    'no-this-before-super': 2,
    'no-undef': 2,
    'no-unexpected-multiline': 2,
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    'no-unsafe-negation': 2,
    'no-unused-labels': 2,
    'no-unused-vars': 2,
    'no-useless-catch': 2,
    'no-useless-escape': 2,
    'no-with': 2,
    'require-yield': 2,
    'use-isnan': 2,
    'valid-typeof': 2,
    'no-console': 2,
    'no-lone-blocks': 2,
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
};
