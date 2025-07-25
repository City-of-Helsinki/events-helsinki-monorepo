import { gql } from 'graphql-tag';

const seoFragment = gql`
  fragment seoFragment on SEO {
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
`;

export default seoFragment;
