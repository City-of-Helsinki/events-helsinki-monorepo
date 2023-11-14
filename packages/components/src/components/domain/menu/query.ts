import { gql } from '@apollo/client';

export const MENU_HIERARCHY_QUERY = gql`
  fragment menuItemFields on MenuItem {
    id
    label
    parentId
    path
    title
  }

  fragment menuHierarchyFields on Menu {
    name
    # Using "first" to try to get all menu items without pagination, 100 was the maximum
    # that could be received without pagination from production Headless CMS environment
    # using "pages" query so hopefully the limit is not lower for menuItems
    menuItems(first: 100) {
      nodes {
        ...menuItemFields
      }
    }
  }

  query MenuHierarchy($name: ID!) {
    menu(id: $name, idType: NAME) {
      ...menuHierarchyFields
    }
  }
`;
