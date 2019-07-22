module.exports = {
  plugins: [
    'jest',
    'security'
  ],
  env: {
    'jest/globals': true
  },
  extends: [
    'standard',
    'plugin:jest/recommended',
    'plugin:security/recommended'
  ]
}
