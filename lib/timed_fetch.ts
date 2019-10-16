import { errors } from "@ideal-postcodes/core-interface";
const { IdealPostcodesError } = errors;

const timeoutError = (timeout: number, request: RequestInfo): Error =>
  new IdealPostcodesError({
    message: `Request timed out after ${timeout}ms`,
    httpStatus: 0,
    metadata: { request },
  });

/**
 * Wraps native fetch with a promise that can timeout
 *
 * Executes AbortController if present on timed out request
 *
 * @hidden
 */
export const timedFetch = (
  request: RequestInfo,
  timeout: number,
  abortController?: AbortController
): Promise<Response> =>
  new Promise(async (resolve, reject) => {
    setTimeout(() => {
      if (abortController) abortController.abort();
      reject(timeoutError(timeout, request));
    }, timeout);
    fetch(request).then(resolve, reject);
  });
