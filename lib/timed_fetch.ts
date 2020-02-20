import { errors } from "@ideal-postcodes/core-interface";
const { IdealPostcodesError } = errors;

/**
 * Returns Ideal Postcode timeout error
 *
 * @hidden
 */
const timeoutError = (
  timeout: number,
  request: RequestInit,
  url: string
): Error =>
  new IdealPostcodesError({
    message: `Request timed out after ${timeout}ms`,
    httpStatus: 0,
    metadata: { request, url },
  });

/**
 * Wraps native fetch with a promise that can timeout
 *
 * Executes AbortController if present on timed out request
 *
 * @hidden
 */
export const timedFetch = (
  url: string,
  requestInit: RequestInit,
  timeout: number,
  abortController?: AbortController
): Promise<Response> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (abortController) abortController.abort();
      reject(timeoutError(timeout, requestInit, url));
    }, timeout);
    fetch(url, requestInit).then(resolve, reject);
  });
