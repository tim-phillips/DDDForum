module.exports = {
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testEnvironment: "node",
  testRegex: "./(tests)/.*\\.(e2e)?\\.(ts|ts)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  roots: ["<rootDir>/tests"],
  globalSetup: "./tests/e2e.setup.ts",
};
