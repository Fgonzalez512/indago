const lint = require('mocha-eslint');
const options = require('../.eslintrc');
const paths = [
  'tests/**/*Test.js',
  'src/**/*.js'
];

// Run the tests
lint(paths, options);
