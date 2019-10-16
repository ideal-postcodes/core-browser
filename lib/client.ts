import {
  Client as CoreInterface,
  TLS,
  API_URL,
  VERSION,
  TIMEOUT,
  STRICT_AUTHORISATION,
} from "@ideal-postcodes/core-interface";
import { Agent } from "./agent";

export interface Config {
  /**
   * Use TLS. Defaults to `true`
   */
  tls?: boolean;
  /**
   * API Key. Used in API helper methods
   */
  api_key: string;
  /**
   * Target API hostname. Defaults to `'api.ideal-postcodes.co.uk'`
   */
  baseUrl?: string;
  /**
   * API version. Defaults to `'v1'`
   */
  version?: string;
  /**
   * Force autocomplete authorisation via HTTP headers only. Defaults to `false`
   */
  strictAuthorisation?: boolean;
  /**
   * Default time in ms before HTTP request timeout. Defaults to 10s (`10000`)
   */
  timeout?: number;
  /**
   * String map specifying default headers
   */
  header?: Record<string, string>;
}

export class Client extends CoreInterface {
  /**
   * Client constructor extends CoreInterface
   *
   * Client constructor extends CoreInterface by also accepting an optional got configuration object as the second argument.
   *
   * Client uses `fetch` to power HTTP requests. You may pass a second configuration object to `Client` which will write over attributes over all Request
   */
  constructor(config: Config, fetchConfig: RequestInit = {}) {
    const agent = new Agent(fetchConfig);
    const tls = config.tls === undefined ? TLS : config.tls;
    const baseUrl = config.baseUrl === undefined ? API_URL : config.baseUrl;
    const version = config.version === undefined ? VERSION : config.version;
    const strictAuthorisation =
      config.strictAuthorisation === undefined
        ? STRICT_AUTHORISATION
        : config.strictAuthorisation;
    const timeout = config.timeout === undefined ? TIMEOUT : config.timeout;

    const { api_key } = config;
    const interfaceConfig = {
      tls,
      api_key,
      baseUrl,
      version,
      strictAuthorisation,
      timeout,
      header: { ...config.header },
    };
    super({ agent, ...interfaceConfig });
  }
}
