module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["<rootDir>/src/tests/setup-env.ts"],
  globalSetup: "<rootDir>/src/tests/global-setup.js",
  testMatch: ["**/tests/**/*.test.ts"],
};
