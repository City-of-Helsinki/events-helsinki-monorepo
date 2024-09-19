/**
 * FIXME: Fix module resolution for graphql-request, now ignoring graphql-request types.
 *
 * From graphql-request's README
 * https://github.com/jasonkuhrt/graphql-request/blob/7.1.0/README.md#typescript-setup
 * "This package uses package.exports. Therefore if you are a TypeScript user you must:
 * 1. have your tsconfig.json moduleResolution set to "bundler" or "node16"/"nodenext".
 * 2. Have your package.json type set to "module"."
 *
 * Changing "moduleResolution" to "nodenext" in tsconfig.json lead to TS5110 error:
 * "Option 'module' must be set to 'NodeNext' when option 'moduleResolution' is set to 'NodeNext'."
 *
 * Changing "module" to "nodenext" as well lead to >300 type checking errors.
 *
 * Because graphql-request package use in this file is limited to one relatively
 * straightforward use of `gql` and one simple use of `request`, and given the
 * problems with changing the module resolution, it can be argued that circumventing
 * the type checking for graphql-request is acceptable for this file, although not ideal.
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore See above comment for the reason why typescript is disabled for graphql-request.
import { gql, request } from 'graphql-request';

const _REDIRECTS_QUERY = gql`
  {
    fi: siteSettings(language: "fi") {
      redirects
    }
    en: siteSettings(language: "en") {
      redirects
    }
    sv: siteSettings(language: "sv") {
      redirects
    }
  }
`;

// Query redirects from the CMS
export const queryRedirects = (): Promise<unknown> =>
  request(process.env.FEDERATION_ROUTER_ENDPOINT!, _REDIRECTS_QUERY);
