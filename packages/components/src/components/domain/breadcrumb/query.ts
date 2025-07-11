import { gql } from 'graphql-tag';

export const QUERY_PAGETEMPLATE_BREADCRUMB_TITLE = gql`
  query pageByTemplateBreadcrumbTitle(
    $template: TemplateEnum
    $language: String
  ) {
    pageByTemplate(template: $template, language: $language) {
      title
      breadcrumbs {
        title
        uri
      }
    }
  }
`;

export const QUERY_PAGE_BREADCRUMB_TITLE = gql`
  query pageBreadcrumbTitle($id: ID!) {
    page(id: $id, idType: URI) {
      title
      breadcrumbs {
        title
        uri
      }
    }
  }
`;
