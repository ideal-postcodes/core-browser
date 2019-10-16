/**
 * Test runner for latest browsers
 *
 * Runs on cross browser platform
 */

import "babel-polyfill";
import * as basic from "./config";
import { getBrowsers } from "./conf.browser";

const customLaunchers = getBrowsers("core-browser-legacy", {
  legacy: true,
  // browserName: "Internet Explorer",
});
const cbtConfig = {};

basic.karmaTypescriptConfig.compilerOptions = {
  target: "ES3",
  lib: [
    "dom",
    "dom.iterable",
    "es2015",
    "es2016.array.include",
    "es2017.object",
    "es2017.string",
    "es2018.asynciterable",
    "es2018.promise",
    "es2019.array",
    "es2019.object",
    "es2019.string",
    "es2020.string",
  ],
};

basic.polyfill.push("fetch");
basic.polyfill.push("Array.prototype.includes");
basic.polyfill.push("String.prototype.includes");

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
