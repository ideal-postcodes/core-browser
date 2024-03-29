## [3.0.1](https://github.com/ideal-postcodes/core-browser/compare/3.0.0...3.0.1) (2022-04-04)


### Bug Fixes

* **Core-Interface:** Update to 3.1.0 ([045c77e](https://github.com/ideal-postcodes/core-browser/commit/045c77e44420ae252f28c59ef804d26ba1e08400))

# [3.0.0](https://github.com/ideal-postcodes/core-browser/compare/2.0.3...3.0.0) (2022-02-14)


### Features

* **Core-Interface:** Update to 3.0 ([a4dc98e](https://github.com/ideal-postcodes/core-browser/commit/a4dc98e055022925a1581c3c12c9ada6e8906e46))


### BREAKING CHANGES

* **Core-Interface:** Updates core-interface to 3.0.0

# [3.0.0-beta.1](https://github.com/ideal-postcodes/core-browser/compare/2.0.3...3.0.0-beta.1) (2022-02-03)


### Features

* **Core-Interface:** Update to 3.0 ([478b563](https://github.com/ideal-postcodes/core-browser/commit/478b56322a538c3676c5470a14478808b870eb77))


### BREAKING CHANGES

* **Core-Interface:** Updates core-interface to 3.0.0

## [2.0.3](https://github.com/ideal-postcodes/core-browser/compare/2.0.2...2.0.3) (2021-07-23)


### Bug Fixes

* **Tsconfig:** Fix target to ES2020 ([c42cfe7](https://github.com/ideal-postcodes/core-browser/commit/c42cfe76edd04887974375ccedfdec1791ca120f))

## [2.0.2](https://github.com/ideal-postcodes/core-browser/compare/2.0.1...2.0.2) (2021-07-23)


### Bug Fixes

* **Core Interface:** Bump to 2.0.3 ([0a3aa80](https://github.com/ideal-postcodes/core-browser/commit/0a3aa80c61e1d0a2f5fda71d33f3b9861c85624c))

## [2.0.1](https://github.com/ideal-postcodes/core-browser/compare/2.0.0...2.0.1) (2021-07-19)


### Bug Fixes

* **Deps:** Bump core-interface ([d1d0bf2](https://github.com/ideal-postcodes/core-browser/commit/d1d0bf2eb5584bf927570f90d5b442ecd9e5ef3a))

# [2.0.0](https://github.com/ideal-postcodes/core-browser/compare/1.5.2...2.0.0) (2021-06-08)


### Features

* **Core Interface:** Upgrade to v2 ([a7f958f](https://github.com/ideal-postcodes/core-browser/commit/a7f958f0c1bc8e3c8e42bdc2df0bac658c5e4d43))


### BREAKING CHANGES

* **Core Interface:** - Package now exports a `defaults` object
- Client.defaults has been removed
- All client config is now stored in `client.config`
- All resources have been removed from the client. Instead retrieve
these from the library and inject the client. E.g.
`client.postcodes.retrieve` becomes `postcodes.retrieve(client, ...)`
- Helper methods (like lookupPostcode, ping) have been removed from the client.
Instead retrieve these from teh library and inject the client. E.g.
`client.lookupPostcode` becomes `lookupPostcode(client, ...)`

## [1.5.2](https://github.com/ideal-postcodes/core-browser/compare/1.5.1...1.5.2) (2020-11-27)


### Bug Fixes

* **tsconfig:** Bump tsconfig ([d512e56](https://github.com/ideal-postcodes/core-browser/commit/d512e562ed5572782b0ae5f96c97358e4cb3aa52))

## [1.5.1](https://github.com/ideal-postcodes/core-browser/compare/1.5.0...1.5.1) (2020-11-27)


### Bug Fixes

* **Core Interface:** Bump version ([48dcb89](https://github.com/ideal-postcodes/core-browser/commit/48dcb89515e57db9d17d47e7a98bc5198257a99d))

# [1.5.0](https://github.com/ideal-postcodes/core-browser/compare/1.4.0...1.5.0) (2020-10-26)


### Features

* **Core Interface:** Bump to 1.8.0 ([4c8c243](https://github.com/ideal-postcodes/core-browser/commit/4c8c243b94d0e681da3e4d7648e1eea7ebfd0846))

# [1.4.0](https://github.com/ideal-postcodes/core-browser/compare/1.3.0...1.4.0) (2020-10-21)


### Features

* **ESM:** Add ESM build ([ef825b8](https://github.com/ideal-postcodes/core-browser/commit/ef825b8f31465996ab5fed9fc0808faaa169b45c))

# [1.3.0](https://github.com/ideal-postcodes/core-browser/compare/1.2.1...1.3.0) (2020-08-07)


### Features

* **Core Interface:** Bump to 1.6.0 ([a1dc4b3](https://github.com/ideal-postcodes/core-browser/commit/a1dc4b3e00d3171f67b1ec871baf28d1a7b3092d))

## [1.2.1](https://github.com/ideal-postcodes/core-browser/compare/1.2.0...1.2.1) (2020-02-20)


### Performance Improvements

* **Request:** Drop use of Request ([3a328f6](https://github.com/ideal-postcodes/core-browser/commit/3a328f6634820e87c19c8ba3694416970507f928))

# [1.2.0](https://github.com/ideal-postcodes/core-browser/compare/1.1.0...1.2.0) (2020-02-07)


### Features

* **core-interface:** Update to 1.5.0 ([803d5c1](https://github.com/ideal-postcodes/core-browser/commit/803d5c1cc9a3178ee7660669d91c0d9def57ac2a))

# [1.1.0](https://github.com/ideal-postcodes/core-browser/compare/1.0.2...1.1.0) (2019-12-06)


### Bug Fixes

* **CBT:** Patch CBT lib ([7b58455](https://github.com/ideal-postcodes/core-browser/commit/7b5845533e796f47e6238799d0d9ef77c59048ef))


### Features

* **Core-Interface:** Update core-interface to 1.4.0 ([075f5c9](https://github.com/ideal-postcodes/core-browser/commit/075f5c9b150ae828d8d58ca4f25b326b6714efeb))

## [1.0.2](https://github.com/ideal-postcodes/core-browser/compare/1.0.1...1.0.2) (2019-10-22)


### Bug Fixes

* **async:** Remove async keywords ([e0327a7](https://github.com/ideal-postcodes/core-browser/commit/e0327a7632c3ba8e9badbef5d66fd4e41e6f2821))

## [1.0.1](https://github.com/ideal-postcodes/core-browser/compare/1.0.0...1.0.1) (2019-10-21)


### Bug Fixes

* **Async:** Simplify transpilation by removing async/await ([6bf6aa0](https://github.com/ideal-postcodes/core-browser/commit/6bf6aa02372ddb77d24e622faa037ecc3b0488c9))

## [1.0.1](https://github.com/ideal-postcodes/core-browser/compare/1.0.0...1.0.1) (2019-10-21)


### Bug Fixes

* **Async:** Simplify transpilation by removing async/await ([6bf6aa0](https://github.com/ideal-postcodes/core-browser/commit/6bf6aa02372ddb77d24e622faa037ecc3b0488c9))

# 1.0.0 (2019-10-16)


### Features

* **Docs:** Add changelog ([9ad9483](https://github.com/ideal-postcodes/core-browser/commit/9ad94834ca7e516185e55dfba8403f1667dd9221))
