import * as sinon from "sinon";
import { assert } from "chai";
import { Agent, parseQuery, toHeader } from "../lib/agent";
import { errors } from "@ideal-postcodes/core-interface";

const { IdealPostcodesError } = errors;

type HttpVerb = "GET" | "POST";

// Request Defaults
const SUCCESS = 200;
const method: HttpVerb = "GET";
const NOOP = () => {};
const url = "https://www.foo.com/";
const header = {};
const query = {};

const requestDefaults = {
  cache: "no-cache",
  credentials: "omit",
  mode: "cors",
  redirect: "follow",
};

const testRequestHeaders = (
  request: Request,
  header: Record<string, string>
): void => {
  Object.keys(header).forEach(key => {
    // @ts-ignore
    assert.equal(request.headers[key], header[key]);
  });
};

const testRequest = (
  request: Request,
  expectedAttributes: Record<string, any>
): void => {
  Object.keys(expectedAttributes).forEach((key) => {
    // Some browsers will drop unexpected request attributes althogether
    // @ts-ignore
    if (request[key] !== undefined)
      // @ts-ignore
      assert.equal(request[key], expectedAttributes[key]);
  });
};

const defaultResponse = (header: any) =>
  new Response("{}", {
    status: SUCCESS,
    statusText: "OK",
    headers: header,
  });

describe("Agent", () => {
  let agent: Agent;

  beforeEach(function(this: any) {
    agent = new Agent();
    this.timeout(10000);
  });

  afterEach(() => {
    // @ts-ignore
    const f = window.fetch as sinon.stub;
    if (f.restore) f.restore();
  });

  describe("Agent class", () => {
    it("allows for optional configuration", () => {
      const a = new Agent();
      assert.deepEqual(a.config, {});
    });

    it("assigns config", () => {
      const config = {};
      const a = new Agent(config);
      assert.equal(config, a.config);
    });
  });

  describe("toHeader", () => {
    it("coerces a window.Header instance into string object", () => {
      const header = new Headers({
        foo: "bar",
        baz: "quux,quuux",
      });
      assert.deepEqual(toHeader(header), {
        foo: "bar",
        baz: "quux,quuux",
      });
    });
  });

  describe("http", () => {
    it("delegates http requests to fetch", async () => {
      const query = { foo: "bar" };
      const header = {
        baz: "quux",
        "Content-Type": "application/json; charset=utf-8",
      };
      const timeout = 1000;
      const stub = sinon
        .stub(window, "fetch")
        .resolves(defaultResponse(header));

      await agent.http({ method, timeout, url, header, query });

      sinon.assert.calledOnce(stub);
      const requestedUrl = stub.getCall(0).args[0];
      const request = stub.getCall(0).args[1];
      assert.equal(url + parseQuery(query), requestedUrl);
      // @ts-ignore
      testRequest(request, { method, ...requestDefaults });
      // @ts-ignore
      testRequestHeaders(request, header);
    });

    it("provides JSON body with post request", async () => {
      const method: HttpVerb = "POST";
      const query = { foo: "bar" };
      const header = {
        baz: "quux",
        "Content-Type": "application/json; charset=utf-8",
      };
      const timeout = 1000;
      const body = { foo: "bar" };
      const response = new Response(JSON.stringify(body), {
        status: SUCCESS,
        statusText: "OK",
        headers: header,
      });

      const stub = sinon.stub(window, "fetch").resolves(response);

      const httpResponse = await agent.http({
        body,
        method,
        timeout,
        url,
        header,
        query,
      });

      sinon.assert.calledOnce(stub);
      const requestedUrl = stub.getCall(0).args[0];
      const request = stub.getCall(0).args[1];
      stub.getCall(0);
      assert.equal(url + parseQuery(query), requestedUrl);
      // @ts-ignore
      testRequest(request, { method, ...requestDefaults });
      // @ts-ignore
      testRequestHeaders(request, header);
      assert.deepEqual(body, httpResponse.body);
    });

    describe("Configuration", () => {
      const newDefaults: RequestInit = {
        cache: "no-store",
        credentials: "same-origin",
      };

      beforeEach(() => {
        agent = new Agent(newDefaults);
      });

      it("overrides HTTP configuration requests", async () => {
        const stub = sinon.stub(window, "fetch").resolves(defaultResponse({}));

        await agent.http({ method, timeout: 1000, url, header, query });

        sinon.assert.calledOnce(stub);
        const request = stub.getCall(0).args[1];
        // @ts-ignore
        testRequest(request, {
          ...newDefaults,
        });
      });
    });
  });

  describe("Timeout", () => {
    const delayedResponse = (timeout: number) =>
      new Promise((resolve) => {
        setTimeout(() => resolve(defaultResponse({})), timeout);
      });

    it("applies timeout", async () => {
      // @ts-ignore
      const stub = sinon.stub(window, "fetch").returns(delayedResponse(100));

      try {
        await agent.http({ method, timeout: 50, url, header, query });
      } catch (error) {
        assert.instanceOf(error, IdealPostcodesError);
        assert.equal(
          error.message,
          "[Ideal Postcodes Error] Request timed out after 50ms"
        );
        sinon.assert.calledOnce(stub);
        return;
      }

      throw new Error("This should be unreachable");
    });

    if (window.AbortController) {
      describe("when AbortController present", () => {
        let abortStub: any;
        let abortCalled = false;

        before(() => {
          abortStub = sinon
            .stub(window.AbortController.prototype, "abort")
            .callsFake(function() {
              abortCalled = true;
            });
        });

        after(() => abortStub.restore());

        it("aborts request if AbortController present", async () => {
          const stub = sinon
            .stub(window, "fetch")
            // @ts-ignore
            .returns(delayedResponse(100));

          try {
            await agent.http({ method, url, timeout: 50, header, query });
          } catch (error) {
            sinon.assert.calledOnce(stub);
            assert.isTrue(abortCalled);
            return;
          }
          throw new Error("This should be unreachable");
        });
      });
    }

    describe("when AbortController is not present", () => {
      let unwind = NOOP;

      before(() => {
        if (window.AbortController === undefined) return;
        const AbortController = window.AbortController;
        // @ts-ignore
        window.AbortController = undefined;
        unwind = () => (window.AbortController = AbortController);
      });

      after(unwind);

      it("does not abort request if no AbortController", async () => {
        // @ts-ignore
        const stub = sinon.stub(window, "fetch").returns(delayedResponse(100));

        try {
          await agent.http({ method, timeout: 50, url, header, query });
        } catch (error) {
          sinon.assert.calledOnce(stub);
          return;
        }
        throw new Error("This should be unreachable");
      });
    });
  });

  describe("Error handling", () => {
    it("wraps non-HTTP errors", async () => {
      const genericError = new Error("Generic error");
      sinon.stub(window, "fetch").rejects(genericError);

      try {
        await agent.http({ method, timeout: 1000, url, header, query });
      } catch (error) {
        assert.instanceOf(error, IdealPostcodesError);
        assert.equal(error.metadata.fetch, genericError);
        assert.equal(error.message, "[Error] Generic error");
        return;
      }

      throw new Error("This should be unreachable");
    });

    it("wraps non-HTTP errors from HTTP requests with body", async () => {
      const genericError = new Error("Generic error");
      sinon.stub(window, "fetch").rejects(genericError);

      try {
        await agent.http({
          method: "POST",
          timeout: 1000,
          body: { foo: "bar" },
          url,
          query,
          header: {
            "Content-Type": "application/json; charset=utf-8",
          },
        });
      } catch (error) {
        assert.instanceOf(error, IdealPostcodesError);
        assert.equal(error.metadata.fetch, genericError);
        assert.equal(error.message, "[Error] Generic error");
        return;
      }

      throw new Error("This should be unreachable");
    });

    it("returns error if invalid payload", async () => {
      const body = { foo: {} };
      body.foo = body;
      try {
        await agent.http({
          method: "POST",
          timeout: 1000,
          body,
          url,
          header: {
            "Content-Type": "application/json; charset=utf-8",
          },
          query,
        });
      } catch (error) {
        assert.instanceOf(error, IdealPostcodesError);
        assert.include(error.message, "TypeError");
        return;
      }

      throw new Error("This should be unreachable");
    });
  });
});
