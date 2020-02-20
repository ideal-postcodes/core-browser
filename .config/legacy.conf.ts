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

module.exports = (config: any): void =>
  config.set({
    ...sauceConfig({ testName: "Core-Browser", defaults }),
    browsers: Object.keys(customLaunchers),
    customLaunchers,
  });
