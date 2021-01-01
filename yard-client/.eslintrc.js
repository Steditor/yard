module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "@vue/standard",
    "@vue/typescript/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/script-indent": [ "error", 2, { baseIndent: 1 } ],
    "comma-dangle": [ "error", "always-multiline" ],
    "quotes": [ "error", "double" ],
    "array-bracket-spacing": [ "error", "always" ],
    "object-curly-spacing": [ "error", "always" ],
    "quote-props": [ "error", "consistent-as-needed" ],
    "semi": [ "error", "always" ],
    "space-before-function-paren": [ "error", {
      anonymous: "never",
      named: "never",
      asyncArrow: "always",
    } ],
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": [ "error", {
      allowShortCircuit: true,
      allowTernary: true,
      allowTaggedTemplates: true,
    } ],
    "@typescript-eslint/no-explicit-any": "off",
  },
  overrides: [
    {
      files: [ "*.vue" ],
      rules: {
        indent: "off",
      },
    },
    {
      files: [ "*.js" ],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};
