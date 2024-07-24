# Sports-Helsinki

Test server: https://liikunta.test.hel.ninja

Staging server: https://liikunta.stage.hel.ninja

Production server: https://liikunta.hel.fi (NOTE: this production server might still be deployed from the old Liikunta-repo)

This is a [Next.js](https://nextjs.org/) project originally bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), but cloned from the Hobbies-Helsinki.

## Architecture

```
┌─────────────┐               ┌───────────────┐             ┌── Headless CMS         (app specific datasource for the dynamic page and articles content)
│             │  supergraph > │               │ subgraphs > ├── Unified-Search       (Elasticsearch-service for search results scoring)
│ Application ├───────────────┤ Apollo Router ├─────────────├── Events GraphQL Proxy (A GraphQL-proxy for the LinkedEvents)
│             │               │               │             └── Venues GraphQL Proxy (A GraphQL-proxy for the Palvelukartta/Servicemap / "TPREK" Toimipaikkarekisteri)
└─────────────┘               └───────────────┘
```

### Headless CMS datasources

- Test / Staging: https://liikunta.app-staging.hkih.hion.dev/graphql ([Wordpress-admin](https://liikunta.app-staging.hkih.hion.dev/wp-admin/))
- Production: https://liikunta.content.api.hel.fi/wp-admin/graphql ([Wordpress-admin](https://liikunta.content.api.hel.fi/wp-admin/wp-admin/))

Note that the 1st production deployment from the monorepo will be done while connected toa temporary production server:

- Production (1st deployment): https://liikunta2.content.api.hel.fi/wp-admin/graphql ([Wordpress-admin](https://liikunta2.content.api.hel.fi/wp-admin/wp-admin/))

### Route (pages)

The pages are served with some server side rendering (SSR) mechanism to offer better search engine optimization (SEO) and fast user-friendly UI.
The pre-rendering process that we mostly use here is SSG - "automatically generated as static HTML + JSON (uses getStaticProps)".
The server side rendered pages are under the [pages](./src/pages/) -directory. More about NextJS's data fetching in https://nextjs.org/docs/basic-features/data-fetching/overview.

There are some rules that a content manager must follow while maintaining the CMS:

1. **/ (The root path / the front page)**: [The root path](./src/pages/index.tsx) is set as a landing page and it acts as a home page or the front page. The slug for this page must be an empty string, so the uri is `/` in every language.
2. **/search (The search page)**: [The search page](./src/pages/search/index.tsx) gets no content from the CMS, except the SEO information. The uri for this page must be `/search` in every language. It is translated to different languages with the [i18nRoutes.config.json](./i18nRoutes.config.js) configuration file.
3. **/article-archive (The article archive page)**: [The article archive page](./src/pages/articles/index.tsx) gets the SEO content from the CMS and also makes some hardcoded article search queries there. The page is mostly rendered with the components that the HCRC-lib offers. The uri must be `/article-archive` in every language. It is translated to different languages with the [i18nRoutes.config.json](./i18nRoutes.config.js) configuration file.
4. **/pages (The root for the dynamic pages)**: All [the dynamic pages](./src/pages/pages/%5B...slug%5D.tsx) must be children of the `/pages` -root-page. This strategy must be followed so that the application can internally handle the dynamic CMS pages. The path is translated to different languages with the [i18nRoutes.config.json](./i18nRoutes.config.js) configuration file.

### Combined search

The search page has 1 form, but that form triggers searches to multiple datasources:

1. The venue search tab makes a query to the Unified-Search.
2. The events and the course searches makes a query to the LinkedEvents.

This means that:

1. Parameters given as an input to the form should adapt to search from different datasources. 1 input can be called “q“ in another datasource, but “text“ in another.
2. Not all the parameters are used in every search, because not all the datasources have an equivalent filter.

#### Input: The URL (search) parameters

_The URL is the primary source for input and state._

The URL controls the whole search form, for easy maintain and also for the accessibility reasons:

1. The URL should be updated when new filters are applied (or any of them are removed / cleared). The active filters are always shown in the UI.
2. When another search tab is clicked, the search URL should not change from the search params.
3. When a filter is activated, the URL should be updated. When an URL is updated, the form should also react to that.

An example of CombinedSearchAdapterInput type, that could be used as an input for the searches:

```typescript
// NOTE: this is just an example, not an actual implementation
type CombinedSearchAdapterInput = {
  text: string;
  orderBy: string;
  sportsCategories: string[];
  organization: string | null;
  keywords: string[];
};
```

The input URL should also be cleaned for the combined search. A conversion map can handle any needed _backward support_, but also to fulfill any possible _mandatory inputs_, that should always exists there. It can also _initialize the search form_. It could convert some params to some others and initialize the form with the transformed keys and values.

E.g. `/search?order_by=field` could be transformed to `/search?orderBy=field&searchType=venue`.

#### Transform: Search specific parameter adapter

The guideline is, that the search specific filter adapter should be something that is easy for developers to maintain and understand.

A fictional problem: The free text filter parameter is called “text“ in the LinkedEvents and “q“ in the Unified-Search. The UI has only 1 search field, which means that the parameter that it fills, needs to adapt to work in different searches.

The adapter should:

1. Pick the relevant URL search params; Exclude the ones that are not supported and pick the ones that could be used as they are or be transformed to a right form, so that they could be used as filters.
2. Clean the URL (as much as possible). The combined search has multiple search types and some parameters should persist even then when the search tab is not active.

The output (type `CombinedSearchAdapterOutput`) of the adapter is either `VenueSearchParams` or `EventSearchParams`.

---

An example of VenueSearchParams type, that could be used as an output for the venue search adapter:

```typescript
// NOTE: this is just an example, not an actual implementation
type VenueSearchParams = {
  q: string;
  ontologyWords: string[];
  orderBy: string;
};
```

if this would be the final active implementation of the type, the [CombinedSearchAdapterInput input type](#input-the-url-search-parameters) would transform to this like this:

1. `text` -> `q`.
2. `sportsCategories` -> `ontologyWords` (the adapter needs to also use the mapped values, not only the keys).
3. `venueOrderBy` -> `orderBy`.

---

An example of EventSearchParams type, that could be used as an output for the event search adapter:

```typescript
// NOTE: this is just an example, not an actual implementation
type EventSearchParams = {
  text: string;
  keywords: string[];
  sort: string;
};
```

if this would be the final active implementation of the type, the [CombinedSearchAdapterInput input type](#input-the-url-search-parameters) would transform to this like this:

1. `text` -> `text`.
2. `sportsCategories` -> `keywords` (the adapter needs to also use the mapped values, not only the keys).
3. `courseOrderBy` -> `sort` & `eventOrderBy` -> `sort`.

---

#### The architecture

When an URL is given as an input, a form search adapter picks the params to initialize a search form. The form values should always be in sync with the URL. The search specific adapters are used to map the form values to the actual search inputs. _In this visualization, the URL params are just some examples and may not be synced with the actual implementation._

```
┌──────────────────────────────┐     ┌────────────────────────────┐    ┌─────────────────┐
| Form adapter                 ├─────┤ Venue search adapter       ├────┤ Unified-Search  |
|==============================|     |============================|    |=================|
| Given URL as an input        |     | Converted param            |    | Responds to     |
| e.g /search?text=football&   |     | e.g /graphql?q=football    |    | param `q`       |
| returnPath=/                 |     └────────────────────────────┘    └─────────────────┘
|                              |
| Makes queries to multiple    |
| datasources                  |     ┌────────────────────────────┐    ┌─────────────────┐
|                              |─────┤ Event search adapter       |────┤ LinkedEvents    |
|                              |     |============================|    |=================|
|                              |     | Converted param            |    | Responds to     |
|                              |     | e.g /graphql?text=football |    | param `text`    |
└──────────────────────────────┘     └────────────────────────────┘    └─────────────────┘
```

CombinedSearchPage.tsx

```typescript
<SearchTabs initTab={initTab}>
  <CombinedSearchProvider>
    {/* The search form */}
    <SearchForm
      data-testid={searchContainerDataTestId}
      searchRoute={SEARCH_ROUTES.SEARCH}
      searchUtilities={null}
      korosBottom
      showTitle
      scrollToResultList={() => true}
    />

    {/* The search tabs, query sorters, search type switchers, etc. */}
    <SearchUtilities />

    {/* The Venue Search results */}
    <SearchTabs.Panel id="Venue">
      <VenueSearchPanel />
    </SearchTabs.Panel>

    {/* The General Event Search results */}
    <SearchTabs.Panel id={EventTypeId.General}>
      <EventSearchPanel eventType={EventTypeId.General} />
    </SearchTabs.Panel>

    {/* The Course Search results */}
    <SearchTabs.Panel id={EventTypeId.Course}>
      <EventSearchPanel eventType={EventTypeId.Course} />
    </SearchTabs.Panel>
  </CombinedSearchProvider>
</SearchTabs>
```

The `<SearchTabs/>` is there to provide a React-context / state for the tab system. The context of `<SearchTabs/>` tells

1. which tab should be the active one
2. how many search hits was found when a pre-search for the tab was done.

The `<SearchTabs/>` provider also updates the active `searchType` to the URL.

The `<CombinedSearchProvider/>` is there to have the formValues and the combined search variables stored in a React-context for each searchType. The `<CombinedSearchProvider/>` -component

1. reads the URL and uses the `CombinedSearchFormAdapter` to store the search form values in a context
2. provides the state mutator functions which can be used to update the form values in the context.
3. provides the search variables that can be used to query venues, courses and general events. The values are mapped with the `VenueSearchAdapter` and the `EventSearchAdapter` which both uses the `CombinedSearchFormAdapter` (the form values) as their input.

## Developing locally

Run the development server:

```
yarn dev
# or
docker-compose up
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Setting up Husky pre-commit hooks:

1. Run `yarn install` and `yarn postinstall` on project root.
2. Try `git commit -m foo`. It does not commit anything for real but pre-commit hook should be triggered.

## Available scripts

### `yarn dev`

Runs the application in development mode.
Open [http://localhost:3000](http://localhost:3000) to view in the browser.

The page will reload if you make changes.

### `yarn build`

Builds the production application in the `.next` folder.
Production build can be run locally with `yarn start`.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn test:browser`

Launches the Testcafe test runner for browser tests in the interactive watch mode. `yarn test:browser:ci` runs the command line tool without the graphical interface.

### `yarn lint`

Runs the eslinter, a static code analysis tool to flag programming errors, bugs, stylistic errors and suspicious constructs.
Running the `yarn lint-fix` also fixes the automatically fixamble issues.

### `yarn typecheck`

Transpiles the TypeScript code and reports the errors.

### `yarn generate:graphql`

Uses the codegen tool to generate Graphql Schema file out from the graphql files inside the app. Note that the [graphql.tsx](../../packages/components/src/types/generated/graphql.tsx) inside the packages/components -directory contains the common types and hooks, so it would most likely make sense to copy the generated result and override the graphql file in the common components-package.

## Headless CMS React Component (HCRC) -library implementation

Hobbies uses a lot of the components from the HCRC-lib. For example the article and event carousels are rendered with the HCRC-lib components.

### Apollo Link (Middleware)

> Apollo Link is designed from day one to be easy to use middleware on your requests. Middlewares are used to inspect and modify every request made over the link, for example, adding authentication tokens to every query. In order to add middleware, you simply create a new link and join it with the HttpLink. - https://www.apollographql.com/docs/react/v2/networking/network-layer/#middleware

There are 2 Apollo-clients in implemented: an Apollo-client for _`Headless CMS` to fetch articles and dynamic pages_ from the CMS and an Apollo-client for _`LinkedEvents` to fetch events_ from the Event-proxy. They both contains URL-fields that are targeted to an external source. Since the content is wanted to be rendered inside the Hobbies app, the URLs needs to be transformed so that they are pointing to an internal path. An Apollo Link is a create place to do the transformation, when the URL context is known. Therefore, the URL should include a hint of the context, e.g a context path like `/articles*` or `/pages*` or a domain e.g `linkedvents.hel.fi`.

The transformation table is in the [AppConfig.ts](./src/domain/app/AppConfig.ts) :

```typescript
class AppConfig {
  // ...
  static get linkedEventsEventEndpoint() {
    return getEnvOrError(
      publicRuntimeConfig.linkedEvents,
      "LINKEDEVENTS_EVENT_ENDPOINT"
    );
  }
  static get cmsArticlesContextPath() {
    return process.env.NEXT_PUBLIC_CMS_ARTICLES_CONTEXT_PATH ?? "/articles";
  }
  static get cmsPagesContextPath() {
    return process.env.NEXT_PUBLIC_CMS_PAGES_CONTEXT_PATH ?? "/pages";
  }
  static get URLRewriteMapping() {
    return {
      [AppConfig.linkedEventsEventEndpoint]: ROUTES.COURSES.replace(
        "/[eventId]",
        ""
      ),
      [`${AppConfig.cmsOrigin}[/fi|/en|/sv]*${AppConfig.cmsArticlesContextPath}`]:
        ROUTES.ARTICLES.replace("/[...slug]", ""),
      [`${AppConfig.cmsOrigin}[/fi|/en|/sv]*${AppConfig.cmsPagesContextPath}`]:
        "/",
    };
  }
  // ...
}
```

## Application configuration

The application configuration is done via the [AppConfig.ts](./src/domain/app/AppConfig.ts) as much as possible, so there would be a single point to configure it.

## Contact

City of Helsinki Slack channel #hobbieshelsinki

## Learn more

You can learn more in the [NextJs documentation](https://nextjs.org/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
