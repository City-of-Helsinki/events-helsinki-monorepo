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
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  request(process.env.FEDERATION_ROUTER_ENDPOINT!, _REDIRECTS_QUERY);
