# Events-Helsinki

Test server: https://tapahtumat.test.hel.ninja

Staging server: https://tapahtumat.stage.hel.ninja

Production server: https://tapahtumat.hel.fi (NOTE: this production server might still be deployed from the old Tapahtumat-repo)

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

- Test / Staging: https://tapahtumat.hkih.stage.geniem.io/graphql ([Wordpress-admin](https://tapahtumat.hkih.stage.geniem.io/wp-admin/))
- Production: https://tapahtumat.content.api.hel.fi/wp-admin/graphql ([Wordpress-admin](https://tapahtumat.content.api.hel.fi/wp-admin/wp-admin/))

### Route (pages)

The pages are served with some server side rendering (SSR) mechanism to offer better search engine optimization (SEO) and fast user friendly UI.
The pre-rendering process that we mostly use here is SSG - "automatically generated as static HTML + JSON (uses getStaticProps)".
The server side rendered pages are under the [pages](./src/pages/) -directory. More about NextJS's data fetching in https://nextjs.org/docs/basic-features/data-fetching/overview.

There are some rules that a content manager must follow while maintaining the CMS:

1. **/ (The root path / the front page)**: [The root path](./src/pages/index.tsx) is set as a landing page and it acts as a home page or the front page. The slug for this page must be an empty string, so the uri is `/` in every language.
2. **/search (The search page)**: [The search page](./src/pages/search/index.tsx) gets no content from the CMS, except the SEO information. The uri for this page must be `/search` in every language. It is translated to different languages with the [i18nRoutes.config.json](./i18nRoutes.config.js) configuration file.
3. **/article-archive (The article archive page)**: [The article archive page](./src/pages/articles/index.tsx) gets the SEO content from the CMS and also makes some hardcoded article search queries there. The page is mostly rendered with the components that the HCRC-lib offers. The uri must be `/article-archive` in every language. It is translated to different languages with the [i18nRoutes.config.json](./i18nRoutes.config.js) configuration file.
4. **/pages (The root for the dynamic pages)**: All [the dynamic pages](./src/pages/pages/%5B...slug%5D.tsx) must be children of the `/pages` -root-page. This strategy must be followed so that the application can internally handle the dynamic CMS pages. The path is translated to different languages with the [i18nRoutes.config.json](./i18nRoutes.config.js) configuration file.

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

Events uses a lot of the components from the HCRC-lib. For example the article and event carousels are rendered with the HCRC-lib components.

### Apollo Link (Middleware)

> Apollo Link is designed from day one to be easy to use middleware on your requests. Middlewares are used to inspect and modify every request made over the link, for example, adding authentication tokens to every query. In order to add middleware, you simply create a new link and join it with the HttpLink. - https://www.apollographql.com/docs/react/v2/networking/network-layer/#middleware

There are 2 Apollo-clients in implemented: an Apollo-client for _`Headless CMS` to fetch articles and dynamic pages_ from the CMS and an Apollo-client for _`LinkedEvents` to fetch events_ from the Event-proxy. They both contains URL-fields that are targeted to an external source. Since the content is wanted to be rendered inside the Events app, the URLs needs to be transformed so that they are pointing to an internal path. An Apollo Link is a create place to do the transformation, when the URL context is known. Therefore, the URL should include a hint of the context, e.g a context path like `/articles*` or `/pages*` or a domain e.g `linkedvents.hel.fi`.

The transformation table is in the `AppConfig.ts`:

```typescript
class AppConfig {
  // ...
  static get linkedEventsEventEndpoint() {
    return getEnvOrError(
      publicRuntimeConfig.linkedEvents,
      'LINKEDEVENTS_EVENT_ENDPOINT'
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
      [AppConfig.linkedEventsEventEndpoint]: ROUTES.EVENTS.replace(
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

## Contact

City of Helsinki Slack channel _NO CHANNEL YET?_ (use #hobbieshelsinki)

## Learn more

You can learn more in the [NextJs documentation](https://nextjs.org/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
