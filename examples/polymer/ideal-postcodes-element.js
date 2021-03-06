import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

import { Client, lookupPostcode } from "@ideal-postcodes/core-browser-bundled";

class IdealPostcodesElement extends PolymerElement {
  constructor() {
    super();

    // Required to enable test suite to find test element in shadowdom
    this.root = this.attachShadow({ mode: "open" });

    const client = new Client({ api_key: "iddqd" });
    const postcode = "ID1 1QD";
    lookupPostcode({ client, postcode })
      .then(apiResult => (this.apiResult = apiResult));
  }

  static getProperties() {
    return {
      apiResult: {
        type: Object,
        value: {
          message: "Waiting for response",
        },
        notify: true,
        reflectToAttribute: true,
      },
    };
  }

  static get template() {
    return html`
      <h1>Polymer Demo</h1>
      <p><code>GET https://api.ideal-postcodes.co.uk/postcodes/id11qd</code></p>
      <pre id="result">[[_format(apiResult)]]</pre>
    `;
  }

  _format(apiResult) {
    return JSON.stringify(apiResult, null, 2);
  }
}

customElements.define("ideal-postcodes-element", IdealPostcodesElement);
