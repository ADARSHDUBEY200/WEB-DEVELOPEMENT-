export default {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.mjs"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
    "\\.(svg|png|jpg|jpeg|gif|webp|avif|ico|bmp|tiff)$": "<rootDir>/test/_mocks_/fileMock.js" // Mock assets
  }
};
