<h1 align="center">
  <img src="https://img.ideal-postcodes.co.uk/Ideal%20Postcodes%20Browser%20Logo@3x.png" alt="Ideal Postcodes Javascript Client">
</h1>

> JavaScript (browser) client for api.ideal-postcodes.co.uk

[![CircleCI](https://circleci.com/gh/ideal-postcodes/core-browser/tree/master.svg?style=svg)](https://circleci.com/gh/ideal-postcodes/core-browser/tree/master)
![Cross Browser Testing](https://github.com/ideal-postcodes/core-browser/workflows/Cross%20Browser%20Testing/badge.svg?branch=saucelabs)
[![codecov](https://codecov.io/gh/ideal-postcodes/core-browser/branch/master/graph/badge.svg?token=bjeFUcTPi5)](https://codecov.io/gh/ideal-postcodes/core-browser)
[![Dependency Status](https://david-dm.org/ideal-postcodes/core-browser.svg)](https://david-dm.org/ideal-postcodes/core-browser)

[![npm version](https://badge.fury.io/js/%40ideal-postcodes%2Fcore-browser.svg)](https://badge.fury.io/js/%40ideal-postcodes%2Fcore-browser)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@ideal-postcodes/core-browser)](https://bundlephobia.com/result?p=@ideal-postcodes/core-browser)
[![Release](https://github.com/ideal-postcodes/core-browser/workflows/Release/badge.svg)](https://github.com/ideal-postcodes/core-browser/actions)

`@ideal-postcodes/core-browser` is the JavaScript browser client for api.ideal-postcodes.co.uk

Our JavaScript client implements a common interface defined at [@ideal-postcodes/core-interface](https://github.com/ideal-postcodes/core-interface).

High level client documentation can be found at [core-interface](https://github.com/ideal-postcodes/core-interface/blob/master/README.md).

In depth client documentation can be found at [core-interface.ideal-postcodes.dev](https://core-interface.ideal-postcodes.dev).

Tested against [a suite of modern and legacy, mobile and desktop browsers](https://github.com/ideal-postcodes/supported-browsers).

`@ideal-postcodes/core-browser`should be consumed by a bundler or transpiler (e.g. webpack, parcel, rollup) for minification, module resolution and specific browser support.

[core-browser-bundled](https://github.com/ideal-postcodes/core-browser-bundled) provides pre-bundled versions of `core-browser`, which can be immediately dropped into a page.

## Links

- [Configuration & Usage](#configuration--usage)
- [Quickstart](#quickstart)
- [Client Documentation](https://github.com/ideal-postcodes/core-interface/blob/master/README.md)
- [In Depth Client Documentation](https://core-interface.ideal-postcodes.dev/#documentation)
- [npm Module](https://www.npmjs.com/package/@ideal-postcodes/core-browser)
- [GitHub Repository](https://github.com/ideal-postcodes/core-browser)

## Example Setup

[![Webpack Status](https://github.com/ideal-postcodes/core-browser/workflows/Webpack%20Demo/badge.svg)](examples/webpack/)

[![Parcel Status](https://github.com/ideal-postcodes/core-browser/workflows/Parcel%20Demo/badge.svg)](examples/parcel/)

[![Rollup Status](https://github.com/ideal-postcodes/core-browser/workflows/Rollup%20Demo/badge.svg)](examples/rollup/)

[![Polymer Status](https://github.com/ideal-postcodes/core-browser/workflows/Polymer%20Demo/badge.svg)](examples/polymer/)

## Other JavaScript Clients

- [Node.js Client Repository](https://github.com/ideal-postcodes/core-node)
- [Bundled Browser Client Repository](https://github.com/ideal-postcodes/core-browser-bundled)
- [Axios-backed Client Repository](https://github.com/ideal-postcodes/core-axios)

## Documentation

### Configuration & Usage

- [Install](#install)
- [Instantiate](#instantiate) and [Use](#use) client
- [Catch Errors](#catch-errors)

#### Install

```bash
npm install @ideal-postcodes/core-browser
```

#### Instantiate

```javascript
import { Client } from "@ideal-postcodes/core-browser";

const client = new Client({ api_key: "iddqd" });
```

[Configuration options](https://core-interface.ideal-postcodes.dev/interfaces/config.html)

#### Use

```javascript
const addresses = await lookupPostcode({ client: client, postcode: "SW1A2AA" });
```

#### Catch Errors

```javascript
import { errors } from "@ideal-postcodes/core-browser";
const { IdpcRequestFailedError } = errors;

try {
  await lookupAddress({ client, query: "10 downing street" });
} catch (error) {
  if (error instanceof IdpcRequestFailedError) {
    // IdpcRequestFailedError indicates a 402 response code
    // Possibly the key balance has been depleted
  }
}
```

#### HTTP Agent and legacy browser support

`core-browser` uses the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) under the hood to facilitate HTTP requests.

A configuration object can be passed to the `Client` constructor as a second argument to override certain attributes on the [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request) of all subsequent fetch requests. Request configuration is documented [here](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request).

If you need to [support older browsers](https://caniuse.com/#search=fetch), please include a [fetch polyfill](https://github.com/github/fetch) and transpile this library down to ES3. Alternatively use one of our pre-transpiled outputs at [ideal-postcodes/core-browser-bundled](https://github.com/ideal-postcodes/core-browser-bundled).

---

### Quickstart

The client exposes a number of simple methods to get at the most common tasks when interacting with the API. Below is a (incomplete) list of commonly used methods.

- [Lookup a Postcode](#lookup-a-postcode)
- [Search for an Address](#search-for-an-address)
- [Search for an Address by UDPRN](#search-for-an-address-by-udprn)

For a complete list of client methods, including low level resource methods, please see the [core-interface documentation](https://core-interface.ideal-postcodes.dev/#documentation)

#### Lookup a Postcode

Return addresses associated with a given `postcode`

```javascript
const postcode = "id11qd";

const addresses = await lookupPostcode({ client, postcode });
```

[Method options](https://core-interface.ideal-postcodes.dev/interfaces/lookuppostcodeoptions.html)

#### Search for an Address

Return addresses associated with a given `query`

```javascript
const query = "10 downing street sw1a";

const addresses = await lookupAddress({ client, query });
```

[Method options](https://core-interface.ideal-postcodes.dev/interfaces/lookupaddressoptions.html)

#### Search for an Address by UDPRN

Return address for a given `udprn`

Invalid UDPRN will return `null`

```javascript
const udprn = 23747771;

const address = await lookupUdprn({ client, udprn });
```

[Method options](https://core-interface.ideal-postcodes.dev/interfaces/lookupudprnoptions.html)

## Test

```bash
npm test
```

## Licence

MIT
