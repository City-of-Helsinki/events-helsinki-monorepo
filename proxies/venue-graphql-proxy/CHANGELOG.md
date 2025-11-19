# Changelog

## [1.6.1](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/venue-graphql-proxy-v1.6.0...venue-graphql-proxy-v1.6.1) (2025-11-19)


### Bug Fixes

* **deps:** Upgrade *vite* to latest minor→fix depbot issues 273–280 ([2f990ec](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/2f990ecf5609251c0189cde5e60e24b8c2385257))
* **licenses:** Unify all LICENSE files' contents ([ed21e2c](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/ed21e2c3e9f1b55c5c030c864590844f494af866))

## [1.6.0](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/venue-graphql-proxy-v1.5.1...venue-graphql-proxy-v1.6.0) (2025-10-22)


### Features

* Upgrade to node v22 ([2727d73](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/2727d730e49d50ea33abfe15bb21dadbf21683f9))


### Bug Fixes

* **codegen:** Remove comma from yml config ([1b5ca2a](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/1b5ca2a76aaf6909b75faf150076654a39179663))
* **proxies:** Syntax error in serverPort getter ([919b848](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/919b848789906329b6eb468006d06a8113c3d505))
* Remove use of 10 year old path package, use node.js's path instead ([44d5bdb](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/44d5bdb5b6ca4eaf60166f30a22fdcac192aa1d0))
* **vitest:** Replace use of deprecated cache.dir with cacheDir ([46ca437](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/46ca43709feefdf16334c32952dc62123598e95c))

## [1.5.1](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/venue-graphql-proxy-v1.5.0...venue-graphql-proxy-v1.5.1) (2025-08-14)


### Bug Fixes

* Type of apollo clients' error handler ([cfe4265](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/cfe4265842d127248e81bef06261dcba23624479))

## [1.5.0](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/venue-graphql-proxy-v1.4.0...venue-graphql-proxy-v1.5.0) (2025-03-05)


### Features

* **sports:** Add dynamic CMS configured redirect using middleware ([6170274](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/617027468b0ba9fa1fef08b0ae908867afbf8e8c))

## [1.4.0](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/venue-graphql-proxy-v1.3.1...venue-graphql-proxy-v1.4.0) (2024-03-12)


### Features

* **router:** Upgrade the Apollo router docker image ([7a0bb67](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/7a0bb6708193ab27606c56f3e1d061a4fff1262e))


### Bug Fixes

* Hero ui tweaks ([#531](https://github.com/City-of-Helsinki/events-helsinki-monorepo/issues/531)) ([af11c1b](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/af11c1bf2dacf1c9d4e2444db26f410123de021e))

## [1.3.1](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/venue-graphql-proxy-v1.3.0...venue-graphql-proxy-v1.3.1) (2024-01-03)

### Bug Fixes

- Backward compatibility urls ([791a511](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/791a511d3ab5579b24a59bb9e7566cdad9006a6a))

## [1.3.0](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/venue-graphql-proxy-v1.2.0...venue-graphql-proxy-v1.3.0) (2023-09-14)

### Features

- Update venue-graphql-proxy related types and supergraph ([c506ddc](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/c506ddcd0c8a5605950d5daa8a1e14bed6bcefa5))
- **venue-proxy:** Add department data, enable Hauki support, refactor ([fe75b73](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/fe75b739747ca2ff87307a6301c3089f62b9f895))

## [1.2.0](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/venue-graphql-proxy-v1.1.0...venue-graphql-proxy-v1.2.0) (2023-08-30)

### Features

- **venue-graphql-proxy:** Expose more fields from TPREK unit endpoint ([8e4fcec](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/8e4fcec34492e3efd2d10f1afbb31d6b427ee52d))

### Bug Fixes

- **venue-graphql-proxy:** Handle null TPREK unit gracefully ([113c7f0](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/113c7f01bc9f65714f71563bd76f1d98ecb5a76f))
- **venues-proxy:** VenuesByIds should not return empty venues ([6aaaf5b](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/6aaaf5bb2076cf47ea9d703f2d283a2e26fe7405))

## [1.1.0](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/venue-graphql-proxy-v1.0.1...venue-graphql-proxy-v1.1.0) (2023-08-28)

### Features

- **proxy:** Fetch venue details with fallback languages ([89aee5f](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/89aee5f992063b4b8ecf0db2cfe8b69febcdad45))
- Shared storage and on-demand site generation ([#320](https://github.com/City-of-Helsinki/events-helsinki-monorepo/issues/320)) ([40ddbe5](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/40ddbe50a18ff06d01f3664dae90266a5e6ec24d))

### Bug Fixes

- Error boundary usage after update ([61c2698](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/61c269895366cc0652bb9c8f97375b234fb93d42))
- Venue info connections reading ([48e5e7c](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/48e5e7c6f37e22ee5026898310c75cb5806eeb45))

## [1.0.1](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/venue-graphql-proxy-v1.0.0...venue-graphql-proxy-v1.0.1) (2023-05-24)

### Bug Fixes

- **venue-proxy:** Rename Connection type in venue-subgraph to VenueConnection ([14dbf3f](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/14dbf3f7a821e822ad35ff6fab061d8c8570e624))

## [1.0.0](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/venue-graphql-proxy-v0.2.0...venue-graphql-proxy-v1.0.0) (2023-04-13)

### ⚠ BREAKING CHANGES

- **rce-issue:** rename the packages with a @events-helsinki -scope

### Build System

- **rce-issue:** Rename the packages with a [@events-helsinki](https://github.com/events-helsinki) -scope ([668c18c](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/668c18ce7cbc28591172c0d0ddb74ffa04681e23))

## [0.2.0](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/venue-graphql-proxy-v0.1.0...venue-graphql-proxy-v0.2.0) (2023-02-17)

### Features

- **liikunta-347:** Create venue-graphql-proxy ([b76350f](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/b76350f0add5d9704e78e9a1dfcf9bc46e2a414b))
- **liikunta-347:** Refactor venue code ([a09c616](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/a09c616099711ebde6cd2d84a21cc5ee3e5f048b))
- **liikunta-347:** Use accept-language header in the datasource context ([9d39343](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/9d393437e814b0072bfb18a56d8322f493c7930c))
- **liikunta-374:** Remove venue from sports and use it from liikunta federeation only ([1faf684](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/1faf68491a82bd82e3c0d9fb94f2fec7cacbb63b))

### Performance Improvements

- **liikunta-389:** Try swc/jest ([268dd93](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/268dd93c6296d68be0fb8ccf866654a86b89758c))
