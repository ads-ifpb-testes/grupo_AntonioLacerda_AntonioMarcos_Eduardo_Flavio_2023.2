/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json'
    }
  },
  testMatch: ['**/**/*.test.ts'],
  verbose: true,
  forceExit: true
  // clearMocks: true,
};
