module.exports = {
  testEnvironment: "jsdom", // ✅ Ensures Jest runs in a browser-like environment
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  transformIgnorePatterns: ["/node_modules/(?!(msw)/)"],
};
