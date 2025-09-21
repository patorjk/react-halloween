import {defineConfig, globalIgnores} from "eslint/config";
import globals from "globals";
import {fixupConfigRules, fixupPluginRules} from "@eslint/compat";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import js from "@eslint/js";
import {FlatCompat} from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([{
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.jest,
    },

    parser: tsParser,
    "ecmaVersion": "latest",
    "sourceType": "module",
    parserOptions: {},
  },

  extends: fixupConfigRules(compat.extends(
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:storybook/recommended",
  )),

  plugins: {
    react: fixupPluginRules(react),
    "@typescript-eslint": fixupPluginRules(typescriptEslint),
  },

  "settings": {
    "import/resolver": {
      "typescript": {},
    },
  },

  "rules": {
    "import/prefer-default-export": "off",
    "max-len": "off",
    "no-nested-ternary": "off",
    "react/no-array-index-key": "off",
    "react/forbid-prop-types": "off",
    "react/require-default-props": "off",
    "no-return-assign": ["error", "except-parens"],
    "object-curly-newline": "off",
    "operator-linebreak": "off",
    "no-plusplus": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    'react/jsx-filename-extension': [
      2, // or 1 for warning
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    ],
    "react/function-component-definition": "off",
    "no-console": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": [
          "**/*.test.js",
          "**/*.test.jsx",
          "**/*.test.ts",
          "**/*.test.tsx"
        ]
      }
    ]
  },
}, globalIgnores([
  "**/.git",
  "**/.svn",
  "**/.hg",
  "**/node_modules",
  "**/node_modules",
  "**/dist",
  "**/babel.config.js",
  "**/eslint.config.js",
  "**/jest.config.js",
  "**/rollup.config.js",
  "**/.eslintrc.js",
])]);
