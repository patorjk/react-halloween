module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "jest": true,
  },
  "extends": [
    "plugin:react/recommended",
    "airbnb"
  ],
  "overrides": [
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
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
