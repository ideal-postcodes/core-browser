(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('@babel/runtime/regenerator')) :
	typeof define === 'function' && define.amd ? define(['@babel/runtime/regenerator'], factory) :
	(global = global || self, factory(global.regenerator));
}(this, function (regenerator) { 'use strict';

	regenerator = regenerator && regenerator.hasOwnProperty('default') ? regenerator['default'] : regenerator;

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var error = createCommonjsModule(function (module, exports) {

	var __extends = commonjsGlobal && commonjsGlobal.__extends || function () {
	  var extendStatics = function (d, b) {
	    extendStatics = Object.setPrototypeOf || {
	      __proto__: []
	    } instanceof Array && function (d, b) {
	      d.__proto__ = b;
	    } || function (d, b) {
	      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    };

	    return extendStatics(d, b);
	  };

	  return function (d, b) {
	    extendStatics(d, b);

	    function __() {
	      this.constructor = d;
	    }

	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	  };
	}();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	}); // Take note of https://github.com/Microsoft/TypeScript/issues/13965

	/**
	 * IdealPostcodesError
	 *
	 * Base error class for all API responses that return an error. This class
	 * is used where a JSON body is not provided or invalid
	 * E.g. 503 rate limit response, JSON parse failure response
	 */

	var IdealPostcodesError =
	/** @class */
	function (_super) {
	  __extends(IdealPostcodesError, _super);
	  /**
	   * Instantiate IdealPostcodesError
	   */


	  function IdealPostcodesError(options) {
	    var _newTarget = this.constructor;

	    var _this = this;

	    var trueProto = _newTarget.prototype;
	    _this = _super.call(this) || this;
	    _this.__proto__ = trueProto;
	    var message = options.message,
	        httpStatus = options.httpStatus,
	        _a = options.metadata,
	        metadata = _a === void 0 ? {} : _a;
	    _this.message = message;
	    _this.name = "Ideal Postcodes Error";
	    _this.httpStatus = httpStatus;
	    _this.metadata = metadata;

	    if (Error.captureStackTrace) {
	      Error.captureStackTrace(_this, IdealPostcodesError);
	    }

	    return _this;
	  }

	  return IdealPostcodesError;
	}(Error);

	exports.IdealPostcodesError = IdealPostcodesError;
	/**
	 * IdpcApiError
	 *
	 * Base error class for API responses with a JSON body. Typically a subclass
	 * will be used to capture the error category (e.g. 400, 401, 500, etc)
	 */

	var IdpcApiError =
	/** @class */
	function (_super) {
	  __extends(IdpcApiError, _super);
	  /**
	   * Returns an API error instance
	   */


	  function IdpcApiError(httpResponse) {
	    var _this = _super.call(this, {
	      httpStatus: httpResponse.httpStatus,
	      message: httpResponse.body.message
	    }) || this;

	    _this.response = httpResponse;
	    return _this;
	  }

	  return IdpcApiError;
	}(IdealPostcodesError);

	exports.IdpcApiError = IdpcApiError;
	/**
	 * IdpcBadRequestError
	 *
	 * Captures API responses that return a 400 (Bad Request Error) response
	 *
	 * Examples include:
	 * - Invalid syntax submitted
	 * - Invalid date range submitted
	 * - Invalid tag submitted
	 */

	var IdpcBadRequestError =
	/** @class */
	function (_super) {
	  __extends(IdpcBadRequestError, _super);

	  function IdpcBadRequestError() {
	    return _super !== null && _super.apply(this, arguments) || this;
	  }

	  return IdpcBadRequestError;
	}(IdpcApiError);

	exports.IdpcBadRequestError = IdpcBadRequestError;
	/**
	 * IdpcUnauthorisedError
	 *
	 * Captures API responses that return a 401 (Unauthorised) response
	 *
	 * Examples include:
	 * - Invalid api_key
	 * - Invalid user_token
	 * - Invalid licensee
	 */

	var IdpcUnauthorisedError =
	/** @class */
	function (_super) {
	  __extends(IdpcUnauthorisedError, _super);

	  function IdpcUnauthorisedError() {
	    return _super !== null && _super.apply(this, arguments) || this;
	  }

	  return IdpcUnauthorisedError;
	}(IdpcApiError);

	exports.IdpcUnauthorisedError = IdpcUnauthorisedError;
	/**
	 * IpdcInvalidKeyError
	 *
	 * Invalid API Key presented for request
	 */

	var IdpcInvalidKeyError =
	/** @class */
	function (_super) {
	  __extends(IdpcInvalidKeyError, _super);

	  function IdpcInvalidKeyError() {
	    return _super !== null && _super.apply(this, arguments) || this;
	  }

	  return IdpcInvalidKeyError;
	}(IdpcUnauthorisedError);

	exports.IdpcInvalidKeyError = IdpcInvalidKeyError;
	/**
	 * IdpcRequestFailedError
	 *
	 * Captures API responses that return a 402 (Request Failed) response
	 *
	 * Examples include:
	 * - Key balance depleted
	 * - Daily key limit reached
	 */

	var IdpcRequestFailedError =
	/** @class */
	function (_super) {
	  __extends(IdpcRequestFailedError, _super);

	  function IdpcRequestFailedError() {
	    return _super !== null && _super.apply(this, arguments) || this;
	  }

	  return IdpcRequestFailedError;
	}(IdpcApiError);

	exports.IdpcRequestFailedError = IdpcRequestFailedError;
	/**
	 * IdpcBalanceDepleted
	 *
	 * Balance on key has been depleted
	 */

	var IdpcBalanceDepletedError =
	/** @class */
	function (_super) {
	  __extends(IdpcBalanceDepletedError, _super);

	  function IdpcBalanceDepletedError() {
	    return _super !== null && _super.apply(this, arguments) || this;
	  }

	  return IdpcBalanceDepletedError;
	}(IdpcRequestFailedError);

	exports.IdpcBalanceDepletedError = IdpcBalanceDepletedError;
	/**
	 * IdpcLimitReachedError
	 *
	 * Limit reached. One of your lookup limits has been breached for today. This
	 * could either be your total daily limit on your key or the individual IP
	 * limit. You can either wait for for the limit to reset (after a day) or
	 * manually disable or increase your limit.
	 */

	var IdpcLimitReachedError =
	/** @class */
	function (_super) {
	  __extends(IdpcLimitReachedError, _super);

	  function IdpcLimitReachedError() {
	    return _super !== null && _super.apply(this, arguments) || this;
	  }

	  return IdpcLimitReachedError;
	}(IdpcRequestFailedError);

	exports.IdpcLimitReachedError = IdpcLimitReachedError;
	/**
	 * IdpcResourceNotFoundError
	 *
	 * Captures API responses that return a 404 (Resource Not Found) response
	 *
	 * Examples include:
	 * - Postcode not found
	 * - UDPRN not found
	 * - Key not found
	 */

	var IdpcResourceNotFoundError =
	/** @class */
	function (_super) {
	  __extends(IdpcResourceNotFoundError, _super);

	  function IdpcResourceNotFoundError() {
	    return _super !== null && _super.apply(this, arguments) || this;
	  }

	  return IdpcResourceNotFoundError;
	}(IdpcApiError);

	exports.IdpcResourceNotFoundError = IdpcResourceNotFoundError;
	/**
	 * IdpcPostcodeNotFoundError
	 *
	 * Requested postcode does not exist
	 */

	var IdpcPostcodeNotFoundError =
	/** @class */
	function (_super) {
	  __extends(IdpcPostcodeNotFoundError, _super);

	  function IdpcPostcodeNotFoundError() {
	    return _super !== null && _super.apply(this, arguments) || this;
	  }

	  return IdpcPostcodeNotFoundError;
	}(IdpcResourceNotFoundError);

	exports.IdpcPostcodeNotFoundError = IdpcPostcodeNotFoundError;
	/**
	 * IdpcKeyNotFoundError
	 *
	 * Requested API Key does not exist
	 */

	var IdpcKeyNotFoundError =
	/** @class */
	function (_super) {
	  __extends(IdpcKeyNotFoundError, _super);

	  function IdpcKeyNotFoundError() {
	    return _super !== null && _super.apply(this, arguments) || this;
	  }

	  return IdpcKeyNotFoundError;
	}(IdpcResourceNotFoundError);

	exports.IdpcKeyNotFoundError = IdpcKeyNotFoundError;
	/**
	 * IdpcUdprnNotFoundError
	 *
	 * Requested UDPRN does not exist
	 */

	var IdpcUdprnNotFoundError =
	/** @class */
	function (_super) {
	  __extends(IdpcUdprnNotFoundError, _super);

	  function IdpcUdprnNotFoundError() {
	    return _super !== null && _super.apply(this, arguments) || this;
	  }

	  return IdpcUdprnNotFoundError;
	}(IdpcResourceNotFoundError);

	exports.IdpcUdprnNotFoundError = IdpcUdprnNotFoundError;
	/**
	 * IdpcUmprnNotFoundError
	 *
	 * Requested UMPRN does not exist
	 */

	var IdpcUmprnNotFoundError =
	/** @class */
	function (_super) {
	  __extends(IdpcUmprnNotFoundError, _super);

	  function IdpcUmprnNotFoundError() {
	    return _super !== null && _super.apply(this, arguments) || this;
	  }

	  return IdpcUmprnNotFoundError;
	}(IdpcResourceNotFoundError);

	exports.IdpcUmprnNotFoundError = IdpcUmprnNotFoundError;
	/**
	 * IdpcServerError
	 *
	 * Captures API responses that return a 500 (Server Error) response
	 */

	var IdpcServerError =
	/** @class */
	function (_super) {
	  __extends(IdpcServerError, _super);

	  function IdpcServerError() {
	    return _super !== null && _super.apply(this, arguments) || this;
	  }

	  return IdpcServerError;
	}(IdpcApiError);

	exports.IdpcServerError = IdpcServerError; // 200 Responses

	var OK = 200; // 300 Responses

	var REDIRECT = 300; // 400 Responses

	var BAD_REQUEST = 400; // 401 Responses

	var UNAUTHORISED = 401;
	var INVALID_KEY = 4010; // 402 Responses

	var PAYMENT_REQUIRED = 402;
	var BALANCE_DEPLETED = 4020;
	var LIMIT_REACHED = 4021; // 404 Responses

	var NOT_FOUND = 404;
	var POSTCODE_NOT_FOUND = 4040;
	var KEY_NOT_FOUND = 4042;
	var UDPRN_NOT_FOUND = 4044;
	var UMPRN_NOT_FOUND = 4046; // 500 Responses

	var SERVER_ERROR = 500;

	var isSuccess = function (code) {
	  if (code < OK) return false;
	  if (code >= REDIRECT) return false;
	  return true;
	};

	var isObject = function (o) {
	  if (o === null) return false;
	  if (typeof o !== "object") return false;
	  return true;
	};

	var isErrorResponse = function (body) {
	  if (!isObject(body)) return false;
	  if (typeof body.message !== "string") return false;
	  if (typeof body.code !== "number") return false;
	  return true;
	};
	/**
	 * parse
	 *
	 * Parses API responses and returns an error for non 2xx responses
	 *
	 * Upon detecting an error an instance of IdealPostcodesError is returned
	 */


	exports.parse = function (response) {
	  var httpStatus = response.httpStatus,
	      body = response.body;
	  if (isSuccess(httpStatus)) return;

	  if (isErrorResponse(body)) {
	    // Test for specific API errors of interest
	    var code = body.code;
	    if (code === INVALID_KEY) return new IdpcInvalidKeyError(response);
	    if (code === POSTCODE_NOT_FOUND) return new IdpcPostcodeNotFoundError(response);
	    if (code === KEY_NOT_FOUND) return new IdpcKeyNotFoundError(response);
	    if (code === UDPRN_NOT_FOUND) return new IdpcUdprnNotFoundError(response);
	    if (code === UMPRN_NOT_FOUND) return new IdpcUmprnNotFoundError(response);
	    if (code === BALANCE_DEPLETED) return new IdpcBalanceDepletedError(response);
	    if (code === LIMIT_REACHED) return new IdpcLimitReachedError(response); // If no API errors of interest detected, fall back to http status code

	    if (httpStatus === NOT_FOUND) return new IdpcResourceNotFoundError(response);
	    if (httpStatus === BAD_REQUEST) return new IdpcBadRequestError(response);
	    if (httpStatus === PAYMENT_REQUIRED) return new IdpcRequestFailedError(response);
	    if (httpStatus === UNAUTHORISED) return new IdpcUnauthorisedError(response);
	    if (httpStatus === SERVER_ERROR) return new IdpcServerError(response);
	  } // Generate generic error (backstop)


	  return new IdealPostcodesError({
	    httpStatus: httpStatus,
	    message: JSON.stringify(body)
	  });
	};
	});

	unwrapExports(error);
	var error_1 = error.IdealPostcodesError;
	var error_2 = error.IdpcApiError;
	var error_3 = error.IdpcBadRequestError;
	var error_4 = error.IdpcUnauthorisedError;
	var error_5 = error.IdpcInvalidKeyError;
	var error_6 = error.IdpcRequestFailedError;
	var error_7 = error.IdpcBalanceDepletedError;
	var error_8 = error.IdpcLimitReachedError;
	var error_9 = error.IdpcResourceNotFoundError;
	var error_10 = error.IdpcPostcodeNotFoundError;
	var error_11 = error.IdpcKeyNotFoundError;
	var error_12 = error.IdpcUdprnNotFoundError;
	var error_13 = error.IdpcUmprnNotFoundError;
	var error_14 = error.IdpcServerError;
	var error_15 = error.parse;

	var util = createCommonjsModule(function (module, exports) {

	var __assign = commonjsGlobal && commonjsGlobal.__assign || function () {
	  __assign = Object.assign || function (t) {
	    for (var s, i = 1, n = arguments.length; i < n; i++) {
	      s = arguments[i];

	      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	    }

	    return t;
	  };

	  return __assign.apply(this, arguments);
	};

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * toQuery
	 *
	 * Shallow copies object while omitting undefined attributes
	 */

	exports.toStringMap = function (optional) {
	  if (optional === undefined) return {};
	  return Object.keys(optional).reduce(function (result, key) {
	    var value = optional[key];
	    if (isString(value)) result[key] = value;
	    return result;
	  }, {});
	};

	var isString = function (i) {
	  return typeof i === "string";
	};

	var isNumber = function (n) {
	  return typeof n === "number";
	};
	/**
	 * toTimeout
	 *
	 * Returns timeout value from request object. Delegates to default client
	 * timeout if not specified
	 */


	exports.toTimeout = function (_a, client) {
	  var timeout = _a.timeout;
	  if (isNumber(timeout)) return timeout;
	  return client.timeout;
	};
	/**
	 * toHeader
	 *
	 * Extracts HTTP Header object from request and client default headers
	 *
	 * Precendence is given to request specific headers
	 */


	exports.toHeader = function (_a, client) {
	  var _b = _a.header,
	      header = _b === void 0 ? {} : _b;
	  return __assign({}, client.header, exports.toStringMap(header));
	};
	/**
	 * toAuthHeader
	 *
	 * Extracts credentials into authorization header format
	 */


	exports.toAuthHeader = function (client, options) {
	  var credentials = [];
	  var api_key = options.api_key || client.api_key;
	  credentials.push(["api_key", api_key]);
	  var licensee = options.licensee;
	  if (licensee !== undefined) credentials.push(["licensee", licensee]);
	  var user_token = options.user_token;
	  if (user_token !== undefined) credentials.push(["user_token", user_token]);
	  return "IDEALPOSTCODES " + toCredentialString(credentials);
	};
	/**
	 * appendAuthorization
	 *
	 * Mutates a headers object to include Authorization header. Will insert if found:
	 * - api_key
	 * - licensee
	 * - user_token
	 */


	exports.appendAuthorization = function (_a) {
	  var header = _a.header,
	      options = _a.options,
	      client = _a.client;
	  header.Authorization = exports.toAuthHeader(client, options);
	  return header;
	};

	var toCredentialString = function (credentials) {
	  return credentials.map(function (_a) {
	    var key = _a[0],
	        value = _a[1];
	    return key + "=\"" + value + "\"";
	  }).join(" ");
	}; // Adds source IP to headers


	exports.appendIp = function (_a) {
	  var header = _a.header,
	      options = _a.options;
	  var sourceIp = options.sourceIp;
	  if (sourceIp !== undefined) header["IDPC-Source-IP"] = sourceIp;
	  return header;
	}; // Adds filters to query


	exports.appendFilter = function (_a) {
	  var query = _a.query,
	      options = _a.options;
	  var filter = options.filter;
	  if (filter !== undefined) query.filter = filter.join(",");
	  return query;
	}; // Adds tags to query


	exports.appendTags = function (_a) {
	  var query = _a.query,
	      options = _a.options;
	  var tags = options.tags;
	  if (tags !== undefined) query.tags = tags.join(",");
	  return query;
	}; // Adds pagination attributes to query


	exports.appendPage = function (_a) {
	  var query = _a.query,
	      options = _a.options;
	  var page = options.page,
	      limit = options.limit;
	  if (page !== undefined) query.page = page.toString();
	  if (limit !== undefined) query.limit = limit.toString();
	  return query;
	};
	});

	unwrapExports(util);
	var util_1 = util.toStringMap;
	var util_2 = util.toTimeout;
	var util_3 = util.toHeader;
	var util_4 = util.toAuthHeader;
	var util_5 = util.appendAuthorization;
	var util_6 = util.appendIp;
	var util_7 = util.appendFilter;
	var util_8 = util.appendTags;
	var util_9 = util.appendPage;

	var resource = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});



	 // Writes a resource to URL string


	var toRetrieveUrl = function (options, id) {
	  return [options.client.url(), options.resource, encodeURIComponent(id), options.action].filter(function (e) {
	    return e !== undefined;
	  }).join("/");
	};

	exports.retrieveMethod = function (options) {
	  var client = options.client;
	  return function (id, request) {
	    return client.agent.http({
	      method: "GET",
	      url: toRetrieveUrl(options, id),
	      query: util.toStringMap(request.query),
	      header: util.toHeader(request, client),
	      timeout: util.toTimeout(request, client)
	    }).then(function (response) {
	      var error$1 = error.parse(response);
	      if (error$1) throw error$1;
	      return response;
	    });
	  };
	};

	exports.listMethod = function (options) {
	  var client = options.client,
	      resource = options.resource;
	  return function (request) {
	    return client.agent.http({
	      method: "GET",
	      url: client.url() + "/" + resource,
	      query: util.toStringMap(request.query),
	      header: util.toHeader(request, client),
	      timeout: util.toTimeout(request, client)
	    }).then(function (response) {
	      var error$1 = error.parse(response);
	      if (error$1) throw error$1;
	      return response;
	    });
	  };
	};
	});

	unwrapExports(resource);
	var resource_1 = resource.retrieveMethod;
	var resource_2 = resource.listMethod;

	var addresses = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});



	var resource$1 = "addresses";

	exports.create = function (client) {
	  var list = resource.listMethod({
	    resource: resource$1,
	    client: client
	  });
	  return {
	    list: list
	  };
	};
	});

	unwrapExports(addresses);
	var addresses_1 = addresses.create;

	var postcodes = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});



	var resource$1 = "postcodes";

	exports.create = function (client) {
	  var retrieve = resource.retrieveMethod({
	    resource: resource$1,
	    client: client
	  });
	  return {
	    retrieve: retrieve
	  };
	};
	});

	unwrapExports(postcodes);
	var postcodes_1 = postcodes.create;

	var keys = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});



	var resource$1 = "keys";

	exports.create = function (client) {
	  var retrieve = resource.retrieveMethod({
	    resource: resource$1,
	    client: client
	  });
	  var usage = resource.retrieveMethod({
	    resource: resource$1,
	    client: client,
	    action: "usage"
	  });
	  return {
	    retrieve: retrieve,
	    usage: usage
	  };
	};
	});

	unwrapExports(keys);
	var keys_1 = keys.create;

	var udprn = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});



	var resource$1 = "udprn";

	exports.create = function (client) {
	  var retrieve = resource.retrieveMethod({
	    resource: resource$1,
	    client: client
	  });
	  return {
	    retrieve: retrieve
	  };
	};
	});

	unwrapExports(udprn);
	var udprn_1 = udprn.create;

	var umprn = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});



	var resource$1 = "umprn";

	exports.create = function (client) {
	  var retrieve = resource.retrieveMethod({
	    resource: resource$1,
	    client: client
	  });
	  return {
	    retrieve: retrieve
	  };
	};
	});

	unwrapExports(umprn);
	var umprn_1 = umprn.create;

	var client = createCommonjsModule(function (module, exports) {

	var __assign = commonjsGlobal && commonjsGlobal.__assign || function () {
	  __assign = Object.assign || function (t) {
	    for (var s, i = 1, n = arguments.length; i < n; i++) {
	      s = arguments[i];

	      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	    }

	    return t;
	  };

	  return __assign.apply(this, arguments);
	};

	var __importStar = commonjsGlobal && commonjsGlobal.__importStar || function (mod) {
	  if (mod && mod.__esModule) return mod;
	  var result = {};
	  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
	  result["default"] = mod;
	  return result;
	};

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});



	var errors = __importStar(error);













	var Client =
	/** @class */
	function () {
	  function Client(config) {
	    this.tls = config.tls;
	    this.api_key = config.api_key;
	    this.baseUrl = config.baseUrl;
	    this.version = config.version;
	    this.strictAuthorisation = config.strictAuthorisation;
	    this.timeout = config.timeout;
	    this.agent = config.agent;
	    this.header = __assign({}, Client.defaults.header, config.header);
	    this.postcodes = postcodes.create(this);
	    this.addresses = addresses.create(this);
	    this.udprn = udprn.create(this);
	    this.umprn = umprn.create(this);
	    this.keys = keys.create(this);
	  }
	  /**
	   * Return base URL for API requests
	   */


	  Client.prototype.url = function () {
	    return this.protocol() + "://" + this.baseUrl + "/" + this.version;
	  };

	  Client.prototype.protocol = function () {
	    return this.tls ? "https" : "http";
	  };
	  /**
	   * Ping API base (`/`)
	   *
	   * Dispatches HTTP request to root endpoint "`/`"
	   */


	  Client.prototype.ping = function () {
	    var method = "GET";
	    var url = this.protocol() + "://" + this.baseUrl + "/";
	    return this.agent.http({
	      method: method,
	      url: url,
	      header: {},
	      query: {},
	      timeout: this.timeout
	    });
	  };
	  /**
	   * Lookup Postcode
	   *
	   * Search for addresses given a postcode. Postcode queries are case and space insensitive
	   *
	   * Invalid postcodes return an empty array address result `[]`
	   *
	   * [API Documentation for /postcodes](https://ideal-postcodes.co.uk/documentation/postcodes#postcode)
	   */


	  Client.prototype.lookupPostcode = function (options) {
	    var queryOptions = this.toAddressIdQuery(options);
	    var page = options.page;
	    if (page !== undefined) queryOptions.query.page = page.toString();
	    return this.postcodes.retrieve(options.postcode, queryOptions).then(function (response) {
	      return response.body.result;
	    }).catch(function (error$1) {
	      if (error$1 instanceof error.IdpcPostcodeNotFoundError) return [];
	      throw error$1;
	    });
	  };
	  /**
	   * Lookup Address
	   *
	   * Search for an address given a query
	   *
	   * [API Documentation for /addresses](https://ideal-postcodes.co.uk/documentation/addresses#query)
	   */


	  Client.prototype.lookupAddress = function (options) {
	    var header = {};
	    var query = {
	      query: options.query
	    };
	    util.appendAuthorization({
	      client: this,
	      header: header,
	      options: options
	    });
	    util.appendIp({
	      header: header,
	      options: options
	    });
	    util.appendFilter({
	      query: query,
	      options: options
	    });
	    util.appendTags({
	      query: query,
	      options: options
	    });
	    util.appendPage({
	      query: query,
	      options: options
	    });
	    var queryOptions = {
	      header: header,
	      query: query
	    };
	    if (options.timeout !== undefined) queryOptions.timeout = options.timeout;
	    return this.addresses.list(queryOptions).then(function (response) {
	      return response.body.result.hits;
	    });
	  };
	  /**
	   * Generates a request object. Bundles together commonly used header/query extractions:
	   * - Authorization (api_key, licensee, user_token)
	   * - Source IP forwarding
	   * - Result filtering
	   * - Tagging
	   */


	  Client.prototype.toAddressIdQuery = function (options) {
	    var header = {};
	    var query = {};
	    util.appendAuthorization({
	      client: this,
	      header: header,
	      options: options
	    });
	    util.appendIp({
	      header: header,
	      options: options
	    });
	    util.appendFilter({
	      query: query,
	      options: options
	    });
	    util.appendTags({
	      query: query,
	      options: options
	    });
	    var request = {
	      header: header,
	      query: query
	    };
	    if (options.timeout !== undefined) request.timeout = options.timeout;
	    return request;
	  };
	  /**
	   * Lookup UDPRN
	   *
	   * Search for an address given a UDPRN
	   *
	   * Invalid UDPRN returns `null`
	   *
	   * [API Documentation for /udprn](https://ideal-postcodes.co.uk/documentation/udprn)
	   */


	  Client.prototype.lookupUdprn = function (options) {
	    var queryOptions = this.toAddressIdQuery(options);
	    return this.udprn.retrieve(options.udprn.toString(), queryOptions).then(function (response) {
	      return response.body.result;
	    }).catch(function (error$1) {
	      if (error$1 instanceof error.IdpcUdprnNotFoundError) return null;
	      throw error$1;
	    });
	  };
	  /**
	   * Lookup UMPRN
	   *
	   * Search for an address given a UDPRN
	   *
	   * Invalid UDPRN returns `null`
	   *
	   * [API Documentation for /udprn](https://ideal-postcodes.co.uk/documentation/udprn)
	   */


	  Client.prototype.lookupUmprn = function (options) {
	    var queryOptions = this.toAddressIdQuery(options);
	    return this.umprn.retrieve(options.umprn.toString(), queryOptions).then(function (response) {
	      return response.body.result;
	    }).catch(function (error$1) {
	      if (error$1 instanceof error.IdpcUmprnNotFoundError) return null;
	      throw error$1;
	    });
	  };
	  /**
	   * Check Key Availability
	   *
	   * Checks if a key can bey used
	   *
	   * [API Documentation for /keys]()https://ideal-postcodes.co.uk/documentation/keys#key)
	   */


	  Client.prototype.checkKeyUsability = function (options) {
	    var _a = options.api_key,
	        api_key = _a === void 0 ? this.api_key : _a,
	        timeout = options.timeout;
	    var queryOptions = {
	      query: {},
	      header: {}
	    };
	    if (timeout !== undefined) queryOptions.timeout = timeout;
	    return this.keys.retrieve(api_key, queryOptions).then(function (response) {
	      return response.body.result;
	    }); // Assert that we're retrieving public key information as no user_token provided
	  };

	  Client.defaults = {
	    header: {
	      Accept: "application/json",
	      "Content-Type": "application/json"
	    }
	  };
	  Client.errors = errors;
	  return Client;
	}();

	exports.Client = Client;
	});

	unwrapExports(client);
	var client_1 = client.Client;

	var dist = createCommonjsModule(function (module, exports) {
	/**
	 * Constants
	 */

	var __importStar = commonjsGlobal && commonjsGlobal.__importStar || function (mod) {
	  if (mod && mod.__esModule) return mod;
	  var result = {};
	  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
	  result["default"] = mod;
	  return result;
	};

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Default API endpoint
	 */

	exports.API_URL = "api.ideal-postcodes.co.uk";
	/**
	 * Use TLS by default. Set to `true`
	 */

	exports.TLS = true;
	/**
	 * Default API Version number. Defaults to "v1"
	 */

	exports.VERSION = "v1";
	/**
	 * Default HTTP timeout in milliseconds. Defaults to 10s
	 */

	exports.TIMEOUT = 10000;
	/*
	 * STRICT_AUTHORISATION forces authorization header usage on
	 * autocomplete API which increases latency due to overhead
	 * OPTIONS request
	 */

	exports.STRICT_AUTHORISATION = false;



	exports.Client = client.Client;

	var errors = __importStar(error);

	exports.errors = errors;
	});

	unwrapExports(dist);
	var dist_1 = dist.API_URL;
	var dist_2 = dist.TLS;
	var dist_3 = dist.VERSION;
	var dist_4 = dist.TIMEOUT;
	var dist_5 = dist.STRICT_AUTHORISATION;
	var dist_6 = dist.Client;
	var dist_7 = dist.errors;

	var timed_fetch = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});



	const {
	  IdealPostcodesError
	} = dist.errors;

	const timeoutError = (timeout, request) => new IdealPostcodesError({
	  message: `Request timed out after ${timeout}ms`,
	  httpStatus: 0,
	  metadata: {
	    request
	  }
	});
	/**
	 * Wraps native fetch with a promise that can timeout
	 *
	 * Executes AbortController if present on timed out request
	 *
	 * @hidden
	 */


	exports.timedFetch = (request, timeout, abortController) => new Promise(async (resolve, reject) => {
	  setTimeout(() => {
	    if (abortController) abortController.abort();
	    reject(timeoutError(timeout, request));
	  }, timeout);
	  fetch(request).then(resolve, reject);
	});
	});

	unwrapExports(timed_fetch);
	var timed_fetch_1 = timed_fetch.timedFetch;

	var agent = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});





	const {
	  IdealPostcodesError
	} = dist.errors;

	const toParam = (key, value) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
	/**
	 * @hidden
	 */


	exports.parseQuery = query => {
	  const keys = Object.keys(query);
	  if (keys.length === 0) return "";
	  return "?" + keys.map(key => toParam(key, query[key])).join("&");
	};
	/**
	 * @hidden
	 */


	exports.toHeader = headers => {
	  const result = {};
	  headers.forEach((value, key) => result[key] = value);
	  return result;
	};
	/**
	 * Adapts fetch response to one that can be used by client
	 *
	 * @hidden
	 */


	exports.toHttpResponse = (httpRequest, response, body) => ({
	  httpRequest,
	  body,
	  httpStatus: response.status,
	  header: exports.toHeader(response.headers),
	  metadata: {
	    response
	  }
	});
	/**
	 * Wraps non-API error in IdealPostcodesError with status code of 0
	 *
	 * @hidden
	 */


	const handleError = error => {
	  const idpcError = new IdealPostcodesError({
	    message: `[${error.name}] ${error.message}`,
	    httpStatus: 0,
	    metadata: {
	      fetch: error
	    }
	  });
	  return Promise.reject(idpcError);
	};
	/**
	 * Implements browser agent for core-interface client
	 *
	 * @hidden
	 */


	class Agent {
	  constructor(config = {}) {
	    this.config = config;
	    /**
	     * Default config using RequestInit interface from DOM specification
	     */

	    this.defaultConfig = {
	      // The cache mode you want to use for the request
	      cache: "no-cache",
	      // The request credentials you want to use for the request: omit, same-origin, or include. The default is same-origin
	      credentials: "omit",
	      // The mode you want to use for the request, e.g., cors, no-cors, same-origin, or navigate. The default is cors
	      mode: "cors",
	      // redirect: The redirect mode to use: follow, error, or manual. The default is follow
	      redirect: "follow"
	    };
	  }

	  async http(httpRequest) {
	    try {
	      const {
	        body,
	        method,
	        url,
	        header,
	        query,
	        timeout
	      } = httpRequest;
	      const requestInfo = {
	        method,
	        headers: header,
	        ...this.defaultConfig,
	        ...this.config
	      }; // Append body if present

	      if (body !== undefined) requestInfo.body = JSON.stringify(body); // Add AbortController if available in browser

	      let abortController;

	      if (window.AbortController !== undefined) {
	        abortController = new window.AbortController();
	        requestInfo.signal = abortController.signal;
	      } // Assemble and dispatch request


	      const request = new Request(`${url}${exports.parseQuery(query)}`, requestInfo);
	      const response = await timed_fetch.timedFetch(request, timeout, abortController);
	      const responseBody = await response.json();
	      return exports.toHttpResponse(httpRequest, response, responseBody);
	    } catch (error) {
	      return handleError(error);
	    }
	  }

	}

	exports.Agent = Agent;
	});

	unwrapExports(agent);
	var agent_1 = agent.parseQuery;
	var agent_2 = agent.toHeader;
	var agent_3 = agent.toHttpResponse;
	var agent_4 = agent.Agent;

	var client$1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});





	class Client extends dist.Client {
	  /**
	   * Client constructor extends CoreInterface
	   *
	   * Client constructor extends CoreInterface by also accepting an optional got configuration object as the second argument.
	   *
	   * Client uses `fetch` to power HTTP requests. You may pass a second configuration object to `Client` which will write over attributes over all Request
	   */
	  constructor(config, fetchConfig = {}) {
	    const agent$1 = new agent.Agent(fetchConfig);
	    const tls = config.tls === undefined ? dist.TLS : config.tls;
	    const baseUrl = config.baseUrl === undefined ? dist.API_URL : config.baseUrl;
	    const version = config.version === undefined ? dist.VERSION : config.version;
	    const strictAuthorisation = config.strictAuthorisation === undefined ? dist.STRICT_AUTHORISATION : config.strictAuthorisation;
	    const timeout = config.timeout === undefined ? dist.TIMEOUT : config.timeout;
	    const {
	      api_key
	    } = config;
	    const interfaceConfig = {
	      tls,
	      api_key,
	      baseUrl,
	      version,
	      strictAuthorisation,
	      timeout,
	      header: { ...config.header
	      }
	    };
	    super({
	      agent: agent$1,
	      ...interfaceConfig
	    });
	  }

	}

	exports.Client = Client;
	});

	unwrapExports(client$1);
	var client_1$1 = client$1.Client;

	var dist$1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});



	exports.Client = client$1.Client;



	exports.Agent = agent.Agent;
	});

	unwrapExports(dist$1);
	var dist_1$1 = dist$1.Client;
	var dist_2$1 = dist$1.Agent;

	const client$2 = new dist_1$1({
	  api_key: "iddqd"
	});
	window.addEventListener("load", async () => {
	  const postcode = "ID1 1QD";
	  const result = await client$2.lookupPostcode({
	    postcode
	  });
	  const output = document.getElementById("result");
	  output.innerText = JSON.stringify(result, null, 2);
	});

}));
