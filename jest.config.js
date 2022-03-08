/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^(app)/(.*)$': '<rootDir>/src/$1/$2',
    '^(components)/(.*)$': '<rootDir>/src/$1/$2',
    '^(data)/(.*)$': '<rootDir>/src/$1/$2',
    '^(domain)/(.*)$': '<rootDir>/src/$1/$2',
    '^(utils)/(.*)$': '<rootDir>/src/$1/$2',
  },
  "testResultsProcessor": "./node_modules/jest-junit-reporter",
  "coverageReporters": [
    "cobertura"
  ]
}
