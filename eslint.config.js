module.exports = [
  {
    files: ["**/*.js"],
    ignores: ["coverage/**", "node_modules/**"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs"
    },
    rules: {
      "no-console": "off"
    }
  }
];
