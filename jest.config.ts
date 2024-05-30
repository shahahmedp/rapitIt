import type { Config } from 'jest';

const config: Config = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,
  //path for test cases
  roots: ['<rootDir>/example/__test__'],

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ['/node_modules/'],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['json', 'text', 'html'],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  preset: 'ts-jest',
  reporters: ['default', './node_modules/jest-html-reporter'],
  testEnvironment: 'node',
};

export default config;
