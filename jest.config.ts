import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverageFrom: ['<rootDir>/src/**', '!**/layout.tsx'],
  reporters: ['default', 'jest-junit'],
  coverageReporters: ['cobertura'],
  coverageDirectory: '<rootDir>coverage',
  moduleNameMapper: {
    // ...
    '^@/components/(.*)$': '<rootDir>/components/$1',
    'api/(.*)$': ['<rootDir>/src/api/$1'],
    'app/(.*)$': ['<rootDir>/src/app/$1'],
    'assets/(.*)$': ['<rootDir>/src/assets/$1'],
    'components/(.*)$': ['<rootDir>/src/components/$1'],
    'data/(.*)$': ['<rootDir>/src/data/$1'],
    'domain/(.*)$': ['<rootDir>/src/domain/$1'],
    'i18n/(.*)$': ['<rootDir>/src/i18n/$1'],
    'style/(.*)$': ['<rootDir>/src/style/$1'],
    'utils/(.*)$': ['<rootDir>/src/utils/$1'],
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
