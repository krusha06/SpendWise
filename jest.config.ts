import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/src/__mocks__/styleMock.ts',
    // Mock supabase service so import.meta.env is never called
    '^../services/supabase$': '<rootDir>/src/__mocks__/supabase.ts',
    '^../../services/supabase$': '<rootDir>/src/__mocks__/supabase.ts',
    '^./supabase$': '<rootDir>/src/__mocks__/supabase.ts'
  },
  
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.test.json'
      // {
      //   jsx: 'react-jsx',
      //   module: 'esnext',        // ← fixes import.meta error
      //   moduleResolution: 'bundler'
      // }
    }]
  }
}

export default config

// const config: Config = {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',
//   moduleNameMapper: {
//     '\\.(css|less|scss)$': '<rootDir>/src/__mocks__/styleMock.ts'
//   },
//   transform: {
//     '^.+\\.tsx?$': [
//       'ts-jest',
//       {
//         tsconfig: '<rootDir>/tsconfig.test.json'
//       }
//     ]
//   }
// }
