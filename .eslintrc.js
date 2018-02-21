module.exports = {
  extends: [
    "plugin:flowtype/recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/flowtype",
    "prettier/react",
    "prettier/standard",
    "react-app"
  ],
  plugins: ["flowtype", "react", "prettier", "standard"],
  env: {
    es6: true,
    node: true
  },
  rules: {
    "prettier/prettier": "error"
  }
};
