import { assert } from "chai";
import { Client } from "../lib/client";

describe("Client", () => {
  describe("instantiation", () => {
    let client: Client;
    const api_key = "foo";

    beforeEach(() => {
      client = new Client({ api_key });
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
