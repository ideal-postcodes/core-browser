/**
 * Test runner for latest browsers
 *
 * Runs on cross browser platform
 */

import "babel-polyfill";
import * as basic from "./config";
import { getBrowsers } from "./conf.browser";

const customLaunchers = getBrowsers("core-browser-latest", {
  latest: true,
  // browserName: "Chrome",
});
const cbtConfig = {};

module.exports = (config: any): void =>
  config.set({
    ...basic,
    plugins: [
      "karma-mocha",
      "karma-typescript",
      "karma-polyfill",
      "karma-cbt-launcher",
    ],
    cbtConfig,
    browsers: Object.keys(customLaunchers),
    customLaunchers,
  });
