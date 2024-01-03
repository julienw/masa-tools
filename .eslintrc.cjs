module.exports = {
  root: true,
  extends: ["preact", "plugin:@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    // We don't use Jest in this project, so without disabling this rule, eslint throws.
    "jest/no-deprecated-functions": 0,
  },
};
