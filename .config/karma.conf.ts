/**
 * Local test runner
 * - Headless chrome
 */

import { executablePath } from "puppeteer";
process.env.CHROME_BIN = executablePath();

import * as basic from "./config";

const browsers = ["ChromeHeadless"];

const client = { args: [<string>process.env["CYPRESS_API_KEY"]] };

module.exports = (config: any): void =>
  config.set({
    ...basic,
    browsers,
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
