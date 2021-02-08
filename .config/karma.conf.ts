/**
 * Local test runner
 * - Headless chrome
 */

import * as basic from "./config";
import { readdirSync } from "fs";
import { resolve } from "path";

const path = "../node_modules/puppeteer/.local-chromium/";

const directories = (source:string) =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

process.env.CHROME_BIN = resolve(__dirname, path, directories(resolve(__dirname, path))[0], "chrome-linux", "chrome");

const browsers = ["ChromeHeadlessSand"];
const customLaunchers = {
  ChromeHeadlessSand: {
    base: 'ChromeHeadless',
    flags: ['--no-sandbox']
  }
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
