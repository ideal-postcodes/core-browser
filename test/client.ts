import { assert } from "chai";
import { Client } from "../lib/client";
import {
defaults
} from "@ideal-postcodes/core-interface";

describe("Client", () => {
  describe("instantiation", () => {
    let client: Client;
    const api_key = "foo";

    beforeEach(() => {
      console.log("-----");
      client = new Client({ api_key });
      console.log("-----");
    });

    it("assigns default config values", () => {
      assert.equal(client.config.api_key, api_key);
      assert.equal(client.config.tls, defaults.tls);
      assert.equal(client.config.baseUrl, defaults.baseUrl);
      assert.equal(client.config.version, defaults.version);
      assert.equal(client.config.strictAuthorisation, defaults.strictAuthorisation);
      assert.equal(client.config.timeout, defaults.timeout);
    });

    it("allows default config values to be overwritten", () => {
      const options = {
        tls: false,
        api_key,
        baseUrl: "localhost:8008",
        version: "v0",
        strictAuthorisation: true,
        timeout: 2,
      };
      const customClient = new Client(options);
      assert.equal(customClient.config.api_key, options.api_key);
      assert.equal(customClient.config.tls, options.tls);
      assert.equal(customClient.config.baseUrl, options.baseUrl);
      assert.equal(customClient.config.version, options.version);
      assert.equal(
        customClient.config.strictAuthorisation,
        options.strictAuthorisation
      );
      assert.equal(customClient.config.timeout, options.timeout);
    });

    it("allows second argument which is passed to Fetch", () => {
      const cache = "default";
      const client = new Client({ api_key }, { cache });
      assert.equal((client as any).config.agent.config.cache, cache);
    });
  });
});
