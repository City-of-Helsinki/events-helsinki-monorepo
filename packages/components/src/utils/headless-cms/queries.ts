import { gql } from 'graphql-tag';

type PageInfoType = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
};

type PageEdgeType = {
  node: {
    uri: string;
    slug: string;
    language: {
      code: string;
    };
  };
};

export type GetAllItemsUriInfoResponseType = {
  items: {
    pageInfo: PageInfoType;
    edges: PageEdgeType[];
  };
};

export const GET_ALL_PAGES_URI_INFO_QUERY = gql`
  query getAllPagesUriInfo($first: Int, $after: String) {
    items: pages(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          uri
          slug
          language {
            code
          }
        }
      }
    }
  }
`;

export const GET_ALL_POSTS_URI_INFO_QUERY = gql`
  query getAllPostsUriInfo($first: Int, $after: String) {
    items: posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          uri
          slug
          language {
            code
          }
        }
      }
    }
  }
`;
