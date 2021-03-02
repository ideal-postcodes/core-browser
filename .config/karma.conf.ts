/**
 * Local test runner
 * - Headless chrome
 */

import * as basic from "./config";

const browsers = ["HeadlessChrome"];
const customLaunchers = {
  HeadlessChrome: {
    base: "ChromeHeadless",
    flags: ["--no-sandbox"],
  },
};

const client = { args: [<string>process.env["CYPRESS_API_KEY"]] };

module.exports = (config: any): void =>
  config.set({
    ...basic,
    browsers,
    customLaunchers,
    client,
    plugins: [
      "karma-mocha",
      "karma-typescript",
      "karma-chrome-launcher",
    ],
    karmaTypescriptConfig: {
      ...basic.karmaTypescriptConfig,
      coverageOptions: {
        exclude: /test/,
      },
      reports: {
        html: "coverage",
        "text-summary": "",
        lcovonly: {
          subdirectory: ".",
          directory: ".",
          filename: "coverage.lcov",
        },
      },
    },
  });
