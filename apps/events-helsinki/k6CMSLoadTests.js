/* eslint-disable */
import { check, sleep } from 'k6';
import http from 'k6/http';

export const options = {
  duration: '60s',
  vus: 30,
};

const headers = {
  "accept": "application/json",
  "accept-language": "en-FI,en;q=0.9,fi-FI;q=0.8,fi;q=0.7,en-US;q=0.6,de;q=0.5,sv;q=0.4",
  "cache-control": "no-cache",
  "content-type": "application/json",
  "pragma": "no-cache",
}

// A pageByTemplate query for the frontpage
const query = `
fragment SEO on SEO {
  title
  description
  openGraphDescription
  openGraphTitle
  openGraphType
  twitterDescription
  twitterTitle
  socialImage {
    uri
  }
}

fragment Language on Language {
  code
  id
  locale
  name
  slug
}

fragment Page on Page {
  id
  content
  slug
  title
  uri
  link
  lead
  seo {
    ...SEO
  }
  language {
    ...Language
  }
  translations {
    uri
    slug
    language {
      ...Language
    }
    seo {
      ...SEO
    }
  }
  featuredImage {
    node {
      mediaItemUrl
      link
      altText
      mimeType
      title
      uri
    }
  }
  sidebar {
    ... on LayoutLinkList {
      __typename
    }
    ... on LayoutArticles {
      __typename
    }
    ... on LayoutPages {
      __typename
    }
  }
  modules {
    ... on LayoutArticles {
      __typename
    }
    ... on LayoutArticlesCarousel {
      __typename
    }
    ... on LayoutPages {
      __typename
    }
    ... on LayoutPagesCarousel {
      __typename
    }
    ... on EventSearch {
      __typename
    }
    ... on EventSelected {
      __typename
    }
    ... on EventSearchCarousel {
      __typename
    }
    ... on EventSelectedCarousel {
      __typename
    }
    ... on LayoutCollection {
      __typename
    }
    ... on LocationsSelected {
      __typename
    }
  }
}

query pageByTemplate($template: TemplateEnum, $language: String) {
  pageByTemplate(template: $template, language: $language) {
    ...Page
  }
}
`

const variables = {
  "template": "frontPage"
}

export default () => {
  const res = http.post('https://tapahtumat.content.api.hel.fi/graphql',  JSON.stringify({ query, variables }), { headers });
  // console.log(res.json())
  check(res, { 'status was 200 and a page was returned': (r) => {
    const body = JSON.parse(r.body);
    const pageId = body.data.pageByTemplate.id
    return r.status === 200 && pageId !== null
  }});
  sleep(5);
};
