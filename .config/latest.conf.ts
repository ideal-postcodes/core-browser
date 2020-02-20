/**
 * Test runner for latest browsers
 *
 * Runs on cross browser platform
 */
import "core-js/stable";
import "regenerator-runtime/runtime";
import {
  latestDesktop,
  latestMobile,
  config as sauceConfig,
} from "@ideal-postcodes/supported-browsers";
import * as defaults from "./config";

const customLaunchers = {
  ...latestDesktop,
  ...latestMobile,
};

module.exports = (config: any): void => {
  console.log(sauceConfig({ testName: "Core-Browser", defaults }));
  config.set({
    ...sauceConfig({ testName: "Core-Browser", defaults }),
    browsers: Object.keys(customLaunchers),
    customLaunchers,
  });
};
