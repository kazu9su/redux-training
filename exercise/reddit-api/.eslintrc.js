module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  installedESLint: true,
  plugins: [
      'react',
      'jsx-a11y',
      'import',
    ],
  rules: {
      'no-alert': 'off',
      'no-console': 'off',
      'react/no-multi-comp': 'off',
      'react/forbid-prop-types': 'off',
      'jsx-a11y/label-has-for': 'off',
    },
  env: {
      mocha: true,
      browser: true,
    },
};
