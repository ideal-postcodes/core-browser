import {
  Client as CoreInterface,
  Config,
} from "@ideal-postcodes/core-interface";
import { Agent } from "./agent";

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
    super({ agent, ...config });
  }
}
