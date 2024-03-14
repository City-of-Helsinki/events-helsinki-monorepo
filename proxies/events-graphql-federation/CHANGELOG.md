# Changelog

## [1.7.0](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/federation-router-v1.6.1...federation-router-v1.7.0) (2024-03-14)


### Features

* **dockerfile:** Use ubi9/nodejs-20 image & upgrade router v1.35-&gt;v1.40 ([eb2fbec](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/eb2fbec5abf685eef1ce81db898e23035584df9b))

## [1.6.1](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/federation-router-v1.6.0...federation-router-v1.6.1) (2024-01-18)


### Bug Fixes

* Hero ui tweaks ([#531](https://github.com/City-of-Helsinki/events-helsinki-monorepo/issues/531)) ([af11c1b](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/af11c1bf2dacf1c9d4e2444db26f410123de021e))
* **router:** ProviderContactInfo field type should be a LocalizedObject ([fe23839](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/fe2383999246d7dbf6e309597c1b75999e098a75))

## [1.6.0](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/federation-router-v1.5.2...federation-router-v1.6.0) (2024-01-04)

### Features

- **router:** Upgrade the Apollo router docker image ([7a0bb67](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/7a0bb6708193ab27606c56f3e1d061a4fff1262e))

## [1.5.2](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/federation-router-v1.5.1...federation-router-v1.5.2) (2023-12-14)

### Bug Fixes

- Backward compatibility urls ([791a511](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/791a511d3ab5579b24a59bb9e7566cdad9006a6a))

## [1.5.1](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/federation-router-v1.5.0...federation-router-v1.5.1) (2023-11-08)

The `ontologyTreeIdOrSets` and `ontologyWordIdOrSets` are replacing the implementation of `ontologyTreeIdsOrSet[NUM]` and `ontologyWordIds`.
Also, the `q`-parameter is replaced with `text`.

### Features

- **router:** Update unified-search subgraph and supergraph ([7aef929](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/7aef929b8ad757181722330647db2b13f1721630))
- **router:** Update unified-search & venues subgraph, supergraph and types ([b66fb3f](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/b66fb3f10c6334af1cf52808441ea0d991d2423c))

## [1.5.0](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/federation-router-v1.4.0...federation-router-v1.5.0) (2023-09-15)

### Features

- Update venue-graphql-proxy related types and supergraph ([c506ddc](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/c506ddcd0c8a5605950d5daa8a1e14bed6bcefa5))

## [1.4.0](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/federation-router-v1.3.0...federation-router-v1.4.0) (2023-09-08)

### Features

- **router:** Propagate all headers to events-proxy ([71b37f6](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/71b37f6ae255e2f098bff5f28b1cf0f03e89794c))

## [1.3.0](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/federation-router-v1.2.1...federation-router-v1.3.0) (2023-08-28)

### Features

- **events-graphql-federation:** Update events subgraph & supergraph ([78b6397](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/78b639774f5f0913d71c23a688007d480699a006))
- Shared storage and on-demand site generation ([#320](https://github.com/City-of-Helsinki/events-helsinki-monorepo/issues/320)) ([40ddbe5](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/40ddbe50a18ff06d01f3664dae90266a5e6ec24d))

### Bug Fixes

- Change unified-search.test.kuva._ -&gt; kuva-unified-search.api.test._ ([181b774](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/181b7747a1af3bbdbe05ea3ba34e3b8ee0c9c943))
- **error:** 500 page translations and build issue in Hobbies app ([684d102](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/684d1024b7e3174e7c5b44709d121c804681bf19))
- Venue info connections reading ([48e5e7c](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/48e5e7c6f37e22ee5026898310c75cb5806eeb45))

## [1.2.1](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/federation-router-v1.2.0...federation-router-v1.2.1) (2023-05-16)

### Bug Fixes

- Updated federation schemas ([#326](https://github.com/City-of-Helsinki/events-helsinki-monorepo/issues/326)) ([f81eb91](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/f81eb919bbdf89204c3a50da5fced8089dbc3c74))

## [1.2.0](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/federation-router-v1.1.0...federation-router-v1.2.0) (2023-03-01)

### Features

- **router:** Propagate errors from all subgraphs ([a3e39b4](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/a3e39b4f7fff934e0788d31d78af21d422efbd1b))

## [1.1.0](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/federation-router-v1.0.0...federation-router-v1.1.0) (2023-02-09)

### Features

- **liikunta-347:** Update events subgraph and supergraph ([94d39b9](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/94d39b909594176cb4afa3b7ef9a90d2fb4bf861))
- **liikunta-374:** Remove venue from sports and use it from liikunta federeation only ([1faf684](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/1faf68491a82bd82e3c0d9fb94f2fec7cacbb63b))
- **router:** Compose a new supergraph with venues schema and Tprek datasource ([33dc2f9](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/33dc2f9d2bf0c6b3da802a483c0fbbf8efe3e32f))
- **router:** Propagate the headers from the requests ([d28724e](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/d28724e3f59e72e370a8146900d56797de89b38d))
- **router:** Venues subgraph added to the federation router ([03dcb61](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/03dcb617ff144c6ac8afbe5d4c7da80300b9d3cd))
- Update gql schemas ([#149](https://github.com/City-of-Helsinki/events-helsinki-monorepo/issues/149)) ([03decf2](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/03decf2856ff46a0cd8f3a22b3ac92bca5953282))

### Bug Fixes

- Check install issues ([7106b4b](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/7106b4b9c5606eae708364b5e88fab63808ccc21))
- Remove .kuva from events-graphql-federation-\*.test.kuva.hel.ninja ([7927024](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/7927024a68f2de4172e213298431c8c027839a45))
