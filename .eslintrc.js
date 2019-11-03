module.exports = {
  extends: [
    "airbnb",
    "plugin:jsx-a11y/recommended",
    "plugin:security/recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/react",
  ],
  parser: "babel-eslint",
  env: {
    browser: true,
    node: true,
  },
  rules: {
    "no-unused-vars": ["error", { vars: "local" }],
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "react/jsx-filename-extension": 0,
    "react/no-array-index-key": 0,
    "react/no-children-prop": 0,
    "react/no-deprecated": "warn",
    "react/forbid-prop-types": 0,
  },
  plugins: ["security", "jsx-a11y", "react"],
};
