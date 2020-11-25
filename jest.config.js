
const {defaults} = require('jest-config');
module.exports = {
  // ...
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  collectCoverage: true,
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90
        }
    },
    coverageReporters: ['json', 'lcov', 'text', 'clover']
};
