import {
  Agent as IAgent,
  errors,
  HttpResponse,
  HttpRequest,
} from "@ideal-postcodes/core-interface";
import { timedFetch } from "./timed_fetch";

const { IdealPostcodesError } = errors;

type StringMap = Record<string, string>;

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

  public async http(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body, method, url, header, query, timeout } = httpRequest;
      const requestInfo: RequestInit = {
        method,
        headers: header,
        ...this.defaultConfig,
        ...this.config,
      };
      // Append body if present
      if (body !== undefined) requestInfo.body = JSON.stringify(body);

      // Add AbortController if available in browser
      let abortController;
      if (window.AbortController !== undefined) {
        abortController = new window.AbortController();
        requestInfo.signal = abortController.signal;
      }

      // Assemble and dispatch request
      const request = new Request(`${url}${parseQuery(query)}`, requestInfo);
      const response = await timedFetch(request, timeout, abortController);
      const responseBody = await response.json();

      return toHttpResponse(httpRequest, response, responseBody);
    } catch (error) {
      return handleError(error);
    }
  }
}
