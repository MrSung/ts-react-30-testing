module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest",
    ".+\\.(css|sass|scss)$": "jest-css-modules-transform"
  },
  "setupFilesAfterEnv": ["./jest.setup.js"]
}
