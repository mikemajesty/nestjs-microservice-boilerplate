module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ["@typescript-eslint/eslint-plugin", "simple-import-sort", "security"],
  extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended", "plugin:security/recommended", "plugin:you-dont-need-lodash-underscore/compatible"],
  plugins: ['simple-import-sort'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/no-explicit-any": ["error"],
    "security/detect-object-injection": ["error"],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "max-len": ["error", {
      "code": 120
    }],
    "no-console": ["error"],
    "complexity": ["error", 6],
    "spaced-comment": [2, "always"]
  }
};