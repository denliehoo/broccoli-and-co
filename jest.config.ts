// import type { Config } from 'jest';
// import nextJest from 'next/jest.js';

// const createJestConfig = nextJest({
//   // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
//   dir: './',
// });

// // Add any custom config to be passed to Jest
// const config: Config = {
//   coverageProvider: 'v8',
//   testEnvironment: 'jsdom',
//   // Add more setup options before each test is run
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
// };

// // createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// export default createJestConfig(config);

import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8', // Use the v8 coverage provider (modern and faster)
  testEnvironment: 'jsdom', // Set the test environment to jsdom
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Enable coverage collection
  collectCoverage: true,

  // Define where to output the coverage reports
  coverageDirectory: '<rootDir>/coverage',

  // Only collect coverage for files that are part of your app (e.g., not node_modules)
  collectCoverageFrom: [
    // Only do coverage on the components and screens
    '<rootDir>/src/components/**/*.{ts,tsx}',
    '<rootDir>/src/screens/**/*.{ts,tsx}',
  ],

  // Optional: You can specify coverage thresholds for the tests
  coverageThreshold: {
    global: {
      branches: 80, // Minimum 80% branch coverage
      functions: 80, // Minimum 80% function coverage
      lines: 80, // Minimum 80% line coverage
      statements: 80, // Minimum 80% statement coverage
    },
  },
};

// Create Jest config and export
export default createJestConfig(config);
