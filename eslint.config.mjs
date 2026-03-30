import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.node
    },
    rules: {
      "curly": "error",
      "indent": ["error", 2],
      "linebreak-style": ["error", "windows"],
      "no-console": "off",
      "no-var": "warn",
      "no-trailing-spaces": "warn",
      "prefer-const": "warn",
      "quotes": ["error", "double"],
      "semi": ["error", "always"]
    }
  }
];