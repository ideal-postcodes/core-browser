import * as sinon from "sinon";
import { assert } from "chai";
import { errors } from "../lib";
const { IdealPostcodesError } = errors;
import { timedFetch } from "../lib/timed_fetch";

type HttpVerb = "GET";

describe("timedFetch", () => {
  afterEach(() => {
    // @ts-ignore
    const f = window.fetch as sinon.stub;
    if (f.restore) f.restore();
  });

  const method: HttpVerb = "GET";
  const header = {};
  const url = "http://www.foo.com/";
  const SUCCESS = 200;
  const defaultResponse = () =>
    new Response("{}", {
      status: SUCCESS,
      statusText: "OK",
      headers: header,
    });

  it("returns successful response if request inside of timeout", async () => {
    const stub = sinon.stub(window, "fetch").resolves(defaultResponse());
    await timedFetch(url, { method, headers: header }, 1000);
    sinon.assert.calledOnce(stub);
  });

  it("returns timeout error", async () => {
    const timeout = 50;
    sinon.stub(window, "fetch").returns(
      new Promise((resolve) => {
        setTimeout(() => resolve(defaultResponse()), timeout + 50);
      })
    );
    try {
      await timedFetch(url, { method, headers: header }, timeout);
    } catch (error) {
      assert.instanceOf(error, IdealPostcodesError);
      assert.equal(error.message, `Request timed out after ${timeout}ms`);
      return;
    }
    throw new Error("This should be unreachable");
  });

  it("propagates response api errors", async () => {
    const error = new Error("Generic error");
    const stub = sinon.stub(window, "fetch").rejects(error);
    try {
      await timedFetch(url, { method, headers: header }, 1000);
    } catch (err) {
      assert.equal(error, err);
      sinon.assert.calledOnce(stub);
      return;
    }
    throw new Error("This should be unreachable");
  });
});
