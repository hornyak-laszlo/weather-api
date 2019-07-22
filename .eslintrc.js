module.exports = {
  plugins: [
    'chai-friendly',
    'security'
  ],
  rules: {
    "no-unused-expressions": 0,
    "chai-friendly/no-unused-expressions": 2
  },
  env: {
    mocha: true
  },
  extends: [
    'standard',
    'plugin:security/recommended'
  ]
}
