module.exports = [
  {
    files: ["netlify/functions/**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script",
      globals: {
        require: "readonly",
        exports: "readonly",
        process: "readonly",
        module: "readonly"
      },
      env: {
        node: true
      }
    },
    rules: {
      // Allow unused args for Netlify handler signature
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
    }
  },
  // ...existing config...
];
