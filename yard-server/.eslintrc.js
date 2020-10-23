module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "comma-dangle": [ "error", "always-multiline" ],
    "quotes": [ "error", "double" ],
    "array-bracket-spacing": [ "error", "always" ],
    "object-curly-spacing": [ "error", "always" ],
    "quote-props": [ "error", "consistent-as-needed" ],
    "semi": [ "error", "always" ],
    "space-before-function-paren": [ "error", "never" ],
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": [ "error", {
      allowShortCircuit: true,
      allowTernary: true,
      allowTaggedTemplates: true,
    } ],
    "@typescript-eslint/no-explicit-any": "off",
  },
};
