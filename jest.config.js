module.exports = {
  moduleNameMapper: {
    // Handle module aliases
    '^public(.*)$': '<rootDir>/public/$1',
    '^modules(.*)$': '<rootDir>/modules/$1',
    '^components(.*)$': '<rootDir>/components/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  testEnvironment: 'jsdom',
  transform: {
    /* Use babel-jest to transpile tests with the next/babel preset
    https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    '^.+\\.svg$': '<rootDir>/jest.svg-transformer.js',
  },
  watchPathIgnorePatterns: [
    '<rootDir>/jest.json',
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/public/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
