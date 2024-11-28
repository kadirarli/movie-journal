module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.{js,jsx}',
      '!src/**/*.test.{js,jsx}',
      '!src/**/index.{js,jsx}',
    ],
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    coverageReporters: ['html', 'text', 'lcov', 'json'],
    testEnvironment: 'node',
    verbose: true,
  };