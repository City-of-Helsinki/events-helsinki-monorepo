# Changelog

## [1.3.0](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/events-graphql-proxy-v1.2.1...events-graphql-proxy-v1.3.0) (2024-01-16)


### Features

* **router:** Upgrade the Apollo router docker image ([7a0bb67](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/7a0bb6708193ab27606c56f3e1d061a4fff1262e))


### Bug Fixes

* Hero ui tweaks ([#531](https://github.com/City-of-Helsinki/events-helsinki-monorepo/issues/531)) ([af11c1b](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/af11c1bf2dacf1c9d4e2444db26f410123de021e))
* **proxy:** ProviderContactInfo field type should be a LocalizedObject ([080a775](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/080a7756b3cfad044828b6d62848e203312e840e))

## [1.2.1](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/events-graphql-proxy-v1.2.0...events-graphql-proxy-v1.2.1) (2024-01-04)

### Bug Fixes

- Backward compatibility urls ([791a511](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/791a511d3ab5579b24a59bb9e7566cdad9006a6a))

## [1.2.0](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/events-graphql-proxy-v1.1.0...events-graphql-proxy-v1.2.0) (2023-09-08)

### Features

- False structured events can be ignored by using http-headers ([3ad03ce](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/3ad03ce97311f3975681b072a660f9c5908a19e0))

## [1.1.0](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/events-graphql-proxy-v1.0.0...events-graphql-proxy-v1.1.0) (2023-08-28)

### Features

- **events-graphql-federation:** Update events subgraph & supergraph ([78b6397](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/78b639774f5f0913d71c23a688007d480699a006))
- **events-graphql-proxy:** Add publisherAncestor parameter to eventList ([5672d37](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/5672d37cd53a0b6df7b713ac2fbd7906ce14fef4))

### Bug Fixes

- Error boundary usage after update ([61c2698](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/61c269895366cc0652bb9c8f97375b234fb93d42))
- Neighborhood list get-method should not start with slash ([00e0184](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/00e0184c336de5074ef84f6da130645e8122fee1))
- Venue info connections reading ([48e5e7c](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/48e5e7c6f37e22ee5026898310c75cb5806eeb45))

## [1.0.0](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/events-graphql-proxy-v0.3.0...events-graphql-proxy-v1.0.0) (2023-04-12)

### ⚠ BREAKING CHANGES

- **rce-issue:** rename the packages with a @events-helsinki -scope

### Build System

- **rce-issue:** Rename the packages with a [@events-helsinki](https://github.com/events-helsinki) -scope ([668c18c](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/668c18ce7cbc28591172c0d0ddb74ffa04681e23))

## [0.3.0](https://github.com/City-of-Helsinki/events-helsinki-monorepo/compare/events-graphql-proxy-v0.2.10...events-graphql-proxy-v0.3.0) (2023-02-17)

### Features

- Add feature flag for for enrolment status usage ([10301e0](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/10301e022d3e08f796c5168d1396ddd744436de8))
- **liikunta-347:** Common dockerfile for proxy servers ([e8d403c](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/e8d403c46d3b85d78ca053cd9f729248cfeda34a))
- **liikunta-347:** Move graphql proxy server code to own package ([06b6589](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/06b6589788cad043323c0a564ffc01ae73afa50a))
- **liikunta-347:** Refactor venue code ([a09c616](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/a09c616099711ebde6cd2d84a21cc5ee3e5f048b))
- **liikunta-347:** Remove wagtail cms code ([6dba429](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/6dba429f3b7f30edc17c8ed45f4871d29bfeaf00))
- **liikunta-348:** Initial copy files from another repo ([f91dac4](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/f91dac492c0756f2074d6d6f68c26381bc0093be))
- **liikunta-348:** Make events-graphql-proxy folder part of the monorepo ([ec65826](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/ec658269345e05907dd5581d3da4599a9024bd0e))
- **liikunta-348:** Use apollo server 4 ([d6301c6](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/d6301c6b2f1a29aa4eabc62f5e50d089f8d213a1))
- Show the enrolment status on large event card ([f175ae6](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/f175ae6e66364405b2b36d0b771c28c28de4689a))

### Bug Fixes

- Broken jest config for events graphql proxy ([61030cd](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/61030cde055f14bbfc725660421a14647a5f42cd))
- Different graphql packages problem ([1b5fcbb](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/1b5fcbb992ee19f6dd6586f8a79ddf604b0621f7))

### Performance Improvements

- **liikunta-389:** Try swc/jest ([268dd93](https://github.com/City-of-Helsinki/events-helsinki-monorepo/commit/268dd93c6296d68be0fb8ccf866654a86b89758c))
