import {
  Agent as IAgent,
  errors,
  HttpResponse,
  HttpRequest,
} from "../lib";
import { timedFetch } from "./timed_fetch";

/**
 * @hidden
 */
const { IdealPostcodesError } = errors;

/**
 * @hidden
 */
type StringMap = Record<string, string>;

/**
 * Rewrites `key` `value` to uri encoded query string component
 *
 * @hidden
 */
const toParam = (key: string, value: string): string =>
  `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;

/**
 * @hidden
 */
export const parseQuery = (query: StringMap): string => {
  const keys = Object.keys(query);
  if (keys.length === 0) return "";
  return "?" + keys.map(key => toParam(key, query[key])).join("&");
};

/**
 * @hidden
 */
export const toHeader = (headers: Headers): StringMap => {
  const result: StringMap = {};
  headers.forEach((value, key) => (result[key] = value));
  return result;
};

/**
 * Adapts fetch response to one that can be used by client
 *
 * @hidden
 */
export const toHttpResponse = (
  httpRequest: HttpRequest,
  response: Response,
  body: any
): HttpResponse => ({
  httpRequest,
  body,
  httpStatus: response.status,
  header: toHeader(response.headers),
  metadata: { response },
});

/**
 * Wraps non-API error in IdealPostcodesError with status code of 0
 *
 * @hidden
 */
const handleError = (error: Error): Promise<never> => {
  const idpcError = new IdealPostcodesError({
    message: `[${error.name}] ${error.message}`,
    httpStatus: 0,
    metadata: { fetch: error },
  });
  return Promise.reject(idpcError);
};

/**
 * Implements browser agent for core-interface client
 *
 * @hidden
 */
export class Agent implements IAgent {
  /**
   * Default config using RequestInit interface from DOM specification
   */
  private defaultConfig: RequestInit = {
    // The cache mode you want to use for the request
    cache: "no-cache",
    // The request credentials you want to use for the request: omit, same-origin, or include. The default is same-origin
    credentials: "omit",
    // The mode you want to use for the request, e.g., cors, no-cors, same-origin, or navigate. The default is cors
    mode: "cors",
    // redirect: The redirect mode to use: follow, error, or manual. The default is follow
    redirect: "follow",
  };

  constructor(public config: RequestInit = {}) {}

  // Return AbortController instance if present
  private abortController(): AbortController | undefined {
    if (window.AbortController === undefined) return;
    return new window.AbortController();
  }

  public http(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body, method, url, header, query, timeout } = httpRequest;
    const requestInit: RequestInit = {
      method,
      headers: header,
      ...this.defaultConfig,
      ...this.config,
    };

    const abortController = this.abortController();
    if (abortController) requestInit.signal = abortController.signal;

    try {
      if (body !== undefined) requestInit.body = JSON.stringify(body);
    } catch (error) {
      return handleError(error);
    }

    const uri = `${url}${parseQuery(query)}`;

    let response: Response;
    return timedFetch(uri, requestInit, timeout, abortController)
      .then(r => {
        response = r;
        return r.json();
      })
      .then(responseBody => toHttpResponse(httpRequest, response, responseBody))
      .catch(handleError);
  }
}
