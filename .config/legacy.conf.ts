/**
 * Test runner for latest browsers
 *
 * Runs on cross browser platform
 */
import "core-js/stable";
import "regenerator-runtime/runtime";
import {
  legacyDesktop,
  legacyMobile,
  config as sauceConfig,
} from "@ideal-postcodes/supported-browsers";
import * as defaults from "./config";

const customLaunchers = {
  ...legacyDesktop,
  ...legacyMobile,
};

defaults.karmaTypescriptConfig.compilerOptions = {
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

module.exports = (config: any): void => {
  const sauce = sauceConfig({ testName: "Core-Browser", defaults });
  sauce.files.push("node_modules/promise-polyfill/dist/polyfill.min.js");
  config.set({
    ...sauce,
    browsers: Object.keys(customLaunchers),
    customLaunchers,
  });
};
