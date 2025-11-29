module.exports = {
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts', '.svelte'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.svelte$': 'svelte-jester',
    '^.+\\.ts$': ['ts-jest', {
      useESM: true,
      tsconfig: 'tsconfig.app.json'
    }]
  },
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/.storybook/'],
  collectCoverageFrom: [
    'src/**/*.{js,ts,svelte}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.ts',
    '!src/setupTests.ts'
  ],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^\\$lib/(.*)$': '<rootDir>/src/$1',
    '^\\$lib$': '<rootDir>/src'
  }
};