module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "jest": true,
  },
  "extends": [
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "airbnb",
    "plugin:@typescript-eslint/recommended"
  ],
  "overrides": [
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint"
  ],
  "settings": {
    "import/resolver": {
      "typescript": {}
    }
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
    "operator-linebreak": "off"
  }
}
