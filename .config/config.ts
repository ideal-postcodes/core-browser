/**
 * Basic karma configuration shared between headless and browserstack
 * environments
 */
import { config } from "dotenv";
config();

export const frameworks = ["mocha", "karma-typescript"];

export const preprocessors = {
  "**/*.ts": ["karma-typescript"],
};

export const karmaTypescriptConfig = {
  compilerOptions: {},
};

export const files = [
  { pattern: "lib/**/*.ts" },
  { pattern: "test/**/*.ts" },
  "node_modules/whatwg-fetch/dist/fetch.umd.js",
];

export const reporters = ["dots", "karma-typescript"];

export const singleRun = true;

export const basePath = "../";

export const concurrency = 1;
