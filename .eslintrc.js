module.exports = {
  plugins: [
    'fp',
    'jest',
    'security'
  ],
  env: {
    'jest/globals': true
  },
  rules: {
    'max-lines': ['warn', 200],
    'max-lines-per-function': ['warn', 20],
    'complexity': ['warn', 5],
    'max-nested-callbacks': ['warn', 2],
    'max-depth': ['warn', 3],
    'max-params': ['warn', 3],
    'fp/no-mutation': ['warn', {
      commonjs: true
    }],
    'fp/no-this': 'warn',
    'fp/no-let': 'warn',
    'fp/no-mutating-assign': 'warn',
    'fp/no-throw': 'warn',
    'fp/no-mutating-methods': 'warn',
    'fp/no-delete': 'warn',
    'fp/no-loops': 'warn',
    'no-param-reassign': 'warn'
  },
  extends: [
    'standard',
    'plugin:jest/recommended',
    'plugin:security/recommended'
  ]
}
