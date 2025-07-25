import { gql } from 'graphql-tag';
import * as Apollo from '@apollo/client/index.js';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  GeoJSONCoordinates: { input: any; output: any };
  JSONObject: { input: any; output: any };
};

export type Accessibility = {
  __typename?: 'Accessibility';
  email?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  sentences: Array<AccessibilitySentence>;
  shortcomings: Array<AccessibilityShortcoming>;
  viewpoints: Array<AccessibilityViewpoint>;
  www?: Maybe<Scalars['String']['output']>;
};

export enum AccessibilityProfile {
  HearingAid = 'hearing_aid',
  ReducedMobility = 'reduced_mobility',
  Rollator = 'rollator',
  Stroller = 'stroller',
  VisuallyImpaired = 'visually_impaired',
  Wheelchair = 'wheelchair',
}

export type AccessibilitySentence = {
  __typename?: 'AccessibilitySentence';
  sentence?: Maybe<LanguageString>;
  sentenceGroup?: Maybe<LanguageString>;
  sentenceGroupName?: Maybe<Scalars['String']['output']>;
};

export type AccessibilitySentences = {
  __typename?: 'AccessibilitySentences';
  groupName?: Maybe<Scalars['String']['output']>;
  sentences?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type AccessibilityShortcoming = {
  __typename?: 'AccessibilityShortcoming';
  count?: Maybe<Scalars['Int']['output']>;
  profile: AccessibilityProfile;
};

export type AccessibilityViewpoint = {
  __typename?: 'AccessibilityViewpoint';
  id: Scalars['ID']['output'];
  name: LanguageString;
  shortages: Array<LanguageString>;
  value: AccessibilityViewpointValue;
};

export enum AccessibilityViewpointValue {
  Green = 'green',
  Red = 'red',
  Unknown = 'unknown',
}

/** TODO: give real structure */
export type Address = {
  __typename?: 'Address';
  city?: Maybe<LanguageString>;
  postalCode?: Maybe<Scalars['String']['output']>;
  streetAddress?: Maybe<LanguageString>;
};

export type AdministrativeDivision = {
  __typename?: 'AdministrativeDivision';
  id?: Maybe<Scalars['ID']['output']>;
  municipality?: Maybe<Scalars['String']['output']>;
  name?: Maybe<LanguageString>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Audience = {
  __typename?: 'Audience';
  id?: Maybe<Scalars['ID']['output']>;
  internalContext?: Maybe<Scalars['String']['output']>;
  internalId?: Maybe<Scalars['String']['output']>;
  internalType?: Maybe<Scalars['String']['output']>;
  name?: Maybe<LocalizedObject>;
};

/** Avatars are profile images for users. WordPress by default uses the Gravatar service to host and fetch avatars from. */
export type Avatar = {
  __typename?: 'Avatar';
  /** URL for the default image or a default type. Accepts &#039;404&#039; (return a 404 instead of a default image), &#039;retro&#039; (8bit), &#039;monsterid&#039; (monster), &#039;wavatar&#039; (cartoon face), &#039;indenticon&#039; (the &#039;quilt&#039;), &#039;mystery&#039;, &#039;mm&#039;, or &#039;mysteryman&#039; (The Oyster Man), &#039;blank&#039; (transparent GIF), or &#039;gravatar_default&#039; (the Gravatar logo). */
  default?: Maybe<Scalars['String']['output']>;
  /** HTML attributes to insert in the IMG element. Is not sanitized. */
  extraAttr?: Maybe<Scalars['String']['output']>;
  /** Whether to always show the default image, never the Gravatar. */
  forceDefault?: Maybe<Scalars['Boolean']['output']>;
  /** Whether the avatar was successfully found. */
  foundAvatar?: Maybe<Scalars['Boolean']['output']>;
  /** Height of the avatar image. */
  height?: Maybe<Scalars['Int']['output']>;
  /** Whether the object is restricted from the current viewer */
  isRestricted?: Maybe<Scalars['Boolean']['output']>;
  /** What rating to display avatars up to. Accepts &#039;G&#039;, &#039;PG&#039;, &#039;R&#039;, &#039;X&#039;, and are judged in that order. */
  rating?: Maybe<Scalars['String']['output']>;
  /** Type of url scheme to use. Typically HTTP vs. HTTPS. */
  scheme?: Maybe<Scalars['String']['output']>;
  /** The size of the avatar in pixels. A value of 96 will match a 96px x 96px gravatar image. */
  size?: Maybe<Scalars['Int']['output']>;
  /** URL for the gravatar image source. */
  url?: Maybe<Scalars['String']['output']>;
  /** Width of the avatar image. */
  width?: Maybe<Scalars['Int']['output']>;
};

/** What rating to display avatars up to. Accepts 'G', 'PG', 'R', 'X', and are judged in that order. Default is the value of the 'avatar_rating' option */
export enum AvatarRatingEnum {
  /** Indicates a G level avatar rating level. */
  G = 'G',
  /** Indicates a PG level avatar rating level. */
  Pg = 'PG',
  /** Indicates an R level avatar rating level. */
  R = 'R',
  /** Indicates an X level avatar rating level. */
  X = 'X',
}

export type BannerPage = {
  __typename?: 'BannerPage';
  buttonText?: Maybe<LocalizedObject>;
  buttonUrl?: Maybe<LocalizedObject>;
  description?: Maybe<LocalizedObject>;
  heroBackgroundImage?: Maybe<LocalizedCmsImage>;
  heroBackgroundImageColor?: Maybe<LocalizedObject>;
  heroBackgroundImageMobile?: Maybe<LocalizedCmsImage>;
  heroTopLayerImage?: Maybe<LocalizedCmsImage>;
  keywords?: Maybe<LocalizedCmsKeywords>;
  socialMediaImage?: Maybe<LocalizedCmsImage>;
  title?: Maybe<LocalizedObject>;
  titleAndDescriptionColor?: Maybe<LocalizedObject>;
};

/** Breadcumb field */
export type Breadcrumb = {
  __typename?: 'Breadcrumb';
  /** The title of the page */
  title?: Maybe<Scalars['String']['output']>;
  /** The link of the page. */
  uri?: Maybe<Scalars['String']['output']>;
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
}

/** Kortin kenttä */
export type Card = {
  __typename?: 'Card';
  /** Taustaväri */
  backgroundColor?: Maybe<Scalars['String']['output']>;
  /** Kuvaus */
  description?: Maybe<Scalars['String']['output']>;
  /** Ikoni */
  icon?: Maybe<Scalars['String']['output']>;
  /** Linkki */
  link?: Maybe<Link>;
  /** Sivuston otsikko */
  title?: Maybe<Scalars['String']['output']>;
};

/** The category type */
export type Category = DatabaseIdentifier &
  HierarchicalNode &
  HierarchicalTermNode &
  MenuItemLinkable &
  Node &
  TermNode &
  UniformResourceIdentifiable & {
    __typename?: 'Category';
    /** The ancestors of the node. Default ordered as lowest (closest to the child) to highest (closest to the root). */
    ancestors?: Maybe<CategoryToAncestorsCategoryConnection>;
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of databaseId
     */
    categoryId?: Maybe<Scalars['Int']['output']>;
    /** Connection between the category type and its children categories. */
    children?: Maybe<CategoryToCategoryConnection>;
    /** Connection between the Category type and the ContentNode type */
    contentNodes?: Maybe<CategoryToContentNodeConnection>;
    /** The number of objects connected to the object */
    count?: Maybe<Scalars['Int']['output']>;
    /** The unique identifier stored in the database */
    databaseId: Scalars['Int']['output'];
    /** The description of the object */
    description?: Maybe<Scalars['String']['output']>;
    /** Connection between the TermNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<TermNodeToEnqueuedScriptConnection>;
    /** Connection between the TermNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<TermNodeToEnqueuedStylesheetConnection>;
    /** The globally unique ID for the object */
    id: Scalars['ID']['output'];
    /** Whether the node is a Comment */
    isComment: Scalars['Boolean']['output'];
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']['output'];
    /** Whether the node represents the front page. */
    isFrontPage: Scalars['Boolean']['output'];
    /** Whether  the node represents the blog page. */
    isPostsPage: Scalars['Boolean']['output'];
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']['output']>;
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']['output'];
    /** List available translations for this post */
    language?: Maybe<Language>;
    /** The link to the term */
    link?: Maybe<Scalars['String']['output']>;
    /** The human friendly name of the object. */
    name?: Maybe<Scalars['String']['output']>;
    /** Connection between the category type and its parent category. */
    parent?: Maybe<CategoryToParentCategoryConnectionEdge>;
    /** Database id of the parent node */
    parentDatabaseId?: Maybe<Scalars['Int']['output']>;
    /** The globally unique identifier of the parent node. */
    parentId?: Maybe<Scalars['ID']['output']>;
    /** Connection between the Category type and the post type */
    posts?: Maybe<CategoryToPostConnection>;
    /** An alphanumeric identifier for the object unique to its type. */
    slug?: Maybe<Scalars['String']['output']>;
    /** Connection between the Category type and the Taxonomy type */
    taxonomy?: Maybe<CategoryToTaxonomyConnectionEdge>;
    /** The name of the taxonomy that the object is associated with */
    taxonomyName?: Maybe<Scalars['String']['output']>;
    /** The ID of the term group that this term object belongs to */
    termGroupId?: Maybe<Scalars['Int']['output']>;
    /** The taxonomy ID that the object is associated with */
    termTaxonomyId?: Maybe<Scalars['Int']['output']>;
    /** Get specific translation version of this object */
    translation?: Maybe<Category>;
    /** List all translated versions of this term */
    translations?: Maybe<Array<Maybe<Category>>>;
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']['output']>;
  };

/** The category type */
export type CategoryAncestorsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The category type */
export type CategoryChildrenArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CategoryToCategoryConnectionWhereArgs>;
};

/** The category type */
export type CategoryContentNodesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CategoryToContentNodeConnectionWhereArgs>;
};

/** The category type */
export type CategoryEnqueuedScriptsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The category type */
export type CategoryEnqueuedStylesheetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The category type */
export type CategoryPostsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CategoryToPostConnectionWhereArgs>;
};

/** The category type */
export type CategoryTranslationArgs = {
  language: LanguageCodeEnum;
};

/** Connection to category Nodes */
export type CategoryConnection = {
  /** A list of edges (relational context) between RootQuery and connected category Nodes */
  edges: Array<CategoryConnectionEdge>;
  /** A list of connected category Nodes */
  nodes: Array<Category>;
  /** Information about pagination in a connection. */
  pageInfo: CategoryConnectionPageInfo;
};

/** Edge between a Node and a connected category */
export type CategoryConnectionEdge = {
  /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The connected category Node */
  node: Category;
};

/** Page Info on the connected CategoryConnectionEdge */
export type CategoryConnectionPageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum CategoryIdType {
  /** The Database ID for the node */
  DatabaseId = 'DATABASE_ID',
  /** The hashed Global ID */
  Id = 'ID',
  /** The name of the node */
  Name = 'NAME',
  /** Url friendly name of the node */
  Slug = 'SLUG',
  /** The URI for the node */
  Uri = 'URI',
}

/** Connection between the Category type and the category type */
export type CategoryToAncestorsCategoryConnection = CategoryConnection &
  Connection & {
    __typename?: 'CategoryToAncestorsCategoryConnection';
    /** Edges for the CategoryToAncestorsCategoryConnection connection */
    edges: Array<CategoryToAncestorsCategoryConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Category>;
    /** Information about pagination in a connection. */
    pageInfo: CategoryToAncestorsCategoryConnectionPageInfo;
  };

/** An edge in a connection */
export type CategoryToAncestorsCategoryConnectionEdge = CategoryConnectionEdge &
  Edge & {
    __typename?: 'CategoryToAncestorsCategoryConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Category;
  };

/** Page Info on the &quot;CategoryToAncestorsCategoryConnection&quot; */
export type CategoryToAncestorsCategoryConnectionPageInfo =
  CategoryConnectionPageInfo &
    PageInfo &
    WpPageInfo & {
      __typename?: 'CategoryToAncestorsCategoryConnectionPageInfo';
      /** When paginating forwards, the cursor to continue. */
      endCursor?: Maybe<Scalars['String']['output']>;
      /** When paginating forwards, are there more items? */
      hasNextPage: Scalars['Boolean']['output'];
      /** When paginating backwards, are there more items? */
      hasPreviousPage: Scalars['Boolean']['output'];
      /** When paginating backwards, the cursor to continue. */
      startCursor?: Maybe<Scalars['String']['output']>;
    };

/** Connection between the Category type and the category type */
export type CategoryToCategoryConnection = CategoryConnection &
  Connection & {
    __typename?: 'CategoryToCategoryConnection';
    /** Edges for the CategoryToCategoryConnection connection */
    edges: Array<CategoryToCategoryConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Category>;
    /** Information about pagination in a connection. */
    pageInfo: CategoryToCategoryConnectionPageInfo;
  };

/** An edge in a connection */
export type CategoryToCategoryConnectionEdge = CategoryConnectionEdge &
  Edge & {
    __typename?: 'CategoryToCategoryConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Category;
  };

/** Page Info on the &quot;CategoryToCategoryConnection&quot; */
export type CategoryToCategoryConnectionPageInfo = CategoryConnectionPageInfo &
  PageInfo &
  WpPageInfo & {
    __typename?: 'CategoryToCategoryConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the CategoryToCategoryConnection connection */
export type CategoryToCategoryConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Connection between the Category type and the ContentNode type */
export type CategoryToContentNodeConnection = Connection &
  ContentNodeConnection & {
    __typename?: 'CategoryToContentNodeConnection';
    /** Edges for the CategoryToContentNodeConnection connection */
    edges: Array<CategoryToContentNodeConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<ContentNode>;
    /** Information about pagination in a connection. */
    pageInfo: CategoryToContentNodeConnectionPageInfo;
  };

/** An edge in a connection */
export type CategoryToContentNodeConnectionEdge = ContentNodeConnectionEdge &
  Edge & {
    __typename?: 'CategoryToContentNodeConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: ContentNode;
  };

/** Page Info on the &quot;CategoryToContentNodeConnection&quot; */
export type CategoryToContentNodeConnectionPageInfo =
  ContentNodeConnectionPageInfo &
    PageInfo &
    WpPageInfo & {
      __typename?: 'CategoryToContentNodeConnectionPageInfo';
      /** When paginating forwards, the cursor to continue. */
      endCursor?: Maybe<Scalars['String']['output']>;
      /** When paginating forwards, are there more items? */
      hasNextPage: Scalars['Boolean']['output'];
      /** When paginating backwards, are there more items? */
      hasPreviousPage: Scalars['Boolean']['output'];
      /** When paginating backwards, the cursor to continue. */
      startCursor?: Maybe<Scalars['String']['output']>;
    };

/** Arguments for filtering the CategoryToContentNodeConnection connection */
export type CategoryToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypesOfCategoryEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the Category type and the category type */
export type CategoryToParentCategoryConnectionEdge = CategoryConnectionEdge &
  Edge &
  OneToOneConnection & {
    __typename?: 'CategoryToParentCategoryConnectionEdge';
    /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The node of the connection, without the edges */
    node: Category;
  };

/** Connection between the Category type and the post type */
export type CategoryToPostConnection = Connection &
  PostConnection & {
    __typename?: 'CategoryToPostConnection';
    /** Edges for the CategoryToPostConnection connection */
    edges: Array<CategoryToPostConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Post>;
    /** Information about pagination in a connection. */
    pageInfo: CategoryToPostConnectionPageInfo;
  };

/** An edge in a connection */
export type CategoryToPostConnectionEdge = Edge &
  PostConnectionEdge & {
    __typename?: 'CategoryToPostConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Post;
  };

/** Page Info on the &quot;CategoryToPostConnection&quot; */
export type CategoryToPostConnectionPageInfo = PageInfo &
  PostConnectionPageInfo &
  WpPageInfo & {
    __typename?: 'CategoryToPostConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the CategoryToPostConnection connection */
export type CategoryToPostConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']['input']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']['input']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Category ID */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Use Category Slug */
  categoryName?: InputMaybe<Scalars['String']['input']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Use Tag ID */
  tagId?: InputMaybe<Scalars['String']['input']>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of tag slugs, used to display objects from one tag AND another */
  tagSlugAnd?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of tag slugs, used to include objects in ANY specified tags */
  tagSlugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the Category type and the Taxonomy type */
export type CategoryToTaxonomyConnectionEdge = Edge &
  OneToOneConnection &
  TaxonomyConnectionEdge & {
    __typename?: 'CategoryToTaxonomyConnectionEdge';
    /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The node of the connection, without the edges */
    node: Taxonomy;
  };

export type CmsImage = {
  __typename?: 'CmsImage';
  photographerCredit?: Maybe<LocalizedObject>;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

/** The collection type */
export type Collection = ContentNode &
  DatabaseIdentifier &
  Node &
  NodeWithRevisions &
  NodeWithTemplate &
  NodeWithTitle &
  Previewable &
  UniformResourceIdentifiable & {
    __typename?: 'Collection';
    /** Background Color */
    backgroundColor?: Maybe<Scalars['String']['output']>;
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of the databaseId field
     */
    collectionId: Scalars['Int']['output'];
    /** Connection between the ContentNode type and the ContentType type */
    contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
    /** The name of the Content Type the node belongs to */
    contentTypeName: Scalars['String']['output'];
    /** The unique identifier stored in the database */
    databaseId: Scalars['Int']['output'];
    /** Post publishing date. */
    date?: Maybe<Scalars['String']['output']>;
    /** The publishing date set in GMT. */
    dateGmt?: Maybe<Scalars['String']['output']>;
    /** Description */
    description?: Maybe<Scalars['String']['output']>;
    /** The desired slug of the post */
    desiredSlug?: Maybe<Scalars['String']['output']>;
    /** If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds */
    editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
    /** The RSS enclosure for the object */
    enclosure?: Maybe<Scalars['String']['output']>;
    /** Connection between the ContentNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<ContentNodeToEnqueuedScriptConnection>;
    /** Connection between the ContentNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<ContentNodeToEnqueuedStylesheetConnection>;
    /** Vanhentumisaika */
    expirationTime?: Maybe<Scalars['String']['output']>;
    /** The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table. */
    guid?: Maybe<Scalars['String']['output']>;
    /** The globally unique identifier of the collection-cpt object. */
    id: Scalars['ID']['output'];
    /** Image */
    image?: Maybe<Scalars['String']['output']>;
    /** Whether the node is a Comment */
    isComment: Scalars['Boolean']['output'];
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']['output'];
    /** Whether the node represents the front page. */
    isFrontPage: Scalars['Boolean']['output'];
    /** Whether  the node represents the blog page. */
    isPostsPage: Scalars['Boolean']['output'];
    /** Whether the object is a node in the preview state */
    isPreview?: Maybe<Scalars['Boolean']['output']>;
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']['output']>;
    /** True if the node is a revision of another node */
    isRevision?: Maybe<Scalars['Boolean']['output']>;
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']['output'];
    /** Polylang language */
    language?: Maybe<Language>;
    /** The user that most recently edited the node */
    lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
    /** The permalink of the post */
    link?: Maybe<Scalars['String']['output']>;
    /** The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time. */
    modified?: Maybe<Scalars['String']['output']>;
    /** The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT. */
    modifiedGmt?: Maybe<Scalars['String']['output']>;
    /** List of modules */
    modules?: Maybe<Array<Maybe<CollectionModulesUnionType>>>;
    /** Connection between the Collection type and the collection type */
    preview?: Maybe<CollectionToPreviewConnectionEdge>;
    /** The database id of the preview node */
    previewRevisionDatabaseId?: Maybe<Scalars['Int']['output']>;
    /** Whether the object is a node in the preview state */
    previewRevisionId?: Maybe<Scalars['ID']['output']>;
    /** If the current node is a revision, this field exposes the node this is a revision of. Returns null if the node is not a revision of another node. */
    revisionOf?: Maybe<NodeWithRevisionsToContentNodeConnectionEdge>;
    /** Connection between the Collection type and the collection type */
    revisions?: Maybe<CollectionToRevisionConnection>;
    /** The SEO Framework data of the collection */
    seo?: Maybe<Seo>;
    /** Show on front page */
    showOnFrontPage?: Maybe<Scalars['Boolean']['output']>;
    /** The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table. */
    slug?: Maybe<Scalars['String']['output']>;
    /** The current status of the object */
    status?: Maybe<Scalars['String']['output']>;
    /** The template assigned to the node */
    template?: Maybe<ContentTemplate>;
    /** The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made. */
    title?: Maybe<Scalars['String']['output']>;
    /** Get specific translation version of this object */
    translation?: Maybe<Collection>;
    /** List all translated versions of this post */
    translations?: Maybe<Array<Maybe<Collection>>>;
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']['output']>;
  };

/** The collection type */
export type CollectionEnqueuedScriptsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The collection type */
export type CollectionEnqueuedStylesheetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The collection type */
export type CollectionRevisionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CollectionToRevisionConnectionWhereArgs>;
};

/** The collection type */
export type CollectionTitleArgs = {
  format?: InputMaybe<PostObjectFieldFormatEnum>;
};

/** The collection type */
export type CollectionTranslationArgs = {
  language: LanguageCodeEnum;
};

/** Connection to collection Nodes */
export type CollectionConnection = {
  /** A list of edges (relational context) between RootQuery and connected collection Nodes */
  edges: Array<CollectionConnectionEdge>;
  /** A list of connected collection Nodes */
  nodes: Array<Collection>;
  /** Information about pagination in a connection. */
  pageInfo: CollectionConnectionPageInfo;
};

/** Edge between a Node and a connected collection */
export type CollectionConnectionEdge = {
  /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The connected collection Node */
  node: Collection;
};

/** Page Info on the connected CollectionConnectionEdge */
export type CollectionConnectionPageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum CollectionIdType {
  /** Identify a resource by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  Id = 'ID',
  /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
  Slug = 'SLUG',
  /** Identify a resource by the URI. */
  Uri = 'URI',
}

export type CollectionModulesUnionType =
  | EventSearch
  | EventSearchCarousel
  | EventSelected
  | EventSelectedCarousel
  | LocationsSelected
  | LocationsSelectedCarousel;

/** Connection between the Collection type and the collection type */
export type CollectionToPreviewConnectionEdge = CollectionConnectionEdge &
  Edge &
  OneToOneConnection & {
    __typename?: 'CollectionToPreviewConnectionEdge';
    /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The node of the connection, without the edges */
    node: Collection;
  };

/** Connection between the Collection type and the collection type */
export type CollectionToRevisionConnection = CollectionConnection &
  Connection & {
    __typename?: 'CollectionToRevisionConnection';
    /** Edges for the CollectionToRevisionConnection connection */
    edges: Array<CollectionToRevisionConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Collection>;
    /** Information about pagination in a connection. */
    pageInfo: CollectionToRevisionConnectionPageInfo;
  };

/** An edge in a connection */
export type CollectionToRevisionConnectionEdge = CollectionConnectionEdge &
  Edge & {
    __typename?: 'CollectionToRevisionConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Collection;
  };

/** Page Info on the &quot;CollectionToRevisionConnection&quot; */
export type CollectionToRevisionConnectionPageInfo =
  CollectionConnectionPageInfo &
    PageInfo &
    WpPageInfo & {
      __typename?: 'CollectionToRevisionConnectionPageInfo';
      /** When paginating forwards, the cursor to continue. */
      endCursor?: Maybe<Scalars['String']['output']>;
      /** When paginating forwards, are there more items? */
      hasNextPage: Scalars['Boolean']['output'];
      /** When paginating backwards, are there more items? */
      hasPreviousPage: Scalars['Boolean']['output'];
      /** When paginating backwards, the cursor to continue. */
      startCursor?: Maybe<Scalars['String']['output']>;
    };

/** Arguments for filtering the CollectionToRevisionConnection connection */
export type CollectionToRevisionConnectionWhereArgs = {
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** A Comment object */
export type Comment = DatabaseIdentifier &
  Node &
  UniformResourceIdentifiable & {
    __typename?: 'Comment';
    /** User agent used to post the comment. This field is equivalent to WP_Comment-&gt;comment_agent and the value matching the &quot;comment_agent&quot; column in SQL. */
    agent?: Maybe<Scalars['String']['output']>;
    /**
     * The approval status of the comment. This field is equivalent to WP_Comment-&gt;comment_approved and the value matching the &quot;comment_approved&quot; column in SQL.
     * @deprecated Deprecated in favor of the `status` field
     */
    approved?: Maybe<Scalars['Boolean']['output']>;
    /** The author of the comment */
    author?: Maybe<CommentToCommenterConnectionEdge>;
    /** IP address for the author. This field is equivalent to WP_Comment-&gt;comment_author_IP and the value matching the &quot;comment_author_IP&quot; column in SQL. */
    authorIp?: Maybe<Scalars['String']['output']>;
    /**
     * ID for the comment, unique among comments.
     * @deprecated Deprecated in favor of databaseId
     */
    commentId?: Maybe<Scalars['Int']['output']>;
    /** Connection between the Comment type and the ContentNode type */
    commentedOn?: Maybe<CommentToContentNodeConnectionEdge>;
    /** Content of the comment. This field is equivalent to WP_Comment-&gt;comment_content and the value matching the &quot;comment_content&quot; column in SQL. */
    content?: Maybe<Scalars['String']['output']>;
    /** The unique identifier stored in the database */
    databaseId: Scalars['Int']['output'];
    /** Date the comment was posted in local time. This field is equivalent to WP_Comment-&gt;date and the value matching the &quot;date&quot; column in SQL. */
    date?: Maybe<Scalars['String']['output']>;
    /** Date the comment was posted in GMT. This field is equivalent to WP_Comment-&gt;date_gmt and the value matching the &quot;date_gmt&quot; column in SQL. */
    dateGmt?: Maybe<Scalars['String']['output']>;
    /** The globally unique identifier for the comment object */
    id: Scalars['ID']['output'];
    /** Whether the node is a Comment */
    isComment: Scalars['Boolean']['output'];
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']['output'];
    /** Whether the node represents the front page. */
    isFrontPage: Scalars['Boolean']['output'];
    /** Whether  the node represents the blog page. */
    isPostsPage: Scalars['Boolean']['output'];
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']['output']>;
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']['output'];
    /** Karma value for the comment. This field is equivalent to WP_Comment-&gt;comment_karma and the value matching the &quot;comment_karma&quot; column in SQL. */
    karma?: Maybe<Scalars['Int']['output']>;
    /** The permalink of the comment */
    link?: Maybe<Scalars['String']['output']>;
    /** Connection between the Comment type and the Comment type */
    parent?: Maybe<CommentToParentCommentConnectionEdge>;
    /** The database id of the parent comment node or null if it is the root comment */
    parentDatabaseId?: Maybe<Scalars['Int']['output']>;
    /** The globally unique identifier of the parent comment node. */
    parentId?: Maybe<Scalars['ID']['output']>;
    /** Connection between the Comment type and the Comment type */
    replies?: Maybe<CommentToCommentConnection>;
    /** The approval status of the comment. This field is equivalent to WP_Comment-&gt;comment_approved and the value matching the &quot;comment_approved&quot; column in SQL. */
    status?: Maybe<CommentStatusEnum>;
    /** Type of comment. This field is equivalent to WP_Comment-&gt;comment_type and the value matching the &quot;comment_type&quot; column in SQL. */
    type?: Maybe<Scalars['String']['output']>;
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']['output']>;
  };

/** A Comment object */
export type CommentContentArgs = {
  format?: InputMaybe<PostObjectFieldFormatEnum>;
};

/** A Comment object */
export type CommentParentArgs = {
  where?: InputMaybe<CommentToParentCommentConnectionWhereArgs>;
};

/** A Comment object */
export type CommentRepliesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CommentToCommentConnectionWhereArgs>;
};

/** A Comment Author object */
export type CommentAuthor = Commenter &
  DatabaseIdentifier &
  Node & {
    __typename?: 'CommentAuthor';
    /** Avatar object for user. The avatar object can be retrieved in different sizes by specifying the size argument. */
    avatar?: Maybe<Avatar>;
    /** The unique identifier stored in the database */
    databaseId: Scalars['Int']['output'];
    /** The email for the comment author */
    email?: Maybe<Scalars['String']['output']>;
    /** The globally unique identifier for the comment author object */
    id: Scalars['ID']['output'];
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']['output']>;
    /** The name for the comment author. */
    name?: Maybe<Scalars['String']['output']>;
    /** The url the comment author. */
    url?: Maybe<Scalars['String']['output']>;
  };

/** A Comment Author object */
export type CommentAuthorAvatarArgs = {
  forceDefault?: InputMaybe<Scalars['Boolean']['input']>;
  rating?: InputMaybe<AvatarRatingEnum>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

/** Connection to Comment Nodes */
export type CommentConnection = {
  /** A list of edges (relational context) between RootQuery and connected Comment Nodes */
  edges: Array<CommentConnectionEdge>;
  /** A list of connected Comment Nodes */
  nodes: Array<Comment>;
  /** Information about pagination in a connection. */
  pageInfo: CommentConnectionPageInfo;
};

/** Edge between a Node and a connected Comment */
export type CommentConnectionEdge = {
  /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The connected Comment Node */
  node: Comment;
};

/** Page Info on the connected CommentConnectionEdge */
export type CommentConnectionPageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The Type of Identifier used to fetch a single comment node. Default is "ID". To be used along with the "id" field. */
export enum CommentNodeIdTypeEnum {
  /** Identify a resource by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  Id = 'ID',
}

/** The status of the comment object. */
export enum CommentStatusEnum {
  /** Comments with the Hyväksytty status */
  Approve = 'APPROVE',
  /** Comments with the Hylätyt status */
  Hold = 'HOLD',
  /** Comments with the Roskaviesti status */
  Spam = 'SPAM',
  /** Comments with the Roskakorissa status */
  Trash = 'TRASH',
}

/** Connection between the Comment type and the Comment type */
export type CommentToCommentConnection = CommentConnection &
  Connection & {
    __typename?: 'CommentToCommentConnection';
    /** Edges for the CommentToCommentConnection connection */
    edges: Array<CommentToCommentConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Comment>;
    /** Information about pagination in a connection. */
    pageInfo: CommentToCommentConnectionPageInfo;
  };

/** An edge in a connection */
export type CommentToCommentConnectionEdge = CommentConnectionEdge &
  Edge & {
    __typename?: 'CommentToCommentConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Comment;
  };

/** Page Info on the &quot;CommentToCommentConnection&quot; */
export type CommentToCommentConnectionPageInfo = CommentConnectionPageInfo &
  PageInfo &
  WpPageInfo & {
    __typename?: 'CommentToCommentConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the CommentToCommentConnection connection */
export type CommentToCommentConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars['String']['input']>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars['String']['input']>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars['String']['input']>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars['ID']['input']>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars['String']['input']>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars['Int']['input']>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars['Int']['input']>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Comment status to limit results by. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars['ID']['input']>;
};

/** Connection between the Comment type and the Commenter type */
export type CommentToCommenterConnectionEdge = CommenterConnectionEdge &
  Edge &
  OneToOneConnection & {
    __typename?: 'CommentToCommenterConnectionEdge';
    /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The node of the connection, without the edges */
    node: Commenter;
  };

/** Connection between the Comment type and the ContentNode type */
export type CommentToContentNodeConnectionEdge = ContentNodeConnectionEdge &
  Edge &
  OneToOneConnection & {
    __typename?: 'CommentToContentNodeConnectionEdge';
    /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The node of the connection, without the edges */
    node: ContentNode;
  };

/** Connection between the Comment type and the Comment type */
export type CommentToParentCommentConnectionEdge = CommentConnectionEdge &
  Edge &
  OneToOneConnection & {
    __typename?: 'CommentToParentCommentConnectionEdge';
    /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The node of the connection, without the edges */
    node: Comment;
  };

/** Arguments for filtering the CommentToParentCommentConnection connection */
export type CommentToParentCommentConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars['String']['input']>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars['String']['input']>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars['String']['input']>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars['ID']['input']>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars['String']['input']>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars['Int']['input']>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars['Int']['input']>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Comment status to limit results by. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars['ID']['input']>;
};

/** The author of a comment */
export type Commenter = {
  /** Avatar object for user. The avatar object can be retrieved in different sizes by specifying the size argument. */
  avatar?: Maybe<Avatar>;
  /** Identifies the primary key from the database. */
  databaseId: Scalars['Int']['output'];
  /** The email address of the author of a comment. */
  email?: Maybe<Scalars['String']['output']>;
  /** The globally unique identifier for the comment author. */
  id: Scalars['ID']['output'];
  /** Whether the author information is considered restricted. (not fully public) */
  isRestricted?: Maybe<Scalars['Boolean']['output']>;
  /** The name of the author of a comment. */
  name?: Maybe<Scalars['String']['output']>;
  /** The url of the author of a comment. */
  url?: Maybe<Scalars['String']['output']>;
};

/** Edge between a Node and a connected Commenter */
export type CommenterConnectionEdge = {
  /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The connected Commenter Node */
  node: Commenter;
};

/** Options for ordering the connection */
export enum CommentsConnectionOrderbyEnum {
  /** Order by browser user agent of the commenter. */
  CommentAgent = 'COMMENT_AGENT',
  /** Order by approval status of the comment. */
  CommentApproved = 'COMMENT_APPROVED',
  /** Order by name of the comment author. */
  CommentAuthor = 'COMMENT_AUTHOR',
  /** Order by e-mail of the comment author. */
  CommentAuthorEmail = 'COMMENT_AUTHOR_EMAIL',
  /** Order by IP address of the comment author. */
  CommentAuthorIp = 'COMMENT_AUTHOR_IP',
  /** Order by URL address of the comment author. */
  CommentAuthorUrl = 'COMMENT_AUTHOR_URL',
  /** Order by the comment contents. */
  CommentContent = 'COMMENT_CONTENT',
  /** Order by date/time timestamp of the comment. */
  CommentDate = 'COMMENT_DATE',
  /** Order by GMT timezone date/time timestamp of the comment. */
  CommentDateGmt = 'COMMENT_DATE_GMT',
  /** Order by the globally unique identifier for the comment object */
  CommentId = 'COMMENT_ID',
  /** Order by the array list of comment IDs listed in the where clause. */
  CommentIn = 'COMMENT_IN',
  /** Order by the comment karma score. */
  CommentKarma = 'COMMENT_KARMA',
  /** Order by the comment parent ID. */
  CommentParent = 'COMMENT_PARENT',
  /** Order by the post object ID. */
  CommentPostId = 'COMMENT_POST_ID',
  /** Order by the the type of comment, such as 'comment', 'pingback', or 'trackback'. */
  CommentType = 'COMMENT_TYPE',
  /** Order by the user ID. */
  UserId = 'USER_ID',
}

/** A plural connection from one Node Type in the Graph to another Node Type, with support for relational data via &quot;edges&quot;. */
export type Connection = {
  /** A list of edges (relational context) between connected nodes */
  edges: Array<Edge>;
  /** A list of connected nodes */
  nodes: Array<Node>;
  /** Information about pagination in a connection. */
  pageInfo: PageInfo;
};

/** The contact type */
export type Contact = ContentNode &
  DatabaseIdentifier &
  Node &
  NodeWithFeaturedImage &
  NodeWithRevisions &
  NodeWithTemplate &
  NodeWithTitle &
  Previewable &
  UniformResourceIdentifiable & {
    __typename?: 'Contact';
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of the databaseId field
     */
    contactId: Scalars['Int']['output'];
    /** Connection between the ContentNode type and the ContentType type */
    contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
    /** The name of the Content Type the node belongs to */
    contentTypeName: Scalars['String']['output'];
    /** The unique identifier stored in the database */
    databaseId: Scalars['Int']['output'];
    /** Post publishing date. */
    date?: Maybe<Scalars['String']['output']>;
    /** The publishing date set in GMT. */
    dateGmt?: Maybe<Scalars['String']['output']>;
    /** Description */
    description?: Maybe<Scalars['String']['output']>;
    /** The desired slug of the post */
    desiredSlug?: Maybe<Scalars['String']['output']>;
    /** If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds */
    editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
    /** The RSS enclosure for the object */
    enclosure?: Maybe<Scalars['String']['output']>;
    /** Connection between the ContentNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<ContentNodeToEnqueuedScriptConnection>;
    /** Connection between the ContentNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<ContentNodeToEnqueuedStylesheetConnection>;
    /** Connection between the NodeWithFeaturedImage type and the MediaItem type */
    featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge>;
    /** The database identifier for the featured image node assigned to the content node */
    featuredImageDatabaseId?: Maybe<Scalars['Int']['output']>;
    /** Globally unique ID of the featured image assigned to the node */
    featuredImageId?: Maybe<Scalars['ID']['output']>;
    /** First name */
    firstName?: Maybe<Scalars['String']['output']>;
    /** The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table. */
    guid?: Maybe<Scalars['String']['output']>;
    /** The globally unique identifier of the contact-cpt object. */
    id: Scalars['ID']['output'];
    /** Whether the node is a Comment */
    isComment: Scalars['Boolean']['output'];
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']['output'];
    /** Whether the node represents the front page. */
    isFrontPage: Scalars['Boolean']['output'];
    /** Whether  the node represents the blog page. */
    isPostsPage: Scalars['Boolean']['output'];
    /** Whether the object is a node in the preview state */
    isPreview?: Maybe<Scalars['Boolean']['output']>;
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']['output']>;
    /** True if the node is a revision of another node */
    isRevision?: Maybe<Scalars['Boolean']['output']>;
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']['output'];
    /** Job Title */
    jobTitle?: Maybe<Scalars['String']['output']>;
    /** Polylang language */
    language?: Maybe<Language>;
    /** The user that most recently edited the node */
    lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
    /** Last name */
    lastName?: Maybe<Scalars['String']['output']>;
    /** The permalink of the post */
    link?: Maybe<Scalars['String']['output']>;
    /** The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time. */
    modified?: Maybe<Scalars['String']['output']>;
    /** The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT. */
    modifiedGmt?: Maybe<Scalars['String']['output']>;
    /** Connection between the Contact type and the contact type */
    preview?: Maybe<ContactToPreviewConnectionEdge>;
    /** The database id of the preview node */
    previewRevisionDatabaseId?: Maybe<Scalars['Int']['output']>;
    /** Whether the object is a node in the preview state */
    previewRevisionId?: Maybe<Scalars['ID']['output']>;
    /** If the current node is a revision, this field exposes the node this is a revision of. Returns null if the node is not a revision of another node. */
    revisionOf?: Maybe<NodeWithRevisionsToContentNodeConnectionEdge>;
    /** Connection between the Contact type and the contact type */
    revisions?: Maybe<ContactToRevisionConnection>;
    /** The SEO Framework data of the contact */
    seo?: Maybe<Seo>;
    /** The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table. */
    slug?: Maybe<Scalars['String']['output']>;
    /** The current status of the object */
    status?: Maybe<Scalars['String']['output']>;
    /** The template assigned to the node */
    template?: Maybe<ContentTemplate>;
    /** The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made. */
    title?: Maybe<Scalars['String']['output']>;
    /** Get specific translation version of this object */
    translation?: Maybe<Contact>;
    /** List all translated versions of this post */
    translations?: Maybe<Array<Maybe<Contact>>>;
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']['output']>;
  };

/** The contact type */
export type ContactEnqueuedScriptsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The contact type */
export type ContactEnqueuedStylesheetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The contact type */
export type ContactRevisionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ContactToRevisionConnectionWhereArgs>;
};

/** The contact type */
export type ContactTitleArgs = {
  format?: InputMaybe<PostObjectFieldFormatEnum>;
};

/** The contact type */
export type ContactTranslationArgs = {
  language: LanguageCodeEnum;
};

/** Connection to contact Nodes */
export type ContactConnection = {
  /** A list of edges (relational context) between RootQuery and connected contact Nodes */
  edges: Array<ContactConnectionEdge>;
  /** A list of connected contact Nodes */
  nodes: Array<Contact>;
  /** Information about pagination in a connection. */
  pageInfo: ContactConnectionPageInfo;
};

/** Edge between a Node and a connected contact */
export type ContactConnectionEdge = {
  /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The connected contact Node */
  node: Contact;
};

/** Page Info on the connected ContactConnectionEdge */
export type ContactConnectionPageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum ContactIdType {
  /** Identify a resource by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  Id = 'ID',
  /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
  Slug = 'SLUG',
  /** Identify a resource by the URI. */
  Uri = 'URI',
}

/** Contact details for a person, legal entity, venue or project */
export type ContactInfo = {
  __typename?: 'ContactInfo';
  contactUrl?: Maybe<Scalars['String']['output']>;
  emailAddresses: Array<Scalars['String']['output']>;
  phoneNumbers: Array<PhoneNumber>;
  postalAddresses: Array<Address>;
};

export enum ContactMedium {
  Asiointi = 'ASIOINTI',
  Email = 'EMAIL',
  MobileNotification = 'MOBILE_NOTIFICATION',
  Sms = 'SMS',
  SmsAndEmail = 'SMS_AND_EMAIL',
}

/** Connection between the Contact type and the contact type */
export type ContactToPreviewConnectionEdge = ContactConnectionEdge &
  Edge &
  OneToOneConnection & {
    __typename?: 'ContactToPreviewConnectionEdge';
    /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The node of the connection, without the edges */
    node: Contact;
  };

/** Connection between the Contact type and the contact type */
export type ContactToRevisionConnection = Connection &
  ContactConnection & {
    __typename?: 'ContactToRevisionConnection';
    /** Edges for the ContactToRevisionConnection connection */
    edges: Array<ContactToRevisionConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Contact>;
    /** Information about pagination in a connection. */
    pageInfo: ContactToRevisionConnectionPageInfo;
  };

/** An edge in a connection */
export type ContactToRevisionConnectionEdge = ContactConnectionEdge &
  Edge & {
    __typename?: 'ContactToRevisionConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Contact;
  };

/** Page Info on the &quot;ContactToRevisionConnection&quot; */
export type ContactToRevisionConnectionPageInfo = ContactConnectionPageInfo &
  PageInfo &
  WpPageInfo & {
    __typename?: 'ContactToRevisionConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the ContactToRevisionConnection connection */
export type ContactToRevisionConnectionWhereArgs = {
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Nodes used to manage content */
export type ContentNode = {
  /** Connection between the ContentNode type and the ContentType type */
  contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
  /** The name of the Content Type the node belongs to */
  contentTypeName: Scalars['String']['output'];
  /** The ID of the node in the database. */
  databaseId: Scalars['Int']['output'];
  /** Post publishing date. */
  date?: Maybe<Scalars['String']['output']>;
  /** The publishing date set in GMT. */
  dateGmt?: Maybe<Scalars['String']['output']>;
  /** The desired slug of the post */
  desiredSlug?: Maybe<Scalars['String']['output']>;
  /** If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds */
  editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
  /** The RSS enclosure for the object */
  enclosure?: Maybe<Scalars['String']['output']>;
  /** Connection between the ContentNode type and the EnqueuedScript type */
  enqueuedScripts?: Maybe<ContentNodeToEnqueuedScriptConnection>;
  /** Connection between the ContentNode type and the EnqueuedStylesheet type */
  enqueuedStylesheets?: Maybe<ContentNodeToEnqueuedStylesheetConnection>;
  /** The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table. */
  guid?: Maybe<Scalars['String']['output']>;
  /** The globally unique ID for the object */
  id: Scalars['ID']['output'];
  /** Whether the node is a Comment */
  isComment: Scalars['Boolean']['output'];
  /** Whether the node is a Content Node */
  isContentNode: Scalars['Boolean']['output'];
  /** Whether the node represents the front page. */
  isFrontPage: Scalars['Boolean']['output'];
  /** Whether  the node represents the blog page. */
  isPostsPage: Scalars['Boolean']['output'];
  /** Whether the object is a node in the preview state */
  isPreview?: Maybe<Scalars['Boolean']['output']>;
  /** Whether the object is restricted from the current viewer */
  isRestricted?: Maybe<Scalars['Boolean']['output']>;
  /** Whether the node is a Term */
  isTermNode: Scalars['Boolean']['output'];
  /** The user that most recently edited the node */
  lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
  /** The permalink of the post */
  link?: Maybe<Scalars['String']['output']>;
  /** The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time. */
  modified?: Maybe<Scalars['String']['output']>;
  /** The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT. */
  modifiedGmt?: Maybe<Scalars['String']['output']>;
  /** The database id of the preview node */
  previewRevisionDatabaseId?: Maybe<Scalars['Int']['output']>;
  /** Whether the object is a node in the preview state */
  previewRevisionId?: Maybe<Scalars['ID']['output']>;
  /** The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table. */
  slug?: Maybe<Scalars['String']['output']>;
  /** The current status of the object */
  status?: Maybe<Scalars['String']['output']>;
  /** The template assigned to a node of content */
  template?: Maybe<ContentTemplate>;
  /** The unique resource identifier path */
  uri?: Maybe<Scalars['String']['output']>;
};

/** Nodes used to manage content */
export type ContentNodeEnqueuedScriptsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** Nodes used to manage content */
export type ContentNodeEnqueuedStylesheetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** Connection to ContentNode Nodes */
export type ContentNodeConnection = {
  /** A list of edges (relational context) between ContentType and connected ContentNode Nodes */
  edges: Array<ContentNodeConnectionEdge>;
  /** A list of connected ContentNode Nodes */
  nodes: Array<ContentNode>;
  /** Information about pagination in a connection. */
  pageInfo: ContentNodeConnectionPageInfo;
};

/** Edge between a Node and a connected ContentNode */
export type ContentNodeConnectionEdge = {
  /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The connected ContentNode Node */
  node: ContentNode;
};

/** Page Info on the connected ContentNodeConnectionEdge */
export type ContentNodeConnectionPageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum ContentNodeIdTypeEnum {
  /** Identify a resource by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  Id = 'ID',
  /** Identify a resource by the URI. */
  Uri = 'URI',
}

/** Connection between the ContentNode type and the ContentType type */
export type ContentNodeToContentTypeConnectionEdge = ContentTypeConnectionEdge &
  Edge &
  OneToOneConnection & {
    __typename?: 'ContentNodeToContentTypeConnectionEdge';
    /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The node of the connection, without the edges */
    node: ContentType;
  };

/** Connection between the ContentNode type and the User type */
export type ContentNodeToEditLastConnectionEdge = Edge &
  OneToOneConnection &
  UserConnectionEdge & {
    __typename?: 'ContentNodeToEditLastConnectionEdge';
    /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The node of the connection, without the edges */
    node: User;
  };

/** Connection between the ContentNode type and the User type */
export type ContentNodeToEditLockConnectionEdge = Edge &
  OneToOneConnection &
  UserConnectionEdge & {
    __typename?: 'ContentNodeToEditLockConnectionEdge';
    /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The timestamp for when the node was last edited */
    lockTimestamp?: Maybe<Scalars['String']['output']>;
    /** The node of the connection, without the edges */
    node: User;
  };

/** Connection between the ContentNode type and the EnqueuedScript type */
export type ContentNodeToEnqueuedScriptConnection = Connection &
  EnqueuedScriptConnection & {
    __typename?: 'ContentNodeToEnqueuedScriptConnection';
    /** Edges for the ContentNodeToEnqueuedScriptConnection connection */
    edges: Array<ContentNodeToEnqueuedScriptConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<EnqueuedScript>;
    /** Information about pagination in a connection. */
    pageInfo: ContentNodeToEnqueuedScriptConnectionPageInfo;
  };

/** An edge in a connection */
export type ContentNodeToEnqueuedScriptConnectionEdge = Edge &
  EnqueuedScriptConnectionEdge & {
    __typename?: 'ContentNodeToEnqueuedScriptConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: EnqueuedScript;
  };

/** Page Info on the &quot;ContentNodeToEnqueuedScriptConnection&quot; */
export type ContentNodeToEnqueuedScriptConnectionPageInfo =
  EnqueuedScriptConnectionPageInfo &
    PageInfo &
    WpPageInfo & {
      __typename?: 'ContentNodeToEnqueuedScriptConnectionPageInfo';
      /** When paginating forwards, the cursor to continue. */
      endCursor?: Maybe<Scalars['String']['output']>;
      /** When paginating forwards, are there more items? */
      hasNextPage: Scalars['Boolean']['output'];
      /** When paginating backwards, are there more items? */
      hasPreviousPage: Scalars['Boolean']['output'];
      /** When paginating backwards, the cursor to continue. */
      startCursor?: Maybe<Scalars['String']['output']>;
    };

/** Connection between the ContentNode type and the EnqueuedStylesheet type */
export type ContentNodeToEnqueuedStylesheetConnection = Connection &
  EnqueuedStylesheetConnection & {
    __typename?: 'ContentNodeToEnqueuedStylesheetConnection';
    /** Edges for the ContentNodeToEnqueuedStylesheetConnection connection */
    edges: Array<ContentNodeToEnqueuedStylesheetConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<EnqueuedStylesheet>;
    /** Information about pagination in a connection. */
    pageInfo: ContentNodeToEnqueuedStylesheetConnectionPageInfo;
  };

/** An edge in a connection */
export type ContentNodeToEnqueuedStylesheetConnectionEdge = Edge &
  EnqueuedStylesheetConnectionEdge & {
    __typename?: 'ContentNodeToEnqueuedStylesheetConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: EnqueuedStylesheet;
  };

/** Page Info on the &quot;ContentNodeToEnqueuedStylesheetConnection&quot; */
export type ContentNodeToEnqueuedStylesheetConnectionPageInfo =
  EnqueuedStylesheetConnectionPageInfo &
    PageInfo &
    WpPageInfo & {
      __typename?: 'ContentNodeToEnqueuedStylesheetConnectionPageInfo';
      /** When paginating forwards, the cursor to continue. */
      endCursor?: Maybe<Scalars['String']['output']>;
      /** When paginating forwards, are there more items? */
      hasNextPage: Scalars['Boolean']['output'];
      /** When paginating backwards, are there more items? */
      hasPreviousPage: Scalars['Boolean']['output'];
      /** When paginating backwards, the cursor to continue. */
      startCursor?: Maybe<Scalars['String']['output']>;
    };

/** The template assigned to a node of content */
export type ContentTemplate = {
  /** The name of the template */
  templateName?: Maybe<Scalars['String']['output']>;
};

/** An Post Type object */
export type ContentType = Node &
  UniformResourceIdentifiable & {
    __typename?: 'ContentType';
    /** Whether this content type should can be exported. */
    canExport?: Maybe<Scalars['Boolean']['output']>;
    /** Connection between the ContentType type and the Taxonomy type */
    connectedTaxonomies?: Maybe<ContentTypeToTaxonomyConnection>;
    /** Connection between the ContentType type and the ContentNode type */
    contentNodes?: Maybe<ContentTypeToContentNodeConnection>;
    /** Whether content of this type should be deleted when the author of it is deleted from the system. */
    deleteWithUser?: Maybe<Scalars['Boolean']['output']>;
    /** Description of the content type. */
    description?: Maybe<Scalars['String']['output']>;
    /** Whether to exclude nodes of this content type from front end search results. */
    excludeFromSearch?: Maybe<Scalars['Boolean']['output']>;
    /** The plural name of the content type within the GraphQL Schema. */
    graphqlPluralName?: Maybe<Scalars['String']['output']>;
    /** The singular name of the content type within the GraphQL Schema. */
    graphqlSingleName?: Maybe<Scalars['String']['output']>;
    /** Whether this content type should have archives. Content archives are generated by type and by date. */
    hasArchive?: Maybe<Scalars['Boolean']['output']>;
    /** Whether the content type is hierarchical, for example pages. */
    hierarchical?: Maybe<Scalars['Boolean']['output']>;
    /** The globally unique identifier of the post-type object. */
    id: Scalars['ID']['output'];
    /** Whether the node is a Comment */
    isComment: Scalars['Boolean']['output'];
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']['output'];
    /** Whether this page is set to the static front page. */
    isFrontPage: Scalars['Boolean']['output'];
    /** Whether this page is set to the blog posts page. */
    isPostsPage: Scalars['Boolean']['output'];
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']['output']>;
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']['output'];
    /** Display name of the content type. */
    label?: Maybe<Scalars['String']['output']>;
    /** Details about the content type labels. */
    labels?: Maybe<PostTypeLabelDetails>;
    /** The name of the icon file to display as a menu icon. */
    menuIcon?: Maybe<Scalars['String']['output']>;
    /** The position of this post type in the menu. Only applies if show_in_menu is true. */
    menuPosition?: Maybe<Scalars['Int']['output']>;
    /** The internal name of the post type. This should not be used for display purposes. */
    name?: Maybe<Scalars['String']['output']>;
    /** Whether a content type is intended for use publicly either via the admin interface or by front-end users. While the default settings of exclude_from_search, publicly_queryable, show_ui, and show_in_nav_menus are inherited from public, each does not rely on this relationship and controls a very specific intention. */
    public?: Maybe<Scalars['Boolean']['output']>;
    /** Whether queries can be performed on the front end for the content type as part of parse_request(). */
    publiclyQueryable?: Maybe<Scalars['Boolean']['output']>;
    /** Name of content type to display in REST API &quot;wp/v2&quot; namespace. */
    restBase?: Maybe<Scalars['String']['output']>;
    /** The REST Controller class assigned to handling this content type. */
    restControllerClass?: Maybe<Scalars['String']['output']>;
    /** Makes this content type available via the admin bar. */
    showInAdminBar?: Maybe<Scalars['Boolean']['output']>;
    /** Whether to add the content type to the GraphQL Schema. */
    showInGraphql?: Maybe<Scalars['Boolean']['output']>;
    /** Where to show the content type in the admin menu. To work, $show_ui must be true. If true, the post type is shown in its own top level menu. If false, no menu is shown. If a string of an existing top level menu (eg. &quot;tools.php&quot; or &quot;edit.php?post_type=page&quot;), the post type will be placed as a sub-menu of that. */
    showInMenu?: Maybe<Scalars['Boolean']['output']>;
    /** Makes this content type available for selection in navigation menus. */
    showInNavMenus?: Maybe<Scalars['Boolean']['output']>;
    /** Whether the content type is associated with a route under the the REST API &quot;wp/v2&quot; namespace. */
    showInRest?: Maybe<Scalars['Boolean']['output']>;
    /** Whether to generate and allow a UI for managing this content type in the admin. */
    showUi?: Maybe<Scalars['Boolean']['output']>;
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']['output']>;
  };

/** An Post Type object */
export type ContentTypeConnectedTaxonomiesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** An Post Type object */
export type ContentTypeContentNodesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ContentTypeToContentNodeConnectionWhereArgs>;
};

/** Connection to ContentType Nodes */
export type ContentTypeConnection = {
  /** A list of edges (relational context) between RootQuery and connected ContentType Nodes */
  edges: Array<ContentTypeConnectionEdge>;
  /** A list of connected ContentType Nodes */
  nodes: Array<ContentType>;
  /** Information about pagination in a connection. */
  pageInfo: ContentTypeConnectionPageInfo;
};

/** Edge between a Node and a connected ContentType */
export type ContentTypeConnectionEdge = {
  /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The connected ContentType Node */
  node: ContentType;
};

/** Page Info on the connected ContentTypeConnectionEdge */
export type ContentTypeConnectionPageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** Allowed Content Types */
export enum ContentTypeEnum {
  /** The Type of Content object */
  Attachment = 'ATTACHMENT',
  /** The Type of Content object */
  CollectionCpt = 'COLLECTION_CPT',
  /** The Type of Content object */
  ContactCpt = 'CONTACT_CPT',
  /** The Type of Content object */
  LandingPageCpt = 'LANDING_PAGE_CPT',
  /** The Type of Content object */
  Page = 'PAGE',
  /** The Type of Content object */
  Post = 'POST',
  /** The Type of Content object */
  ReleaseCpt = 'RELEASE_CPT',
  /** The Type of Content object */
  TranslationCpt = 'TRANSLATION_CPT',
}

/** The Type of Identifier used to fetch a single Content Type node. To be used along with the "id" field. Default is "ID". */
export enum ContentTypeIdTypeEnum {
  /** The globally unique ID */
  Id = 'ID',
  /** The name of the content type. */
  Name = 'NAME',
}

/** Connection between the ContentType type and the ContentNode type */
export type ContentTypeToContentNodeConnection = Connection &
  ContentNodeConnection & {
    __typename?: 'ContentTypeToContentNodeConnection';
    /** Edges for the ContentTypeToContentNodeConnection connection */
    edges: Array<ContentTypeToContentNodeConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<ContentNode>;
    /** Information about pagination in a connection. */
    pageInfo: ContentTypeToContentNodeConnectionPageInfo;
  };

/** An edge in a connection */
export type ContentTypeToContentNodeConnectionEdge = ContentNodeConnectionEdge &
  Edge & {
    __typename?: 'ContentTypeToContentNodeConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: ContentNode;
  };

/** Page Info on the &quot;ContentTypeToContentNodeConnection&quot; */
export type ContentTypeToContentNodeConnectionPageInfo =
  ContentNodeConnectionPageInfo &
    PageInfo &
    WpPageInfo & {
      __typename?: 'ContentTypeToContentNodeConnectionPageInfo';
      /** When paginating forwards, the cursor to continue. */
      endCursor?: Maybe<Scalars['String']['output']>;
      /** When paginating forwards, are there more items? */
      hasNextPage: Scalars['Boolean']['output'];
      /** When paginating backwards, are there more items? */
      hasPreviousPage: Scalars['Boolean']['output'];
      /** When paginating backwards, the cursor to continue. */
      startCursor?: Maybe<Scalars['String']['output']>;
    };

/** Arguments for filtering the ContentTypeToContentNodeConnection connection */
export type ContentTypeToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the ContentType type and the Taxonomy type */
export type ContentTypeToTaxonomyConnection = Connection &
  TaxonomyConnection & {
    __typename?: 'ContentTypeToTaxonomyConnection';
    /** Edges for the ContentTypeToTaxonomyConnection connection */
    edges: Array<ContentTypeToTaxonomyConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Taxonomy>;
    /** Information about pagination in a connection. */
    pageInfo: ContentTypeToTaxonomyConnectionPageInfo;
  };

/** An edge in a connection */
export type ContentTypeToTaxonomyConnectionEdge = Edge &
  TaxonomyConnectionEdge & {
    __typename?: 'ContentTypeToTaxonomyConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Taxonomy;
  };

/** Page Info on the &quot;ContentTypeToTaxonomyConnection&quot; */
export type ContentTypeToTaxonomyConnectionPageInfo = PageInfo &
  TaxonomyConnectionPageInfo &
  WpPageInfo & {
    __typename?: 'ContentTypeToTaxonomyConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Allowed Content Types of the Category taxonomy. */
export enum ContentTypesOfCategoryEnum {
  /** The Type of Content object */
  Post = 'POST',
}

/** Allowed Content Types of the PostFormat taxonomy. */
export enum ContentTypesOfPostFormatEnum {
  /** The Type of Content object */
  Post = 'POST',
}

/** Allowed Content Types of the Tag taxonomy. */
export enum ContentTypesOfTagEnum {
  /** The Type of Content object */
  Post = 'POST',
}

/** Input for the createCategory mutation. */
export type CreateCategoryInput = {
  /** The slug that the category will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the category object */
  description?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<LanguageCodeEnum>;
  /** The name of the category object to mutate */
  name: Scalars['String']['input'];
  /** The ID of the category that should be set as the parent */
  parentId?: InputMaybe<Scalars['ID']['input']>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** The payload for the createCategory mutation. */
export type CreateCategoryPayload = {
  __typename?: 'CreateCategoryPayload';
  /** The created category */
  category?: Maybe<Category>;
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

/** Input for the createCollection mutation. */
export type CreateCollectionInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<LanguageCodeEnum>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars['Int']['input']>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars['String']['input']>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** The title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** The payload for the createCollection mutation. */
export type CreateCollectionPayload = {
  __typename?: 'CreateCollectionPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The Post object mutation type. */
  collection?: Maybe<Collection>;
};

/** Input for the createComment mutation. */
export type CreateCommentInput = {
  /** The approval status of the comment. */
  approved?: InputMaybe<Scalars['String']['input']>;
  /** The name of the comment's author. */
  author?: InputMaybe<Scalars['String']['input']>;
  /** The email of the comment's author. */
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  /** The url of the comment's author. */
  authorUrl?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The database ID of the post object the comment belongs to. */
  commentOn?: InputMaybe<Scalars['Int']['input']>;
  /** Content of the comment. */
  content?: InputMaybe<Scalars['String']['input']>;
  /** The date of the object. Preferable to enter as year/month/day ( e.g. 01/31/2017 ) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']['input']>;
  /** Parent comment ID of current comment. */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** The approval status of the comment */
  status?: InputMaybe<CommentStatusEnum>;
  /** Type of comment. */
  type?: InputMaybe<Scalars['String']['input']>;
};

/** The payload for the createComment mutation. */
export type CreateCommentPayload = {
  __typename?: 'CreateCommentPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The comment that was created */
  comment?: Maybe<Comment>;
  /** Whether the mutation succeeded. If the comment is not approved, the server will not return the comment to a non authenticated user, but a success message can be returned if the create succeeded, and the client can optimistically add the comment to the client cache */
  success?: Maybe<Scalars['Boolean']['output']>;
};

/** Input for the createContact mutation. */
export type CreateContactInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<LanguageCodeEnum>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars['Int']['input']>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars['String']['input']>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** The title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** The payload for the createContact mutation. */
export type CreateContactPayload = {
  __typename?: 'CreateContactPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The Post object mutation type. */
  contact?: Maybe<Contact>;
};

/** Input for the createLandingPage mutation. */
export type CreateLandingPageInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<LanguageCodeEnum>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars['Int']['input']>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars['String']['input']>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** The title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** The payload for the createLandingPage mutation. */
export type CreateLandingPagePayload = {
  __typename?: 'CreateLandingPagePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The Post object mutation type. */
  landingPage?: Maybe<LandingPage>;
};

/** Input for the createMediaItem mutation. */
export type CreateMediaItemInput = {
  /** Alternative text to display when mediaItem is not displayed */
  altText?: InputMaybe<Scalars['String']['input']>;
  /** The userId to assign as the author of the mediaItem */
  authorId?: InputMaybe<Scalars['ID']['input']>;
  /** The caption for the mediaItem */
  caption?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The comment status for the mediaItem */
  commentStatus?: InputMaybe<Scalars['String']['input']>;
  /** The date of the mediaItem */
  date?: InputMaybe<Scalars['String']['input']>;
  /** The date (in GMT zone) of the mediaItem */
  dateGmt?: InputMaybe<Scalars['String']['input']>;
  /** Description of the mediaItem */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The file name of the mediaItem */
  filePath?: InputMaybe<Scalars['String']['input']>;
  /** The file type of the mediaItem */
  fileType?: InputMaybe<MimeTypeEnum>;
  language?: InputMaybe<LanguageCodeEnum>;
  /** The ID of the parent object */
  parentId?: InputMaybe<Scalars['ID']['input']>;
  /** The ping status for the mediaItem */
  pingStatus?: InputMaybe<Scalars['String']['input']>;
  /** The slug of the mediaItem */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The status of the mediaItem */
  status?: InputMaybe<MediaItemStatusEnum>;
  /** The title of the mediaItem */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** The payload for the createMediaItem mutation. */
export type CreateMediaItemPayload = {
  __typename?: 'CreateMediaItemPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The MediaItem object mutation type. */
  mediaItem?: Maybe<MediaItem>;
};

/** Input for the createPage mutation. */
export type CreatePageInput = {
  /** The userId to assign as the author of the object */
  authorId?: InputMaybe<Scalars['ID']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The content of the object */
  content?: InputMaybe<Scalars['String']['input']>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<LanguageCodeEnum>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars['Int']['input']>;
  /** The ID of the parent object */
  parentId?: InputMaybe<Scalars['ID']['input']>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars['String']['input']>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** The title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** The payload for the createPage mutation. */
export type CreatePagePayload = {
  __typename?: 'CreatePagePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The Post object mutation type. */
  page?: Maybe<Page>;
};

/** Input for the createPostFormat mutation. */
export type CreatePostFormatInput = {
  /** The slug that the post_format will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the post_format object */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The name of the post_format object to mutate */
  name: Scalars['String']['input'];
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** The payload for the createPostFormat mutation. */
export type CreatePostFormatPayload = {
  __typename?: 'CreatePostFormatPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The created post_format */
  postFormat?: Maybe<PostFormat>;
};

/** Input for the createPost mutation. */
export type CreatePostInput = {
  /** The userId to assign as the author of the object */
  authorId?: InputMaybe<Scalars['ID']['input']>;
  /** Set connections between the post and categories */
  categories?: InputMaybe<PostCategoriesInput>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The content of the object */
  content?: InputMaybe<Scalars['String']['input']>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<LanguageCodeEnum>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars['Int']['input']>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Set connections between the post and postFormats */
  postFormats?: InputMaybe<PostPostFormatsInput>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** Set connections between the post and tags */
  tags?: InputMaybe<PostTagsInput>;
  /** The title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** The payload for the createPost mutation. */
export type CreatePostPayload = {
  __typename?: 'CreatePostPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The Post object mutation type. */
  post?: Maybe<Post>;
};

/** Input for the createRelease mutation. */
export type CreateReleaseInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The content of the object */
  content?: InputMaybe<Scalars['String']['input']>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<LanguageCodeEnum>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars['Int']['input']>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars['String']['input']>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** The title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** The payload for the createRelease mutation. */
export type CreateReleasePayload = {
  __typename?: 'CreateReleasePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The Post object mutation type. */
  release?: Maybe<Release>;
};

/** Input for the createTag mutation. */
export type CreateTagInput = {
  /** The slug that the post_tag will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the post_tag object */
  description?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<LanguageCodeEnum>;
  /** The name of the post_tag object to mutate */
  name: Scalars['String']['input'];
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** The payload for the createTag mutation. */
export type CreateTagPayload = {
  __typename?: 'CreateTagPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The created post_tag */
  tag?: Maybe<Tag>;
};

/** Input for the createTranslation mutation. */
export type CreateTranslationInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']['input']>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars['Int']['input']>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars['String']['input']>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** The title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** The payload for the createTranslation mutation. */
export type CreateTranslationPayload = {
  __typename?: 'CreateTranslationPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The Post object mutation type. */
  translation?: Maybe<Translation>;
};

/** Input for the createUser mutation. */
export type CreateUserInput = {
  /** User's AOL IM account. */
  aim?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** A string containing content about the user. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** A string that will be shown on the site. Defaults to user's username. It is likely that you will want to change this, for both appearance and security through obscurity (that is if you dont use and delete the default admin user). */
  displayName?: InputMaybe<Scalars['String']['input']>;
  /** A string containing the user's email address. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** 	The user's first name. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** User's Jabber account. */
  jabber?: InputMaybe<Scalars['String']['input']>;
  /** The user's last name. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** User's locale. */
  locale?: InputMaybe<Scalars['String']['input']>;
  /** A string that contains a URL-friendly name for the user. The default is the user's username. */
  nicename?: InputMaybe<Scalars['String']['input']>;
  /** The user's nickname, defaults to the user's username. */
  nickname?: InputMaybe<Scalars['String']['input']>;
  /** A string that contains the plain text password for the user. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** If true, this will refresh the users JWT secret. */
  refreshJwtUserSecret?: InputMaybe<Scalars['Boolean']['input']>;
  /** The date the user registered. Format is Y-m-d H:i:s. */
  registered?: InputMaybe<Scalars['String']['input']>;
  /** If true, this will revoke the users JWT secret. If false, this will unrevoke the JWT secret AND issue a new one. To revoke, the user must have proper capabilities to edit users JWT secrets. */
  revokeJwtUserSecret?: InputMaybe<Scalars['Boolean']['input']>;
  /** A string for whether to enable the rich editor or not. False if not empty. */
  richEditing?: InputMaybe<Scalars['String']['input']>;
  /** An array of roles to be assigned to the user. */
  roles?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** A string that contains the user's username for logging in. */
  username: Scalars['String']['input'];
  /** A string containing the user's URL for the user's web site. */
  websiteUrl?: InputMaybe<Scalars['String']['input']>;
  /** User's Yahoo IM account. */
  yim?: InputMaybe<Scalars['String']['input']>;
};

/** The payload for the createUser mutation. */
export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The User object mutation type. */
  user?: Maybe<User>;
};

/** Object that can be identified with a Database ID */
export type DatabaseIdentifier = {
  /** The unique identifier stored in the database */
  databaseId: Scalars['Int']['output'];
};

/** Date values */
export type DateInput = {
  /** Day of the month (from 1 to 31) */
  day?: InputMaybe<Scalars['Int']['input']>;
  /** Month number (from 1 to 12) */
  month?: InputMaybe<Scalars['Int']['input']>;
  /** 4 digit year (e.g. 2017) */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** Filter the connection based on input */
export type DateQueryInput = {
  /** Nodes should be returned after this date */
  after?: InputMaybe<DateInput>;
  /** Nodes should be returned before this date */
  before?: InputMaybe<DateInput>;
  /** Column to query against */
  column?: InputMaybe<PostObjectsConnectionDateColumnEnum>;
  /** For after/before, whether exact value should be matched or not */
  compare?: InputMaybe<Scalars['String']['input']>;
  /** Day of the month (from 1 to 31) */
  day?: InputMaybe<Scalars['Int']['input']>;
  /** Hour (from 0 to 23) */
  hour?: InputMaybe<Scalars['Int']['input']>;
  /** For after/before, whether exact value should be matched or not */
  inclusive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Minute (from 0 to 59) */
  minute?: InputMaybe<Scalars['Int']['input']>;
  /** Month number (from 1 to 12) */
  month?: InputMaybe<Scalars['Int']['input']>;
  /** OR or AND, how the sub-arrays should be compared */
  relation?: InputMaybe<RelationEnum>;
  /** Second (0 to 59) */
  second?: InputMaybe<Scalars['Int']['input']>;
  /** Week of the year (from 0 to 53) */
  week?: InputMaybe<Scalars['Int']['input']>;
  /** 4 digit year (e.g. 2017) */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** Oletuskuva */
export type DefaultImages = {
  __typename?: 'DefaultImages';
  /** Attachment URL for article image */
  article?: Maybe<Scalars['String']['output']>;
  /** Attachment URL for event image */
  event?: Maybe<Scalars['String']['output']>;
  /** Attachment URL for hero image */
  hero?: Maybe<Scalars['String']['output']>;
  /** Attachment URL for page image */
  page?: Maybe<Scalars['String']['output']>;
};

/** The template assigned to the node */
export type DefaultTemplate = ContentTemplate & {
  __typename?: 'DefaultTemplate';
  /** The name of the template */
  templateName?: Maybe<Scalars['String']['output']>;
};

/** Input for the deleteCategory mutation. */
export type DeleteCategoryInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the category to delete */
  id: Scalars['ID']['input'];
};

/** The payload for the deleteCategory mutation. */
export type DeleteCategoryPayload = {
  __typename?: 'DeleteCategoryPayload';
  /** The deleted term object */
  category?: Maybe<Category>;
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The ID of the deleted object */
  deletedId?: Maybe<Scalars['ID']['output']>;
};

/** Input for the deleteCollection mutation. */
export type DeleteCollectionInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Whether the object should be force deleted instead of being moved to the trash */
  forceDelete?: InputMaybe<Scalars['Boolean']['input']>;
  /** The ID of the collection to delete */
  id: Scalars['ID']['input'];
  /** Override the edit lock when another user is editing the post */
  ignoreEditLock?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The payload for the deleteCollection mutation. */
export type DeleteCollectionPayload = {
  __typename?: 'DeleteCollectionPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The object before it was deleted */
  collection?: Maybe<Collection>;
  /** The ID of the deleted object */
  deletedId?: Maybe<Scalars['ID']['output']>;
};

/** Input for the deleteComment mutation. */
export type DeleteCommentInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Whether the comment should be force deleted instead of being moved to the trash */
  forceDelete?: InputMaybe<Scalars['Boolean']['input']>;
  /** The deleted comment ID */
  id: Scalars['ID']['input'];
};

/** The payload for the deleteComment mutation. */
export type DeleteCommentPayload = {
  __typename?: 'DeleteCommentPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The deleted comment object */
  comment?: Maybe<Comment>;
  /** The deleted comment ID */
  deletedId?: Maybe<Scalars['ID']['output']>;
};

/** Input for the deleteContact mutation. */
export type DeleteContactInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Whether the object should be force deleted instead of being moved to the trash */
  forceDelete?: InputMaybe<Scalars['Boolean']['input']>;
  /** The ID of the contact to delete */
  id: Scalars['ID']['input'];
  /** Override the edit lock when another user is editing the post */
  ignoreEditLock?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The payload for the deleteContact mutation. */
export type DeleteContactPayload = {
  __typename?: 'DeleteContactPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The object before it was deleted */
  contact?: Maybe<Contact>;
  /** The ID of the deleted object */
  deletedId?: Maybe<Scalars['ID']['output']>;
};

/** Input for the deleteLandingPage mutation. */
export type DeleteLandingPageInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Whether the object should be force deleted instead of being moved to the trash */
  forceDelete?: InputMaybe<Scalars['Boolean']['input']>;
  /** The ID of the landingPage to delete */
  id: Scalars['ID']['input'];
  /** Override the edit lock when another user is editing the post */
  ignoreEditLock?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The payload for the deleteLandingPage mutation. */
export type DeleteLandingPagePayload = {
  __typename?: 'DeleteLandingPagePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The ID of the deleted object */
  deletedId?: Maybe<Scalars['ID']['output']>;
  /** The object before it was deleted */
  landingPage?: Maybe<LandingPage>;
};

/** Input for the deleteMediaItem mutation. */
export type DeleteMediaItemInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Whether the mediaItem should be force deleted instead of being moved to the trash */
  forceDelete?: InputMaybe<Scalars['Boolean']['input']>;
  /** The ID of the mediaItem to delete */
  id: Scalars['ID']['input'];
};

/** The payload for the deleteMediaItem mutation. */
export type DeleteMediaItemPayload = {
  __typename?: 'DeleteMediaItemPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The ID of the deleted mediaItem */
  deletedId?: Maybe<Scalars['ID']['output']>;
  /** The mediaItem before it was deleted */
  mediaItem?: Maybe<MediaItem>;
};

/** Input for the deletePage mutation. */
export type DeletePageInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Whether the object should be force deleted instead of being moved to the trash */
  forceDelete?: InputMaybe<Scalars['Boolean']['input']>;
  /** The ID of the page to delete */
  id: Scalars['ID']['input'];
  /** Override the edit lock when another user is editing the post */
  ignoreEditLock?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The payload for the deletePage mutation. */
export type DeletePagePayload = {
  __typename?: 'DeletePagePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The ID of the deleted object */
  deletedId?: Maybe<Scalars['ID']['output']>;
  /** The object before it was deleted */
  page?: Maybe<Page>;
};

/** Input for the deletePostFormat mutation. */
export type DeletePostFormatInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the postFormat to delete */
  id: Scalars['ID']['input'];
};

/** The payload for the deletePostFormat mutation. */
export type DeletePostFormatPayload = {
  __typename?: 'DeletePostFormatPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The ID of the deleted object */
  deletedId?: Maybe<Scalars['ID']['output']>;
  /** The deleted term object */
  postFormat?: Maybe<PostFormat>;
};

/** Input for the deletePost mutation. */
export type DeletePostInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Whether the object should be force deleted instead of being moved to the trash */
  forceDelete?: InputMaybe<Scalars['Boolean']['input']>;
  /** The ID of the post to delete */
  id: Scalars['ID']['input'];
  /** Override the edit lock when another user is editing the post */
  ignoreEditLock?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The payload for the deletePost mutation. */
export type DeletePostPayload = {
  __typename?: 'DeletePostPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The ID of the deleted object */
  deletedId?: Maybe<Scalars['ID']['output']>;
  /** The object before it was deleted */
  post?: Maybe<Post>;
};

/** Input for the deleteRelease mutation. */
export type DeleteReleaseInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Whether the object should be force deleted instead of being moved to the trash */
  forceDelete?: InputMaybe<Scalars['Boolean']['input']>;
  /** The ID of the release to delete */
  id: Scalars['ID']['input'];
  /** Override the edit lock when another user is editing the post */
  ignoreEditLock?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The payload for the deleteRelease mutation. */
export type DeleteReleasePayload = {
  __typename?: 'DeleteReleasePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The ID of the deleted object */
  deletedId?: Maybe<Scalars['ID']['output']>;
  /** The object before it was deleted */
  release?: Maybe<Release>;
};

/** Input for the deleteTag mutation. */
export type DeleteTagInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the tag to delete */
  id: Scalars['ID']['input'];
};

/** The payload for the deleteTag mutation. */
export type DeleteTagPayload = {
  __typename?: 'DeleteTagPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The ID of the deleted object */
  deletedId?: Maybe<Scalars['ID']['output']>;
  /** The deleted term object */
  tag?: Maybe<Tag>;
};

/** Input for the deleteTranslation mutation. */
export type DeleteTranslationInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Whether the object should be force deleted instead of being moved to the trash */
  forceDelete?: InputMaybe<Scalars['Boolean']['input']>;
  /** The ID of the translation to delete */
  id: Scalars['ID']['input'];
  /** Override the edit lock when another user is editing the post */
  ignoreEditLock?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The payload for the deleteTranslation mutation. */
export type DeleteTranslationPayload = {
  __typename?: 'DeleteTranslationPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The ID of the deleted object */
  deletedId?: Maybe<Scalars['ID']['output']>;
  /** The object before it was deleted */
  translation?: Maybe<Translation>;
};

/** Input for the deleteUser mutation. */
export type DeleteUserInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the user you want to delete */
  id: Scalars['ID']['input'];
  /** Reassign posts and links to new User ID. */
  reassignId?: InputMaybe<Scalars['ID']['input']>;
};

/** The payload for the deleteUser mutation. */
export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The ID of the user that you just deleted */
  deletedId?: Maybe<Scalars['ID']['output']>;
  /** The deleted user object */
  user?: Maybe<User>;
};

/**
 * Resources (media) that provide extra description of a resource,
 * facility, event or venue, such as images, videos, info pages, etc.
 */
export type DescriptionResources = {
  __typename?: 'DescriptionResources';
  externalLinks: Array<Scalars['String']['output']>;
  infoUrls: Array<Scalars['String']['output']>;
  mediaResources: Array<MediaResource>;
};

/** The discussion setting type */
export type DiscussionSettings = {
  __typename?: 'DiscussionSettings';
  /** Salli uusien artikkelien kommentointi. */
  defaultCommentStatus?: Maybe<Scalars['String']['output']>;
  /** Salli linkki-ilmoitukset muista blogeista (pingback ja trackback) uusiin artikkeleihin. */
  defaultPingStatus?: Maybe<Scalars['String']['output']>;
};

export type Division = {
  __typename?: 'Division';
  municipality?: Maybe<Scalars['String']['output']>;
  name?: Maybe<LocalizedObject>;
  ocdId?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

/** Relational context between connected nodes */
export type Edge = {
  /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The connected node */
  node: Node;
};

/** Elasticsearch results */
export type ElasticSearchResult = {
  __typename?: 'ElasticSearchResult';
  _shards?: Maybe<Shards>;
  hits?: Maybe<Hits>;
  timed_out?: Maybe<Scalars['Boolean']['output']>;
  took?: Maybe<Scalars['Int']['output']>;
};

/** Asset enqueued by the CMS */
export type EnqueuedAsset = {
  /** The inline code to be run after the asset is loaded. */
  after?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /**
   * Deprecated
   * @deprecated Use `EnqueuedAsset.media` instead.
   */
  args?: Maybe<Scalars['Boolean']['output']>;
  /** The inline code to be run before the asset is loaded. */
  before?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** The HTML conditional comment for the enqueued asset. E.g. IE 6, lte IE 7, etc */
  conditional?: Maybe<Scalars['String']['output']>;
  /** Dependencies needed to use this asset */
  dependencies?: Maybe<Array<Maybe<EnqueuedAsset>>>;
  /**
   * Extra information needed for the script
   * @deprecated Use `EnqueuedScript.extraData` instead.
   */
  extra?: Maybe<Scalars['String']['output']>;
  /** The handle of the enqueued asset */
  handle?: Maybe<Scalars['String']['output']>;
  /** The ID of the enqueued asset */
  id: Scalars['ID']['output'];
  /** The source of the asset */
  src?: Maybe<Scalars['String']['output']>;
  /** The version of the enqueued asset */
  version?: Maybe<Scalars['String']['output']>;
};

/** Script enqueued by the CMS */
export type EnqueuedScript = EnqueuedAsset &
  Node & {
    __typename?: 'EnqueuedScript';
    /** The inline code to be run after the asset is loaded. */
    after?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
    /**
     * Deprecated
     * @deprecated Use `EnqueuedAsset.media` instead.
     */
    args?: Maybe<Scalars['Boolean']['output']>;
    /** The inline code to be run before the asset is loaded. */
    before?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
    /** The HTML conditional comment for the enqueued asset. E.g. IE 6, lte IE 7, etc */
    conditional?: Maybe<Scalars['String']['output']>;
    /** Dependencies needed to use this asset */
    dependencies?: Maybe<Array<Maybe<EnqueuedScript>>>;
    /**
     * Extra information needed for the script
     * @deprecated Use `EnqueuedScript.extraData` instead.
     */
    extra?: Maybe<Scalars['String']['output']>;
    /** Extra data supplied to the enqueued script */
    extraData?: Maybe<Scalars['String']['output']>;
    /** The handle of the enqueued asset */
    handle?: Maybe<Scalars['String']['output']>;
    /** The global ID of the enqueued script */
    id: Scalars['ID']['output'];
    /** The source of the asset */
    src?: Maybe<Scalars['String']['output']>;
    /** The loading strategy to use on the script tag */
    strategy?: Maybe<ScriptLoadingStrategyEnum>;
    /** The version of the enqueued script */
    version?: Maybe<Scalars['String']['output']>;
  };

/** Connection to EnqueuedScript Nodes */
export type EnqueuedScriptConnection = {
  /** A list of edges (relational context) between ContentNode and connected EnqueuedScript Nodes */
  edges: Array<EnqueuedScriptConnectionEdge>;
  /** A list of connected EnqueuedScript Nodes */
  nodes: Array<EnqueuedScript>;
  /** Information about pagination in a connection. */
  pageInfo: EnqueuedScriptConnectionPageInfo;
};

/** Edge between a Node and a connected EnqueuedScript */
export type EnqueuedScriptConnectionEdge = {
  /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The connected EnqueuedScript Node */
  node: EnqueuedScript;
};

/** Page Info on the connected EnqueuedScriptConnectionEdge */
export type EnqueuedScriptConnectionPageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** Stylesheet enqueued by the CMS */
export type EnqueuedStylesheet = EnqueuedAsset &
  Node & {
    __typename?: 'EnqueuedStylesheet';
    /** The inline code to be run after the asset is loaded. */
    after?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
    /**
     * Deprecated
     * @deprecated Use `EnqueuedAsset.media` instead.
     */
    args?: Maybe<Scalars['Boolean']['output']>;
    /** The inline code to be run before the asset is loaded. */
    before?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
    /** The HTML conditional comment for the enqueued asset. E.g. IE 6, lte IE 7, etc */
    conditional?: Maybe<Scalars['String']['output']>;
    /** Dependencies needed to use this asset */
    dependencies?: Maybe<Array<Maybe<EnqueuedStylesheet>>>;
    /**
     * Extra information needed for the script
     * @deprecated Use `EnqueuedScript.extraData` instead.
     */
    extra?: Maybe<Scalars['String']['output']>;
    /** The handle of the enqueued asset */
    handle?: Maybe<Scalars['String']['output']>;
    /** The global ID of the enqueued stylesheet */
    id: Scalars['ID']['output'];
    /** Whether the enqueued style is RTL or not */
    isRtl?: Maybe<Scalars['Boolean']['output']>;
    /** The media attribute to use for the link */
    media?: Maybe<Scalars['String']['output']>;
    /** The absolute path to the enqueued style. Set when the stylesheet is meant to load inline. */
    path?: Maybe<Scalars['String']['output']>;
    /** The `rel` attribute to use for the link */
    rel?: Maybe<Scalars['String']['output']>;
    /** The source of the asset */
    src?: Maybe<Scalars['String']['output']>;
    /** Optional suffix, used in combination with RTL */
    suffix?: Maybe<Scalars['String']['output']>;
    /** The title of the enqueued style. Used for preferred/alternate stylesheets. */
    title?: Maybe<Scalars['String']['output']>;
    /** The version of the enqueued style */
    version?: Maybe<Scalars['String']['output']>;
  };

/** Connection to EnqueuedStylesheet Nodes */
export type EnqueuedStylesheetConnection = {
  /** A list of edges (relational context) between ContentNode and connected EnqueuedStylesheet Nodes */
  edges: Array<EnqueuedStylesheetConnectionEdge>;
  /** A list of connected EnqueuedStylesheet Nodes */
  nodes: Array<EnqueuedStylesheet>;
  /** Information about pagination in a connection. */
  pageInfo: EnqueuedStylesheetConnectionPageInfo;
};

/** Edge between a Node and a connected EnqueuedStylesheet */
export type EnqueuedStylesheetConnectionEdge = {
  /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The connected EnqueuedStylesheet Node */
  node: EnqueuedStylesheet;
};

/** Page Info on the connected EnqueuedStylesheetConnectionEdge */
export type EnqueuedStylesheetConnectionPageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** Information about enrolled participant(s) in an event occurrence */
export type Enrolment = {
  __typename?: 'Enrolment';
  enroller?: Maybe<Person>;
  event?: Maybe<EventOccurrence>;
  extraInformation?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<NodeMeta>;
  overseerCount?: Maybe<Scalars['Int']['output']>;
  overseers?: Maybe<Array<Person>>;
  participantCategory?: Maybe<KeywordString>;
  participantCount: Scalars['Int']['output'];
  participants?: Maybe<Array<Person>>;
  requestedMethodOfNotification?: Maybe<ContactMedium>;
  status?: Maybe<EnrolmentStatus>;
};

/** Rules about who can enroll to an event and how */
export type EnrolmentPolicy = {
  __typename?: 'EnrolmentPolicy';
  allowedParticipantCategories: Array<KeywordString>;
  enrolmentTime?: Maybe<TimeDescription>;
  /** maximum number of people who can enrol together (at the same time) */
  maximumEnrolmentCount?: Maybe<Scalars['Int']['output']>;
  meta?: Maybe<NodeMeta>;
  /** minimum number of people who can enrol together (at the same time) */
  minimumEnrolmentCount?: Maybe<Scalars['Int']['output']>;
  participantMaximumAge: Scalars['Int']['output'];
  participantMinimumAge: Scalars['Int']['output'];
  type: Array<EnrolmentPolicyType>;
};

export enum EnrolmentPolicyType {
  Groups = 'GROUPS',
  GroupsWithSupervisors = 'GROUPS_WITH_SUPERVISORS',
  Individuals = 'INDIVIDUALS',
  NoEnrolmentNeeded = 'NO_ENROLMENT_NEEDED',
}

export enum EnrolmentStatus {
  Cancelled = 'CANCELLED',
  Confirmed = 'CONFIRMED',
  Declined = 'DECLINED',
  Queued = 'QUEUED',
  Requested = 'REQUESTED',
}

/**
 * Request for equipment - if someone needs equipment for a purpose such
 * as organising a volunteering event (as is the case in park cleaning
 * bees), a specification of what is being requested.
 */
export type EquipmentRequest = {
  __typename?: 'EquipmentRequest';
  deliveryLocation?: Maybe<LocationDescription>;
  estimatedAmount?: Maybe<Scalars['Int']['output']>;
  extraInformation: Scalars['String']['output'];
  meta?: Maybe<NodeMeta>;
  requestedEquipment: Scalars['String']['output'];
  requestedForEvent?: Maybe<Event>;
  returnLocation?: Maybe<LocationDescription>;
};

/**
 * An organised event - something that happens at a specific time, has a
 * specific topic or content, and people can participate.  Examples include
 * meetups, concerts, volunteering occasions (or bees), happenings.  This
 * corresponds to Linked events/courses event, beta.kultus
 * PalvelutarjotinEventNode, Kukkuu event.
 */
export type Event = {
  __typename?: 'Event';
  contactPerson?: Maybe<LegalEntity>;
  description?: Maybe<LanguageString>;
  descriptionResources?: Maybe<DescriptionResources>;
  enrolmentPolicy?: Maybe<EnrolmentPolicy>;
  eventDataSource?: Maybe<Scalars['String']['output']>;
  eventLanguages: Array<UnifiedSearchLanguageEnum>;
  keywords: Array<KeywordString>;
  meta?: Maybe<NodeMeta>;
  name?: Maybe<LanguageString>;
  occurrences: Array<EventOccurrence>;
  organiser?: Maybe<LegalEntity>;
  pricing?: Maybe<Array<EventPricing>>;
  published?: Maybe<Scalars['DateTime']['output']>;
  publisher?: Maybe<LegalEntity>;
  shortDescription?: Maybe<Scalars['String']['output']>;
  subEvents: Array<Event>;
  superEvent?: Maybe<Event>;
  targetAudience?: Maybe<Array<KeywordString>>;
};

export type EventDetails = {
  __typename?: 'EventDetails';
  audience: Array<Audience>;
  audienceMaxAge?: Maybe<Scalars['String']['output']>;
  audienceMinAge?: Maybe<Scalars['String']['output']>;
  createdTime?: Maybe<Scalars['String']['output']>;
  customData?: Maybe<Scalars['String']['output']>;
  dataSource?: Maybe<Scalars['String']['output']>;
  datePublished?: Maybe<Scalars['String']['output']>;
  description?: Maybe<LocalizedObject>;
  endTime?: Maybe<Scalars['String']['output']>;
  enrolmentEndTime?: Maybe<Scalars['String']['output']>;
  enrolmentStartTime?: Maybe<Scalars['String']['output']>;
  eventStatus?: Maybe<Scalars['String']['output']>;
  externalLinks: Array<ExternalLink>;
  id: Scalars['ID']['output'];
  images: Array<EventImage>;
  inLanguage: Array<InLanguage>;
  infoUrl?: Maybe<LocalizedObject>;
  internalContext?: Maybe<Scalars['String']['output']>;
  internalId?: Maybe<Scalars['String']['output']>;
  internalType?: Maybe<Scalars['String']['output']>;
  keywords: Array<Keyword>;
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Place>;
  locationExtraInfo?: Maybe<LocalizedObject>;
  maximumAttendeeCapacity?: Maybe<Scalars['Int']['output']>;
  minimumAttendeeCapacity?: Maybe<Scalars['Int']['output']>;
  name: LocalizedObject;
  offers: Array<Offer>;
  provider?: Maybe<LocalizedObject>;
  providerContactInfo?: Maybe<LocalizedObject>;
  publisher?: Maybe<Scalars['ID']['output']>;
  remainingAttendeeCapacity?: Maybe<Scalars['Int']['output']>;
  shortDescription?: Maybe<LocalizedObject>;
  startTime?: Maybe<Scalars['String']['output']>;
  subEvents: Array<InternalIdObject>;
  superEvent?: Maybe<InternalIdObject>;
  superEventType?: Maybe<Scalars['String']['output']>;
  typeId?: Maybe<EventTypeId>;
};

export type EventImage = {
  __typename?: 'EventImage';
  createdTime?: Maybe<Scalars['String']['output']>;
  cropping?: Maybe<Scalars['String']['output']>;
  dataSource?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  internalContext?: Maybe<Scalars['String']['output']>;
  internalId: Scalars['String']['output'];
  internalType?: Maybe<Scalars['String']['output']>;
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  license?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  photographerName?: Maybe<Scalars['String']['output']>;
  publisher?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type EventListResponse = {
  __typename?: 'EventListResponse';
  data: Array<EventDetails>;
  meta: Meta;
};

export type EventOccurrence = {
  __typename?: 'EventOccurrence';
  /** for events where equipment is requested from the City of Helsinki */
  cityEquipmentRequests?: Maybe<Array<EquipmentRequest>>;
  currentlyAvailableParticipantCount?: Maybe<Scalars['Int']['output']>;
  enrolments: Array<Enrolment>;
  /**
   * for information - for example, to guide people who are looking for
   * big or small events, or to give city officials a hint on how much
   * equipment is needed
   */
  estimatedAttendeeCount?: Maybe<Scalars['Int']['output']>;
  happensAt?: Maybe<TimeDescription>;
  location?: Maybe<LocationDescription>;
  maximumAttendeeCount?: Maybe<Scalars['Int']['output']>;
  meta?: Maybe<NodeMeta>;
  minimumAttendeeCount?: Maybe<Scalars['Int']['output']>;
  /** which event this is an occurrence of */
  ofEvent?: Maybe<Event>;
  status?: Maybe<EventOccurrenceStatus>;
};

export enum EventOccurrenceStatus {
  Cancelled = 'CANCELLED',
  Postponed = 'POSTPONED',
  Published = 'PUBLISHED',
  Rescheduled = 'RESCHEDULED',
  Unpublished = 'UNPUBLISHED',
}

/** TODO: improve (a lot) over Linked events' offer type */
export type EventPricing = {
  __typename?: 'EventPricing';
  meta?: Maybe<NodeMeta>;
  todo?: Maybe<Scalars['String']['output']>;
};

/** Collection Module: EventSearch */
export type EventSearch = {
  __typename?: 'EventSearch';
  /** Amount of events listed before &quot;show more -button&quot; */
  initAmountOfEvents?: Maybe<Scalars['Int']['output']>;
  /** Module type */
  module?: Maybe<Scalars['String']['output']>;
  /** List of modules */
  modules?: Maybe<Array<Maybe<CollectionModulesUnionType>>>;
  /**
   * Show all -link, final link is combination of Tapahtuma- ja kurssikarusellin
   *                 hakutulosten osoite -link and search params of the module, for example:
   *                 https://client-url.com/search/?sort=end_time&amp;super_event_type=umbrella,none&amp;language=fi&amp;start=2022-10-29
   */
  showAllLink?: Maybe<Scalars['String']['output']>;
  /** Show all -link */
  showAllLinkCustom?: Maybe<Scalars['String']['output']>;
  /** Module title */
  title?: Maybe<Scalars['String']['output']>;
  /** Search query */
  url?: Maybe<Scalars['String']['output']>;
};

/** Collection Module: EventSearchCarousel */
export type EventSearchCarousel = {
  __typename?: 'EventSearchCarousel';
  /** Amount of cards in carousel */
  amountOfCards?: Maybe<Scalars['Int']['output']>;
  /** Events nearby */
  eventsNearby?: Maybe<Scalars['Boolean']['output']>;
  /** Module type */
  module?: Maybe<Scalars['String']['output']>;
  /** List of modules */
  modules?: Maybe<Array<Maybe<CollectionModulesUnionType>>>;
  /** Events order */
  orderNewestFirst?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Show all -link, final link is combination of Tapahtuma- ja kurssikarusellin
   *                                     hakutulosten osoite -link and search params of the module, for example:
   *                                     https://client-url.com/search/?sort=end_time&amp;super_event_type=umbrella,none&amp;language=fi&amp;start=2022-10-29
   */
  showAllLink?: Maybe<Scalars['String']['output']>;
  /** Show all -link */
  showAllLinkCustom?: Maybe<Scalars['String']['output']>;
  /** Module title */
  title?: Maybe<Scalars['String']['output']>;
  /** Search query */
  url?: Maybe<Scalars['String']['output']>;
};

/** Collection Module: EventSelected */
export type EventSelected = {
  __typename?: 'EventSelected';
  /** List of event IDs */
  events?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Amount of events listed before &quot;show more -button&quot; */
  initAmountOfEvents?: Maybe<Scalars['Int']['output']>;
  /** Module type */
  module?: Maybe<Scalars['String']['output']>;
  /** List of modules */
  modules?: Maybe<Array<Maybe<CollectionModulesUnionType>>>;
  /** Show all -link */
  showAllLink?: Maybe<Scalars['String']['output']>;
  /** Module title */
  title?: Maybe<Scalars['String']['output']>;
};

/** Collection Module: EventSelectedCarousel */
export type EventSelectedCarousel = {
  __typename?: 'EventSelectedCarousel';
  /** Amount of cards in carousel */
  amountOfCards?: Maybe<Scalars['Int']['output']>;
  /** Amount of cards per row */
  amountOfCardsPerRow?: Maybe<Scalars['Int']['output']>;
  /** List of event IDs */
  events?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Events nearby */
  eventsNearby?: Maybe<Scalars['Boolean']['output']>;
  /** Module type */
  module?: Maybe<Scalars['String']['output']>;
  /** List of modules */
  modules?: Maybe<Array<Maybe<CollectionModulesUnionType>>>;
  /** Show all -link */
  showAllLink?: Maybe<Scalars['String']['output']>;
  /** Module title */
  title?: Maybe<Scalars['String']['output']>;
};

export enum EventTypeId {
  Course = 'Course',
  General = 'General',
}

export type ExternalLink = {
  __typename?: 'ExternalLink';
  language?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** Galleriakuva */
export type GalleryImage = {
  __typename?: 'GalleryImage';
  /** Kuvan lainaus */
  caption?: Maybe<Scalars['String']['output']>;
  /** Kuvaus */
  description?: Maybe<Scalars['String']['output']>;
  /** Kuvan (large) URL-osoite */
  large?: Maybe<Scalars['String']['output']>;
  /** Kuvan (medium) URL-osoite */
  medium?: Maybe<Scalars['String']['output']>;
  /** Kuvan (medium large) URL-osoite */
  medium_large?: Maybe<Scalars['String']['output']>;
  /** Kuvan URL-osoite */
  thumbnail?: Maybe<Scalars['String']['output']>;
  /** Kuvan otsikko */
  title?: Maybe<Scalars['String']['output']>;
};

/** The general setting type */
export type GeneralSettings = {
  __typename?: 'GeneralSettings';
  /** Muoto kaikille päivämäärän merkkijonoille. */
  dateFormat?: Maybe<Scalars['String']['output']>;
  /** Sivuston kuvaus. */
  description?: Maybe<Scalars['String']['output']>;
  /** WordPressin kieli- ja maakoodi. */
  language?: Maybe<Scalars['String']['output']>;
  /** Viikonpäivän numero josta viikko alkaa. */
  startOfWeek?: Maybe<Scalars['Int']['output']>;
  /** Muoto kaikille kellonajan merkkijonoille. */
  timeFormat?: Maybe<Scalars['String']['output']>;
  /** Kaupunki samalla aikavyöhykkeellä kuin sinä. */
  timezone?: Maybe<Scalars['String']['output']>;
  /** Sivuston otsikko. */
  title?: Maybe<Scalars['String']['output']>;
  /** Site URL. */
  url?: Maybe<Scalars['String']['output']>;
};

/** CRS object properties. */
export type GeoJsoncrsProperties =
  | GeoJsonLinkedCrsProperties
  | GeoJsonNamedCrsProperties;

/** Enumeration of all GeoJSON CRS object types. */
export enum GeoJsoncrsType {
  Link = 'link',
  Name = 'name',
}

/** Coordinate Reference System (CRS) object. */
export type GeoJsonCoordinateReferenceSystem = {
  __typename?: 'GeoJSONCoordinateReferenceSystem';
  properties: GeoJsoncrsProperties;
  type: GeoJsoncrsType;
};

/** An object that links a geometry to properties in order to provide context. */
export type GeoJsonFeature = GeoJsonInterface & {
  __typename?: 'GeoJSONFeature';
  bbox?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
  crs: GeoJsonCoordinateReferenceSystem;
  geometry?: Maybe<GeoJsonGeometryInterface>;
  id?: Maybe<Scalars['String']['output']>;
  properties?: Maybe<Scalars['JSONObject']['output']>;
  type: GeoJsonType;
};

/** A set of multiple features. */
export type GeoJsonFeatureCollection = GeoJsonInterface & {
  __typename?: 'GeoJSONFeatureCollection';
  bbox?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
  crs: GeoJsonCoordinateReferenceSystem;
  features: Array<GeoJsonFeature>;
  type: GeoJsonType;
};

/** A set of multiple geometries, possibly of various types. */
export type GeoJsonGeometryCollection = GeoJsonInterface & {
  __typename?: 'GeoJSONGeometryCollection';
  bbox?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
  crs: GeoJsonCoordinateReferenceSystem;
  geometries: Array<GeoJsonGeometryInterface>;
  type: GeoJsonType;
};

export type GeoJsonGeometryInterface = {
  bbox?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
  coordinates?: Maybe<Scalars['GeoJSONCoordinates']['output']>;
  crs: GeoJsonCoordinateReferenceSystem;
  type: GeoJsonType;
};

export type GeoJsonInterface = {
  bbox?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
  crs: GeoJsonCoordinateReferenceSystem;
  type: GeoJsonType;
};

/** Object describing a single connected sequence of geographical points. */
export type GeoJsonLineString = GeoJsonGeometryInterface &
  GeoJsonInterface & {
    __typename?: 'GeoJSONLineString';
    bbox?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
    coordinates?: Maybe<Scalars['GeoJSONCoordinates']['output']>;
    crs: GeoJsonCoordinateReferenceSystem;
    type: GeoJsonType;
  };

/** Properties for link based CRS object. */
export type GeoJsonLinkedCrsProperties = {
  __typename?: 'GeoJSONLinkedCRSProperties';
  href: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
};

/** Object describing multiple connected sequences of geographical points. */
export type GeoJsonMultiLineString = GeoJsonGeometryInterface &
  GeoJsonInterface & {
    __typename?: 'GeoJSONMultiLineString';
    bbox?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
    coordinates?: Maybe<Scalars['GeoJSONCoordinates']['output']>;
    crs: GeoJsonCoordinateReferenceSystem;
    type: GeoJsonType;
  };

/** Object describing multiple geographical points. */
export type GeoJsonMultiPoint = GeoJsonGeometryInterface &
  GeoJsonInterface & {
    __typename?: 'GeoJSONMultiPoint';
    bbox?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
    coordinates?: Maybe<Scalars['GeoJSONCoordinates']['output']>;
    crs: GeoJsonCoordinateReferenceSystem;
    type: GeoJsonType;
  };

/** Object describing multiple shapes formed by sets of geographical points. */
export type GeoJsonMultiPolygon = GeoJsonGeometryInterface &
  GeoJsonInterface & {
    __typename?: 'GeoJSONMultiPolygon';
    bbox?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
    coordinates?: Maybe<Scalars['GeoJSONCoordinates']['output']>;
    crs: GeoJsonCoordinateReferenceSystem;
    type: GeoJsonType;
  };

/** Properties for name based CRS object. */
export type GeoJsonNamedCrsProperties = {
  __typename?: 'GeoJSONNamedCRSProperties';
  name: Scalars['String']['output'];
};

/** Object describing a single geographical point. */
export type GeoJsonPoint = GeoJsonGeometryInterface &
  GeoJsonInterface & {
    __typename?: 'GeoJSONPoint';
    bbox?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
    coordinates?: Maybe<Scalars['GeoJSONCoordinates']['output']>;
    crs: GeoJsonCoordinateReferenceSystem;
    type: GeoJsonType;
  };

/** Object describing a single shape formed by a set of geographical points. */
export type GeoJsonPolygon = GeoJsonGeometryInterface &
  GeoJsonInterface & {
    __typename?: 'GeoJSONPolygon';
    bbox?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
    coordinates?: Maybe<Scalars['GeoJSONCoordinates']['output']>;
    crs: GeoJsonCoordinateReferenceSystem;
    type: GeoJsonType;
  };

/** Enumeration of all GeoJSON object types. */
export enum GeoJsonType {
  Feature = 'Feature',
  FeatureCollection = 'FeatureCollection',
  GeometryCollection = 'GeometryCollection',
  LineString = 'LineString',
  MultiLineString = 'MultiLineString',
  MultiPoint = 'MultiPoint',
  MultiPolygon = 'MultiPolygon',
  Point = 'Point',
  Polygon = 'Polygon',
}

/** Hero kenttä */
export type Hero = {
  __typename?: 'Hero';
  /** Hero taustaväri */
  background_color?: Maybe<Scalars['String']['output']>;
  /** Hero taustaväri */
  background_image_url?: Maybe<Scalars['String']['output']>;
  /** Hero sisältö */
  description?: Maybe<Scalars['String']['output']>;
  /** Hero linkin otsikko */
  link?: Maybe<Link>;
  /** Hero otsikko */
  title?: Maybe<Scalars['String']['output']>;
  /** Heron koro */
  wave_motif?: Maybe<Scalars['String']['output']>;
};

/** Content node with hierarchical (parent/child) relationships */
export type HierarchicalContentNode = {
  /** Returns ancestors of the node. Default ordered as lowest (closest to the child) to highest (closest to the root). */
  ancestors?: Maybe<HierarchicalContentNodeToContentNodeAncestorsConnection>;
  /** Connection between the HierarchicalContentNode type and the ContentNode type */
  children?: Maybe<HierarchicalContentNodeToContentNodeChildrenConnection>;
  /** Connection between the ContentNode type and the ContentType type */
  contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
  /** The name of the Content Type the node belongs to */
  contentTypeName: Scalars['String']['output'];
  /** The unique identifier stored in the database */
  databaseId: Scalars['Int']['output'];
  /** Post publishing date. */
  date?: Maybe<Scalars['String']['output']>;
  /** The publishing date set in GMT. */
  dateGmt?: Maybe<Scalars['String']['output']>;
  /** The desired slug of the post */
  desiredSlug?: Maybe<Scalars['String']['output']>;
  /** If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds */
  editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
  /** The RSS enclosure for the object */
  enclosure?: Maybe<Scalars['String']['output']>;
  /** Connection between the ContentNode type and the EnqueuedScript type */
  enqueuedScripts?: Maybe<ContentNodeToEnqueuedScriptConnection>;
  /** Connection between the ContentNode type and the EnqueuedStylesheet type */
  enqueuedStylesheets?: Maybe<ContentNodeToEnqueuedStylesheetConnection>;
  /** The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table. */
  guid?: Maybe<Scalars['String']['output']>;
  /** The globally unique ID for the object */
  id: Scalars['ID']['output'];
  /** Whether the node is a Comment */
  isComment: Scalars['Boolean']['output'];
  /** Whether the node is a Content Node */
  isContentNode: Scalars['Boolean']['output'];
  /** Whether the node represents the front page. */
  isFrontPage: Scalars['Boolean']['output'];
  /** Whether  the node represents the blog page. */
  isPostsPage: Scalars['Boolean']['output'];
  /** Whether the object is a node in the preview state */
  isPreview?: Maybe<Scalars['Boolean']['output']>;
  /** Whether the object is restricted from the current viewer */
  isRestricted?: Maybe<Scalars['Boolean']['output']>;
  /** Whether the node is a Term */
  isTermNode: Scalars['Boolean']['output'];
  /** The user that most recently edited the node */
  lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
  /** The permalink of the post */
  link?: Maybe<Scalars['String']['output']>;
  /** The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time. */
  modified?: Maybe<Scalars['String']['output']>;
  /** The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT. */
  modifiedGmt?: Maybe<Scalars['String']['output']>;
  /** The parent of the node. The parent object can be of various types */
  parent?: Maybe<HierarchicalContentNodeToParentContentNodeConnectionEdge>;
  /** Database id of the parent node */
  parentDatabaseId?: Maybe<Scalars['Int']['output']>;
  /** The globally unique identifier of the parent node. */
  parentId?: Maybe<Scalars['ID']['output']>;
  /** The database id of the preview node */
  previewRevisionDatabaseId?: Maybe<Scalars['Int']['output']>;
  /** Whether the object is a node in the preview state */
  previewRevisionId?: Maybe<Scalars['ID']['output']>;
  /** The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table. */
  slug?: Maybe<Scalars['String']['output']>;
  /** The current status of the object */
  status?: Maybe<Scalars['String']['output']>;
  /** The template assigned to a node of content */
  template?: Maybe<ContentTemplate>;
  /** The unique resource identifier path */
  uri?: Maybe<Scalars['String']['output']>;
};

/** Content node with hierarchical (parent/child) relationships */
export type HierarchicalContentNodeAncestorsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs>;
};

/** Content node with hierarchical (parent/child) relationships */
export type HierarchicalContentNodeChildrenArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs>;
};

/** Content node with hierarchical (parent/child) relationships */
export type HierarchicalContentNodeEnqueuedScriptsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** Content node with hierarchical (parent/child) relationships */
export type HierarchicalContentNodeEnqueuedStylesheetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** Connection between the HierarchicalContentNode type and the ContentNode type */
export type HierarchicalContentNodeToContentNodeAncestorsConnection =
  Connection &
    ContentNodeConnection & {
      __typename?: 'HierarchicalContentNodeToContentNodeAncestorsConnection';
      /** Edges for the HierarchicalContentNodeToContentNodeAncestorsConnection connection */
      edges: Array<HierarchicalContentNodeToContentNodeAncestorsConnectionEdge>;
      /** The nodes of the connection, without the edges */
      nodes: Array<ContentNode>;
      /** Information about pagination in a connection. */
      pageInfo: HierarchicalContentNodeToContentNodeAncestorsConnectionPageInfo;
    };

/** An edge in a connection */
export type HierarchicalContentNodeToContentNodeAncestorsConnectionEdge =
  ContentNodeConnectionEdge &
    Edge & {
      __typename?: 'HierarchicalContentNodeToContentNodeAncestorsConnectionEdge';
      /** A cursor for use in pagination */
      cursor?: Maybe<Scalars['String']['output']>;
      /** The item at the end of the edge */
      node: ContentNode;
    };

/** Page Info on the &quot;HierarchicalContentNodeToContentNodeAncestorsConnection&quot; */
export type HierarchicalContentNodeToContentNodeAncestorsConnectionPageInfo =
  ContentNodeConnectionPageInfo &
    PageInfo &
    WpPageInfo & {
      __typename?: 'HierarchicalContentNodeToContentNodeAncestorsConnectionPageInfo';
      /** When paginating forwards, the cursor to continue. */
      endCursor?: Maybe<Scalars['String']['output']>;
      /** When paginating forwards, are there more items? */
      hasNextPage: Scalars['Boolean']['output'];
      /** When paginating backwards, are there more items? */
      hasPreviousPage: Scalars['Boolean']['output'];
      /** When paginating backwards, the cursor to continue. */
      startCursor?: Maybe<Scalars['String']['output']>;
    };

/** Arguments for filtering the HierarchicalContentNodeToContentNodeAncestorsConnection connection */
export type HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the HierarchicalContentNode type and the ContentNode type */
export type HierarchicalContentNodeToContentNodeChildrenConnection =
  Connection &
    ContentNodeConnection & {
      __typename?: 'HierarchicalContentNodeToContentNodeChildrenConnection';
      /** Edges for the HierarchicalContentNodeToContentNodeChildrenConnection connection */
      edges: Array<HierarchicalContentNodeToContentNodeChildrenConnectionEdge>;
      /** The nodes of the connection, without the edges */
      nodes: Array<ContentNode>;
      /** Information about pagination in a connection. */
      pageInfo: HierarchicalContentNodeToContentNodeChildrenConnectionPageInfo;
    };

/** An edge in a connection */
export type HierarchicalContentNodeToContentNodeChildrenConnectionEdge =
  ContentNodeConnectionEdge &
    Edge & {
      __typename?: 'HierarchicalContentNodeToContentNodeChildrenConnectionEdge';
      /** A cursor for use in pagination */
      cursor?: Maybe<Scalars['String']['output']>;
      /** The item at the end of the edge */
      node: ContentNode;
    };

/** Page Info on the &quot;HierarchicalContentNodeToContentNodeChildrenConnection&quot; */
export type HierarchicalContentNodeToContentNodeChildrenConnectionPageInfo =
  ContentNodeConnectionPageInfo &
    PageInfo &
    WpPageInfo & {
      __typename?: 'HierarchicalContentNodeToContentNodeChildrenConnectionPageInfo';
      /** When paginating forwards, the cursor to continue. */
      endCursor?: Maybe<Scalars['String']['output']>;
      /** When paginating forwards, are there more items? */
      hasNextPage: Scalars['Boolean']['output'];
      /** When paginating backwards, are there more items? */
      hasPreviousPage: Scalars['Boolean']['output'];
      /** When paginating backwards, the cursor to continue. */
      startCursor?: Maybe<Scalars['String']['output']>;
    };

/** Arguments for filtering the HierarchicalContentNodeToContentNodeChildrenConnection connection */
export type HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the HierarchicalContentNode type and the ContentNode type */
export type HierarchicalContentNodeToParentContentNodeConnectionEdge =
  ContentNodeConnectionEdge &
    Edge &
    OneToOneConnection & {
      __typename?: 'HierarchicalContentNodeToParentContentNodeConnectionEdge';
      /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
      cursor?: Maybe<Scalars['String']['output']>;
      /** The node of the connection, without the edges */
      node: ContentNode;
    };

/** Node with hierarchical (parent/child) relationships */
export type HierarchicalNode = {
  /** The unique identifier stored in the database */
  databaseId: Scalars['Int']['output'];
  /** The globally unique ID for the object */
  id: Scalars['ID']['output'];
  /** Database id of the parent node */
  parentDatabaseId?: Maybe<Scalars['Int']['output']>;
  /** The globally unique identifier of the parent node. */
  parentId?: Maybe<Scalars['ID']['output']>;
};

/** Term node with hierarchical (parent/child) relationships */
export type HierarchicalTermNode = {
  /** The number of objects connected to the object */
  count?: Maybe<Scalars['Int']['output']>;
  /** The unique identifier stored in the database */
  databaseId: Scalars['Int']['output'];
  /** The description of the object */
  description?: Maybe<Scalars['String']['output']>;
  /** Connection between the TermNode type and the EnqueuedScript type */
  enqueuedScripts?: Maybe<TermNodeToEnqueuedScriptConnection>;
  /** Connection between the TermNode type and the EnqueuedStylesheet type */
  enqueuedStylesheets?: Maybe<TermNodeToEnqueuedStylesheetConnection>;
  /** The globally unique ID for the object */
  id: Scalars['ID']['output'];
  /** Whether the node is a Comment */
  isComment: Scalars['Boolean']['output'];
  /** Whether the node is a Content Node */
  isContentNode: Scalars['Boolean']['output'];
  /** Whether the node represents the front page. */
  isFrontPage: Scalars['Boolean']['output'];
  /** Whether  the node represents the blog page. */
  isPostsPage: Scalars['Boolean']['output'];
  /** Whether the object is restricted from the current viewer */
  isRestricted?: Maybe<Scalars['Boolean']['output']>;
  /** Whether the node is a Term */
  isTermNode: Scalars['Boolean']['output'];
  /** The link to the term */
  link?: Maybe<Scalars['String']['output']>;
  /** The human friendly name of the object. */
  name?: Maybe<Scalars['String']['output']>;
  /** Database id of the parent node */
  parentDatabaseId?: Maybe<Scalars['Int']['output']>;
  /** The globally unique identifier of the parent node. */
  parentId?: Maybe<Scalars['ID']['output']>;
  /** An alphanumeric identifier for the object unique to its type. */
  slug?: Maybe<Scalars['String']['output']>;
  /** The name of the taxonomy that the object is associated with */
  taxonomyName?: Maybe<Scalars['String']['output']>;
  /** The ID of the term group that this term object belongs to */
  termGroupId?: Maybe<Scalars['Int']['output']>;
  /** The taxonomy ID that the object is associated with */
  termTaxonomyId?: Maybe<Scalars['Int']['output']>;
  /** The unique resource identifier path */
  uri?: Maybe<Scalars['String']['output']>;
};

/** Term node with hierarchical (parent/child) relationships */
export type HierarchicalTermNodeEnqueuedScriptsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** Term node with hierarchical (parent/child) relationships */
export type HierarchicalTermNodeEnqueuedStylesheetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type HitTotal = {
  __typename?: 'HitTotal';
  relation?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

export type Hits = {
  __typename?: 'Hits';
  hits?: Maybe<Array<Maybe<SingleHit>>>;
  max_score?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<HitTotal>;
};

export enum IdentificationStrength {
  /** If the person has authenticated with at least some method */
  Authenticated = 'AUTHENTICATED',
  /** If the person has done some identifiable action such as payment */
  Indirect = 'INDIRECT',
  /** If the person has proved their legal identity */
  LegallyConnected = 'LEGALLY_CONNECTED',
  /** If this person is just a pseudoperson for contacting */
  Nonidentifiable = 'NONIDENTIFIABLE',
  /** If the identity of this person is not known at all */
  Unidentified = 'UNIDENTIFIED',
}

/** Kuva */
export type Image = {
  __typename?: 'Image';
  /** Kuvan lainaus */
  caption?: Maybe<Scalars['String']['output']>;
  /** Kuvaus */
  description?: Maybe<Scalars['String']['output']>;
  /** Kuvan (large) URL-osoite */
  large?: Maybe<Scalars['String']['output']>;
  /** Kuvan (medium) URL-osoite */
  medium?: Maybe<Scalars['String']['output']>;
  /** Kuvan (medium large) URL-osoite */
  medium_large?: Maybe<Scalars['String']['output']>;
  /** Kuvan URL-osoite */
  thumbnail?: Maybe<Scalars['String']['output']>;
  /** Kuvan otsikko */
  title?: Maybe<Scalars['String']['output']>;
};

export type InLanguage = {
  __typename?: 'InLanguage';
  id?: Maybe<Scalars['ID']['output']>;
  internalContext?: Maybe<Scalars['String']['output']>;
  internalId?: Maybe<Scalars['String']['output']>;
  internalType?: Maybe<Scalars['String']['output']>;
  name?: Maybe<LocalizedObject>;
  translationAvailable?: Maybe<Scalars['Boolean']['output']>;
};

export type InternalIdObject = {
  __typename?: 'InternalIdObject';
  internalId?: Maybe<Scalars['String']['output']>;
};

export type Keyword = {
  __typename?: 'Keyword';
  aggregate?: Maybe<Scalars['Boolean']['output']>;
  altLabels?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  createdTime?: Maybe<Scalars['String']['output']>;
  dataSource?: Maybe<Scalars['String']['output']>;
  deprecated?: Maybe<Scalars['Boolean']['output']>;
  hasUpcomingEvents?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<EventImage>;
  internalContext?: Maybe<Scalars['String']['output']>;
  internalId: Scalars['String']['output'];
  internalType?: Maybe<Scalars['String']['output']>;
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  nEvents?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<LocalizedObject>;
  publisher?: Maybe<Scalars['ID']['output']>;
};

export type KeywordListResponse = {
  __typename?: 'KeywordListResponse';
  data: Array<Keyword>;
  meta: Meta;
};

/**
 * TODO: merge all free tags, categories, and keywords
 * KEYWORDS ARE GIVEN FROM events-proxy (https://events-graphql-proxy.test.hel.ninja/proxy/graphql)
 */
export type KeywordString = {
  __typename?: 'KeywordString';
  name: Scalars['String']['output'];
};

/** The landingPage type */
export type LandingPage = ContentNode &
  DatabaseIdentifier &
  Node &
  NodeWithRevisions &
  NodeWithTemplate &
  NodeWithTitle &
  Previewable &
  UniformResourceIdentifiable & {
    __typename?: 'LandingPage';
    /** Background Color */
    backgroundColor?: Maybe<Scalars['String']['output']>;
    /** Box Color */
    boxColor?: Maybe<Scalars['String']['output']>;
    /** Connection between the ContentNode type and the ContentType type */
    contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
    /** The name of the Content Type the node belongs to */
    contentTypeName: Scalars['String']['output'];
    /** The unique identifier stored in the database */
    databaseId: Scalars['Int']['output'];
    /** Post publishing date. */
    date?: Maybe<Scalars['String']['output']>;
    /** The publishing date set in GMT. */
    dateGmt?: Maybe<Scalars['String']['output']>;
    /** Description */
    description?: Maybe<Scalars['String']['output']>;
    /** The desired slug of the post */
    desiredSlug?: Maybe<Scalars['String']['output']>;
    /** Desktop Image */
    desktopImage?: Maybe<LandingPageToMediaItemConnection>;
    /** If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds */
    editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
    /** The RSS enclosure for the object */
    enclosure?: Maybe<Scalars['String']['output']>;
    /** Connection between the ContentNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<ContentNodeToEnqueuedScriptConnection>;
    /** Connection between the ContentNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<ContentNodeToEnqueuedStylesheetConnection>;
    /** Float Image */
    floatImage?: Maybe<LandingPageToFloatImageConnection>;
    /** The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table. */
    guid?: Maybe<Scalars['String']['output']>;
    /** Link */
    heroLink?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
    /** The globally unique identifier of the landing-page-cpt object. */
    id: Scalars['ID']['output'];
    /** Whether the node is a Comment */
    isComment: Scalars['Boolean']['output'];
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']['output'];
    /** Whether the node represents the front page. */
    isFrontPage: Scalars['Boolean']['output'];
    /** Whether  the node represents the blog page. */
    isPostsPage: Scalars['Boolean']['output'];
    /** Whether the object is a node in the preview state */
    isPreview?: Maybe<Scalars['Boolean']['output']>;
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']['output']>;
    /** True if the node is a revision of another node */
    isRevision?: Maybe<Scalars['Boolean']['output']>;
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']['output'];
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of the databaseId field
     */
    landingPageId: Scalars['Int']['output'];
    /** Polylang language */
    language?: Maybe<Language>;
    /** The user that most recently edited the node */
    lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
    /** The permalink of the post */
    link?: Maybe<Scalars['String']['output']>;
    /** Mobile Image */
    mobileImage?: Maybe<LandingPageToMobileImageConnection>;
    /** The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time. */
    modified?: Maybe<Scalars['String']['output']>;
    /** The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT. */
    modifiedGmt?: Maybe<Scalars['String']['output']>;
    /** List of modules */
    modules?: Maybe<Array<Maybe<CollectionModulesUnionType>>>;
    /** Connection between the LandingPage type and the landingPage type */
    preview?: Maybe<LandingPageToPreviewConnectionEdge>;
    /** The database id of the preview node */
    previewRevisionDatabaseId?: Maybe<Scalars['Int']['output']>;
    /** Whether the object is a node in the preview state */
    previewRevisionId?: Maybe<Scalars['ID']['output']>;
    /** If the current node is a revision, this field exposes the node this is a revision of. Returns null if the node is not a revision of another node. */
    revisionOf?: Maybe<NodeWithRevisionsToContentNodeConnectionEdge>;
    /** Connection between the LandingPage type and the landingPage type */
    revisions?: Maybe<LandingPageToRevisionConnection>;
    /** The SEO Framework data of the landingPage */
    seo?: Maybe<Seo>;
    /** The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table. */
    slug?: Maybe<Scalars['String']['output']>;
    /** The current status of the object */
    status?: Maybe<Scalars['String']['output']>;
    /** The template assigned to the node */
    template?: Maybe<ContentTemplate>;
    /** The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made. */
    title?: Maybe<Scalars['String']['output']>;
    /** Get specific translation version of this object */
    translation?: Maybe<LandingPage>;
    /** List all translated versions of this post */
    translations?: Maybe<Array<Maybe<LandingPage>>>;
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']['output']>;
  };

/** The landingPage type */
export type LandingPageDesktopImageArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LandingPageToMediaItemConnectionWhereArgs>;
};

/** The landingPage type */
export type LandingPageEnqueuedScriptsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The landingPage type */
export type LandingPageEnqueuedStylesheetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The landingPage type */
export type LandingPageFloatImageArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LandingPageToFloatImageConnectionWhereArgs>;
};

/** The landingPage type */
export type LandingPageMobileImageArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LandingPageToMobileImageConnectionWhereArgs>;
};

/** The landingPage type */
export type LandingPageRevisionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LandingPageToRevisionConnectionWhereArgs>;
};

/** The landingPage type */
export type LandingPageTitleArgs = {
  format?: InputMaybe<PostObjectFieldFormatEnum>;
};

/** The landingPage type */
export type LandingPageTranslationArgs = {
  language: LanguageCodeEnum;
};

/** Connection to landingPage Nodes */
export type LandingPageConnection = {
  /** A list of edges (relational context) between RootQuery and connected landingPage Nodes */
  edges: Array<LandingPageConnectionEdge>;
  /** A list of connected landingPage Nodes */
  nodes: Array<LandingPage>;
  /** Information about pagination in a connection. */
  pageInfo: LandingPageConnectionPageInfo;
};

/** Edge between a Node and a connected landingPage */
export type LandingPageConnectionEdge = {
  /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The connected landingPage Node */
  node: LandingPage;
};

/** Page Info on the connected LandingPageConnectionEdge */
export type LandingPageConnectionPageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum LandingPageIdType {
  /** Identify a resource by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  Id = 'ID',
  /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
  Slug = 'SLUG',
  /** Identify a resource by the URI. */
  Uri = 'URI',
}

/** Connection between the landingPage type and the MediaItem type */
export type LandingPageToFloatImageConnection = Connection &
  MediaItemConnection & {
    __typename?: 'LandingPageToFloatImageConnection';
    /** Edges for the LandingPageToFloatImageConnection connection */
    edges: Array<LandingPageToFloatImageConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<MediaItem>;
    /** Information about pagination in a connection. */
    pageInfo: LandingPageToFloatImageConnectionPageInfo;
  };

/** An edge in a connection */
export type LandingPageToFloatImageConnectionEdge = Edge &
  MediaItemConnectionEdge & {
    __typename?: 'LandingPageToFloatImageConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: MediaItem;
  };

/** Page Info on the &quot;LandingPageToFloatImageConnection&quot; */
export type LandingPageToFloatImageConnectionPageInfo =
  MediaItemConnectionPageInfo &
    PageInfo &
    WpPageInfo & {
      __typename?: 'LandingPageToFloatImageConnectionPageInfo';
      /** When paginating forwards, the cursor to continue. */
      endCursor?: Maybe<Scalars['String']['output']>;
      /** When paginating forwards, are there more items? */
      hasNextPage: Scalars['Boolean']['output'];
      /** When paginating backwards, are there more items? */
      hasPreviousPage: Scalars['Boolean']['output'];
      /** When paginating backwards, the cursor to continue. */
      startCursor?: Maybe<Scalars['String']['output']>;
    };

/** Arguments for filtering the LandingPageToFloatImageConnection connection */
export type LandingPageToFloatImageConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the landingPage type and the MediaItem type */
export type LandingPageToMediaItemConnection = Connection &
  MediaItemConnection & {
    __typename?: 'LandingPageToMediaItemConnection';
    /** Edges for the LandingPageToMediaItemConnection connection */
    edges: Array<LandingPageToMediaItemConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<MediaItem>;
    /** Information about pagination in a connection. */
    pageInfo: LandingPageToMediaItemConnectionPageInfo;
  };

/** An edge in a connection */
export type LandingPageToMediaItemConnectionEdge = Edge &
  MediaItemConnectionEdge & {
    __typename?: 'LandingPageToMediaItemConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: MediaItem;
  };

/** Page Info on the &quot;LandingPageToMediaItemConnection&quot; */
export type LandingPageToMediaItemConnectionPageInfo =
  MediaItemConnectionPageInfo &
    PageInfo &
    WpPageInfo & {
      __typename?: 'LandingPageToMediaItemConnectionPageInfo';
      /** When paginating forwards, the cursor to continue. */
      endCursor?: Maybe<Scalars['String']['output']>;
      /** When paginating forwards, are there more items? */
      hasNextPage: Scalars['Boolean']['output'];
      /** When paginating backwards, are there more items? */
      hasPreviousPage: Scalars['Boolean']['output'];
      /** When paginating backwards, the cursor to continue. */
      startCursor?: Maybe<Scalars['String']['output']>;
    };

/** Arguments for filtering the LandingPageToMediaItemConnection connection */
export type LandingPageToMediaItemConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the landingPage type and the MediaItem type */
export type LandingPageToMobileImageConnection = Connection &
  MediaItemConnection & {
    __typename?: 'LandingPageToMobileImageConnection';
    /** Edges for the LandingPageToMobileImageConnection connection */
    edges: Array<LandingPageToMobileImageConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<MediaItem>;
    /** Information about pagination in a connection. */
    pageInfo: LandingPageToMobileImageConnectionPageInfo;
  };

/** An edge in a connection */
export type LandingPageToMobileImageConnectionEdge = Edge &
  MediaItemConnectionEdge & {
    __typename?: 'LandingPageToMobileImageConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: MediaItem;
  };

/** Page Info on the &quot;LandingPageToMobileImageConnection&quot; */
export type LandingPageToMobileImageConnectionPageInfo =
  MediaItemConnectionPageInfo &
    PageInfo &
    WpPageInfo & {
      __typename?: 'LandingPageToMobileImageConnectionPageInfo';
      /** When paginating forwards, the cursor to continue. */
      endCursor?: Maybe<Scalars['String']['output']>;
      /** When paginating forwards, are there more items? */
      hasNextPage: Scalars['Boolean']['output'];
      /** When paginating backwards, are there more items? */
      hasPreviousPage: Scalars['Boolean']['output'];
      /** When paginating backwards, the cursor to continue. */
      startCursor?: Maybe<Scalars['String']['output']>;
    };

/** Arguments for filtering the LandingPageToMobileImageConnection connection */
export type LandingPageToMobileImageConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the LandingPage type and the landingPage type */
export type LandingPageToPreviewConnectionEdge = Edge &
  LandingPageConnectionEdge &
  OneToOneConnection & {
    __typename?: 'LandingPageToPreviewConnectionEdge';
    /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The node of the connection, without the edges */
    node: LandingPage;
  };

/** Connection between the LandingPage type and the landingPage type */
export type LandingPageToRevisionConnection = Connection &
  LandingPageConnection & {
    __typename?: 'LandingPageToRevisionConnection';
    /** Edges for the LandingPageToRevisionConnection connection */
    edges: Array<LandingPageToRevisionConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<LandingPage>;
    /** Information about pagination in a connection. */
    pageInfo: LandingPageToRevisionConnectionPageInfo;
  };

/** An edge in a connection */
export type LandingPageToRevisionConnectionEdge = Edge &
  LandingPageConnectionEdge & {
    __typename?: 'LandingPageToRevisionConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: LandingPage;
  };

/** Page Info on the &quot;LandingPageToRevisionConnection&quot; */
export type LandingPageToRevisionConnectionPageInfo =
  LandingPageConnectionPageInfo &
    PageInfo &
    WpPageInfo & {
      __typename?: 'LandingPageToRevisionConnectionPageInfo';
      /** When paginating forwards, the cursor to continue. */
      endCursor?: Maybe<Scalars['String']['output']>;
      /** When paginating forwards, are there more items? */
      hasNextPage: Scalars['Boolean']['output'];
      /** When paginating backwards, are there more items? */
      hasPreviousPage: Scalars['Boolean']['output'];
      /** When paginating backwards, the cursor to continue. */
      startCursor?: Maybe<Scalars['String']['output']>;
    };

/** Arguments for filtering the LandingPageToRevisionConnection connection */
export type LandingPageToRevisionConnectionWhereArgs = {
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Language (Polylang) */
export type Language = {
  __typename?: 'Language';
  /** Language code (Polylang) */
  code?: Maybe<LanguageCodeEnum>;
  /** Language term front page URL */
  homeUrl?: Maybe<Scalars['String']['output']>;
  /** Language ID (Polylang) */
  id: Scalars['ID']['output'];
  /** Language locale (Polylang) */
  locale?: Maybe<Scalars['String']['output']>;
  /** Human readable language name (Polylang) */
  name?: Maybe<Scalars['String']['output']>;
  /** Language term slug. Prefer the &quot;code&quot; field if possible (Polylang) */
  slug?: Maybe<Scalars['String']['output']>;
};

/** Enum of all available language codes */
export enum LanguageCodeEnum {
  En = 'EN',
  Fi = 'FI',
  Sv = 'SV',
}

/** Filter item by specific language, default language or list all languages */
export enum LanguageCodeFilterEnum {
  All = 'ALL',
  Default = 'DEFAULT',
  En = 'EN',
  Fi = 'FI',
  Sv = 'SV',
}

/** TODO: convert all String's to LanguageString's if linguistic content */
export type LanguageString = {
  __typename?: 'LanguageString';
  en?: Maybe<Scalars['String']['output']>;
  fi?: Maybe<Scalars['String']['output']>;
  sv?: Maybe<Scalars['String']['output']>;
};

/** Layout: LayoutArticleHighlights */
export type LayoutArticleHighlights = {
  __typename?: 'LayoutArticleHighlights';
  /** Anchor */
  anchor?: Maybe<Scalars['String']['output']>;
  /** Articles */
  articles?: Maybe<Array<Maybe<Post>>>;
  /** Background Color */
  backgroundColor?: Maybe<Scalars['String']['output']>;
  /** Category */
  category?: Maybe<Scalars['Int']['output']>;
  /** Amount of articles to list */
  limit?: Maybe<Scalars['Int']['output']>;
  /** Show more link */
  showMore?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Tag */
  tag?: Maybe<Scalars['Int']['output']>;
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
};

/** Layout: LayoutArticles */
export type LayoutArticles = {
  __typename?: 'LayoutArticles';
  /** Anchor */
  anchor?: Maybe<Scalars['String']['output']>;
  /** Articles */
  articles?: Maybe<Array<Maybe<Post>>>;
  /** Background Color */
  backgroundColor?: Maybe<Scalars['String']['output']>;
  /** Category */
  category?: Maybe<Scalars['Int']['output']>;
  /** Tag */
  limit?: Maybe<Scalars['Int']['output']>;
  /** Show all -link */
  showAllLink?: Maybe<Scalars['String']['output']>;
  /** Tag */
  tag?: Maybe<Scalars['Int']['output']>;
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
};

/** Layout: LayoutArticlesCarousel */
export type LayoutArticlesCarousel = {
  __typename?: 'LayoutArticlesCarousel';
  /** Anchor */
  anchor?: Maybe<Scalars['String']['output']>;
  /** Articles */
  articles?: Maybe<Array<Maybe<Post>>>;
  /** Background Color */
  backgroundColor?: Maybe<Scalars['String']['output']>;
  /** Category */
  category?: Maybe<Scalars['Int']['output']>;
  /** Amount of articles to list */
  limit?: Maybe<Scalars['Int']['output']>;
  /** Show all -link */
  showAllLink?: Maybe<Scalars['String']['output']>;
  /** Show more link */
  showMore?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Tag */
  tag?: Maybe<Scalars['Int']['output']>;
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
};

/** Layout: LayoutCard */
export type LayoutCard = {
  __typename?: 'LayoutCard';
  /** Tasaus */
  alignment?: Maybe<Scalars['String']['output']>;
  /** Taustaväri */
  backgroundColor?: Maybe<Scalars['String']['output']>;
  /** Kuvaus */
  description?: Maybe<Scalars['String']['output']>;
  /** Kuva */
  image?: Maybe<Image>;
  /** Linkki */
  link?: Maybe<Link>;
  /** Sivuston otsikko */
  title?: Maybe<Scalars['String']['output']>;
};

/** Layout: LayoutCards */
export type LayoutCards = {
  __typename?: 'LayoutCards';
  /** Ikoni kortti */
  cards?: Maybe<Array<Maybe<Card>>>;
};

/** Layout: LayoutCollection */
export type LayoutCollection = {
  __typename?: 'LayoutCollection';
  /** Collection */
  collection?: Maybe<Collection>;
};

/** Layout: LayoutContact */
export type LayoutContact = {
  __typename?: 'LayoutContact';
  /** Contacts */
  contacts?: Maybe<Array<Maybe<Contact>>>;
  /** Description */
  description?: Maybe<Scalars['String']['output']>;
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
};

/** Layout: LayoutContent */
export type LayoutContent = {
  __typename?: 'LayoutContent';
  /** Taustaväri */
  backgroundColor?: Maybe<Scalars['String']['output']>;
  /** Sivuston otsikko */
  content?: Maybe<Scalars['String']['output']>;
  /** Sivuston otsikko */
  title?: Maybe<Scalars['String']['output']>;
};

/** Layout: LayoutImage */
export type LayoutImage = {
  __typename?: 'LayoutImage';
  /** Reunus */
  border?: Maybe<Scalars['Boolean']['output']>;
  /** Kuva */
  image?: Maybe<Image>;
  /** Valokuvaajan nimi (ylikirjoitus) */
  photographer_name?: Maybe<Scalars['String']['output']>;
  /** Näytä lighboxissa */
  show_on_lightbox?: Maybe<Scalars['Boolean']['output']>;
};

/** Layout: LayoutImageGallery */
export type LayoutImageGallery = {
  __typename?: 'LayoutImageGallery';
  /** Galleria */
  gallery?: Maybe<Array<Maybe<GalleryImage>>>;
};

/** Layout: LayoutLinkList */
export type LayoutLinkList = {
  __typename?: 'LayoutLinkList';
  /** Ankkuri */
  anchor?: Maybe<Scalars['String']['output']>;
  /** Taustaväri */
  backgroundColor?: Maybe<Scalars['String']['output']>;
  /** Sivuston otsikko */
  description?: Maybe<Scalars['String']['output']>;
  /** Linkit */
  links?: Maybe<Array<Maybe<Link>>>;
  /** Sivuston otsikko */
  title?: Maybe<Scalars['String']['output']>;
};

/** Layout: LayoutPages */
export type LayoutPages = {
  __typename?: 'LayoutPages';
  /** Anchor */
  anchor?: Maybe<Scalars['String']['output']>;
  /** Background Color */
  backgroundColor?: Maybe<Scalars['String']['output']>;
  /** Description */
  description?: Maybe<Scalars['String']['output']>;
  /** Pages */
  pages?: Maybe<Array<Maybe<Page>>>;
  /** Show all -link */
  showAllLink?: Maybe<Scalars['String']['output']>;
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
};

/** Layout: LayoutPagesCarousel */
export type LayoutPagesCarousel = {
  __typename?: 'LayoutPagesCarousel';
  /** Anchor */
  anchor?: Maybe<Scalars['String']['output']>;
  /** Background Color */
  backgroundColor?: Maybe<Scalars['String']['output']>;
  /** Description */
  description?: Maybe<Scalars['String']['output']>;
  /** Pages */
  pages?: Maybe<Array<Maybe<Page>>>;
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
};

/** Layout: LayoutSocialMediaFeed */
export type LayoutSocialMediaFeed = {
  __typename?: 'LayoutSocialMediaFeed';
  /** Anchor */
  anchor?: Maybe<Scalars['String']['output']>;
  /** Script */
  script?: Maybe<Scalars['String']['output']>;
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
};

/** Layout: LayoutSteps */
export type LayoutSteps = {
  __typename?: 'LayoutSteps';
  /** Väri */
  color?: Maybe<Scalars['String']['output']>;
  /** Kuvaus */
  description?: Maybe<Scalars['String']['output']>;
  /** Vaiheistus */
  steps?: Maybe<Array<Maybe<Step>>>;
  /** Sivuston otsikko */
  title?: Maybe<Scalars['String']['output']>;
  /** Tyyppi */
  type?: Maybe<Scalars['String']['output']>;
};

export type LegalEntity = Organisation | Person;

/** Linkin kenttä */
export type Link = {
  __typename?: 'Link';
  /** Linkin kohde */
  target?: Maybe<Scalars['String']['output']>;
  /** Linkin otsikko */
  title?: Maybe<Scalars['String']['output']>;
  /** Linkin URL osoite */
  url?: Maybe<Scalars['String']['output']>;
};

export type LinkedeventsPlace = {
  __typename?: 'LinkedeventsPlace';
  _at_context?: Maybe<Scalars['String']['output']>;
  _at_id?: Maybe<Scalars['String']['output']>;
  _at_type?: Maybe<Scalars['String']['output']>;
  address_country?: Maybe<Scalars['String']['output']>;
  address_locality?: Maybe<LinkedeventsPlaceLocalityString>;
  address_region?: Maybe<Scalars['String']['output']>;
  contact_type?: Maybe<Scalars['String']['output']>;
  created_time?: Maybe<Scalars['String']['output']>;
  custom_data?: Maybe<Scalars['String']['output']>;
  data_source?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<LinkedeventsPlaceLocalityString>;
  divisions?: Maybe<Array<Maybe<LinkedeventsPlaceDivision>>>;
  email?: Maybe<Scalars['String']['output']>;
  has_upcoming_events?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  info_url?: Maybe<LinkedeventsPlaceLocalityString>;
  last_modified_time?: Maybe<Scalars['String']['output']>;
  n_events?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<LinkedeventsPlaceLocalityString>;
  /** Raw Linkedevents Place fields */
  origin?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Scalars['String']['output']>;
  position?: Maybe<LinkedeventsPlacePosition>;
  post_office_box_num?: Maybe<Scalars['String']['output']>;
  postal_code?: Maybe<Scalars['String']['output']>;
  publisher?: Maybe<Scalars['String']['output']>;
  replaced_by?: Maybe<Scalars['String']['output']>;
  street_address?: Maybe<LinkedeventsPlaceLocalityString>;
  telephone?: Maybe<Scalars['String']['output']>;
};

export type LinkedeventsPlaceDivision = {
  __typename?: 'LinkedeventsPlaceDivision';
  municipality?: Maybe<Scalars['String']['output']>;
  name?: Maybe<LinkedeventsPlaceLocalityString>;
  ocd_id?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type LinkedeventsPlaceLocalityString = {
  __typename?: 'LinkedeventsPlaceLocalityString';
  en?: Maybe<Scalars['String']['output']>;
  fi?: Maybe<Scalars['String']['output']>;
  sv?: Maybe<Scalars['String']['output']>;
};

export type LinkedeventsPlacePosition = {
  __typename?: 'LinkedeventsPlacePosition';
  coordinates?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type LocalizedCmsImage = {
  __typename?: 'LocalizedCmsImage';
  en?: Maybe<CmsImage>;
  fi?: Maybe<CmsImage>;
  sv?: Maybe<CmsImage>;
};

export type LocalizedCmsKeywords = {
  __typename?: 'LocalizedCmsKeywords';
  en?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  fi?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  sv?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type LocalizedObject = {
  __typename?: 'LocalizedObject';
  en?: Maybe<Scalars['String']['output']>;
  fi?: Maybe<Scalars['String']['output']>;
  sv?: Maybe<Scalars['String']['output']>;
};

/** Free-form location, not necessarily at a know venue. */
export type LocationDescription = {
  __typename?: 'LocationDescription';
  address?: Maybe<Address>;
  administrativeDivisions?: Maybe<Array<Maybe<AdministrativeDivision>>>;
  explanation?: Maybe<Scalars['String']['output']>;
  geoLocation?: Maybe<GeoJsonFeature>;
  url?: Maybe<LanguageString>;
  venue?: Maybe<UnifiedSearchVenue>;
};

export type LocationImage = {
  __typename?: 'LocationImage';
  caption?: Maybe<LanguageString>;
  url?: Maybe<Scalars['String']['output']>;
};

/** Collection Module: LocationsSelected */
export type LocationsSelected = {
  __typename?: 'LocationsSelected';
  /** List of location IDs */
  locations?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  /** Module type */
  module?: Maybe<Scalars['String']['output']>;
  /** List of modules */
  modules?: Maybe<Array<Maybe<CollectionModulesUnionType>>>;
  /** Module title */
  title?: Maybe<Scalars['String']['output']>;
};

/** Collection Module: LocationsSelectedCarousel */
export type LocationsSelectedCarousel = {
  __typename?: 'LocationsSelectedCarousel';
  /** List of location IDs */
  locations?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  /** Module type */
  module?: Maybe<Scalars['String']['output']>;
  /** List of modules */
  modules?: Maybe<Array<Maybe<CollectionModulesUnionType>>>;
  /** Module title */
  title?: Maybe<Scalars['String']['output']>;
};

/** Input for the login mutation. */
export type LoginInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The plain-text password for the user logging in. */
  password: Scalars['String']['input'];
  /** The username used for login. Typically a unique or email address depending on specific configuration */
  username: Scalars['String']['input'];
};

/** The payload for the login mutation. */
export type LoginPayload = {
  __typename?: 'LoginPayload';
  /** JWT Token that can be used in future requests for Authentication */
  authToken?: Maybe<Scalars['String']['output']>;
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** A JWT token that can be used in future requests to get a refreshed jwtAuthToken. If the refresh token used in a request is revoked or otherwise invalid, a valid Auth token will NOT be issued in the response headers. */
  refreshToken?: Maybe<Scalars['String']['output']>;
  /** The user that was logged in */
  user?: Maybe<User>;
};

/** File details for a Media Item */
export type MediaDetails = {
  __typename?: 'MediaDetails';
  /** The filename of the mediaItem */
  file?: Maybe<Scalars['String']['output']>;
  /** The height of the mediaItem */
  height?: Maybe<Scalars['Int']['output']>;
  /** Meta information associated with the mediaItem */
  meta?: Maybe<MediaItemMeta>;
  /** The available sizes of the mediaItem */
  sizes?: Maybe<Array<Maybe<MediaSize>>>;
  /** The width of the mediaItem */
  width?: Maybe<Scalars['Int']['output']>;
};

/** File details for a Media Item */
export type MediaDetailsSizesArgs = {
  exclude?: InputMaybe<Array<InputMaybe<MediaItemSizeEnum>>>;
  include?: InputMaybe<Array<InputMaybe<MediaItemSizeEnum>>>;
};

/** The mediaItem type */
export type MediaItem = ContentNode &
  DatabaseIdentifier &
  HierarchicalContentNode &
  HierarchicalNode &
  Node &
  NodeWithAuthor &
  NodeWithTemplate &
  NodeWithTitle &
  UniformResourceIdentifiable & {
    __typename?: 'MediaItem';
    /** Alternative text to display when resource is not displayed */
    altText?: Maybe<Scalars['String']['output']>;
    /** Returns ancestors of the node. Default ordered as lowest (closest to the child) to highest (closest to the root). */
    ancestors?: Maybe<HierarchicalContentNodeToContentNodeAncestorsConnection>;
    /** Connection between the NodeWithAuthor type and the User type */
    author?: Maybe<NodeWithAuthorToUserConnectionEdge>;
    /** The database identifier of the author of the node */
    authorDatabaseId?: Maybe<Scalars['Int']['output']>;
    /** The globally unique identifier of the author of the node */
    authorId?: Maybe<Scalars['ID']['output']>;
    /** The caption for the resource */
    caption?: Maybe<Scalars['String']['output']>;
    /** Connection between the HierarchicalContentNode type and the ContentNode type */
    children?: Maybe<HierarchicalContentNodeToContentNodeChildrenConnection>;
    /** Connection between the ContentNode type and the ContentType type */
    contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
    /** The name of the Content Type the node belongs to */
    contentTypeName: Scalars['String']['output'];
    /** The unique identifier stored in the database */
    databaseId: Scalars['Int']['output'];
    /** Post publishing date. */
    date?: Maybe<Scalars['String']['output']>;
    /** The publishing date set in GMT. */
    dateGmt?: Maybe<Scalars['String']['output']>;
    /** Description of the image (stored as post_content) */
    description?: Maybe<Scalars['String']['output']>;
    /** The desired slug of the post */
    desiredSlug?: Maybe<Scalars['String']['output']>;
    /** If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds */
    editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
    /** The RSS enclosure for the object */
    enclosure?: Maybe<Scalars['String']['output']>;
    /** Connection between the ContentNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<ContentNodeToEnqueuedScriptConnection>;
    /** Connection between the ContentNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<ContentNodeToEnqueuedStylesheetConnection>;
    /** The filesize in bytes of the resource */
    fileSize?: Maybe<Scalars['Int']['output']>;
    /** The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table. */
    guid?: Maybe<Scalars['String']['output']>;
    /** The globally unique identifier of the attachment object. */
    id: Scalars['ID']['output'];
    /** Whether the node is a Comment */
    isComment: Scalars['Boolean']['output'];
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']['output'];
    /** Whether the node represents the front page. */
    isFrontPage: Scalars['Boolean']['output'];
    /** Whether  the node represents the blog page. */
    isPostsPage: Scalars['Boolean']['output'];
    /** Whether the object is a node in the preview state */
    isPreview?: Maybe<Scalars['Boolean']['output']>;
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']['output']>;
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']['output'];
    /** Polylang language */
    language?: Maybe<Language>;
    /** The user that most recently edited the node */
    lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
    /** The permalink of the post */
    link?: Maybe<Scalars['String']['output']>;
    /** Details about the mediaItem */
    mediaDetails?: Maybe<MediaDetails>;
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of the databaseId field
     */
    mediaItemId: Scalars['Int']['output'];
    /** Url of the mediaItem */
    mediaItemUrl?: Maybe<Scalars['String']['output']>;
    /** Type of resource */
    mediaType?: Maybe<Scalars['String']['output']>;
    /** The mime type of the mediaItem */
    mimeType?: Maybe<Scalars['String']['output']>;
    /** The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time. */
    modified?: Maybe<Scalars['String']['output']>;
    /** The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT. */
    modifiedGmt?: Maybe<Scalars['String']['output']>;
    /** The parent of the node. The parent object can be of various types */
    parent?: Maybe<HierarchicalContentNodeToParentContentNodeConnectionEdge>;
    /** Database id of the parent node */
    parentDatabaseId?: Maybe<Scalars['Int']['output']>;
    /** The globally unique identifier of the parent node. */
    parentId?: Maybe<Scalars['ID']['output']>;
    /** Valokuvaajan tiedot */
    photographerName?: Maybe<Scalars['String']['output']>;
    /** The database id of the preview node */
    previewRevisionDatabaseId?: Maybe<Scalars['Int']['output']>;
    /** Whether the object is a node in the preview state */
    previewRevisionId?: Maybe<Scalars['ID']['output']>;
    /** The SEO Framework data of the mediaItem */
    seo?: Maybe<Seo>;
    /** The sizes attribute value for an image. */
    sizes?: Maybe<Scalars['String']['output']>;
    /** The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table. */
    slug?: Maybe<Scalars['String']['output']>;
    /** Url of the mediaItem */
    sourceUrl?: Maybe<Scalars['String']['output']>;
    /** The srcset attribute specifies the URL of the image to use in different situations. It is a comma separated string of urls and their widths. */
    srcSet?: Maybe<Scalars['String']['output']>;
    /** The current status of the object */
    status?: Maybe<Scalars['String']['output']>;
    /** The template assigned to a node of content */
    template?: Maybe<ContentTemplate>;
    /** The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made. */
    title?: Maybe<Scalars['String']['output']>;
    /** Get specific translation version of this object */
    translation?: Maybe<MediaItem>;
    /** List all translated versions of this post */
    translations?: Maybe<Array<Maybe<MediaItem>>>;
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']['output']>;
  };

/** The mediaItem type */
export type MediaItemAncestorsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs>;
};

/** The mediaItem type */
export type MediaItemCaptionArgs = {
  format?: InputMaybe<PostObjectFieldFormatEnum>;
};

/** The mediaItem type */
export type MediaItemChildrenArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs>;
};

/** The mediaItem type */
export type MediaItemDescriptionArgs = {
  format?: InputMaybe<PostObjectFieldFormatEnum>;
};

/** The mediaItem type */
export type MediaItemEnqueuedScriptsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The mediaItem type */
export type MediaItemEnqueuedStylesheetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The mediaItem type */
export type MediaItemFileSizeArgs = {
  size?: InputMaybe<MediaItemSizeEnum>;
};

/** The mediaItem type */
export type MediaItemSizesArgs = {
  size?: InputMaybe<MediaItemSizeEnum>;
};

/** The mediaItem type */
export type MediaItemSourceUrlArgs = {
  size?: InputMaybe<MediaItemSizeEnum>;
};

/** The mediaItem type */
export type MediaItemSrcSetArgs = {
  size?: InputMaybe<MediaItemSizeEnum>;
};

/** The mediaItem type */
export type MediaItemTitleArgs = {
  format?: InputMaybe<PostObjectFieldFormatEnum>;
};

/** The mediaItem type */
export type MediaItemTranslationArgs = {
  language: LanguageCodeEnum;
};

/** Connection to mediaItem Nodes */
export type MediaItemConnection = {
  /** A list of edges (relational context) between RootQuery and connected mediaItem Nodes */
  edges: Array<MediaItemConnectionEdge>;
  /** A list of connected mediaItem Nodes */
  nodes: Array<MediaItem>;
  /** Information about pagination in a connection. */
  pageInfo: MediaItemConnectionPageInfo;
};

/** Edge between a Node and a connected mediaItem */
export type MediaItemConnectionEdge = {
  /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The connected mediaItem Node */
  node: MediaItem;
};

/** Page Info on the connected MediaItemConnectionEdge */
export type MediaItemConnectionPageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum MediaItemIdType {
  /** Identify a resource by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  Id = 'ID',
  /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
  Slug = 'SLUG',
  /** Identify a media item by its source url */
  SourceUrl = 'SOURCE_URL',
  /** Identify a resource by the URI. */
  Uri = 'URI',
}

/** Meta connected to a MediaItem */
export type MediaItemMeta = {
  __typename?: 'MediaItemMeta';
  /** Aperture measurement of the media item. */
  aperture?: Maybe<Scalars['Float']['output']>;
  /** Information about the camera used to create the media item. */
  camera?: Maybe<Scalars['String']['output']>;
  /** The text string description associated with the media item. */
  caption?: Maybe<Scalars['String']['output']>;
  /** Copyright information associated with the media item. */
  copyright?: Maybe<Scalars['String']['output']>;
  /** The date/time when the media was created. */
  createdTimestamp?: Maybe<Scalars['Int']['output']>;
  /** The original creator of the media item. */
  credit?: Maybe<Scalars['String']['output']>;
  /** The focal length value of the media item. */
  focalLength?: Maybe<Scalars['Float']['output']>;
  /** The ISO (International Organization for Standardization) value of the media item. */
  iso?: Maybe<Scalars['Int']['output']>;
  /** List of keywords used to describe or identfy the media item. */
  keywords?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** The vertical or horizontal aspect of the media item. */
  orientation?: Maybe<Scalars['String']['output']>;
  /** The shutter speed information of the media item. */
  shutterSpeed?: Maybe<Scalars['Float']['output']>;
  /** A useful title for the media item. */
  title?: Maybe<Scalars['String']['output']>;
};

/** The size of the media item object. */
export enum MediaItemSizeEnum {
  /** MediaItem with the large size */
  Large = 'LARGE',
  /** MediaItem with the medium size */
  Medium = 'MEDIUM',
  /** MediaItem with the medium_large size */
  MediumLarge = 'MEDIUM_LARGE',
  /** MediaItem with the thumbnail size */
  Thumbnail = 'THUMBNAIL',
  /** MediaItem with the 1536x1536 size */
  _1536X1536 = '_1536X1536',
  /** MediaItem with the 2048x2048 size */
  _2048X2048 = '_2048X2048',
}

/** The status of the media item object. */
export enum MediaItemStatusEnum {
  /** Objects with the auto-draft status */
  AutoDraft = 'AUTO_DRAFT',
  /** Objects with the inherit status */
  Inherit = 'INHERIT',
  /** Objects with the private status */
  Private = 'PRIVATE',
  /** Objects with the trash status */
  Trash = 'TRASH',
}

/** TODO: take this from Linked events Image type. */
export type MediaResource = {
  __typename?: 'MediaResource';
  meta?: Maybe<NodeMeta>;
  todo?: Maybe<Scalars['String']['output']>;
};

/** Details of an available size for a media item */
export type MediaSize = {
  __typename?: 'MediaSize';
  /** The filename of the referenced size */
  file?: Maybe<Scalars['String']['output']>;
  /** The filesize of the resource */
  fileSize?: Maybe<Scalars['Int']['output']>;
  /** The height of the referenced size */
  height?: Maybe<Scalars['String']['output']>;
  /** The mime type of the referenced size */
  mimeType?: Maybe<Scalars['String']['output']>;
  /** The referenced size name */
  name?: Maybe<Scalars['String']['output']>;
  /** The url of the referenced size */
  sourceUrl?: Maybe<Scalars['String']['output']>;
  /** The width of the referenced size */
  width?: Maybe<Scalars['String']['output']>;
};

/** Menus are the containers for navigation items. Menus can be assigned to menu locations, which are typically registered by the active theme. */
export type Menu = DatabaseIdentifier &
  Node & {
    __typename?: 'Menu';
    /** The number of items in the menu */
    count?: Maybe<Scalars['Int']['output']>;
    /** The unique identifier stored in the database */
    databaseId: Scalars['Int']['output'];
    /** The globally unique identifier of the nav menu object. */
    id: Scalars['ID']['output'];
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']['output']>;
    /** The locations a menu is assigned to */
    locations?: Maybe<Array<Maybe<MenuLocationEnum>>>;
    /**
     * WP ID of the nav menu.
     * @deprecated Deprecated in favor of the databaseId field
     */
    menuId?: Maybe<Scalars['Int']['output']>;
    /** Connection between the Menu type and the MenuItem type */
    menuItems?: Maybe<MenuToMenuItemConnection>;
    /** Display name of the menu. Equivalent to WP_Term-&gt;name. */
    name?: Maybe<Scalars['String']['output']>;
    /** The url friendly name of the menu. Equivalent to WP_Term-&gt;slug */
    slug?: Maybe<Scalars['String']['output']>;
  };

/** Menus are the containers for navigation items. Menus can be assigned to menu locations, which are typically registered by the active theme. */
export type MenuMenuItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MenuToMenuItemConnectionWhereArgs>;
};

/** Connection to Menu Nodes */
export type MenuConnection = {
  /** A list of edges (relational context) between RootQuery and connected Menu Nodes */
  edges: Array<MenuConnectionEdge>;
  /** A list of connected Menu Nodes */
  nodes: Array<Menu>;
  /** Information about pagination in a connection. */
  pageInfo: MenuConnectionPageInfo;
};

/** Edge between a Node and a connected Menu */
export type MenuConnectionEdge = {
  /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The connected Menu Node */
  node: Menu;
};

/** Page Info on the connected MenuConnectionEdge */
export type MenuConnectionPageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** Navigation menu items are the individual items assigned to a menu. These are rendered as the links in a navigation menu. */
export type MenuItem = DatabaseIdentifier &
  Node & {
    __typename?: 'MenuItem';
    /** Connection between the MenuItem type and the MenuItem type */
    childItems?: Maybe<MenuItemToMenuItemConnection>;
    /** Connection from MenuItem to it&#039;s connected node */
    connectedNode?: Maybe<MenuItemToMenuItemLinkableConnectionEdge>;
    /**
     * The object connected to this menu item.
     * @deprecated Deprecated in favor of the connectedNode field
     */
    connectedObject?: Maybe<MenuItemObjectUnion>;
    /** Class attribute for the menu item link */
    cssClasses?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
    /** The unique identifier stored in the database */
    databaseId: Scalars['Int']['output'];
    /** Description of the menu item. */
    description?: Maybe<Scalars['String']['output']>;
    /** The globally unique identifier of the nav menu item object. */
    id: Scalars['ID']['output'];
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']['output']>;
    /** Label or title of the menu item. */
    label?: Maybe<Scalars['String']['output']>;
    /** Link relationship (XFN) of the menu item. */
    linkRelationship?: Maybe<Scalars['String']['output']>;
    /** The locations the menu item&#039;s Menu is assigned to */
    locations?: Maybe<Array<Maybe<MenuLocationEnum>>>;
    /** The Menu a MenuItem is part of */
    menu?: Maybe<MenuItemToMenuConnectionEdge>;
    /**
     * WP ID of the menu item.
     * @deprecated Deprecated in favor of the databaseId field
     */
    menuItemId?: Maybe<Scalars['Int']['output']>;
    /** Menu item order */
    order?: Maybe<Scalars['Int']['output']>;
    /** The database id of the parent menu item or null if it is the root */
    parentDatabaseId?: Maybe<Scalars['Int']['output']>;
    /** The globally unique identifier of the parent nav menu item object. */
    parentId?: Maybe<Scalars['ID']['output']>;
    /** Path for the resource. Relative path for internal resources. Absolute path for external resources. */
    path?: Maybe<Scalars['String']['output']>;
    /** Target attribute for the menu item link. */
    target?: Maybe<Scalars['String']['output']>;
    /** Title attribute for the menu item link */
    title?: Maybe<Scalars['String']['output']>;
    /** The uri of the resource the menu item links to */
    uri?: Maybe<Scalars['String']['output']>;
    /** URL or destination of the menu item. */
    url?: Maybe<Scalars['String']['output']>;
  };

/** Navigation menu items are the individual items assigned to a menu. These are rendered as the links in a navigation menu. */
export type MenuItemChildItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MenuItemToMenuItemConnectionWhereArgs>;
};

/** Connection to MenuItem Nodes */
export type MenuItemConnection = {
  /** A list of edges (relational context) between RootQuery and connected MenuItem Nodes */
  edges: Array<MenuItemConnectionEdge>;
  /** A list of connected MenuItem Nodes */
  nodes: Array<MenuItem>;
  /** Information about pagination in a connection. */
  pageInfo: MenuItemConnectionPageInfo;
};

/** Edge between a Node and a connected MenuItem */
export type MenuItemConnectionEdge = {
  /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The connected MenuItem Node */
  node: MenuItem;
};

/** Page Info on the connected MenuItemConnectionEdge */
export type MenuItemConnectionPageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** Nodes that can be linked to as Menu Items */
export type MenuItemLinkable = {
  /** The unique identifier stored in the database */
  databaseId: Scalars['Int']['output'];
  /** The globally unique ID for the object */
  id: Scalars['ID']['output'];
  /** Whether the node is a Comment */
  isComment: Scalars['Boolean']['output'];
  /** Whether the node is a Content Node */
  isContentNode: Scalars['Boolean']['output'];
  /** Whether the node represents the front page. */
  isFrontPage: Scalars['Boolean']['output'];
  /** Whether  the node represents the blog page. */
  isPostsPage: Scalars['Boolean']['output'];
  /** Whether the node is a Term */
  isTermNode: Scalars['Boolean']['output'];
  /** The unique resource identifier path */
  uri?: Maybe<Scalars['String']['output']>;
};

/** Edge between a Node and a connected MenuItemLinkable */
export type MenuItemLinkableConnectionEdge = {
  /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The connected MenuItemLinkable Node */
  node: MenuItemLinkable;
};

/** The Type of Identifier used to fetch a single node. Default is "ID". To be used along with the "id" field. */
export enum MenuItemNodeIdTypeEnum {
  /** Identify a resource by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  Id = 'ID',
}

/** Deprecated in favor of MenuItemLinkeable Interface */
export type MenuItemObjectUnion = Category | Page | Post | Tag;

/** Connection between the MenuItem type and the Menu type */
export type MenuItemToMenuConnectionEdge = Edge &
  MenuConnectionEdge &
  OneToOneConnection & {
    __typename?: 'MenuItemToMenuConnectionEdge';
    /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The node of the connection, without the edges */
    node: Menu;
  };

/** Connection between the MenuItem type and the MenuItem type */
export type MenuItemToMenuItemConnection = Connection &
  MenuItemConnection & {
    __typename?: 'MenuItemToMenuItemConnection';
    /** Edges for the MenuItemToMenuItemConnection connection */
    edges: Array<MenuItemToMenuItemConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<MenuItem>;
    /** Information about pagination in a connection. */
    pageInfo: MenuItemToMenuItemConnectionPageInfo;
  };

/** An edge in a connection */
export type MenuItemToMenuItemConnectionEdge = Edge &
  MenuItemConnectionEdge & {
    __typename?: 'MenuItemToMenuItemConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: MenuItem;
  };

/** Page Info on the &quot;MenuItemToMenuItemConnection&quot; */
export type MenuItemToMenuItemConnectionPageInfo = MenuItemConnectionPageInfo &
  PageInfo &
  WpPageInfo & {
    __typename?: 'MenuItemToMenuItemConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the MenuItemToMenuItemConnection connection */
export type MenuItemToMenuItemConnectionWhereArgs = {
  /** The database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** The menu location for the menu being queried */
  location?: InputMaybe<MenuLocationEnum>;
  /** The database ID of the parent menu object */
  parentDatabaseId?: InputMaybe<Scalars['Int']['input']>;
  /** The ID of the parent menu object */
  parentId?: InputMaybe<Scalars['ID']['input']>;
};

/** Connection between the MenuItem type and the MenuItemLinkable type */
export type MenuItemToMenuItemLinkableConnectionEdge = Edge &
  MenuItemLinkableConnectionEdge &
  OneToOneConnection & {
    __typename?: 'MenuItemToMenuItemLinkableConnectionEdge';
    /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The node of the connection, without the edges */
    node: MenuItemLinkable;
  };

/** Registered menu locations */
export enum MenuLocationEnum {
  /** Put the menu in the primary location */
  Primary = 'PRIMARY',
  /** Put the menu in the primary___en location */
  PrimaryEn = 'PRIMARY___EN',
  /** Put the menu in the primary___sv location */
  PrimarySv = 'PRIMARY___SV',
  /** Put the menu in the secondary location */
  Secondary = 'SECONDARY',
  /** Put the menu in the secondary___en location */
  SecondaryEn = 'SECONDARY___EN',
  /** Put the menu in the secondary___sv location */
  SecondarySv = 'SECONDARY___SV',
  /** Put the menu in the tertiary location */
  Tertiary = 'TERTIARY',
  /** Put the menu in the tertiary___en location */
  TertiaryEn = 'TERTIARY___EN',
  /** Put the menu in the tertiary___sv location */
  TertiarySv = 'TERTIARY___SV',
}

/** The Type of Identifier used to fetch a single node. Default is "ID". To be used along with the "id" field. */
export enum MenuNodeIdTypeEnum {
  /** Identify a menu node by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a menu node by the (hashed) Global ID. */
  Id = 'ID',
  /** Identify a menu node by the slug of menu location to which it is assigned */
  Location = 'LOCATION',
  /** Identify a menu node by its name */
  Name = 'NAME',
  /** Identify a menu node by its slug */
  Slug = 'SLUG',
}

/** Connection between the Menu type and the MenuItem type */
export type MenuToMenuItemConnection = Connection &
  MenuItemConnection & {
    __typename?: 'MenuToMenuItemConnection';
    /** Edges for the MenuToMenuItemConnection connection */
    edges: Array<MenuToMenuItemConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<MenuItem>;
    /** Information about pagination in a connection. */
    pageInfo: MenuToMenuItemConnectionPageInfo;
  };

/** An edge in a connection */
export type MenuToMenuItemConnectionEdge = Edge &
  MenuItemConnectionEdge & {
    __typename?: 'MenuToMenuItemConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: MenuItem;
  };

/** Page Info on the &quot;MenuToMenuItemConnection&quot; */
export type MenuToMenuItemConnectionPageInfo = MenuItemConnectionPageInfo &
  PageInfo &
  WpPageInfo & {
    __typename?: 'MenuToMenuItemConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the MenuToMenuItemConnection connection */
export type MenuToMenuItemConnectionWhereArgs = {
  /** The database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** The menu location for the menu being queried */
  location?: InputMaybe<MenuLocationEnum>;
  /** The database ID of the parent menu object */
  parentDatabaseId?: InputMaybe<Scalars['Int']['input']>;
  /** The ID of the parent menu object */
  parentId?: InputMaybe<Scalars['ID']['input']>;
};

export type Meta = {
  __typename?: 'Meta';
  count: Scalars['Int']['output'];
  next?: Maybe<Scalars['String']['output']>;
  previous?: Maybe<Scalars['String']['output']>;
};

/** The MimeType of the object */
export enum MimeTypeEnum {
  /** application/msword mime type. */
  ApplicationMsword = 'APPLICATION_MSWORD',
  /** application/pdf mime type. */
  ApplicationPdf = 'APPLICATION_PDF',
  /** application/vnd.apple.keynote mime type. */
  ApplicationVndAppleKeynote = 'APPLICATION_VND_APPLE_KEYNOTE',
  /** application/vnd.ms-excel mime type. */
  ApplicationVndMsExcel = 'APPLICATION_VND_MS_EXCEL',
  /** application/vnd.ms-excel.sheet.binary.macroEnabled.12 mime type. */
  ApplicationVndMsExcelSheetBinaryMacroenabled_12 = 'APPLICATION_VND_MS_EXCEL_SHEET_BINARY_MACROENABLED_12',
  /** application/vnd.ms-excel.sheet.macroEnabled.12 mime type. */
  ApplicationVndMsExcelSheetMacroenabled_12 = 'APPLICATION_VND_MS_EXCEL_SHEET_MACROENABLED_12',
  /** application/vnd.ms-powerpoint mime type. */
  ApplicationVndMsPowerpoint = 'APPLICATION_VND_MS_POWERPOINT',
  /** application/vnd.ms-powerpoint.presentation.macroEnabled.12 mime type. */
  ApplicationVndMsPowerpointPresentationMacroenabled_12 = 'APPLICATION_VND_MS_POWERPOINT_PRESENTATION_MACROENABLED_12',
  /** application/vnd.ms-powerpoint.slideshow.macroEnabled.12 mime type. */
  ApplicationVndMsPowerpointSlideshowMacroenabled_12 = 'APPLICATION_VND_MS_POWERPOINT_SLIDESHOW_MACROENABLED_12',
  /** application/vnd.ms-word.document.macroEnabled.12 mime type. */
  ApplicationVndMsWordDocumentMacroenabled_12 = 'APPLICATION_VND_MS_WORD_DOCUMENT_MACROENABLED_12',
  /** application/vnd.oasis.opendocument.text mime type. */
  ApplicationVndOasisOpendocumentText = 'APPLICATION_VND_OASIS_OPENDOCUMENT_TEXT',
  /** application/vnd.openxmlformats-officedocument.presentationml.presentation mime type. */
  ApplicationVndOpenxmlformatsOfficedocumentPresentationmlPresentation = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_PRESENTATION',
  /** application/vnd.openxmlformats-officedocument.presentationml.slideshow mime type. */
  ApplicationVndOpenxmlformatsOfficedocumentPresentationmlSlideshow = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_SLIDESHOW',
  /** application/vnd.openxmlformats-officedocument.spreadsheetml.sheet mime type. */
  ApplicationVndOpenxmlformatsOfficedocumentSpreadsheetmlSheet = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_SPREADSHEETML_SHEET',
  /** application/vnd.openxmlformats-officedocument.wordprocessingml.document mime type. */
  ApplicationVndOpenxmlformatsOfficedocumentWordprocessingmlDocument = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT',
  /** audio/flac mime type. */
  AudioFlac = 'AUDIO_FLAC',
  /** audio/midi mime type. */
  AudioMidi = 'AUDIO_MIDI',
  /** audio/mpeg mime type. */
  AudioMpeg = 'AUDIO_MPEG',
  /** audio/ogg mime type. */
  AudioOgg = 'AUDIO_OGG',
  /** audio/wav mime type. */
  AudioWav = 'AUDIO_WAV',
  /** image/avif mime type. */
  ImageAvif = 'IMAGE_AVIF',
  /** image/gif mime type. */
  ImageGif = 'IMAGE_GIF',
  /** image/jpeg mime type. */
  ImageJpeg = 'IMAGE_JPEG',
  /** image/png mime type. */
  ImagePng = 'IMAGE_PNG',
  /** video/3gpp mime type. */
  Video_3Gpp = 'VIDEO_3GPP',
  /** video/3gpp2 mime type. */
  Video_3Gpp2 = 'VIDEO_3GPP2',
  /** video/avi mime type. */
  VideoAvi = 'VIDEO_AVI',
  /** video/mp4 mime type. */
  VideoMp4 = 'VIDEO_MP4',
  /** video/mpeg mime type. */
  VideoMpeg = 'VIDEO_MPEG',
  /** video/ogg mime type. */
  VideoOgg = 'VIDEO_OGG',
  /** video/quicktime mime type. */
  VideoQuicktime = 'VIDEO_QUICKTIME',
  /** video/webm mime type. */
  VideoWebm = 'VIDEO_WEBM',
  /** video/x-flv mime type. */
  VideoXFlv = 'VIDEO_X_FLV',
}

/** The root mutation */
export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
  /** The createCategory mutation */
  createCategory?: Maybe<CreateCategoryPayload>;
  /** The createCollection mutation */
  createCollection?: Maybe<CreateCollectionPayload>;
  /** The createComment mutation */
  createComment?: Maybe<CreateCommentPayload>;
  /** The createContact mutation */
  createContact?: Maybe<CreateContactPayload>;
  /** The createLandingPage mutation */
  createLandingPage?: Maybe<CreateLandingPagePayload>;
  /** The createMediaItem mutation */
  createMediaItem?: Maybe<CreateMediaItemPayload>;
  /** The createPage mutation */
  createPage?: Maybe<CreatePagePayload>;
  /** The createPost mutation */
  createPost?: Maybe<CreatePostPayload>;
  /** The createPostFormat mutation */
  createPostFormat?: Maybe<CreatePostFormatPayload>;
  /** The createRelease mutation */
  createRelease?: Maybe<CreateReleasePayload>;
  /** The createTag mutation */
  createTag?: Maybe<CreateTagPayload>;
  /** The createTranslation mutation */
  createTranslation?: Maybe<CreateTranslationPayload>;
  /** The createUser mutation */
  createUser?: Maybe<CreateUserPayload>;
  /** The deleteCategory mutation */
  deleteCategory?: Maybe<DeleteCategoryPayload>;
  /** The deleteCollection mutation */
  deleteCollection?: Maybe<DeleteCollectionPayload>;
  /** The deleteComment mutation */
  deleteComment?: Maybe<DeleteCommentPayload>;
  /** The deleteContact mutation */
  deleteContact?: Maybe<DeleteContactPayload>;
  /** The deleteLandingPage mutation */
  deleteLandingPage?: Maybe<DeleteLandingPagePayload>;
  /** The deleteMediaItem mutation */
  deleteMediaItem?: Maybe<DeleteMediaItemPayload>;
  /** The deletePage mutation */
  deletePage?: Maybe<DeletePagePayload>;
  /** The deletePost mutation */
  deletePost?: Maybe<DeletePostPayload>;
  /** The deletePostFormat mutation */
  deletePostFormat?: Maybe<DeletePostFormatPayload>;
  /** The deleteRelease mutation */
  deleteRelease?: Maybe<DeleteReleasePayload>;
  /** The deleteTag mutation */
  deleteTag?: Maybe<DeleteTagPayload>;
  /** The deleteTranslation mutation */
  deleteTranslation?: Maybe<DeleteTranslationPayload>;
  /** The deleteUser mutation */
  deleteUser?: Maybe<DeleteUserPayload>;
  /** Increase the count. */
  increaseCount?: Maybe<Scalars['Int']['output']>;
  /** Login a user. Request for an authToken and User details in response */
  login?: Maybe<LoginPayload>;
  /** Use a valid JWT Refresh token to retrieve a new JWT Auth Token */
  refreshJwtAuthToken?: Maybe<RefreshJwtAuthTokenPayload>;
  /** The registerUser mutation */
  registerUser?: Maybe<RegisterUserPayload>;
  /** The resetUserPassword mutation */
  resetUserPassword?: Maybe<ResetUserPasswordPayload>;
  /** The restoreComment mutation */
  restoreComment?: Maybe<RestoreCommentPayload>;
  /** Send password reset email to user */
  sendPasswordResetEmail?: Maybe<SendPasswordResetEmailPayload>;
  /** The updateCategory mutation */
  updateCategory?: Maybe<UpdateCategoryPayload>;
  /** The updateCollection mutation */
  updateCollection?: Maybe<UpdateCollectionPayload>;
  /** The updateComment mutation */
  updateComment?: Maybe<UpdateCommentPayload>;
  /** The updateContact mutation */
  updateContact?: Maybe<UpdateContactPayload>;
  /** The updateLandingPage mutation */
  updateLandingPage?: Maybe<UpdateLandingPagePayload>;
  /** The updateMediaItem mutation */
  updateMediaItem?: Maybe<UpdateMediaItemPayload>;
  /** The updatePage mutation */
  updatePage?: Maybe<UpdatePagePayload>;
  /** The updatePost mutation */
  updatePost?: Maybe<UpdatePostPayload>;
  /** The updatePostFormat mutation */
  updatePostFormat?: Maybe<UpdatePostFormatPayload>;
  /** The updateRelease mutation */
  updateRelease?: Maybe<UpdateReleasePayload>;
  /** The updateSettings mutation */
  updateSettings?: Maybe<UpdateSettingsPayload>;
  /** The updateTag mutation */
  updateTag?: Maybe<UpdateTagPayload>;
  /** The updateTranslation mutation */
  updateTranslation?: Maybe<UpdateTranslationPayload>;
  /** The updateUser mutation */
  updateUser?: Maybe<UpdateUserPayload>;
};

/** The root mutation */
export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};

/** The root mutation */
export type MutationCreateCollectionArgs = {
  input: CreateCollectionInput;
};

/** The root mutation */
export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};

/** The root mutation */
export type MutationCreateContactArgs = {
  input: CreateContactInput;
};

/** The root mutation */
export type MutationCreateLandingPageArgs = {
  input: CreateLandingPageInput;
};

/** The root mutation */
export type MutationCreateMediaItemArgs = {
  input: CreateMediaItemInput;
};

/** The root mutation */
export type MutationCreatePageArgs = {
  input: CreatePageInput;
};

/** The root mutation */
export type MutationCreatePostArgs = {
  input: CreatePostInput;
};

/** The root mutation */
export type MutationCreatePostFormatArgs = {
  input: CreatePostFormatInput;
};

/** The root mutation */
export type MutationCreateReleaseArgs = {
  input: CreateReleaseInput;
};

/** The root mutation */
export type MutationCreateTagArgs = {
  input: CreateTagInput;
};

/** The root mutation */
export type MutationCreateTranslationArgs = {
  input: CreateTranslationInput;
};

/** The root mutation */
export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

/** The root mutation */
export type MutationDeleteCategoryArgs = {
  input: DeleteCategoryInput;
};

/** The root mutation */
export type MutationDeleteCollectionArgs = {
  input: DeleteCollectionInput;
};

/** The root mutation */
export type MutationDeleteCommentArgs = {
  input: DeleteCommentInput;
};

/** The root mutation */
export type MutationDeleteContactArgs = {
  input: DeleteContactInput;
};

/** The root mutation */
export type MutationDeleteLandingPageArgs = {
  input: DeleteLandingPageInput;
};

/** The root mutation */
export type MutationDeleteMediaItemArgs = {
  input: DeleteMediaItemInput;
};

/** The root mutation */
export type MutationDeletePageArgs = {
  input: DeletePageInput;
};

/** The root mutation */
export type MutationDeletePostArgs = {
  input: DeletePostInput;
};

/** The root mutation */
export type MutationDeletePostFormatArgs = {
  input: DeletePostFormatInput;
};

/** The root mutation */
export type MutationDeleteReleaseArgs = {
  input: DeleteReleaseInput;
};

/** The root mutation */
export type MutationDeleteTagArgs = {
  input: DeleteTagInput;
};

/** The root mutation */
export type MutationDeleteTranslationArgs = {
  input: DeleteTranslationInput;
};

/** The root mutation */
export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};

/** The root mutation */
export type MutationIncreaseCountArgs = {
  count?: InputMaybe<Scalars['Int']['input']>;
};

/** The root mutation */
export type MutationLoginArgs = {
  input: LoginInput;
};

/** The root mutation */
export type MutationRefreshJwtAuthTokenArgs = {
  input: RefreshJwtAuthTokenInput;
};

/** The root mutation */
export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};

/** The root mutation */
export type MutationResetUserPasswordArgs = {
  input: ResetUserPasswordInput;
};

/** The root mutation */
export type MutationRestoreCommentArgs = {
  input: RestoreCommentInput;
};

/** The root mutation */
export type MutationSendPasswordResetEmailArgs = {
  input: SendPasswordResetEmailInput;
};

/** The root mutation */
export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};

/** The root mutation */
export type MutationUpdateCollectionArgs = {
  input: UpdateCollectionInput;
};

/** The root mutation */
export type MutationUpdateCommentArgs = {
  input: UpdateCommentInput;
};

/** The root mutation */
export type MutationUpdateContactArgs = {
  input: UpdateContactInput;
};

/** The root mutation */
export type MutationUpdateLandingPageArgs = {
  input: UpdateLandingPageInput;
};

/** The root mutation */
export type MutationUpdateMediaItemArgs = {
  input: UpdateMediaItemInput;
};

/** The root mutation */
export type MutationUpdatePageArgs = {
  input: UpdatePageInput;
};

/** The root mutation */
export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};

/** The root mutation */
export type MutationUpdatePostFormatArgs = {
  input: UpdatePostFormatInput;
};

/** The root mutation */
export type MutationUpdateReleaseArgs = {
  input: UpdateReleaseInput;
};

/** The root mutation */
export type MutationUpdateSettingsArgs = {
  input: UpdateSettingsInput;
};

/** The root mutation */
export type MutationUpdateTagArgs = {
  input: UpdateTagInput;
};

/** The root mutation */
export type MutationUpdateTranslationArgs = {
  input: UpdateTranslationInput;
};

/** The root mutation */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Neighborhood = {
  __typename?: 'Neighborhood';
  id: Scalars['ID']['output'];
  name: LocalizedObject;
};

export type NeighborhoodListResponse = {
  __typename?: 'NeighborhoodListResponse';
  data: Array<Neighborhood>;
  meta: Meta;
};

/** An object with an ID */
export type Node = {
  /** The globally unique ID for the object */
  id: Scalars['ID']['output'];
};

export type NodeMeta = {
  __typename?: 'NodeMeta';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

/** A node that can have an author assigned to it */
export type NodeWithAuthor = {
  /** Connection between the NodeWithAuthor type and the User type */
  author?: Maybe<NodeWithAuthorToUserConnectionEdge>;
  /** The database identifier of the author of the node */
  authorDatabaseId?: Maybe<Scalars['Int']['output']>;
  /** The globally unique identifier of the author of the node */
  authorId?: Maybe<Scalars['ID']['output']>;
  /** The globally unique ID for the object */
  id: Scalars['ID']['output'];
};

/** Connection between the NodeWithAuthor type and the User type */
export type NodeWithAuthorToUserConnectionEdge = Edge &
  OneToOneConnection &
  UserConnectionEdge & {
    __typename?: 'NodeWithAuthorToUserConnectionEdge';
    /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The node of the connection, without the edges */
    node: User;
  };

/** A node that supports the content editor */
export type NodeWithContentEditor = {
  /** The content of the post. */
  content?: Maybe<Scalars['String']['output']>;
  /** The globally unique ID for the object */
  id: Scalars['ID']['output'];
};

/** A node that supports the content editor */
export type NodeWithContentEditorContentArgs = {
  format?: InputMaybe<PostObjectFieldFormatEnum>;
};

/** A node that can have a featured image set */
export type NodeWithFeaturedImage = {
  /** Connection between the NodeWithFeaturedImage type and the MediaItem type */
  featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge>;
  /** The database identifier for the featured image node assigned to the content node */
  featuredImageDatabaseId?: Maybe<Scalars['Int']['output']>;
  /** Globally unique ID of the featured image assigned to the node */
  featuredImageId?: Maybe<Scalars['ID']['output']>;
  /** The globally unique ID for the object */
  id: Scalars['ID']['output'];
};

/** Connection between the NodeWithFeaturedImage type and the MediaItem type */
export type NodeWithFeaturedImageToMediaItemConnectionEdge = Edge &
  MediaItemConnectionEdge &
  OneToOneConnection & {
    __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
    /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The node of the connection, without the edges */
    node: MediaItem;
  };

/** A node that can have page attributes */
export type NodeWithPageAttributes = {
  /** The globally unique ID for the object */
  id: Scalars['ID']['output'];
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: Maybe<Scalars['Int']['output']>;
};

/** A node that can have revisions */
export type NodeWithRevisions = {
  /** The globally unique ID for the object */
  id: Scalars['ID']['output'];
  /** True if the node is a revision of another node */
  isRevision?: Maybe<Scalars['Boolean']['output']>;
  /** If the current node is a revision, this field exposes the node this is a revision of. Returns null if the node is not a revision of another node. */
  revisionOf?: Maybe<NodeWithRevisionsToContentNodeConnectionEdge>;
};

/** Connection between the NodeWithRevisions type and the ContentNode type */
export type NodeWithRevisionsToContentNodeConnectionEdge =
  ContentNodeConnectionEdge &
    Edge &
    OneToOneConnection & {
      __typename?: 'NodeWithRevisionsToContentNodeConnectionEdge';
      /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
      cursor?: Maybe<Scalars['String']['output']>;
      /** The node of the connection, without the edges */
      node: ContentNode;
    };

/** A node that can have a template associated with it */
export type NodeWithTemplate = {
  /** The globally unique ID for the object */
  id: Scalars['ID']['output'];
  /** The template assigned to the node */
  template?: Maybe<ContentTemplate>;
};

/** A node that NodeWith a title */
export type NodeWithTitle = {
  /** The globally unique ID for the object */
  id: Scalars['ID']['output'];
  /** The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made. */
  title?: Maybe<Scalars['String']['output']>;
};

/** A node that NodeWith a title */
export type NodeWithTitleTitleArgs = {
  format?: InputMaybe<PostObjectFieldFormatEnum>;
};

/** Selitä mikä CustomType on */
export type Notification = {
  __typename?: 'Notification';
  /** Ilmoituksen sisältö */
  content?: Maybe<Scalars['String']['output']>;
  /** Ilmoituksen päättymispäivä */
  endDate?: Maybe<Scalars['String']['output']>;
  /** Ilmoituksen tärkeys */
  level?: Maybe<Scalars['String']['output']>;
  /** Ilmoitus linkin teksti */
  linkText?: Maybe<Scalars['String']['output']>;
  /** Ilmoitus linkin url */
  linkUrl?: Maybe<Scalars['String']['output']>;
  /** Ilmoituksen aloituspäivä */
  startDate?: Maybe<Scalars['String']['output']>;
  /** Ilmoituksen otsikko */
  title?: Maybe<Scalars['String']['output']>;
};

export type Offer = {
  __typename?: 'Offer';
  description?: Maybe<LocalizedObject>;
  infoUrl?: Maybe<LocalizedObject>;
  isFree?: Maybe<Scalars['Boolean']['output']>;
  price?: Maybe<LocalizedObject>;
};

/** A singular connection from one Node to another, with support for relational data on the &quot;edge&quot; of the connection. */
export type OneToOneConnection = {
  /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The connected node */
  node: Node;
};

export type Ontology = {
  __typename?: 'Ontology';
  id?: Maybe<Scalars['Int']['output']>;
  label?: Maybe<Scalars['String']['output']>;
};

export type OntologyTree = {
  __typename?: 'OntologyTree';
  ancestorIds?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  childIds?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  id?: Maybe<Scalars['ID']['output']>;
  level?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<LanguageString>;
  parentId?: Maybe<Scalars['ID']['output']>;
};

export type OntologyWord = {
  __typename?: 'OntologyWord';
  id?: Maybe<Scalars['ID']['output']>;
  label?: Maybe<LanguageString>;
};

export type Ontologyword = {
  __typename?: 'Ontologyword';
  can_add_clarification?: Maybe<Scalars['Boolean']['output']>;
  can_add_schoolyear?: Maybe<Scalars['Boolean']['output']>;
  extra_searchwords_fi?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  ontologyword_en?: Maybe<Scalars['String']['output']>;
  ontologyword_fi?: Maybe<Scalars['String']['output']>;
  ontologyword_sv?: Maybe<Scalars['String']['output']>;
  unit_ids?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
};

export type OpeningHour = {
  __typename?: 'OpeningHour';
  date: Scalars['String']['output'];
  times: Array<Time>;
};

export type OpeningHours = {
  __typename?: 'OpeningHours';
  data?: Maybe<Array<Maybe<OpeningHoursDay>>>;
  is_open_now_url?: Maybe<Scalars['String']['output']>;
  today?: Maybe<Array<Maybe<OpeningHoursTimes>>>;
  url?: Maybe<Scalars['String']['output']>;
};

export type OpeningHoursDay = {
  __typename?: 'OpeningHoursDay';
  date?: Maybe<Scalars['String']['output']>;
  times?: Maybe<Array<Maybe<OpeningHoursTimes>>>;
};

export type OpeningHoursTimes = {
  __typename?: 'OpeningHoursTimes';
  endTime?: Maybe<Scalars['String']['output']>;
  endTimeOnNextDay?: Maybe<Scalars['Boolean']['output']>;
  fullDay?: Maybe<Scalars['Boolean']['output']>;
  resourceState?: Maybe<Scalars['String']['output']>;
  startTime?: Maybe<Scalars['String']['output']>;
};

export type OrderByDistance = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  order?: InputMaybe<SortOrder>;
};

export type OrderByName = {
  order?: InputMaybe<SortOrder>;
};

/** The cardinality of the connection order */
export enum OrderEnum {
  /** Sort the query result set in an ascending order */
  Asc = 'ASC',
  /** Sort the query result set in a descending order */
  Desc = 'DESC',
}

/** TODO: merge beta.kultus organisation, etc */
export type Organisation = {
  __typename?: 'Organisation';
  contactDetails?: Maybe<ContactInfo>;
  meta?: Maybe<NodeMeta>;
};

export type OrganizationDetails = {
  __typename?: 'OrganizationDetails';
  affiliatedOrganizations?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  classification?: Maybe<Scalars['String']['output']>;
  createdTime?: Maybe<Scalars['String']['output']>;
  dataSource?: Maybe<Scalars['String']['output']>;
  dissolutionDate?: Maybe<Scalars['String']['output']>;
  foundingDate?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  internalContext?: Maybe<Scalars['String']['output']>;
  internalId: Scalars['String']['output'];
  internalType?: Maybe<Scalars['String']['output']>;
  isAffiliated: Scalars['Boolean']['output'];
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parentOrganization?: Maybe<Scalars['String']['output']>;
  replacedBy?: Maybe<Scalars['String']['output']>;
  subOrganizations?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** The page type */
export type Page = ContentNode &
  DatabaseIdentifier &
  HierarchicalContentNode &
  HierarchicalNode &
  MenuItemLinkable &
  Node &
  NodeWithAuthor &
  NodeWithContentEditor &
  NodeWithFeaturedImage &
  NodeWithPageAttributes &
  NodeWithRevisions &
  NodeWithTemplate &
  NodeWithTitle &
  Previewable &
  UniformResourceIdentifiable & {
    __typename?: 'Page';
    /** Returns ancestors of the node. Default ordered as lowest (closest to the child) to highest (closest to the root). */
    ancestors?: Maybe<HierarchicalContentNodeToContentNodeAncestorsConnection>;
    /** Connection between the NodeWithAuthor type and the User type */
    author?: Maybe<NodeWithAuthorToUserConnectionEdge>;
    /** The database identifier of the author of the node */
    authorDatabaseId?: Maybe<Scalars['Int']['output']>;
    /** The globally unique identifier of the author of the node */
    authorId?: Maybe<Scalars['ID']['output']>;
    /** Breadcrumb fields */
    breadcrumbs?: Maybe<Array<Maybe<Breadcrumb>>>;
    /** Connection between the HierarchicalContentNode type and the ContentNode type */
    children?: Maybe<HierarchicalContentNodeToContentNodeChildrenConnection>;
    /** The content of the post. */
    content?: Maybe<Scalars['String']['output']>;
    /** Connection between the ContentNode type and the ContentType type */
    contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
    /** The name of the Content Type the node belongs to */
    contentTypeName: Scalars['String']['output'];
    /** The unique identifier stored in the database */
    databaseId: Scalars['Int']['output'];
    /** Post publishing date. */
    date?: Maybe<Scalars['String']['output']>;
    /** The publishing date set in GMT. */
    dateGmt?: Maybe<Scalars['String']['output']>;
    /** The desired slug of the post */
    desiredSlug?: Maybe<Scalars['String']['output']>;
    /** If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds */
    editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
    /** The RSS enclosure for the object */
    enclosure?: Maybe<Scalars['String']['output']>;
    /** Connection between the ContentNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<ContentNodeToEnqueuedScriptConnection>;
    /** Connection between the ContentNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<ContentNodeToEnqueuedStylesheetConnection>;
    /** Vanhentumisaika */
    expirationTime?: Maybe<Scalars['String']['output']>;
    /** Connection between the NodeWithFeaturedImage type and the MediaItem type */
    featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge>;
    /** The database identifier for the featured image node assigned to the content node */
    featuredImageDatabaseId?: Maybe<Scalars['Int']['output']>;
    /** Globally unique ID of the featured image assigned to the node */
    featuredImageId?: Maybe<Scalars['ID']['output']>;
    /** The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table. */
    guid?: Maybe<Scalars['String']['output']>;
    /** Hero kentät */
    hero?: Maybe<Hero>;
    /** The globally unique identifier of the page object. */
    id: Scalars['ID']['output'];
    /** Whether the node is a Comment */
    isComment: Scalars['Boolean']['output'];
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']['output'];
    /** Whether this page is set to the static front page. */
    isFrontPage: Scalars['Boolean']['output'];
    /** Whether this page is set to the blog posts page. */
    isPostsPage: Scalars['Boolean']['output'];
    /** Whether the object is a node in the preview state */
    isPreview?: Maybe<Scalars['Boolean']['output']>;
    /** Whether this page is set to the privacy page. */
    isPrivacyPage: Scalars['Boolean']['output'];
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']['output']>;
    /** True if the node is a revision of another node */
    isRevision?: Maybe<Scalars['Boolean']['output']>;
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']['output'];
    /** Polylang language */
    language?: Maybe<Language>;
    /** The user that most recently edited the node */
    lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
    /** Ingressi */
    lead?: Maybe<Scalars['String']['output']>;
    /** The permalink of the post */
    link?: Maybe<Scalars['String']['output']>;
    /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
    menuOrder?: Maybe<Scalars['Int']['output']>;
    /** The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time. */
    modified?: Maybe<Scalars['String']['output']>;
    /** The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT. */
    modifiedGmt?: Maybe<Scalars['String']['output']>;
    /** Moduuli listaus */
    modules?: Maybe<Array<Maybe<PageModulesUnionType>>>;
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of the databaseId field
     */
    pageId: Scalars['Int']['output'];
    /** The parent of the node. The parent object can be of various types */
    parent?: Maybe<HierarchicalContentNodeToParentContentNodeConnectionEdge>;
    /** Database id of the parent node */
    parentDatabaseId?: Maybe<Scalars['Int']['output']>;
    /** The globally unique identifier of the parent node. */
    parentId?: Maybe<Scalars['ID']['output']>;
    /** Connection between the Page type and the page type */
    preview?: Maybe<PageToPreviewConnectionEdge>;
    /** The database id of the preview node */
    previewRevisionDatabaseId?: Maybe<Scalars['Int']['output']>;
    /** Whether the object is a node in the preview state */
    previewRevisionId?: Maybe<Scalars['ID']['output']>;
    /** If the current node is a revision, this field exposes the node this is a revision of. Returns null if the node is not a revision of another node. */
    revisionOf?: Maybe<NodeWithRevisionsToContentNodeConnectionEdge>;
    /** Connection between the Page type and the page type */
    revisions?: Maybe<PageToRevisionConnection>;
    /** The SEO Framework data of the page */
    seo?: Maybe<Seo>;
    /** Näytä alisivut */
    showChildPages?: Maybe<Scalars['Boolean']['output']>;
    /** Moduuli listaus */
    sidebar?: Maybe<Array<Maybe<PageSidebarUnionType>>>;
    /** The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table. */
    slug?: Maybe<Scalars['String']['output']>;
    /** The current status of the object */
    status?: Maybe<Scalars['String']['output']>;
    /** The template assigned to a node of content */
    template?: Maybe<ContentTemplate>;
    /** The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made. */
    title?: Maybe<Scalars['String']['output']>;
    /** Get specific translation version of this object */
    translation?: Maybe<Page>;
    /** List all translated versions of this post */
    translations?: Maybe<Array<Maybe<Page>>>;
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']['output']>;
  };

/** The page type */
export type PageAncestorsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs>;
};

/** The page type */
export type PageChildrenArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs>;
};

/** The page type */
export type PageContentArgs = {
  format?: InputMaybe<PostObjectFieldFormatEnum>;
};

/** The page type */
export type PageEnqueuedScriptsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The page type */
export type PageEnqueuedStylesheetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The page type */
export type PageRevisionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PageToRevisionConnectionWhereArgs>;
};

/** The page type */
export type PageTitleArgs = {
  format?: InputMaybe<PostObjectFieldFormatEnum>;
};

/** The page type */
export type PageTranslationArgs = {
  language: LanguageCodeEnum;
};

/** Connection to page Nodes */
export type PageConnection = {
  /** A list of edges (relational context) between RootQuery and connected page Nodes */
  edges: Array<PageConnectionEdge>;
  /** A list of connected page Nodes */
  nodes: Array<Page>;
  /** Information about pagination in a connection. */
  pageInfo: PageConnectionPageInfo;
};

/** Edge between a Node and a connected page */
export type PageConnectionEdge = {
  /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The connected page Node */
  node: Page;
};

/** Page Info on the connected PageConnectionEdge */
export type PageConnectionPageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum PageIdType {
  /** Identify a resource by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  Id = 'ID',
  /** Identify a resource by the URI. */
  Uri = 'URI',
}

/** Information about pagination in a connection. */
export type PageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PageModulesUnionType =
  | EventSearch
  | EventSearchCarousel
  | EventSelected
  | EventSelectedCarousel
  | LayoutArticleHighlights
  | LayoutArticles
  | LayoutArticlesCarousel
  | LayoutCard
  | LayoutCards
  | LayoutCollection
  | LayoutContact
  | LayoutContent
  | LayoutImage
  | LayoutImageGallery
  | LayoutPages
  | LayoutPagesCarousel
  | LayoutSocialMediaFeed
  | LayoutSteps
  | LocationsSelected
  | LocationsSelectedCarousel;

export type PageSidebarUnionType =
  | LayoutArticles
  | LayoutCards
  | LayoutLinkList
  | LayoutPages;

/** Connection between the Page type and the page type */
export type PageToPreviewConnectionEdge = Edge &
  OneToOneConnection &
  PageConnectionEdge & {
    __typename?: 'PageToPreviewConnectionEdge';
    /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The node of the connection, without the edges */
    node: Page;
  };

/** Connection between the Page type and the page type */
export type PageToRevisionConnection = Connection &
  PageConnection & {
    __typename?: 'PageToRevisionConnection';
    /** Edges for the PageToRevisionConnection connection */
    edges: Array<PageToRevisionConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Page>;
    /** Information about pagination in a connection. */
    pageInfo: PageToRevisionConnectionPageInfo;
  };

/** An edge in a connection */
export type PageToRevisionConnectionEdge = Edge &
  PageConnectionEdge & {
    __typename?: 'PageToRevisionConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Page;
  };

/** Page Info on the &quot;PageToRevisionConnection&quot; */
export type PageToRevisionConnectionPageInfo = PageConnectionPageInfo &
  PageInfo &
  WpPageInfo & {
    __typename?: 'PageToRevisionConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the PageToRevisionConnection connection */
export type PageToRevisionConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']['input']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']['input']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PalvelukarttaUnit = {
  __typename?: 'PalvelukarttaUnit';
  accessibility_viewpoints?: Maybe<Scalars['String']['output']>;
  address_city_en?: Maybe<Scalars['String']['output']>;
  address_city_fi?: Maybe<Scalars['String']['output']>;
  address_city_sv?: Maybe<Scalars['String']['output']>;
  address_zip?: Maybe<Scalars['String']['output']>;
  call_charge_info_en?: Maybe<Scalars['String']['output']>;
  call_charge_info_fi?: Maybe<Scalars['String']['output']>;
  call_charge_info_sv?: Maybe<Scalars['String']['output']>;
  created_time?: Maybe<Scalars['String']['output']>;
  data_source_url?: Maybe<Scalars['String']['output']>;
  dept_id?: Maybe<Scalars['String']['output']>;
  desc_en?: Maybe<Scalars['String']['output']>;
  desc_fi?: Maybe<Scalars['String']['output']>;
  desc_sv?: Maybe<Scalars['String']['output']>;
  easting_etrs_gk25?: Maybe<Scalars['Int']['output']>;
  easting_etrs_tm35fin?: Maybe<Scalars['Int']['output']>;
  extra_searchwords_en?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  manual_coordinates?: Maybe<Scalars['Boolean']['output']>;
  modified_time?: Maybe<Scalars['String']['output']>;
  name_en?: Maybe<Scalars['String']['output']>;
  name_fi?: Maybe<Scalars['String']['output']>;
  name_sv?: Maybe<Scalars['String']['output']>;
  northing_etrs_gk25?: Maybe<Scalars['Int']['output']>;
  northing_etrs_tm35fin?: Maybe<Scalars['Int']['output']>;
  ontologytree_ids?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  ontologyword_ids?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  ontologyword_ids_enriched?: Maybe<Array<Maybe<Ontologyword>>>;
  org_id?: Maybe<Scalars['String']['output']>;
  organizer_name?: Maybe<Scalars['String']['output']>;
  organizer_type?: Maybe<Scalars['String']['output']>;
  /** Raw palvelukartta Unit fields */
  origin?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  picture_caption_en?: Maybe<Scalars['String']['output']>;
  picture_caption_fi?: Maybe<Scalars['String']['output']>;
  picture_caption_sv?: Maybe<Scalars['String']['output']>;
  picture_url?: Maybe<Scalars['String']['output']>;
  provider_type?: Maybe<Scalars['String']['output']>;
  street_address_en?: Maybe<Scalars['String']['output']>;
  street_address_fi?: Maybe<Scalars['String']['output']>;
  street_address_sv?: Maybe<Scalars['String']['output']>;
  www_en?: Maybe<Scalars['String']['output']>;
  www_fi?: Maybe<Scalars['String']['output']>;
  www_sv?: Maybe<Scalars['String']['output']>;
};

/** TODO: take from Profile */
export type Person = {
  __typename?: 'Person';
  contactDetails?: Maybe<ContactInfo>;
  identificationStrength?: Maybe<IdentificationStrength>;
  meta?: Maybe<NodeMeta>;
  name?: Maybe<Scalars['String']['output']>;
  preferredLanguages?: Maybe<Array<UnifiedSearchLanguageEnum>>;
  preferredMedium?: Maybe<ContactMedium>;
};

export type PhoneNumber = {
  __typename?: 'PhoneNumber';
  countryCode: Scalars['String']['output'];
  restNumber: Scalars['String']['output'];
};

export type Place = {
  __typename?: 'Place';
  addressCountry?: Maybe<Scalars['String']['output']>;
  addressLocality?: Maybe<LocalizedObject>;
  addressRegion?: Maybe<Scalars['String']['output']>;
  contactType?: Maybe<Scalars['String']['output']>;
  createdTime?: Maybe<Scalars['String']['output']>;
  customData?: Maybe<Scalars['String']['output']>;
  dataSource?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  divisions?: Maybe<Array<Division>>;
  email?: Maybe<Scalars['String']['output']>;
  hasUpcomingEvents?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<EventImage>;
  infoUrl?: Maybe<LocalizedObject>;
  internalContext?: Maybe<Scalars['String']['output']>;
  internalId: Scalars['String']['output'];
  internalType?: Maybe<Scalars['String']['output']>;
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  nEvents?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<LocalizedObject>;
  parent?: Maybe<Scalars['ID']['output']>;
  position?: Maybe<PlacePosition>;
  postOfficeBoxNum?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  publisher?: Maybe<Scalars['ID']['output']>;
  replacedBy?: Maybe<Scalars['String']['output']>;
  streetAddress?: Maybe<LocalizedObject>;
  telephone?: Maybe<LocalizedObject>;
};

export type PlaceListResponse = {
  __typename?: 'PlaceListResponse';
  data: Array<Place>;
  meta: Meta;
};

export type PlacePosition = {
  __typename?: 'PlacePosition';
  coordinates: Array<Scalars['Float']['output']>;
  type: Scalars['String']['output'];
};

/** An plugin object */
export type Plugin = Node & {
  __typename?: 'Plugin';
  /** Name of the plugin author(s), may also be a company name. */
  author?: Maybe<Scalars['String']['output']>;
  /** URI for the related author(s)/company website. */
  authorUri?: Maybe<Scalars['String']['output']>;
  /** Description of the plugin. */
  description?: Maybe<Scalars['String']['output']>;
  /** The globally unique identifier of the plugin object. */
  id: Scalars['ID']['output'];
  /** Whether the object is restricted from the current viewer */
  isRestricted?: Maybe<Scalars['Boolean']['output']>;
  /** Display name of the plugin. */
  name?: Maybe<Scalars['String']['output']>;
  /** Plugin path. */
  path?: Maybe<Scalars['String']['output']>;
  /** URI for the plugin website. This is useful for directing users for support requests etc. */
  pluginUri?: Maybe<Scalars['String']['output']>;
  /** Current version of the plugin. */
  version?: Maybe<Scalars['String']['output']>;
};

/** Connection to Plugin Nodes */
export type PluginConnection = {
  /** A list of edges (relational context) between RootQuery and connected Plugin Nodes */
  edges: Array<PluginConnectionEdge>;
  /** A list of connected Plugin Nodes */
  nodes: Array<Plugin>;
  /** Information about pagination in a connection. */
  pageInfo: PluginConnectionPageInfo;
};

/** Edge between a Node and a connected Plugin */
export type PluginConnectionEdge = {
  /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The connected Plugin Node */
  node: Plugin;
};

/** Page Info on the connected PluginConnectionEdge */
export type PluginConnectionPageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The status of the WordPress plugin. */
export enum PluginStatusEnum {
  /** The plugin is currently active. */
  Active = 'ACTIVE',
  /** The plugin is a drop-in plugin. */
  DropIn = 'DROP_IN',
  /** The plugin is currently inactive. */
  Inactive = 'INACTIVE',
  /** The plugin is a must-use plugin. */
  MustUse = 'MUST_USE',
  /** The plugin is activated on the multisite network. */
  NetworkActivated = 'NETWORK_ACTIVATED',
  /** The plugin is installed on the multisite network, but is currently inactive. */
  NetworkInactive = 'NETWORK_INACTIVE',
  /** The plugin is technically active but was paused while loading. */
  Paused = 'PAUSED',
  /** The plugin was active recently. */
  RecentlyActive = 'RECENTLY_ACTIVE',
  /** The plugin has an upgrade available. */
  Upgrade = 'UPGRADE',
}

export type Point = {
  __typename?: 'Point';
  coordinates: Array<Scalars['Float']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

/** The post type */
export type Post = ContentNode &
  DatabaseIdentifier &
  MenuItemLinkable &
  Node &
  NodeWithAuthor &
  NodeWithContentEditor &
  NodeWithFeaturedImage &
  NodeWithRevisions &
  NodeWithTemplate &
  NodeWithTitle &
  Previewable &
  UniformResourceIdentifiable & {
    __typename?: 'Post';
    /** Connection between the NodeWithAuthor type and the User type */
    author?: Maybe<NodeWithAuthorToUserConnectionEdge>;
    /** The database identifier of the author of the node */
    authorDatabaseId?: Maybe<Scalars['Int']['output']>;
    /** The globally unique identifier of the author of the node */
    authorId?: Maybe<Scalars['ID']['output']>;
    /** Breadcrumb fields */
    breadcrumbs?: Maybe<Array<Maybe<Breadcrumb>>>;
    /** Connection between the Post type and the category type */
    categories?: Maybe<PostToCategoryConnection>;
    /** The content of the post. */
    content?: Maybe<Scalars['String']['output']>;
    /** Connection between the ContentNode type and the ContentType type */
    contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
    /** The name of the Content Type the node belongs to */
    contentTypeName: Scalars['String']['output'];
    /** The unique identifier stored in the database */
    databaseId: Scalars['Int']['output'];
    /** Post publishing date. */
    date?: Maybe<Scalars['String']['output']>;
    /** The publishing date set in GMT. */
    dateGmt?: Maybe<Scalars['String']['output']>;
    /** The desired slug of the post */
    desiredSlug?: Maybe<Scalars['String']['output']>;
    /** If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds */
    editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
    /** The RSS enclosure for the object */
    enclosure?: Maybe<Scalars['String']['output']>;
    /** Connection between the ContentNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<ContentNodeToEnqueuedScriptConnection>;
    /** Connection between the ContentNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<ContentNodeToEnqueuedStylesheetConnection>;
    /** Vanhentumisaika */
    expirationTime?: Maybe<Scalars['String']['output']>;
    /** Connection between the NodeWithFeaturedImage type and the MediaItem type */
    featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge>;
    /** The database identifier for the featured image node assigned to the content node */
    featuredImageDatabaseId?: Maybe<Scalars['Int']['output']>;
    /** Globally unique ID of the featured image assigned to the node */
    featuredImageId?: Maybe<Scalars['ID']['output']>;
    /** The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table. */
    guid?: Maybe<Scalars['String']['output']>;
    /** Piilota julkaisupäivämäärä */
    hidePublishedDate?: Maybe<Scalars['Boolean']['output']>;
    /** The globally unique identifier of the post object. */
    id: Scalars['ID']['output'];
    /** Whether the node is a Comment */
    isComment: Scalars['Boolean']['output'];
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']['output'];
    /** Whether the node represents the front page. */
    isFrontPage: Scalars['Boolean']['output'];
    /** Whether  the node represents the blog page. */
    isPostsPage: Scalars['Boolean']['output'];
    /** Whether the object is a node in the preview state */
    isPreview?: Maybe<Scalars['Boolean']['output']>;
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']['output']>;
    /** True if the node is a revision of another node */
    isRevision?: Maybe<Scalars['Boolean']['output']>;
    /** Whether this page is sticky */
    isSticky: Scalars['Boolean']['output'];
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']['output'];
    /** Polylang language */
    language?: Maybe<Language>;
    /** The user that most recently edited the node */
    lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
    /** Ingressi */
    lead?: Maybe<Scalars['String']['output']>;
    /** The permalink of the post */
    link?: Maybe<Scalars['String']['output']>;
    /** The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time. */
    modified?: Maybe<Scalars['String']['output']>;
    /** The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT. */
    modifiedGmt?: Maybe<Scalars['String']['output']>;
    /** Moduuli listaus */
    modules?: Maybe<Array<Maybe<PostModulesUnionType>>>;
    /** Connection between the Post type and the postFormat type */
    postFormats?: Maybe<PostToPostFormatConnection>;
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of the databaseId field
     */
    postId: Scalars['Int']['output'];
    /** Connection between the Post type and the post type */
    preview?: Maybe<PostToPreviewConnectionEdge>;
    /** The database id of the preview node */
    previewRevisionDatabaseId?: Maybe<Scalars['Int']['output']>;
    /** Whether the object is a node in the preview state */
    previewRevisionId?: Maybe<Scalars['ID']['output']>;
    /** If the current node is a revision, this field exposes the node this is a revision of. Returns null if the node is not a revision of another node. */
    revisionOf?: Maybe<NodeWithRevisionsToContentNodeConnectionEdge>;
    /** Connection between the Post type and the post type */
    revisions?: Maybe<PostToRevisionConnection>;
    /** The SEO Framework data of the post */
    seo?: Maybe<Seo>;
    /** Moduuli listaus */
    sidebar?: Maybe<Array<Maybe<PostSidebarUnionType>>>;
    /** The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table. */
    slug?: Maybe<Scalars['String']['output']>;
    /** The current status of the object */
    status?: Maybe<Scalars['String']['output']>;
    /** Connection between the Post type and the tag type */
    tags?: Maybe<PostToTagConnection>;
    /** The template assigned to the node */
    template?: Maybe<ContentTemplate>;
    /** Connection between the Post type and the TermNode type */
    terms?: Maybe<PostToTermNodeConnection>;
    /** The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made. */
    title?: Maybe<Scalars['String']['output']>;
    /** Get specific translation version of this object */
    translation?: Maybe<Post>;
    /** List all translated versions of this post */
    translations?: Maybe<Array<Maybe<Post>>>;
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']['output']>;
  };

/** The post type */
export type PostCategoriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostToCategoryConnectionWhereArgs>;
};

/** The post type */
export type PostContentArgs = {
  format?: InputMaybe<PostObjectFieldFormatEnum>;
};

/** The post type */
export type PostEnqueuedScriptsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The post type */
export type PostEnqueuedStylesheetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The post type */
export type PostPostFormatsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostToPostFormatConnectionWhereArgs>;
};

/** The post type */
export type PostRevisionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostToRevisionConnectionWhereArgs>;
};

/** The post type */
export type PostTagsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostToTagConnectionWhereArgs>;
};

/** The post type */
export type PostTermsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostToTermNodeConnectionWhereArgs>;
};

/** The post type */
export type PostTitleArgs = {
  format?: InputMaybe<PostObjectFieldFormatEnum>;
};

/** The post type */
export type PostTranslationArgs = {
  language: LanguageCodeEnum;
};

/** Set relationships between the post to categories */
export type PostCategoriesInput = {
  /** If true, this will append the category to existing related categories. If false, this will replace existing relationships. Default true. */
  append?: InputMaybe<Scalars['Boolean']['input']>;
  /** The input list of items to set. */
  nodes?: InputMaybe<Array<InputMaybe<PostCategoriesNodeInput>>>;
};

/** List of categories to connect the post to. If an ID is set, it will be used to create the connection. If not, it will look for a slug. If neither are valid existing terms, and the site is configured to allow terms to be created during post mutations, a term will be created using the Name if it exists in the input, then fallback to the slug if it exists. */
export type PostCategoriesNodeInput = {
  /** The description of the category. This field is used to set a description of the category if a new one is created during the mutation. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the category. If present, this will be used to connect to the post. If no existing category exists with this ID, no connection will be made. */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** The name of the category. This field is used to create a new term, if term creation is enabled in nested mutations, and if one does not already exist with the provided slug or ID or if a slug or ID is not provided. If no name is included and a term is created, the creation will fallback to the slug field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The slug of the category. If no ID is present, this field will be used to make a connection. If no existing term exists with this slug, this field will be used as a fallback to the Name field when creating a new term to connect to, if term creation is enabled as a nested mutation. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Connection to post Nodes */
export type PostConnection = {
  /** A list of edges (relational context) between RootQuery and connected post Nodes */
  edges: Array<PostConnectionEdge>;
  /** A list of connected post Nodes */
  nodes: Array<Post>;
  /** Information about pagination in a connection. */
  pageInfo: PostConnectionPageInfo;
};

/** Edge between a Node and a connected post */
export type PostConnectionEdge = {
  /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The connected post Node */
  node: Post;
};

/** Page Info on the connected PostConnectionEdge */
export type PostConnectionPageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The postFormat type */
export type PostFormat = DatabaseIdentifier &
  Node &
  TermNode &
  UniformResourceIdentifiable & {
    __typename?: 'PostFormat';
    /** Connection between the PostFormat type and the ContentNode type */
    contentNodes?: Maybe<PostFormatToContentNodeConnection>;
    /** The number of objects connected to the object */
    count?: Maybe<Scalars['Int']['output']>;
    /** The unique identifier stored in the database */
    databaseId: Scalars['Int']['output'];
    /** The description of the object */
    description?: Maybe<Scalars['String']['output']>;
    /** Connection between the TermNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<TermNodeToEnqueuedScriptConnection>;
    /** Connection between the TermNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<TermNodeToEnqueuedStylesheetConnection>;
    /** The globally unique ID for the object */
    id: Scalars['ID']['output'];
    /** Whether the node is a Comment */
    isComment: Scalars['Boolean']['output'];
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']['output'];
    /** Whether the node represents the front page. */
    isFrontPage: Scalars['Boolean']['output'];
    /** Whether  the node represents the blog page. */
    isPostsPage: Scalars['Boolean']['output'];
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']['output']>;
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']['output'];
    /** The link to the term */
    link?: Maybe<Scalars['String']['output']>;
    /** The human friendly name of the object. */
    name?: Maybe<Scalars['String']['output']>;
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of databaseId
     */
    postFormatId?: Maybe<Scalars['Int']['output']>;
    /** Connection between the PostFormat type and the post type */
    posts?: Maybe<PostFormatToPostConnection>;
    /** An alphanumeric identifier for the object unique to its type. */
    slug?: Maybe<Scalars['String']['output']>;
    /** Connection between the PostFormat type and the Taxonomy type */
    taxonomy?: Maybe<PostFormatToTaxonomyConnectionEdge>;
    /** The name of the taxonomy that the object is associated with */
    taxonomyName?: Maybe<Scalars['String']['output']>;
    /** The ID of the term group that this term object belongs to */
    termGroupId?: Maybe<Scalars['Int']['output']>;
    /** The taxonomy ID that the object is associated with */
    termTaxonomyId?: Maybe<Scalars['Int']['output']>;
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']['output']>;
  };

/** The postFormat type */
export type PostFormatContentNodesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostFormatToContentNodeConnectionWhereArgs>;
};

/** The postFormat type */
export type PostFormatEnqueuedScriptsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The postFormat type */
export type PostFormatEnqueuedStylesheetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The postFormat type */
export type PostFormatPostsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostFormatToPostConnectionWhereArgs>;
};

/** Connection to postFormat Nodes */
export type PostFormatConnection = {
  /** A list of edges (relational context) between RootQuery and connected postFormat Nodes */
  edges: Array<PostFormatConnectionEdge>;
  /** A list of connected postFormat Nodes */
  nodes: Array<PostFormat>;
  /** Information about pagination in a connection. */
  pageInfo: PostFormatConnectionPageInfo;
};

/** Edge between a Node and a connected postFormat */
export type PostFormatConnectionEdge = {
  /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The connected postFormat Node */
  node: PostFormat;
};

/** Page Info on the connected PostFormatConnectionEdge */
export type PostFormatConnectionPageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum PostFormatIdType {
  /** The Database ID for the node */
  DatabaseId = 'DATABASE_ID',
  /** The hashed Global ID */
  Id = 'ID',
  /** The name of the node */
  Name = 'NAME',
  /** Url friendly name of the node */
  Slug = 'SLUG',
  /** The URI for the node */
  Uri = 'URI',
}

/** Connection between the PostFormat type and the ContentNode type */
export type PostFormatToContentNodeConnection = Connection &
  ContentNodeConnection & {
    __typename?: 'PostFormatToContentNodeConnection';
    /** Edges for the PostFormatToContentNodeConnection connection */
    edges: Array<PostFormatToContentNodeConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<ContentNode>;
    /** Information about pagination in a connection. */
    pageInfo: PostFormatToContentNodeConnectionPageInfo;
  };

/** An edge in a connection */
export type PostFormatToContentNodeConnectionEdge = ContentNodeConnectionEdge &
  Edge & {
    __typename?: 'PostFormatToContentNodeConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: ContentNode;
  };

/** Page Info on the &quot;PostFormatToContentNodeConnection&quot; */
export type PostFormatToContentNodeConnectionPageInfo =
  ContentNodeConnectionPageInfo &
    PageInfo &
    WpPageInfo & {
      __typename?: 'PostFormatToContentNodeConnectionPageInfo';
      /** When paginating forwards, the cursor to continue. */
      endCursor?: Maybe<Scalars['String']['output']>;
      /** When paginating forwards, are there more items? */
      hasNextPage: Scalars['Boolean']['output'];
      /** When paginating backwards, are there more items? */
      hasPreviousPage: Scalars['Boolean']['output'];
      /** When paginating backwards, the cursor to continue. */
      startCursor?: Maybe<Scalars['String']['output']>;
    };

/** Arguments for filtering the PostFormatToContentNodeConnection connection */
export type PostFormatToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypesOfPostFormatEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the PostFormat type and the post type */
export type PostFormatToPostConnection = Connection &
  PostConnection & {
    __typename?: 'PostFormatToPostConnection';
    /** Edges for the PostFormatToPostConnection connection */
    edges: Array<PostFormatToPostConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Post>;
    /** Information about pagination in a connection. */
    pageInfo: PostFormatToPostConnectionPageInfo;
  };

/** An edge in a connection */
export type PostFormatToPostConnectionEdge = Edge &
  PostConnectionEdge & {
    __typename?: 'PostFormatToPostConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Post;
  };

/** Page Info on the &quot;PostFormatToPostConnection&quot; */
export type PostFormatToPostConnectionPageInfo = PageInfo &
  PostConnectionPageInfo &
  WpPageInfo & {
    __typename?: 'PostFormatToPostConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the PostFormatToPostConnection connection */
export type PostFormatToPostConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']['input']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']['input']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Category ID */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Use Category Slug */
  categoryName?: InputMaybe<Scalars['String']['input']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Use Tag ID */
  tagId?: InputMaybe<Scalars['String']['input']>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of tag slugs, used to display objects from one tag AND another */
  tagSlugAnd?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of tag slugs, used to include objects in ANY specified tags */
  tagSlugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the PostFormat type and the Taxonomy type */
export type PostFormatToTaxonomyConnectionEdge = Edge &
  OneToOneConnection &
  TaxonomyConnectionEdge & {
    __typename?: 'PostFormatToTaxonomyConnectionEdge';
    /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The node of the connection, without the edges */
    node: Taxonomy;
  };

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum PostIdType {
  /** Identify a resource by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  Id = 'ID',
  /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
  Slug = 'SLUG',
  /** Identify a resource by the URI. */
  Uri = 'URI',
}

export type PostModulesUnionType =
  | EventSearch
  | EventSearchCarousel
  | EventSelected
  | EventSelectedCarousel
  | LayoutArticleHighlights
  | LayoutArticles
  | LayoutArticlesCarousel
  | LayoutCard
  | LayoutCards
  | LayoutCollection
  | LayoutContact
  | LayoutContent
  | LayoutImage
  | LayoutImageGallery
  | LayoutPages
  | LayoutPagesCarousel
  | LayoutSocialMediaFeed
  | LayoutSteps
  | LocationsSelected
  | LocationsSelectedCarousel;

/** The format of post field data. */
export enum PostObjectFieldFormatEnum {
  /** Provide the field value directly from database. Null on unauthenticated requests. */
  Raw = 'RAW',
  /** Provide the field value as rendered by WordPress. Default. */
  Rendered = 'RENDERED',
}

/** The column to use when filtering by date */
export enum PostObjectsConnectionDateColumnEnum {
  /** The date the comment was created in local time. */
  Date = 'DATE',
  /** The most recent modification date of the comment. */
  Modified = 'MODIFIED',
}

/** Field to order the connection by */
export enum PostObjectsConnectionOrderbyEnum {
  /** Order by author */
  Author = 'AUTHOR',
  /** Order by the number of comments it has acquired */
  CommentCount = 'COMMENT_COUNT',
  /** Order by publish date */
  Date = 'DATE',
  /** Preserve the ID order given in the IN array */
  In = 'IN',
  /** Order by the menu order value */
  MenuOrder = 'MENU_ORDER',
  /** Order by last modified date */
  Modified = 'MODIFIED',
  /** Preserve slug order given in the NAME_IN array */
  NameIn = 'NAME_IN',
  /** Order by parent ID */
  Parent = 'PARENT',
  /** Order by slug */
  Slug = 'SLUG',
  /** Order by title */
  Title = 'TITLE',
}

/** Options for ordering the connection */
export type PostObjectsConnectionOrderbyInput = {
  /** The field to order the connection by */
  field: PostObjectsConnectionOrderbyEnum;
  /** Possible directions in which to order a list of items */
  order: OrderEnum;
};

/** Set relationships between the post to postFormats */
export type PostPostFormatsInput = {
  /** If true, this will append the postFormat to existing related postFormats. If false, this will replace existing relationships. Default true. */
  append?: InputMaybe<Scalars['Boolean']['input']>;
  /** The input list of items to set. */
  nodes?: InputMaybe<Array<InputMaybe<PostPostFormatsNodeInput>>>;
};

/** List of postFormats to connect the post to. If an ID is set, it will be used to create the connection. If not, it will look for a slug. If neither are valid existing terms, and the site is configured to allow terms to be created during post mutations, a term will be created using the Name if it exists in the input, then fallback to the slug if it exists. */
export type PostPostFormatsNodeInput = {
  /** The description of the postFormat. This field is used to set a description of the postFormat if a new one is created during the mutation. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the postFormat. If present, this will be used to connect to the post. If no existing postFormat exists with this ID, no connection will be made. */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** The name of the postFormat. This field is used to create a new term, if term creation is enabled in nested mutations, and if one does not already exist with the provided slug or ID or if a slug or ID is not provided. If no name is included and a term is created, the creation will fallback to the slug field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The slug of the postFormat. If no ID is present, this field will be used to make a connection. If no existing term exists with this slug, this field will be used as a fallback to the Name field when creating a new term to connect to, if term creation is enabled as a nested mutation. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type PostSidebarUnionType =
  | LayoutArticles
  | LayoutCards
  | LayoutLinkList
  | LayoutPages;

/** The status of the object. */
export enum PostStatusEnum {
  /** Objects with the acf-disabled status */
  AcfDisabled = 'ACF_DISABLED',
  /** Objects with the auto-draft status */
  AutoDraft = 'AUTO_DRAFT',
  /** Objects with the dp-rewrite-republish status */
  DpRewriteRepublish = 'DP_REWRITE_REPUBLISH',
  /** Objects with the draft status */
  Draft = 'DRAFT',
  /** Objects with the draft-revision status */
  DraftRevision = 'DRAFT_REVISION',
  /** Objects with the future status */
  Future = 'FUTURE',
  /** Objects with the future-revision status */
  FutureRevision = 'FUTURE_REVISION',
  /** Objects with the inherit status */
  Inherit = 'INHERIT',
  /** Objects with the pending status */
  Pending = 'PENDING',
  /** Objects with the pending-revision status */
  PendingRevision = 'PENDING_REVISION',
  /** Objects with the private status */
  Private = 'PRIVATE',
  /** Objects with the publish status */
  Publish = 'PUBLISH',
  /** Objects with the request-completed status */
  RequestCompleted = 'REQUEST_COMPLETED',
  /** Objects with the request-confirmed status */
  RequestConfirmed = 'REQUEST_CONFIRMED',
  /** Objects with the request-failed status */
  RequestFailed = 'REQUEST_FAILED',
  /** Objects with the request-pending status */
  RequestPending = 'REQUEST_PENDING',
  /** Objects with the trash status */
  Trash = 'TRASH',
  /** Objects with the wp_stream_disabled status */
  WpStreamDisabled = 'WP_STREAM_DISABLED',
  /** Objects with the wp_stream_enabled status */
  WpStreamEnabled = 'WP_STREAM_ENABLED',
}

/** Set relationships between the post to tags */
export type PostTagsInput = {
  /** If true, this will append the tag to existing related tags. If false, this will replace existing relationships. Default true. */
  append?: InputMaybe<Scalars['Boolean']['input']>;
  /** The input list of items to set. */
  nodes?: InputMaybe<Array<InputMaybe<PostTagsNodeInput>>>;
};

/** List of tags to connect the post to. If an ID is set, it will be used to create the connection. If not, it will look for a slug. If neither are valid existing terms, and the site is configured to allow terms to be created during post mutations, a term will be created using the Name if it exists in the input, then fallback to the slug if it exists. */
export type PostTagsNodeInput = {
  /** The description of the tag. This field is used to set a description of the tag if a new one is created during the mutation. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the tag. If present, this will be used to connect to the post. If no existing tag exists with this ID, no connection will be made. */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** The name of the tag. This field is used to create a new term, if term creation is enabled in nested mutations, and if one does not already exist with the provided slug or ID or if a slug or ID is not provided. If no name is included and a term is created, the creation will fallback to the slug field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The slug of the tag. If no ID is present, this field will be used to make a connection. If no existing term exists with this slug, this field will be used as a fallback to the Name field when creating a new term to connect to, if term creation is enabled as a nested mutation. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the Post type and the category type */
export type PostToCategoryConnection = CategoryConnection &
  Connection & {
    __typename?: 'PostToCategoryConnection';
    /** Edges for the PostToCategoryConnection connection */
    edges: Array<PostToCategoryConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Category>;
    /** Information about pagination in a connection. */
    pageInfo: PostToCategoryConnectionPageInfo;
  };

/** An edge in a connection */
export type PostToCategoryConnectionEdge = CategoryConnectionEdge &
  Edge & {
    __typename?: 'PostToCategoryConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Category;
  };

/** Page Info on the &quot;PostToCategoryConnection&quot; */
export type PostToCategoryConnectionPageInfo = CategoryConnectionPageInfo &
  PageInfo &
  WpPageInfo & {
    __typename?: 'PostToCategoryConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the PostToCategoryConnection connection */
export type PostToCategoryConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Connection between the Post type and the postFormat type */
export type PostToPostFormatConnection = Connection &
  PostFormatConnection & {
    __typename?: 'PostToPostFormatConnection';
    /** Edges for the PostToPostFormatConnection connection */
    edges: Array<PostToPostFormatConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<PostFormat>;
    /** Information about pagination in a connection. */
    pageInfo: PostToPostFormatConnectionPageInfo;
  };

/** An edge in a connection */
export type PostToPostFormatConnectionEdge = Edge &
  PostFormatConnectionEdge & {
    __typename?: 'PostToPostFormatConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: PostFormat;
  };

/** Page Info on the &quot;PostToPostFormatConnection&quot; */
export type PostToPostFormatConnectionPageInfo = PageInfo &
  PostFormatConnectionPageInfo &
  WpPageInfo & {
    __typename?: 'PostToPostFormatConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the PostToPostFormatConnection connection */
export type PostToPostFormatConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Connection between the Post type and the post type */
export type PostToPreviewConnectionEdge = Edge &
  OneToOneConnection &
  PostConnectionEdge & {
    __typename?: 'PostToPreviewConnectionEdge';
    /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The node of the connection, without the edges */
    node: Post;
  };

/** Connection between the Post type and the post type */
export type PostToRevisionConnection = Connection &
  PostConnection & {
    __typename?: 'PostToRevisionConnection';
    /** Edges for the PostToRevisionConnection connection */
    edges: Array<PostToRevisionConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Post>;
    /** Information about pagination in a connection. */
    pageInfo: PostToRevisionConnectionPageInfo;
  };

/** An edge in a connection */
export type PostToRevisionConnectionEdge = Edge &
  PostConnectionEdge & {
    __typename?: 'PostToRevisionConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Post;
  };

/** Page Info on the &quot;PostToRevisionConnection&quot; */
export type PostToRevisionConnectionPageInfo = PageInfo &
  PostConnectionPageInfo &
  WpPageInfo & {
    __typename?: 'PostToRevisionConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the PostToRevisionConnection connection */
export type PostToRevisionConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']['input']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']['input']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Category ID */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Use Category Slug */
  categoryName?: InputMaybe<Scalars['String']['input']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Use Tag ID */
  tagId?: InputMaybe<Scalars['String']['input']>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of tag slugs, used to display objects from one tag AND another */
  tagSlugAnd?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of tag slugs, used to include objects in ANY specified tags */
  tagSlugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the Post type and the tag type */
export type PostToTagConnection = Connection &
  TagConnection & {
    __typename?: 'PostToTagConnection';
    /** Edges for the PostToTagConnection connection */
    edges: Array<PostToTagConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Tag>;
    /** Information about pagination in a connection. */
    pageInfo: PostToTagConnectionPageInfo;
  };

/** An edge in a connection */
export type PostToTagConnectionEdge = Edge &
  TagConnectionEdge & {
    __typename?: 'PostToTagConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Tag;
  };

/** Page Info on the &quot;PostToTagConnection&quot; */
export type PostToTagConnectionPageInfo = PageInfo &
  TagConnectionPageInfo &
  WpPageInfo & {
    __typename?: 'PostToTagConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the PostToTagConnection connection */
export type PostToTagConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Connection between the Post type and the TermNode type */
export type PostToTermNodeConnection = Connection &
  TermNodeConnection & {
    __typename?: 'PostToTermNodeConnection';
    /** Edges for the PostToTermNodeConnection connection */
    edges: Array<PostToTermNodeConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<TermNode>;
    /** Information about pagination in a connection. */
    pageInfo: PostToTermNodeConnectionPageInfo;
  };

/** An edge in a connection */
export type PostToTermNodeConnectionEdge = Edge &
  TermNodeConnectionEdge & {
    __typename?: 'PostToTermNodeConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: TermNode;
  };

/** Page Info on the &quot;PostToTermNodeConnection&quot; */
export type PostToTermNodeConnectionPageInfo = PageInfo &
  TermNodeConnectionPageInfo &
  WpPageInfo & {
    __typename?: 'PostToTermNodeConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the PostToTermNodeConnection connection */
export type PostToTermNodeConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** The Taxonomy to filter terms by */
  taxonomies?: InputMaybe<Array<InputMaybe<TaxonomyEnum>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Details for labels of the PostType */
export type PostTypeLabelDetails = {
  __typename?: 'PostTypeLabelDetails';
  /** Default is ‘Add New’ for both hierarchical and non-hierarchical types. */
  addNew?: Maybe<Scalars['String']['output']>;
  /** Label for adding a new singular item. */
  addNewItem?: Maybe<Scalars['String']['output']>;
  /** Label to signify all items in a submenu link. */
  allItems?: Maybe<Scalars['String']['output']>;
  /** Label for archives in nav menus */
  archives?: Maybe<Scalars['String']['output']>;
  /** Label for the attributes meta box. */
  attributes?: Maybe<Scalars['String']['output']>;
  /** Label for editing a singular item. */
  editItem?: Maybe<Scalars['String']['output']>;
  /** Label for the Featured Image meta box title. */
  featuredImage?: Maybe<Scalars['String']['output']>;
  /** Label for the table views hidden heading. */
  filterItemsList?: Maybe<Scalars['String']['output']>;
  /** Label for the media frame button. */
  insertIntoItem?: Maybe<Scalars['String']['output']>;
  /** Label for the table hidden heading. */
  itemsList?: Maybe<Scalars['String']['output']>;
  /** Label for the table pagination hidden heading. */
  itemsListNavigation?: Maybe<Scalars['String']['output']>;
  /** Label for the menu name. */
  menuName?: Maybe<Scalars['String']['output']>;
  /** General name for the post type, usually plural. */
  name?: Maybe<Scalars['String']['output']>;
  /** Label for the new item page title. */
  newItem?: Maybe<Scalars['String']['output']>;
  /** Label used when no items are found. */
  notFound?: Maybe<Scalars['String']['output']>;
  /** Label used when no items are in the trash. */
  notFoundInTrash?: Maybe<Scalars['String']['output']>;
  /** Label used to prefix parents of hierarchical items. */
  parentItemColon?: Maybe<Scalars['String']['output']>;
  /** Label for removing the featured image. */
  removeFeaturedImage?: Maybe<Scalars['String']['output']>;
  /** Label for searching plural items. */
  searchItems?: Maybe<Scalars['String']['output']>;
  /** Label for setting the featured image. */
  setFeaturedImage?: Maybe<Scalars['String']['output']>;
  /** Name for one object of this post type. */
  singularName?: Maybe<Scalars['String']['output']>;
  /** Label for the media frame filter. */
  uploadedToThisItem?: Maybe<Scalars['String']['output']>;
  /** Label in the media frame for using a featured image. */
  useFeaturedImage?: Maybe<Scalars['String']['output']>;
  /** Label for viewing a singular item. */
  viewItem?: Maybe<Scalars['String']['output']>;
  /** Label for viewing post type archives. */
  viewItems?: Maybe<Scalars['String']['output']>;
};

/** Nodes that can be seen in a preview (unpublished) state. */
export type Previewable = {
  /** Whether the object is a node in the preview state */
  isPreview?: Maybe<Scalars['Boolean']['output']>;
  /** The database id of the preview node */
  previewRevisionDatabaseId?: Maybe<Scalars['Int']['output']>;
  /** Whether the object is a node in the preview state */
  previewRevisionId?: Maybe<Scalars['ID']['output']>;
};

export enum ProviderType {
  Association = 'ASSOCIATION',
  ContractSchool = 'CONTRACT_SCHOOL',
  Municipality = 'MUNICIPALITY',
  OtherProductionMethod = 'OTHER_PRODUCTION_METHOD',
  PaymentCommitment = 'PAYMENT_COMMITMENT',
  PrivateCompany = 'PRIVATE_COMPANY',
  PurchasedService = 'PURCHASED_SERVICE',
  SelfProduced = 'SELF_PRODUCED',
  SupportedOperations = 'SUPPORTED_OPERATIONS',
  UnknownProductionMethod = 'UNKNOWN_PRODUCTION_METHOD',
  VoucherService = 'VOUCHER_SERVICE',
}

/** The root entry point into the Graph */
export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']['output']>;
  administrativeDivisions?: Maybe<Array<Maybe<AdministrativeDivision>>>;
  /** Entry point to get all settings for the site */
  allSettings?: Maybe<Settings>;
  /** Connection between the RootQuery type and the category type */
  categories?: Maybe<RootQueryToCategoryConnection>;
  /** A 0bject */
  category?: Maybe<Category>;
  /** An object of the collection Type. Collections */
  collection?: Maybe<Collection>;
  /**
   * A collection object
   * @deprecated Deprecated in favor of using the single entry point for this type with ID and IDType fields. For example, instead of postBy( id: &quot;&quot; ), use post(id: &quot;&quot; idType: &quot;&quot;)
   */
  collectionBy?: Maybe<Collection>;
  /** Connection between the RootQuery type and the collection type */
  collections?: Maybe<RootQueryToCollectionConnection>;
  /** Returns a Comment */
  comment?: Maybe<Comment>;
  /** Connection between the RootQuery type and the Comment type */
  comments?: Maybe<RootQueryToCommentConnection>;
  /** An object of the contact Type. Contacts */
  contact?: Maybe<Contact>;
  /**
   * A contact object
   * @deprecated Deprecated in favor of using the single entry point for this type with ID and IDType fields. For example, instead of postBy( id: &quot;&quot; ), use post(id: &quot;&quot; idType: &quot;&quot;)
   */
  contactBy?: Maybe<Contact>;
  /** Connection between the RootQuery type and the contact type */
  contacts?: Maybe<RootQueryToContactConnection>;
  /** A node used to manage content */
  contentNode?: Maybe<ContentNode>;
  /** Connection between the RootQuery type and the ContentNode type */
  contentNodes?: Maybe<RootQueryToContentNodeConnection>;
  /** Fetch a Content Type node by unique Identifier */
  contentType?: Maybe<ContentType>;
  /** Connection between the RootQuery type and the ContentType type */
  contentTypes?: Maybe<RootQueryToContentTypeConnection>;
  /** Oletuskuvat */
  defaultImages?: Maybe<DefaultImages>;
  /** Get language list */
  defaultLanguage?: Maybe<Language>;
  /** Fields of the &#039;DiscussionSettings&#039; settings group */
  discussionSettings?: Maybe<DiscussionSettings>;
  eventDetails: EventDetails;
  eventList: EventListResponse;
  eventsByIds: EventListResponse;
  /** Fields of the &#039;GeneralSettings&#039; settings group */
  generalSettings?: Maybe<GeneralSettings>;
  keywordDetails: Keyword;
  keywordList: KeywordListResponse;
  /** An object of the landingPage Type. Landing Pages */
  landingPage?: Maybe<LandingPage>;
  /**
   * A landingPage object
   * @deprecated Deprecated in favor of using the single entry point for this type with ID and IDType fields. For example, instead of postBy( id: &quot;&quot; ), use post(id: &quot;&quot; idType: &quot;&quot;)
   */
  landingPageBy?: Maybe<LandingPage>;
  /** Connection between the RootQuery type and the landingPage type */
  landingPages?: Maybe<RootQueryToLandingPageConnection>;
  /** List available languages */
  languages?: Maybe<Array<Maybe<Language>>>;
  /** An object of the mediaItem Type.  */
  mediaItem?: Maybe<MediaItem>;
  /**
   * A mediaItem object
   * @deprecated Deprecated in favor of using the single entry point for this type with ID and IDType fields. For example, instead of postBy( id: &quot;&quot; ), use post(id: &quot;&quot; idType: &quot;&quot;)
   */
  mediaItemBy?: Maybe<MediaItem>;
  /** Connection between the RootQuery type and the mediaItem type */
  mediaItems?: Maybe<RootQueryToMediaItemConnection>;
  /** A WordPress navigation menu */
  menu?: Maybe<Menu>;
  /** A WordPress navigation menu item */
  menuItem?: Maybe<MenuItem>;
  /** Connection between the RootQuery type and the MenuItem type */
  menuItems?: Maybe<RootQueryToMenuItemConnection>;
  /** Connection between the RootQuery type and the Menu type */
  menus?: Maybe<RootQueryToMenuConnection>;
  neighborhoodList: NeighborhoodListResponse;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Fetches an object given its Unique Resource Identifier */
  nodeByUri?: Maybe<UniformResourceIdentifiable>;
  notification?: Maybe<Notification>;
  ontologyTree?: Maybe<Array<Maybe<OntologyTree>>>;
  ontologyWords?: Maybe<Array<Maybe<OntologyWord>>>;
  organizationDetails: OrganizationDetails;
  /** An object of the page Type.  */
  page?: Maybe<Page>;
  /**
   * A page object
   * @deprecated Deprecated in favor of using the single entry point for this type with ID and IDType fields. For example, instead of postBy( id: &quot;&quot; ), use post(id: &quot;&quot; idType: &quot;&quot;)
   */
  pageBy?: Maybe<Page>;
  /** Palauttaa sivun ID:n, joka käyttää annettua sivupohjaa */
  pageByTemplate?: Maybe<Page>;
  /** Connection between the RootQuery type and the page type */
  pages?: Maybe<RootQueryToPageConnection>;
  placeDetails: Place;
  placeList: PlaceListResponse;
  /** A WordPress plugin */
  plugin?: Maybe<Plugin>;
  /** Connection between the RootQuery type and the Plugin type */
  plugins?: Maybe<RootQueryToPluginConnection>;
  /** An object of the post Type.  */
  post?: Maybe<Post>;
  /**
   * A post object
   * @deprecated Deprecated in favor of using the single entry point for this type with ID and IDType fields. For example, instead of postBy( id: &quot;&quot; ), use post(id: &quot;&quot; idType: &quot;&quot;)
   */
  postBy?: Maybe<Post>;
  /** A 0bject */
  postFormat?: Maybe<PostFormat>;
  /** Connection between the RootQuery type and the postFormat type */
  postFormats?: Maybe<RootQueryToPostFormatConnection>;
  /** Connection between the RootQuery type and the post type */
  posts?: Maybe<RootQueryToPostConnection>;
  /** Fields of the &#039;ReadingSettings&#039; settings group */
  readingSettings?: Maybe<ReadingSettings>;
  /** Connection between the RootQuery type and the EnqueuedScript type */
  registeredScripts?: Maybe<RootQueryToEnqueuedScriptConnection>;
  /** Connection between the RootQuery type and the EnqueuedStylesheet type */
  registeredStylesheets?: Maybe<RootQueryToEnqueuedStylesheetConnection>;
  /** An object of the release Type. Releases */
  release?: Maybe<Release>;
  /**
   * A release object
   * @deprecated Deprecated in favor of using the single entry point for this type with ID and IDType fields. For example, instead of postBy( id: &quot;&quot; ), use post(id: &quot;&quot; idType: &quot;&quot;)
   */
  releaseBy?: Maybe<Release>;
  /** Connection between the RootQuery type and the release type */
  releases?: Maybe<RootQueryToReleaseConnection>;
  /** Connection between the RootQuery type and the ContentNode type */
  revisions?: Maybe<RootQueryToRevisionsConnection>;
  /** The SEO Framework settings */
  seoSettings?: Maybe<SeoSettings>;
  /** Sivuston asetukset */
  siteSettings?: Maybe<SiteSettings>;
  /** A 0bject */
  tag?: Maybe<Tag>;
  /** Connection between the RootQuery type and the tag type */
  tags?: Maybe<RootQueryToTagConnection>;
  /** Connection between the RootQuery type and the Taxonomy type */
  taxonomies?: Maybe<RootQueryToTaxonomyConnection>;
  /** Fetch a Taxonomy node by unique Identifier */
  taxonomy?: Maybe<Taxonomy>;
  /** A node in a taxonomy used to group and relate content nodes */
  termNode?: Maybe<TermNode>;
  /** Connection between the RootQuery type and the TermNode type */
  terms?: Maybe<RootQueryToTermNodeConnection>;
  /** A Theme object */
  theme?: Maybe<Theme>;
  /** Connection between the RootQuery type and the Theme type */
  themes?: Maybe<RootQueryToThemeConnection>;
  /** Translate string using pll_translate_string() (Polylang) */
  translateString?: Maybe<Scalars['String']['output']>;
  /** An object of the translation Type. Translations */
  translation?: Maybe<Translation>;
  /**
   * A translation object
   * @deprecated Deprecated in favor of using the single entry point for this type with ID and IDType fields. For example, instead of postBy( id: &quot;&quot; ), use post(id: &quot;&quot; idType: &quot;&quot;)
   */
  translationBy?: Maybe<Translation>;
  /** Connection between the RootQuery type and the translation type */
  translations?: Maybe<RootQueryToTranslationConnection>;
  unifiedSearch?: Maybe<SearchResultConnection>;
  unifiedSearchCompletionSuggestions?: Maybe<SearchSuggestionConnection>;
  /** Returns a user */
  user?: Maybe<User>;
  /** Returns a user role */
  userRole?: Maybe<UserRole>;
  /** Connection between the RootQuery type and the UserRole type */
  userRoles?: Maybe<RootQueryToUserRoleConnection>;
  /** Connection between the RootQuery type and the User type */
  users?: Maybe<RootQueryToUserConnection>;
  venue: Venue;
  venuesByIds: Array<Venue>;
  /** Returns the current user */
  viewer?: Maybe<User>;
  /** Fields of the &#039;WritingSettings&#039; settings group */
  writingSettings?: Maybe<WritingSettings>;
};

/** The root entry point into the Graph */
export type QueryAdministrativeDivisionsArgs = {
  helsinkiCommonOnly?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The root entry point into the Graph */
export type QueryCategoriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RootQueryToCategoryConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type QueryCategoryArgs = {
  id: Scalars['ID']['input'];
  idType?: InputMaybe<CategoryIdType>;
};

/** The root entry point into the Graph */
export type QueryCollectionArgs = {
  asPreview?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  idType?: InputMaybe<CollectionIdType>;
};

/** The root entry point into the Graph */
export type QueryCollectionByArgs = {
  collectionId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  uri?: InputMaybe<Scalars['String']['input']>;
};

/** The root entry point into the Graph */
export type QueryCollectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RootQueryToCollectionConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type QueryCommentArgs = {
  id: Scalars['ID']['input'];
  idType?: InputMaybe<CommentNodeIdTypeEnum>;
};

/** The root entry point into the Graph */
export type QueryCommentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RootQueryToCommentConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type QueryContactArgs = {
  asPreview?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  idType?: InputMaybe<ContactIdType>;
};

/** The root entry point into the Graph */
export type QueryContactByArgs = {
  contactId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  uri?: InputMaybe<Scalars['String']['input']>;
};

/** The root entry point into the Graph */
export type QueryContactsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RootQueryToContactConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type QueryContentNodeArgs = {
  asPreview?: InputMaybe<Scalars['Boolean']['input']>;
  contentType?: InputMaybe<ContentTypeEnum>;
  id: Scalars['ID']['input'];
  idType?: InputMaybe<ContentNodeIdTypeEnum>;
};

/** The root entry point into the Graph */
export type QueryContentNodesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RootQueryToContentNodeConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type QueryContentTypeArgs = {
  id: Scalars['ID']['input'];
  idType?: InputMaybe<ContentTypeIdTypeEnum>;
};

/** The root entry point into the Graph */
export type QueryContentTypesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The root entry point into the Graph */
export type QueryDefaultImagesArgs = {
  language: Scalars['String']['input'];
};

/** The root entry point into the Graph */
export type QueryEventDetailsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  include?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** The root entry point into the Graph */
export type QueryEventListArgs = {
  allOngoing?: InputMaybe<Scalars['Boolean']['input']>;
  allOngoingAnd?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  allOngoingOr?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  audienceMaxAgeGt?: InputMaybe<Scalars['String']['input']>;
  audienceMaxAgeLt?: InputMaybe<Scalars['String']['input']>;
  audienceMinAgeGt?: InputMaybe<Scalars['String']['input']>;
  audienceMinAgeLt?: InputMaybe<Scalars['String']['input']>;
  combinedText?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  division?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  end?: InputMaybe<Scalars['String']['input']>;
  endsAfter?: InputMaybe<Scalars['String']['input']>;
  endsBefore?: InputMaybe<Scalars['String']['input']>;
  eventType?: InputMaybe<Array<InputMaybe<EventTypeId>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  inLanguage?: InputMaybe<Scalars['String']['input']>;
  include?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internetBased?: InputMaybe<Scalars['Boolean']['input']>;
  internetOngoingAnd?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  internetOngoingOr?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  isFree?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywordAnd?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywordNot?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywordOrSet1?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywordOrSet2?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywordOrSet3?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  language?: InputMaybe<Scalars['String']['input']>;
  localOngoingAnd?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  localOngoingOr?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  localOngoingOrSet1?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  localOngoingOrSet2?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  localOngoingOrSet3?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  location?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  publisher?: InputMaybe<Scalars['ID']['input']>;
  publisherAncestor?: InputMaybe<Scalars['ID']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
  startsAfter?: InputMaybe<Scalars['String']['input']>;
  startsBefore?: InputMaybe<Scalars['String']['input']>;
  suitableFor?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  superEvent?: InputMaybe<Scalars['ID']['input']>;
  superEventType?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  text?: InputMaybe<Scalars['String']['input']>;
  translation?: InputMaybe<Scalars['String']['input']>;
  xFullText?: InputMaybe<Scalars['String']['input']>;
  xOngoing?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The root entry point into the Graph */
export type QueryEventsByIdsArgs = {
  end?: InputMaybe<Scalars['String']['input']>;
  eventType?: InputMaybe<Array<InputMaybe<EventTypeId>>>;
  ids: Array<Scalars['ID']['input']>;
  include?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};

/** The root entry point into the Graph */
export type QueryKeywordDetailsArgs = {
  id: Scalars['ID']['input'];
};

/** The root entry point into the Graph */
export type QueryKeywordListArgs = {
  dataSource?: InputMaybe<Scalars['String']['input']>;
  hasUpcomingEvents?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  showAllKeywords?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

/** The root entry point into the Graph */
export type QueryLandingPageArgs = {
  asPreview?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  idType?: InputMaybe<LandingPageIdType>;
};

/** The root entry point into the Graph */
export type QueryLandingPageByArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  landingPageId?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  uri?: InputMaybe<Scalars['String']['input']>;
};

/** The root entry point into the Graph */
export type QueryLandingPagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RootQueryToLandingPageConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type QueryMediaItemArgs = {
  asPreview?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  idType?: InputMaybe<MediaItemIdType>;
};

/** The root entry point into the Graph */
export type QueryMediaItemByArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  mediaItemId?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  uri?: InputMaybe<Scalars['String']['input']>;
};

/** The root entry point into the Graph */
export type QueryMediaItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RootQueryToMediaItemConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type QueryMenuArgs = {
  id: Scalars['ID']['input'];
  idType?: InputMaybe<MenuNodeIdTypeEnum>;
};

/** The root entry point into the Graph */
export type QueryMenuItemArgs = {
  id: Scalars['ID']['input'];
  idType?: InputMaybe<MenuItemNodeIdTypeEnum>;
};

/** The root entry point into the Graph */
export type QueryMenuItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RootQueryToMenuItemConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type QueryMenusArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RootQueryToMenuConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type QueryNodeArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

/** The root entry point into the Graph */
export type QueryNodeByUriArgs = {
  uri: Scalars['String']['input'];
};

/** The root entry point into the Graph */
export type QueryNotificationArgs = {
  language: Scalars['String']['input'];
};

/** The root entry point into the Graph */
export type QueryOntologyTreeArgs = {
  leavesOnly?: InputMaybe<Scalars['Boolean']['input']>;
  rootId?: InputMaybe<Scalars['ID']['input']>;
};

/** The root entry point into the Graph */
export type QueryOntologyWordsArgs = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
};

/** The root entry point into the Graph */
export type QueryOrganizationDetailsArgs = {
  id: Scalars['ID']['input'];
};

/** The root entry point into the Graph */
export type QueryPageArgs = {
  asPreview?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  idType?: InputMaybe<PageIdType>;
};

/** The root entry point into the Graph */
export type QueryPageByArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  pageId?: InputMaybe<Scalars['Int']['input']>;
  uri?: InputMaybe<Scalars['String']['input']>;
};

/** The root entry point into the Graph */
export type QueryPageByTemplateArgs = {
  language?: InputMaybe<Scalars['String']['input']>;
  template?: InputMaybe<TemplateEnum>;
};

/** The root entry point into the Graph */
export type QueryPagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RootQueryToPageConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type QueryPlaceDetailsArgs = {
  id: Scalars['ID']['input'];
};

/** The root entry point into the Graph */
export type QueryPlaceListArgs = {
  dataSource?: InputMaybe<Scalars['String']['input']>;
  divisions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  hasUpcomingEvents?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  showAllPlaces?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

/** The root entry point into the Graph */
export type QueryPluginArgs = {
  id: Scalars['ID']['input'];
};

/** The root entry point into the Graph */
export type QueryPluginsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RootQueryToPluginConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type QueryPostArgs = {
  asPreview?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  idType?: InputMaybe<PostIdType>;
};

/** The root entry point into the Graph */
export type QueryPostByArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  postId?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  uri?: InputMaybe<Scalars['String']['input']>;
};

/** The root entry point into the Graph */
export type QueryPostFormatArgs = {
  id: Scalars['ID']['input'];
  idType?: InputMaybe<PostFormatIdType>;
};

/** The root entry point into the Graph */
export type QueryPostFormatsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RootQueryToPostFormatConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type QueryPostsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RootQueryToPostConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type QueryRegisteredScriptsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The root entry point into the Graph */
export type QueryRegisteredStylesheetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The root entry point into the Graph */
export type QueryReleaseArgs = {
  asPreview?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  idType?: InputMaybe<ReleaseIdType>;
};

/** The root entry point into the Graph */
export type QueryReleaseByArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  releaseId?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  uri?: InputMaybe<Scalars['String']['input']>;
};

/** The root entry point into the Graph */
export type QueryReleasesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RootQueryToReleaseConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type QueryRevisionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RootQueryToRevisionsConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type QuerySiteSettingsArgs = {
  language: Scalars['String']['input'];
};

/** The root entry point into the Graph */
export type QueryTagArgs = {
  id: Scalars['ID']['input'];
  idType?: InputMaybe<TagIdType>;
};

/** The root entry point into the Graph */
export type QueryTagsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RootQueryToTagConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type QueryTaxonomiesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The root entry point into the Graph */
export type QueryTaxonomyArgs = {
  id: Scalars['ID']['input'];
  idType?: InputMaybe<TaxonomyIdTypeEnum>;
};

/** The root entry point into the Graph */
export type QueryTermNodeArgs = {
  id: Scalars['ID']['input'];
  idType?: InputMaybe<TermNodeIdTypeEnum>;
  taxonomy?: InputMaybe<TaxonomyEnum>;
};

/** The root entry point into the Graph */
export type QueryTermsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RootQueryToTermNodeConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type QueryThemeArgs = {
  id: Scalars['ID']['input'];
};

/** The root entry point into the Graph */
export type QueryThemesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The root entry point into the Graph */
export type QueryTranslateStringArgs = {
  language: LanguageCodeEnum;
  string: Scalars['String']['input'];
};

/** The root entry point into the Graph */
export type QueryTranslationArgs = {
  asPreview?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  idType?: InputMaybe<TranslationIdType>;
};

/** The root entry point into the Graph */
export type QueryTranslationByArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  translationId?: InputMaybe<Scalars['Int']['input']>;
  uri?: InputMaybe<Scalars['String']['input']>;
};

/** The root entry point into the Graph */
export type QueryTranslationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RootQueryToTranslationConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type QueryUnifiedSearchArgs = {
  administrativeDivisionIds?: InputMaybe<
    Array<InputMaybe<Scalars['ID']['input']>>
  >;
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  index?: InputMaybe<UnifiedSearchIndex>;
  languages?: Array<UnifiedSearchLanguage>;
  mustHaveReservableResource?: InputMaybe<Scalars['Boolean']['input']>;
  ontology?: InputMaybe<Scalars['String']['input']>;
  ontologyTreeIdOrSets?: InputMaybe<Array<Array<Scalars['ID']['input']>>>;
  ontologyWordIdOrSets?: InputMaybe<Array<Array<Scalars['ID']['input']>>>;
  openAt?: InputMaybe<Scalars['String']['input']>;
  orderByAccessibilityProfile?: InputMaybe<AccessibilityProfile>;
  orderByDistance?: InputMaybe<OrderByDistance>;
  orderByName?: InputMaybe<OrderByName>;
  providerTypes?: InputMaybe<Array<InputMaybe<ProviderType>>>;
  serviceOwnerTypes?: InputMaybe<Array<InputMaybe<ServiceOwnerType>>>;
  targetGroups?: InputMaybe<Array<InputMaybe<TargetGroup>>>;
  text?: InputMaybe<Scalars['String']['input']>;
};

/** The root entry point into the Graph */
export type QueryUnifiedSearchCompletionSuggestionsArgs = {
  index?: InputMaybe<UnifiedSearchIndex>;
  languages?: Array<UnifiedSearchLanguage>;
  prefix?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

/** The root entry point into the Graph */
export type QueryUserArgs = {
  id: Scalars['ID']['input'];
  idType?: InputMaybe<UserNodeIdTypeEnum>;
};

/** The root entry point into the Graph */
export type QueryUserRoleArgs = {
  id: Scalars['ID']['input'];
};

/** The root entry point into the Graph */
export type QueryUserRolesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The root entry point into the Graph */
export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RootQueryToUserConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type QueryVenueArgs = {
  id: Scalars['ID']['input'];
};

/** The root entry point into the Graph */
export type QueryVenuesByIdsArgs = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type RawJson = {
  __typename?: 'RawJSON';
  data?: Maybe<Scalars['String']['output']>;
};

/** The reading setting type */
export type ReadingSettings = {
  __typename?: 'ReadingSettings';
  /** Tunniste sivusta, joka näyttää uusimmat artikkelit */
  pageForPosts?: Maybe<Scalars['Int']['output']>;
  /** Tunniste sivusta, joka näytetään etusivulla */
  pageOnFront?: Maybe<Scalars['Int']['output']>;
  /** Näytä enintään */
  postsPerPage?: Maybe<Scalars['Int']['output']>;
  /** Mitä näytetään etusivulla */
  showOnFront?: Maybe<Scalars['String']['output']>;
};

/** Input for the refreshJwtAuthToken mutation. */
export type RefreshJwtAuthTokenInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** A valid, previously issued JWT refresh token. If valid a new Auth token will be provided. If invalid, expired, revoked or otherwise invalid, a new AuthToken will not be provided. */
  jwtRefreshToken: Scalars['String']['input'];
};

/** The payload for the refreshJwtAuthToken mutation. */
export type RefreshJwtAuthTokenPayload = {
  __typename?: 'RefreshJwtAuthTokenPayload';
  /** JWT Token that can be used in future requests for Authentication */
  authToken?: Maybe<Scalars['String']['output']>;
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

/** Input for the registerUser mutation. */
export type RegisterUserInput = {
  /** User's AOL IM account. */
  aim?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** A string containing content about the user. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** A string that will be shown on the site. Defaults to user's username. It is likely that you will want to change this, for both appearance and security through obscurity (that is if you dont use and delete the default admin user). */
  displayName?: InputMaybe<Scalars['String']['input']>;
  /** A string containing the user's email address. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** 	The user's first name. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** User's Jabber account. */
  jabber?: InputMaybe<Scalars['String']['input']>;
  /** The user's last name. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** User's locale. */
  locale?: InputMaybe<Scalars['String']['input']>;
  /** A string that contains a URL-friendly name for the user. The default is the user's username. */
  nicename?: InputMaybe<Scalars['String']['input']>;
  /** The user's nickname, defaults to the user's username. */
  nickname?: InputMaybe<Scalars['String']['input']>;
  /** A string that contains the plain text password for the user. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** If true, this will refresh the users JWT secret. */
  refreshJwtUserSecret?: InputMaybe<Scalars['Boolean']['input']>;
  /** The date the user registered. Format is Y-m-d H:i:s. */
  registered?: InputMaybe<Scalars['String']['input']>;
  /** If true, this will revoke the users JWT secret. If false, this will unrevoke the JWT secret AND issue a new one. To revoke, the user must have proper capabilities to edit users JWT secrets. */
  revokeJwtUserSecret?: InputMaybe<Scalars['Boolean']['input']>;
  /** A string for whether to enable the rich editor or not. False if not empty. */
  richEditing?: InputMaybe<Scalars['String']['input']>;
  /** A string that contains the user's username. */
  username: Scalars['String']['input'];
  /** A string containing the user's URL for the user's web site. */
  websiteUrl?: InputMaybe<Scalars['String']['input']>;
  /** User's Yahoo IM account. */
  yim?: InputMaybe<Scalars['String']['input']>;
};

/** The payload for the registerUser mutation. */
export type RegisterUserPayload = {
  __typename?: 'RegisterUserPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The User object mutation type. */
  user?: Maybe<User>;
};

/** The logical relation between each item in the array when there are more than one. */
export enum RelationEnum {
  /** The logical AND condition returns true if both operands are true, otherwise, it returns false. */
  And = 'AND',
  /** The logical OR condition returns false if both operands are false, otherwise, it returns true. */
  Or = 'OR',
}

/** The release type */
export type Release = ContentNode &
  DatabaseIdentifier &
  Node &
  NodeWithContentEditor &
  NodeWithRevisions &
  NodeWithTemplate &
  NodeWithTitle &
  Previewable &
  UniformResourceIdentifiable & {
    __typename?: 'Release';
    /** The content of the post. */
    content?: Maybe<Scalars['String']['output']>;
    /** Connection between the ContentNode type and the ContentType type */
    contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
    /** The name of the Content Type the node belongs to */
    contentTypeName: Scalars['String']['output'];
    /** The unique identifier stored in the database */
    databaseId: Scalars['Int']['output'];
    /** Post publishing date. */
    date?: Maybe<Scalars['String']['output']>;
    /** The publishing date set in GMT. */
    dateGmt?: Maybe<Scalars['String']['output']>;
    /** The desired slug of the post */
    desiredSlug?: Maybe<Scalars['String']['output']>;
    /** If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds */
    editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
    /** The RSS enclosure for the object */
    enclosure?: Maybe<Scalars['String']['output']>;
    /** Connection between the ContentNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<ContentNodeToEnqueuedScriptConnection>;
    /** Connection between the ContentNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<ContentNodeToEnqueuedStylesheetConnection>;
    /** Vanhentumisaika */
    expirationTime?: Maybe<Scalars['String']['output']>;
    /** The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table. */
    guid?: Maybe<Scalars['String']['output']>;
    /** The globally unique identifier of the release-cpt object. */
    id: Scalars['ID']['output'];
    /** Whether the node is a Comment */
    isComment: Scalars['Boolean']['output'];
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']['output'];
    /** Whether the node represents the front page. */
    isFrontPage: Scalars['Boolean']['output'];
    /** Whether  the node represents the blog page. */
    isPostsPage: Scalars['Boolean']['output'];
    /** Whether the object is a node in the preview state */
    isPreview?: Maybe<Scalars['Boolean']['output']>;
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']['output']>;
    /** True if the node is a revision of another node */
    isRevision?: Maybe<Scalars['Boolean']['output']>;
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']['output'];
    /** Polylang language */
    language?: Maybe<Language>;
    /** The user that most recently edited the node */
    lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
    /** The permalink of the post */
    link?: Maybe<Scalars['String']['output']>;
    /** The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time. */
    modified?: Maybe<Scalars['String']['output']>;
    /** The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT. */
    modifiedGmt?: Maybe<Scalars['String']['output']>;
    /** Connection between the Release type and the release type */
    preview?: Maybe<ReleaseToPreviewConnectionEdge>;
    /** The database id of the preview node */
    previewRevisionDatabaseId?: Maybe<Scalars['Int']['output']>;
    /** Whether the object is a node in the preview state */
    previewRevisionId?: Maybe<Scalars['ID']['output']>;
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of the databaseId field
     */
    releaseId: Scalars['Int']['output'];
    /** If the current node is a revision, this field exposes the node this is a revision of. Returns null if the node is not a revision of another node. */
    revisionOf?: Maybe<NodeWithRevisionsToContentNodeConnectionEdge>;
    /** Connection between the Release type and the release type */
    revisions?: Maybe<ReleaseToRevisionConnection>;
    /** The SEO Framework data of the release */
    seo?: Maybe<Seo>;
    /** The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table. */
    slug?: Maybe<Scalars['String']['output']>;
    /** The current status of the object */
    status?: Maybe<Scalars['String']['output']>;
    /** The template assigned to the node */
    template?: Maybe<ContentTemplate>;
    /** The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made. */
    title?: Maybe<Scalars['String']['output']>;
    /** Get specific translation version of this object */
    translation?: Maybe<Release>;
    /** List all translated versions of this post */
    translations?: Maybe<Array<Maybe<Release>>>;
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']['output']>;
  };

/** The release type */
export type ReleaseContentArgs = {
  format?: InputMaybe<PostObjectFieldFormatEnum>;
};

/** The release type */
export type ReleaseEnqueuedScriptsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The release type */
export type ReleaseEnqueuedStylesheetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The release type */
export type ReleaseRevisionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ReleaseToRevisionConnectionWhereArgs>;
};

/** The release type */
export type ReleaseTitleArgs = {
  format?: InputMaybe<PostObjectFieldFormatEnum>;
};

/** The release type */
export type ReleaseTranslationArgs = {
  language: LanguageCodeEnum;
};

/** Connection to release Nodes */
export type ReleaseConnection = {
  /** A list of edges (relational context) between RootQuery and connected release Nodes */
  edges: Array<ReleaseConnectionEdge>;
  /** A list of connected release Nodes */
  nodes: Array<Release>;
  /** Information about pagination in a connection. */
  pageInfo: ReleaseConnectionPageInfo;
};

/** Edge between a Node and a connected release */
export type ReleaseConnectionEdge = {
  /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The connected release Node */
  node: Release;
};

/** Page Info on the connected ReleaseConnectionEdge */
export type ReleaseConnectionPageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum ReleaseIdType {
  /** Identify a resource by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  Id = 'ID',
  /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
  Slug = 'SLUG',
  /** Identify a resource by the URI. */
  Uri = 'URI',
}

/** Connection between the Release type and the release type */
export type ReleaseToPreviewConnectionEdge = Edge &
  OneToOneConnection &
  ReleaseConnectionEdge & {
    __typename?: 'ReleaseToPreviewConnectionEdge';
    /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The node of the connection, without the edges */
    node: Release;
  };

/** Connection between the Release type and the release type */
export type ReleaseToRevisionConnection = Connection &
  ReleaseConnection & {
    __typename?: 'ReleaseToRevisionConnection';
    /** Edges for the ReleaseToRevisionConnection connection */
    edges: Array<ReleaseToRevisionConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Release>;
    /** Information about pagination in a connection. */
    pageInfo: ReleaseToRevisionConnectionPageInfo;
  };

/** An edge in a connection */
export type ReleaseToRevisionConnectionEdge = Edge &
  ReleaseConnectionEdge & {
    __typename?: 'ReleaseToRevisionConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Release;
  };

/** Page Info on the &quot;ReleaseToRevisionConnection&quot; */
export type ReleaseToRevisionConnectionPageInfo = PageInfo &
  ReleaseConnectionPageInfo &
  WpPageInfo & {
    __typename?: 'ReleaseToRevisionConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the ReleaseToRevisionConnection connection */
export type ReleaseToRevisionConnectionWhereArgs = {
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Reservation = {
  __typename?: 'Reservation';
  externalReservationUrl?: Maybe<LanguageString>;
  reservable?: Maybe<Scalars['Boolean']['output']>;
};

/** Input for the resetUserPassword mutation. */
export type ResetUserPasswordInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Password reset key */
  key?: InputMaybe<Scalars['String']['input']>;
  /** The user's login (username). */
  login?: InputMaybe<Scalars['String']['input']>;
  /** The new password. */
  password?: InputMaybe<Scalars['String']['input']>;
};

/** The payload for the resetUserPassword mutation. */
export type ResetUserPasswordPayload = {
  __typename?: 'ResetUserPasswordPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The User object mutation type. */
  user?: Maybe<User>;
};

export enum ResourceState {
  Closed = 'closed',
  EnterOnly = 'enter_only',
  ExitOnly = 'exit_only',
  Open = 'open',
  OpenAndReservable = 'open_and_reservable',
  SelfService = 'self_service',
  Undefined = 'undefined',
  WeatherPermitting = 'weather_permitting',
  WithKey = 'with_key',
  WithKeyAndReservation = 'with_key_and_reservation',
  WithReservation = 'with_reservation',
}

/** Input for the restoreComment mutation. */
export type RestoreCommentInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the comment to be restored */
  id: Scalars['ID']['input'];
};

/** The payload for the restoreComment mutation. */
export type RestoreCommentPayload = {
  __typename?: 'RestoreCommentPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The restored comment object */
  comment?: Maybe<Comment>;
  /** The ID of the restored comment */
  restoredId?: Maybe<Scalars['ID']['output']>;
};

/** Connection between the RootQuery type and the category type */
export type RootQueryToCategoryConnection = CategoryConnection &
  Connection & {
    __typename?: 'RootQueryToCategoryConnection';
    /** Edges for the RootQueryToCategoryConnection connection */
    edges: Array<RootQueryToCategoryConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Category>;
    /** Information about pagination in a connection. */
    pageInfo: RootQueryToCategoryConnectionPageInfo;
  };

/** An edge in a connection */
export type RootQueryToCategoryConnectionEdge = CategoryConnectionEdge &
  Edge & {
    __typename?: 'RootQueryToCategoryConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Category;
  };

/** Page Info on the &quot;RootQueryToCategoryConnection&quot; */
export type RootQueryToCategoryConnectionPageInfo = CategoryConnectionPageInfo &
  PageInfo &
  WpPageInfo & {
    __typename?: 'RootQueryToCategoryConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the RootQueryToCategoryConnection connection */
export type RootQueryToCategoryConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter by Categorys by language code (Polylang) */
  language?: InputMaybe<LanguageCodeFilterEnum>;
  /** Filter Categorys by one or more languages (Polylang) */
  languages?: InputMaybe<Array<LanguageCodeEnum>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Connection between the RootQuery type and the collection type */
export type RootQueryToCollectionConnection = CollectionConnection &
  Connection & {
    __typename?: 'RootQueryToCollectionConnection';
    /** Edges for the RootQueryToCollectionConnection connection */
    edges: Array<RootQueryToCollectionConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Collection>;
    /** Information about pagination in a connection. */
    pageInfo: RootQueryToCollectionConnectionPageInfo;
  };

/** An edge in a connection */
export type RootQueryToCollectionConnectionEdge = CollectionConnectionEdge &
  Edge & {
    __typename?: 'RootQueryToCollectionConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Collection;
  };

/** Page Info on the &quot;RootQueryToCollectionConnection&quot; */
export type RootQueryToCollectionConnectionPageInfo =
  CollectionConnectionPageInfo &
    PageInfo &
    WpPageInfo & {
      __typename?: 'RootQueryToCollectionConnectionPageInfo';
      /** When paginating forwards, the cursor to continue. */
      endCursor?: Maybe<Scalars['String']['output']>;
      /** When paginating forwards, are there more items? */
      hasNextPage: Scalars['Boolean']['output'];
      /** When paginating backwards, are there more items? */
      hasPreviousPage: Scalars['Boolean']['output'];
      /** When paginating backwards, the cursor to continue. */
      startCursor?: Maybe<Scalars['String']['output']>;
    };

/** Arguments for filtering the RootQueryToCollectionConnection connection */
export type RootQueryToCollectionConnectionWhereArgs = {
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter by Collections by language code (Polylang) */
  language?: InputMaybe<LanguageCodeFilterEnum>;
  /** Filter Collections by one or more languages (Polylang) */
  languages?: InputMaybe<Array<LanguageCodeEnum>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the RootQuery type and the Comment type */
export type RootQueryToCommentConnection = CommentConnection &
  Connection & {
    __typename?: 'RootQueryToCommentConnection';
    /** Edges for the RootQueryToCommentConnection connection */
    edges: Array<RootQueryToCommentConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Comment>;
    /** Information about pagination in a connection. */
    pageInfo: RootQueryToCommentConnectionPageInfo;
  };

/** An edge in a connection */
export type RootQueryToCommentConnectionEdge = CommentConnectionEdge &
  Edge & {
    __typename?: 'RootQueryToCommentConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Comment;
  };

/** Page Info on the &quot;RootQueryToCommentConnection&quot; */
export type RootQueryToCommentConnectionPageInfo = CommentConnectionPageInfo &
  PageInfo &
  WpPageInfo & {
    __typename?: 'RootQueryToCommentConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the RootQueryToCommentConnection connection */
export type RootQueryToCommentConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars['String']['input']>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars['String']['input']>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars['String']['input']>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars['ID']['input']>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars['String']['input']>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars['Int']['input']>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars['Int']['input']>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Comment status to limit results by. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars['ID']['input']>;
};

/** Connection between the RootQuery type and the contact type */
export type RootQueryToContactConnection = Connection &
  ContactConnection & {
    __typename?: 'RootQueryToContactConnection';
    /** Edges for the RootQueryToContactConnection connection */
    edges: Array<RootQueryToContactConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Contact>;
    /** Information about pagination in a connection. */
    pageInfo: RootQueryToContactConnectionPageInfo;
  };

/** An edge in a connection */
export type RootQueryToContactConnectionEdge = ContactConnectionEdge &
  Edge & {
    __typename?: 'RootQueryToContactConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Contact;
  };

/** Page Info on the &quot;RootQueryToContactConnection&quot; */
export type RootQueryToContactConnectionPageInfo = ContactConnectionPageInfo &
  PageInfo &
  WpPageInfo & {
    __typename?: 'RootQueryToContactConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the RootQueryToContactConnection connection */
export type RootQueryToContactConnectionWhereArgs = {
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter by Contacts by language code (Polylang) */
  language?: InputMaybe<LanguageCodeFilterEnum>;
  /** Filter Contacts by one or more languages (Polylang) */
  languages?: InputMaybe<Array<LanguageCodeEnum>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the RootQuery type and the ContentNode type */
export type RootQueryToContentNodeConnection = Connection &
  ContentNodeConnection & {
    __typename?: 'RootQueryToContentNodeConnection';
    /** Edges for the RootQueryToContentNodeConnection connection */
    edges: Array<RootQueryToContentNodeConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<ContentNode>;
    /** Information about pagination in a connection. */
    pageInfo: RootQueryToContentNodeConnectionPageInfo;
  };

/** An edge in a connection */
export type RootQueryToContentNodeConnectionEdge = ContentNodeConnectionEdge &
  Edge & {
    __typename?: 'RootQueryToContentNodeConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: ContentNode;
  };

/** Page Info on the &quot;RootQueryToContentNodeConnection&quot; */
export type RootQueryToContentNodeConnectionPageInfo =
  ContentNodeConnectionPageInfo &
    PageInfo &
    WpPageInfo & {
      __typename?: 'RootQueryToContentNodeConnectionPageInfo';
      /** When paginating forwards, the cursor to continue. */
      endCursor?: Maybe<Scalars['String']['output']>;
      /** When paginating forwards, are there more items? */
      hasNextPage: Scalars['Boolean']['output'];
      /** When paginating backwards, are there more items? */
      hasPreviousPage: Scalars['Boolean']['output'];
      /** When paginating backwards, the cursor to continue. */
      startCursor?: Maybe<Scalars['String']['output']>;
    };

/** Arguments for filtering the RootQueryToContentNodeConnection connection */
export type RootQueryToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter content nodes by language code (Polylang) */
  language?: InputMaybe<LanguageCodeFilterEnum>;
  /** Filter content nodes by one or more languages (Polylang) */
  languages?: InputMaybe<Array<LanguageCodeEnum>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the RootQuery type and the ContentType type */
export type RootQueryToContentTypeConnection = Connection &
  ContentTypeConnection & {
    __typename?: 'RootQueryToContentTypeConnection';
    /** Edges for the RootQueryToContentTypeConnection connection */
    edges: Array<RootQueryToContentTypeConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<ContentType>;
    /** Information about pagination in a connection. */
    pageInfo: RootQueryToContentTypeConnectionPageInfo;
  };

/** An edge in a connection */
export type RootQueryToContentTypeConnectionEdge = ContentTypeConnectionEdge &
  Edge & {
    __typename?: 'RootQueryToContentTypeConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: ContentType;
  };

/** Page Info on the &quot;RootQueryToContentTypeConnection&quot; */
export type RootQueryToContentTypeConnectionPageInfo =
  ContentTypeConnectionPageInfo &
    PageInfo &
    WpPageInfo & {
      __typename?: 'RootQueryToContentTypeConnectionPageInfo';
      /** When paginating forwards, the cursor to continue. */
      endCursor?: Maybe<Scalars['String']['output']>;
      /** When paginating forwards, are there more items? */
      hasNextPage: Scalars['Boolean']['output'];
      /** When paginating backwards, are there more items? */
      hasPreviousPage: Scalars['Boolean']['output'];
      /** When paginating backwards, the cursor to continue. */
      startCursor?: Maybe<Scalars['String']['output']>;
    };

/** Connection between the RootQuery type and the EnqueuedScript type */
export type RootQueryToEnqueuedScriptConnection = Connection &
  EnqueuedScriptConnection & {
    __typename?: 'RootQueryToEnqueuedScriptConnection';
    /** Edges for the RootQueryToEnqueuedScriptConnection connection */
    edges: Array<RootQueryToEnqueuedScriptConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<EnqueuedScript>;
    /** Information about pagination in a connection. */
    pageInfo: RootQueryToEnqueuedScriptConnectionPageInfo;
  };

/** An edge in a connection */
export type RootQueryToEnqueuedScriptConnectionEdge = Edge &
  EnqueuedScriptConnectionEdge & {
    __typename?: 'RootQueryToEnqueuedScriptConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: EnqueuedScript;
  };

/** Page Info on the &quot;RootQueryToEnqueuedScriptConnection&quot; */
export type RootQueryToEnqueuedScriptConnectionPageInfo =
  EnqueuedScriptConnectionPageInfo &
    PageInfo &
    WpPageInfo & {
      __typename?: 'RootQueryToEnqueuedScriptConnectionPageInfo';
      /** When paginating forwards, the cursor to continue. */
      endCursor?: Maybe<Scalars['String']['output']>;
      /** When paginating forwards, are there more items? */
      hasNextPage: Scalars['Boolean']['output'];
      /** When paginating backwards, are there more items? */
      hasPreviousPage: Scalars['Boolean']['output'];
      /** When paginating backwards, the cursor to continue. */
      startCursor?: Maybe<Scalars['String']['output']>;
    };

/** Connection between the RootQuery type and the EnqueuedStylesheet type */
export type RootQueryToEnqueuedStylesheetConnection = Connection &
  EnqueuedStylesheetConnection & {
    __typename?: 'RootQueryToEnqueuedStylesheetConnection';
    /** Edges for the RootQueryToEnqueuedStylesheetConnection connection */
    edges: Array<RootQueryToEnqueuedStylesheetConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<EnqueuedStylesheet>;
    /** Information about pagination in a connection. */
    pageInfo: RootQueryToEnqueuedStylesheetConnectionPageInfo;
  };

/** An edge in a connection */
export type RootQueryToEnqueuedStylesheetConnectionEdge = Edge &
  EnqueuedStylesheetConnectionEdge & {
    __typename?: 'RootQueryToEnqueuedStylesheetConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: EnqueuedStylesheet;
  };

/** Page Info on the &quot;RootQueryToEnqueuedStylesheetConnection&quot; */
export type RootQueryToEnqueuedStylesheetConnectionPageInfo =
  EnqueuedStylesheetConnectionPageInfo &
    PageInfo &
    WpPageInfo & {
      __typename?: 'RootQueryToEnqueuedStylesheetConnectionPageInfo';
      /** When paginating forwards, the cursor to continue. */
      endCursor?: Maybe<Scalars['String']['output']>;
      /** When paginating forwards, are there more items? */
      hasNextPage: Scalars['Boolean']['output'];
      /** When paginating backwards, are there more items? */
      hasPreviousPage: Scalars['Boolean']['output'];
      /** When paginating backwards, the cursor to continue. */
      startCursor?: Maybe<Scalars['String']['output']>;
    };

/** Connection between the RootQuery type and the landingPage type */
export type RootQueryToLandingPageConnection = Connection &
  LandingPageConnection & {
    __typename?: 'RootQueryToLandingPageConnection';
    /** Edges for the RootQueryToLandingPageConnection connection */
    edges: Array<RootQueryToLandingPageConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<LandingPage>;
    /** Information about pagination in a connection. */
    pageInfo: RootQueryToLandingPageConnectionPageInfo;
  };

/** An edge in a connection */
export type RootQueryToLandingPageConnectionEdge = Edge &
  LandingPageConnectionEdge & {
    __typename?: 'RootQueryToLandingPageConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: LandingPage;
  };

/** Page Info on the &quot;RootQueryToLandingPageConnection&quot; */
export type RootQueryToLandingPageConnectionPageInfo =
  LandingPageConnectionPageInfo &
    PageInfo &
    WpPageInfo & {
      __typename?: 'RootQueryToLandingPageConnectionPageInfo';
      /** When paginating forwards, the cursor to continue. */
      endCursor?: Maybe<Scalars['String']['output']>;
      /** When paginating forwards, are there more items? */
      hasNextPage: Scalars['Boolean']['output'];
      /** When paginating backwards, are there more items? */
      hasPreviousPage: Scalars['Boolean']['output'];
      /** When paginating backwards, the cursor to continue. */
      startCursor?: Maybe<Scalars['String']['output']>;
    };

/** Arguments for filtering the RootQueryToLandingPageConnection connection */
export type RootQueryToLandingPageConnectionWhereArgs = {
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter by LandingPages by language code (Polylang) */
  language?: InputMaybe<LanguageCodeFilterEnum>;
  /** Filter LandingPages by one or more languages (Polylang) */
  languages?: InputMaybe<Array<LanguageCodeEnum>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the RootQuery type and the mediaItem type */
export type RootQueryToMediaItemConnection = Connection &
  MediaItemConnection & {
    __typename?: 'RootQueryToMediaItemConnection';
    /** Edges for the RootQueryToMediaItemConnection connection */
    edges: Array<RootQueryToMediaItemConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<MediaItem>;
    /** Information about pagination in a connection. */
    pageInfo: RootQueryToMediaItemConnectionPageInfo;
  };

/** An edge in a connection */
export type RootQueryToMediaItemConnectionEdge = Edge &
  MediaItemConnectionEdge & {
    __typename?: 'RootQueryToMediaItemConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: MediaItem;
  };

/** Page Info on the &quot;RootQueryToMediaItemConnection&quot; */
export type RootQueryToMediaItemConnectionPageInfo =
  MediaItemConnectionPageInfo &
    PageInfo &
    WpPageInfo & {
      __typename?: 'RootQueryToMediaItemConnectionPageInfo';
      /** When paginating forwards, the cursor to continue. */
      endCursor?: Maybe<Scalars['String']['output']>;
      /** When paginating forwards, are there more items? */
      hasNextPage: Scalars['Boolean']['output'];
      /** When paginating backwards, are there more items? */
      hasPreviousPage: Scalars['Boolean']['output'];
      /** When paginating backwards, the cursor to continue. */
      startCursor?: Maybe<Scalars['String']['output']>;
    };

/** Arguments for filtering the RootQueryToMediaItemConnection connection */
export type RootQueryToMediaItemConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']['input']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']['input']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter by MediaItems by language code (Polylang) */
  language?: InputMaybe<LanguageCodeFilterEnum>;
  /** Filter MediaItems by one or more languages (Polylang) */
  languages?: InputMaybe<Array<LanguageCodeEnum>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the RootQuery type and the Menu type */
export type RootQueryToMenuConnection = Connection &
  MenuConnection & {
    __typename?: 'RootQueryToMenuConnection';
    /** Edges for the RootQueryToMenuConnection connection */
    edges: Array<RootQueryToMenuConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Menu>;
    /** Information about pagination in a connection. */
    pageInfo: RootQueryToMenuConnectionPageInfo;
  };

/** An edge in a connection */
export type RootQueryToMenuConnectionEdge = Edge &
  MenuConnectionEdge & {
    __typename?: 'RootQueryToMenuConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Menu;
  };

/** Page Info on the &quot;RootQueryToMenuConnection&quot; */
export type RootQueryToMenuConnectionPageInfo = MenuConnectionPageInfo &
  PageInfo &
  WpPageInfo & {
    __typename?: 'RootQueryToMenuConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the RootQueryToMenuConnection connection */
export type RootQueryToMenuConnectionWhereArgs = {
  /** The database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** The menu location for the menu being queried */
  location?: InputMaybe<MenuLocationEnum>;
  /** The slug of the menu to query items for */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the RootQuery type and the MenuItem type */
export type RootQueryToMenuItemConnection = Connection &
  MenuItemConnection & {
    __typename?: 'RootQueryToMenuItemConnection';
    /** Edges for the RootQueryToMenuItemConnection connection */
    edges: Array<RootQueryToMenuItemConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<MenuItem>;
    /** Information about pagination in a connection. */
    pageInfo: RootQueryToMenuItemConnectionPageInfo;
  };

/** An edge in a connection */
export type RootQueryToMenuItemConnectionEdge = Edge &
  MenuItemConnectionEdge & {
    __typename?: 'RootQueryToMenuItemConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: MenuItem;
  };

/** Page Info on the &quot;RootQueryToMenuItemConnection&quot; */
export type RootQueryToMenuItemConnectionPageInfo = MenuItemConnectionPageInfo &
  PageInfo &
  WpPageInfo & {
    __typename?: 'RootQueryToMenuItemConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the RootQueryToMenuItemConnection connection */
export type RootQueryToMenuItemConnectionWhereArgs = {
  /** The database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  language?: InputMaybe<LanguageCodeFilterEnum>;
  /** The menu location for the menu being queried */
  location?: InputMaybe<MenuLocationEnum>;
  /** The database ID of the parent menu object */
  parentDatabaseId?: InputMaybe<Scalars['Int']['input']>;
  /** The ID of the parent menu object */
  parentId?: InputMaybe<Scalars['ID']['input']>;
};

/** Connection between the RootQuery type and the page type */
export type RootQueryToPageConnection = Connection &
  PageConnection & {
    __typename?: 'RootQueryToPageConnection';
    /** Edges for the RootQueryToPageConnection connection */
    edges: Array<RootQueryToPageConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Page>;
    /** Information about pagination in a connection. */
    pageInfo: RootQueryToPageConnectionPageInfo;
  };

/** An edge in a connection */
export type RootQueryToPageConnectionEdge = Edge &
  PageConnectionEdge & {
    __typename?: 'RootQueryToPageConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Page;
  };

/** Page Info on the &quot;RootQueryToPageConnection&quot; */
export type RootQueryToPageConnectionPageInfo = PageConnectionPageInfo &
  PageInfo &
  WpPageInfo & {
    __typename?: 'RootQueryToPageConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the RootQueryToPageConnection connection */
export type RootQueryToPageConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']['input']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']['input']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter by Pages by language code (Polylang) */
  language?: InputMaybe<LanguageCodeFilterEnum>;
  /** Filter Pages by one or more languages (Polylang) */
  languages?: InputMaybe<Array<LanguageCodeEnum>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the RootQuery type and the Plugin type */
export type RootQueryToPluginConnection = Connection &
  PluginConnection & {
    __typename?: 'RootQueryToPluginConnection';
    /** Edges for the RootQueryToPluginConnection connection */
    edges: Array<RootQueryToPluginConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Plugin>;
    /** Information about pagination in a connection. */
    pageInfo: RootQueryToPluginConnectionPageInfo;
  };

/** An edge in a connection */
export type RootQueryToPluginConnectionEdge = Edge &
  PluginConnectionEdge & {
    __typename?: 'RootQueryToPluginConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Plugin;
  };

/** Page Info on the &quot;RootQueryToPluginConnection&quot; */
export type RootQueryToPluginConnectionPageInfo = PageInfo &
  PluginConnectionPageInfo &
  WpPageInfo & {
    __typename?: 'RootQueryToPluginConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the RootQueryToPluginConnection connection */
export type RootQueryToPluginConnectionWhereArgs = {
  /** Show plugin based on a keyword search. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve plugins where plugin status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PluginStatusEnum>>>;
  /** Show plugins with a specific status. */
  status?: InputMaybe<PluginStatusEnum>;
};

/** Connection between the RootQuery type and the post type */
export type RootQueryToPostConnection = Connection &
  PostConnection & {
    __typename?: 'RootQueryToPostConnection';
    /** Edges for the RootQueryToPostConnection connection */
    edges: Array<RootQueryToPostConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Post>;
    /** Information about pagination in a connection. */
    pageInfo: RootQueryToPostConnectionPageInfo;
  };

/** An edge in a connection */
export type RootQueryToPostConnectionEdge = Edge &
  PostConnectionEdge & {
    __typename?: 'RootQueryToPostConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Post;
  };

/** Page Info on the &quot;RootQueryToPostConnection&quot; */
export type RootQueryToPostConnectionPageInfo = PageInfo &
  PostConnectionPageInfo &
  WpPageInfo & {
    __typename?: 'RootQueryToPostConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the RootQueryToPostConnection connection */
export type RootQueryToPostConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']['input']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']['input']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Category ID */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Use Category Slug */
  categoryName?: InputMaybe<Scalars['String']['input']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter by Posts by language code (Polylang) */
  language?: InputMaybe<LanguageCodeFilterEnum>;
  /** Filter Posts by one or more languages (Polylang) */
  languages?: InputMaybe<Array<LanguageCodeEnum>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Use Tag ID */
  tagId?: InputMaybe<Scalars['String']['input']>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of tag slugs, used to display objects from one tag AND another */
  tagSlugAnd?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of tag slugs, used to include objects in ANY specified tags */
  tagSlugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the RootQuery type and the postFormat type */
export type RootQueryToPostFormatConnection = Connection &
  PostFormatConnection & {
    __typename?: 'RootQueryToPostFormatConnection';
    /** Edges for the RootQueryToPostFormatConnection connection */
    edges: Array<RootQueryToPostFormatConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<PostFormat>;
    /** Information about pagination in a connection. */
    pageInfo: RootQueryToPostFormatConnectionPageInfo;
  };

/** An edge in a connection */
export type RootQueryToPostFormatConnectionEdge = Edge &
  PostFormatConnectionEdge & {
    __typename?: 'RootQueryToPostFormatConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: PostFormat;
  };

/** Page Info on the &quot;RootQueryToPostFormatConnection&quot; */
export type RootQueryToPostFormatConnectionPageInfo = PageInfo &
  PostFormatConnectionPageInfo &
  WpPageInfo & {
    __typename?: 'RootQueryToPostFormatConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the RootQueryToPostFormatConnection connection */
export type RootQueryToPostFormatConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Connection between the RootQuery type and the release type */
export type RootQueryToReleaseConnection = Connection &
  ReleaseConnection & {
    __typename?: 'RootQueryToReleaseConnection';
    /** Edges for the RootQueryToReleaseConnection connection */
    edges: Array<RootQueryToReleaseConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Release>;
    /** Information about pagination in a connection. */
    pageInfo: RootQueryToReleaseConnectionPageInfo;
  };

/** An edge in a connection */
export type RootQueryToReleaseConnectionEdge = Edge &
  ReleaseConnectionEdge & {
    __typename?: 'RootQueryToReleaseConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Release;
  };

/** Page Info on the &quot;RootQueryToReleaseConnection&quot; */
export type RootQueryToReleaseConnectionPageInfo = PageInfo &
  ReleaseConnectionPageInfo &
  WpPageInfo & {
    __typename?: 'RootQueryToReleaseConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the RootQueryToReleaseConnection connection */
export type RootQueryToReleaseConnectionWhereArgs = {
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter by Releases by language code (Polylang) */
  language?: InputMaybe<LanguageCodeFilterEnum>;
  /** Filter Releases by one or more languages (Polylang) */
  languages?: InputMaybe<Array<LanguageCodeEnum>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the RootQuery type and the ContentNode type */
export type RootQueryToRevisionsConnection = Connection &
  ContentNodeConnection & {
    __typename?: 'RootQueryToRevisionsConnection';
    /** Edges for the RootQueryToRevisionsConnection connection */
    edges: Array<RootQueryToRevisionsConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<ContentNode>;
    /** Information about pagination in a connection. */
    pageInfo: RootQueryToRevisionsConnectionPageInfo;
  };

/** An edge in a connection */
export type RootQueryToRevisionsConnectionEdge = ContentNodeConnectionEdge &
  Edge & {
    __typename?: 'RootQueryToRevisionsConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: ContentNode;
  };

/** Page Info on the &quot;RootQueryToRevisionsConnection&quot; */
export type RootQueryToRevisionsConnectionPageInfo =
  ContentNodeConnectionPageInfo &
    PageInfo &
    WpPageInfo & {
      __typename?: 'RootQueryToRevisionsConnectionPageInfo';
      /** When paginating forwards, the cursor to continue. */
      endCursor?: Maybe<Scalars['String']['output']>;
      /** When paginating forwards, are there more items? */
      hasNextPage: Scalars['Boolean']['output'];
      /** When paginating backwards, are there more items? */
      hasPreviousPage: Scalars['Boolean']['output'];
      /** When paginating backwards, the cursor to continue. */
      startCursor?: Maybe<Scalars['String']['output']>;
    };

/** Arguments for filtering the RootQueryToRevisionsConnection connection */
export type RootQueryToRevisionsConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the RootQuery type and the tag type */
export type RootQueryToTagConnection = Connection &
  TagConnection & {
    __typename?: 'RootQueryToTagConnection';
    /** Edges for the RootQueryToTagConnection connection */
    edges: Array<RootQueryToTagConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Tag>;
    /** Information about pagination in a connection. */
    pageInfo: RootQueryToTagConnectionPageInfo;
  };

/** An edge in a connection */
export type RootQueryToTagConnectionEdge = Edge &
  TagConnectionEdge & {
    __typename?: 'RootQueryToTagConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Tag;
  };

/** Page Info on the &quot;RootQueryToTagConnection&quot; */
export type RootQueryToTagConnectionPageInfo = PageInfo &
  TagConnectionPageInfo &
  WpPageInfo & {
    __typename?: 'RootQueryToTagConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the RootQueryToTagConnection connection */
export type RootQueryToTagConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter by Tags by language code (Polylang) */
  language?: InputMaybe<LanguageCodeFilterEnum>;
  /** Filter Tags by one or more languages (Polylang) */
  languages?: InputMaybe<Array<LanguageCodeEnum>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Connection between the RootQuery type and the Taxonomy type */
export type RootQueryToTaxonomyConnection = Connection &
  TaxonomyConnection & {
    __typename?: 'RootQueryToTaxonomyConnection';
    /** Edges for the RootQueryToTaxonomyConnection connection */
    edges: Array<RootQueryToTaxonomyConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Taxonomy>;
    /** Information about pagination in a connection. */
    pageInfo: RootQueryToTaxonomyConnectionPageInfo;
  };

/** An edge in a connection */
export type RootQueryToTaxonomyConnectionEdge = Edge &
  TaxonomyConnectionEdge & {
    __typename?: 'RootQueryToTaxonomyConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Taxonomy;
  };

/** Page Info on the &quot;RootQueryToTaxonomyConnection&quot; */
export type RootQueryToTaxonomyConnectionPageInfo = PageInfo &
  TaxonomyConnectionPageInfo &
  WpPageInfo & {
    __typename?: 'RootQueryToTaxonomyConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Connection between the RootQuery type and the TermNode type */
export type RootQueryToTermNodeConnection = Connection &
  TermNodeConnection & {
    __typename?: 'RootQueryToTermNodeConnection';
    /** Edges for the RootQueryToTermNodeConnection connection */
    edges: Array<RootQueryToTermNodeConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<TermNode>;
    /** Information about pagination in a connection. */
    pageInfo: RootQueryToTermNodeConnectionPageInfo;
  };

/** An edge in a connection */
export type RootQueryToTermNodeConnectionEdge = Edge &
  TermNodeConnectionEdge & {
    __typename?: 'RootQueryToTermNodeConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: TermNode;
  };

/** Page Info on the &quot;RootQueryToTermNodeConnection&quot; */
export type RootQueryToTermNodeConnectionPageInfo = PageInfo &
  TermNodeConnectionPageInfo &
  WpPageInfo & {
    __typename?: 'RootQueryToTermNodeConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the RootQueryToTermNodeConnection connection */
export type RootQueryToTermNodeConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** The Taxonomy to filter terms by */
  taxonomies?: InputMaybe<Array<InputMaybe<TaxonomyEnum>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Connection between the RootQuery type and the Theme type */
export type RootQueryToThemeConnection = Connection &
  ThemeConnection & {
    __typename?: 'RootQueryToThemeConnection';
    /** Edges for the RootQueryToThemeConnection connection */
    edges: Array<RootQueryToThemeConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Theme>;
    /** Information about pagination in a connection. */
    pageInfo: RootQueryToThemeConnectionPageInfo;
  };

/** An edge in a connection */
export type RootQueryToThemeConnectionEdge = Edge &
  ThemeConnectionEdge & {
    __typename?: 'RootQueryToThemeConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Theme;
  };

/** Page Info on the &quot;RootQueryToThemeConnection&quot; */
export type RootQueryToThemeConnectionPageInfo = PageInfo &
  ThemeConnectionPageInfo &
  WpPageInfo & {
    __typename?: 'RootQueryToThemeConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Connection between the RootQuery type and the translation type */
export type RootQueryToTranslationConnection = Connection &
  TranslationConnection & {
    __typename?: 'RootQueryToTranslationConnection';
    /** Edges for the RootQueryToTranslationConnection connection */
    edges: Array<RootQueryToTranslationConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Translation>;
    /** Information about pagination in a connection. */
    pageInfo: RootQueryToTranslationConnectionPageInfo;
  };

/** An edge in a connection */
export type RootQueryToTranslationConnectionEdge = Edge &
  TranslationConnectionEdge & {
    __typename?: 'RootQueryToTranslationConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Translation;
  };

/** Page Info on the &quot;RootQueryToTranslationConnection&quot; */
export type RootQueryToTranslationConnectionPageInfo = PageInfo &
  TranslationConnectionPageInfo &
  WpPageInfo & {
    __typename?: 'RootQueryToTranslationConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the RootQueryToTranslationConnection connection */
export type RootQueryToTranslationConnectionWhereArgs = {
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the RootQuery type and the User type */
export type RootQueryToUserConnection = Connection &
  UserConnection & {
    __typename?: 'RootQueryToUserConnection';
    /** Edges for the RootQueryToUserConnection connection */
    edges: Array<RootQueryToUserConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<User>;
    /** Information about pagination in a connection. */
    pageInfo: RootQueryToUserConnectionPageInfo;
  };

/** An edge in a connection */
export type RootQueryToUserConnectionEdge = Edge &
  UserConnectionEdge & {
    __typename?: 'RootQueryToUserConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: User;
  };

/** Page Info on the &quot;RootQueryToUserConnection&quot; */
export type RootQueryToUserConnectionPageInfo = PageInfo &
  UserConnectionPageInfo &
  WpPageInfo & {
    __typename?: 'RootQueryToUserConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the RootQueryToUserConnection connection */
export type RootQueryToUserConnectionWhereArgs = {
  /** Array of userIds to exclude. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Pass an array of post types to filter results to users who have published posts in those post types. */
  hasPublishedPosts?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of userIds to include. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** The user login. */
  login?: InputMaybe<Scalars['String']['input']>;
  /** An array of logins to include. Users matching one of these logins will be included in results. */
  loginIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** An array of logins to exclude. Users matching one of these logins will not be included in results. */
  loginNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** The user nicename. */
  nicename?: InputMaybe<Scalars['String']['input']>;
  /** An array of nicenames to include. Users matching one of these nicenames will be included in results. */
  nicenameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** An array of nicenames to exclude. Users matching one of these nicenames will not be included in results. */
  nicenameNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<UsersConnectionOrderbyInput>>>;
  /** An array of role names that users must match to be included in results. Note that this is an inclusive list: users must match *each* role. */
  role?: InputMaybe<UserRoleEnum>;
  /** An array of role names. Matched users must have at least one of these roles. */
  roleIn?: InputMaybe<Array<InputMaybe<UserRoleEnum>>>;
  /** An array of role names to exclude. Users matching one or more of these roles will not be included in results. */
  roleNotIn?: InputMaybe<Array<InputMaybe<UserRoleEnum>>>;
  /** Search keyword. Searches for possible string matches on columns. When "searchColumns" is left empty, it tries to determine which column to search in based on search string. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of column names to be searched. Accepts 'ID', 'login', 'nicename', 'email', 'url'. */
  searchColumns?: InputMaybe<
    Array<InputMaybe<UsersConnectionSearchColumnEnum>>
  >;
};

/** Connection between the RootQuery type and the UserRole type */
export type RootQueryToUserRoleConnection = Connection &
  UserRoleConnection & {
    __typename?: 'RootQueryToUserRoleConnection';
    /** Edges for the RootQueryToUserRoleConnection connection */
    edges: Array<RootQueryToUserRoleConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<UserRole>;
    /** Information about pagination in a connection. */
    pageInfo: RootQueryToUserRoleConnectionPageInfo;
  };

/** An edge in a connection */
export type RootQueryToUserRoleConnectionEdge = Edge &
  UserRoleConnectionEdge & {
    __typename?: 'RootQueryToUserRoleConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: UserRole;
  };

/** Page Info on the &quot;RootQueryToUserRoleConnection&quot; */
export type RootQueryToUserRoleConnectionPageInfo = PageInfo &
  UserRoleConnectionPageInfo &
  WpPageInfo & {
    __typename?: 'RootQueryToUserRoleConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

export type Seo = {
  __typename?: 'SEO';
  /** Canonical URL */
  canonicalUrl?: Maybe<Scalars['String']['output']>;
  /** SEO Description */
  description?: Maybe<Scalars['String']['output']>;
  /** Whether this page should be excluded from all archive queries */
  excludeFromArchive?: Maybe<Scalars['Boolean']['output']>;
  /** Whether this page should be excluded from all search queries */
  excludeLocalSearch?: Maybe<Scalars['Boolean']['output']>;
  /** Whether search engines should show cached links of this page */
  noArchive?: Maybe<Scalars['Boolean']['output']>;
  /** Whether search engines should follow the links of this page */
  noFollow?: Maybe<Scalars['Boolean']['output']>;
  /** Whether search engines should index this page */
  noIndex?: Maybe<Scalars['Boolean']['output']>;
  /** Open Graph description */
  openGraphDescription?: Maybe<Scalars['String']['output']>;
  /** Open Graph title */
  openGraphTitle?: Maybe<Scalars['String']['output']>;
  /** Open Graph type (&#039;website&#039;, &#039;article&#039;, ...) */
  openGraphType?: Maybe<Scalars['String']['output']>;
  /** 301 redirect URL to force visitors to another page */
  redirectUrl?: Maybe<Scalars['String']['output']>;
  /** If true, site title is/should not be added to the end of the SEO title */
  removeSiteTitle?: Maybe<Scalars['Boolean']['output']>;
  socialImage?: Maybe<MediaItem>;
  /** SEO Title */
  title?: Maybe<Scalars['String']['output']>;
  /** Twitter description */
  twitterDescription?: Maybe<Scalars['String']['output']>;
  /** Twitter title */
  twitterTitle?: Maybe<Scalars['String']['output']>;
};

/** The strategy to use when loading the script */
export enum ScriptLoadingStrategyEnum {
  /** Use the script `async` attribute */
  Async = 'ASYNC',
  /** Use the script `defer` attribute */
  Defer = 'DEFER',
}

export type SearchResultConnection = {
  __typename?: 'SearchResultConnection';
  count?: Maybe<Scalars['Int']['output']>;
  edges: Array<SearchResultEdge>;
  /** Elasticsearch raw results */
  es_results?: Maybe<Array<Maybe<ElasticSearchResult>>>;
  max_score?: Maybe<Scalars['Float']['output']>;
  pageInfo?: Maybe<SearchResultPageInfo>;
};

export type SearchResultEdge = {
  __typename?: 'SearchResultEdge';
  cursor: Scalars['String']['output'];
  node: SearchResultNode;
};

export type SearchResultNode = {
  __typename?: 'SearchResultNode';
  _score?: Maybe<Scalars['Float']['output']>;
  event?: Maybe<Event>;
  id: Scalars['ID']['output'];
  searchCategories: Array<UnifiedSearchResultCategory>;
  venue?: Maybe<UnifiedSearchVenue>;
};

export type SearchResultPageInfo = {
  __typename?: 'SearchResultPageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type SearchSuggestionConnection = {
  __typename?: 'SearchSuggestionConnection';
  suggestions: Array<Maybe<Suggestion>>;
};

/** Input for the sendPasswordResetEmail mutation. */
export type SendPasswordResetEmailInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** A string that contains the user's username or email address. */
  username: Scalars['String']['input'];
};

/** The payload for the sendPasswordResetEmail mutation. */
export type SendPasswordResetEmailPayload = {
  __typename?: 'SendPasswordResetEmailPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Whether the mutation completed successfully. This does NOT necessarily mean that an email was sent. */
  success?: Maybe<Scalars['Boolean']['output']>;
  /**
   * The user that the password reset email was sent to
   * @deprecated This field will be removed in a future version of WPGraphQL
   */
  user?: Maybe<User>;
};

export type SeoSettings = {
  __typename?: 'SeoSettings';
  /** Title separator setting for seo titles */
  separator?: Maybe<Scalars['String']['output']>;
};

export type ServiceOwner = {
  __typename?: 'ServiceOwner';
  name?: Maybe<LanguageString>;
  providerType?: Maybe<ProviderType>;
  type?: Maybe<ServiceOwnerType>;
};

export enum ServiceOwnerType {
  MunicipalService = 'MUNICIPAL_SERVICE',
  NotDisplayed = 'NOT_DISPLAYED',
  PrivateContractSchool = 'PRIVATE_CONTRACT_SCHOOL',
  PrivateService = 'PRIVATE_SERVICE',
  PurchasedService = 'PURCHASED_SERVICE',
  ServiceByJointMunicipalAuthority = 'SERVICE_BY_JOINT_MUNICIPAL_AUTHORITY',
  ServiceByMunicipallyOwnedCompany = 'SERVICE_BY_MUNICIPALLY_OWNED_COMPANY',
  ServiceByMunicipalGroupEntity = 'SERVICE_BY_MUNICIPAL_GROUP_ENTITY',
  ServiceByOtherMunicipality = 'SERVICE_BY_OTHER_MUNICIPALITY',
  ServiceByRegionalCooperationOrganization = 'SERVICE_BY_REGIONAL_COOPERATION_ORGANIZATION',
  ServiceByWellbeingArea = 'SERVICE_BY_WELLBEING_AREA',
  StateContractSchool = 'STATE_CONTRACT_SCHOOL',
  StateService = 'STATE_SERVICE',
  SupportedOperations = 'SUPPORTED_OPERATIONS',
  VoucherService = 'VOUCHER_SERVICE',
}

/** All of the registered settings */
export type Settings = {
  __typename?: 'Settings';
  /** Settings of the the string Settings Group */
  discussionSettingsDefaultCommentStatus?: Maybe<Scalars['String']['output']>;
  /** Settings of the the string Settings Group */
  discussionSettingsDefaultPingStatus?: Maybe<Scalars['String']['output']>;
  /** Settings of the the string Settings Group */
  generalSettingsDateFormat?: Maybe<Scalars['String']['output']>;
  /** Settings of the the string Settings Group */
  generalSettingsDescription?: Maybe<Scalars['String']['output']>;
  /** Settings of the the string Settings Group */
  generalSettingsLanguage?: Maybe<Scalars['String']['output']>;
  /** Settings of the the integer Settings Group */
  generalSettingsStartOfWeek?: Maybe<Scalars['Int']['output']>;
  /** Settings of the the string Settings Group */
  generalSettingsTimeFormat?: Maybe<Scalars['String']['output']>;
  /** Settings of the the string Settings Group */
  generalSettingsTimezone?: Maybe<Scalars['String']['output']>;
  /** Settings of the the string Settings Group */
  generalSettingsTitle?: Maybe<Scalars['String']['output']>;
  /** Settings of the the integer Settings Group */
  readingSettingsPageForPosts?: Maybe<Scalars['Int']['output']>;
  /** Settings of the the integer Settings Group */
  readingSettingsPageOnFront?: Maybe<Scalars['Int']['output']>;
  /** Settings of the the integer Settings Group */
  readingSettingsPostsPerPage?: Maybe<Scalars['Int']['output']>;
  /** Settings of the the string Settings Group */
  readingSettingsShowOnFront?: Maybe<Scalars['String']['output']>;
  /** Settings of the the integer Settings Group */
  writingSettingsDefaultCategory?: Maybe<Scalars['Int']['output']>;
  /** Settings of the the string Settings Group */
  writingSettingsDefaultPostFormat?: Maybe<Scalars['String']['output']>;
  /** Settings of the the boolean Settings Group */
  writingSettingsUseSmilies?: Maybe<Scalars['Boolean']['output']>;
};

export type Shards = {
  __typename?: 'Shards';
  failed?: Maybe<Scalars['Int']['output']>;
  skipped?: Maybe<Scalars['Int']['output']>;
  successful?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type SingleHit = {
  __typename?: 'SingleHit';
  _id?: Maybe<Scalars['String']['output']>;
  _index?: Maybe<Scalars['String']['output']>;
  _score?: Maybe<Scalars['Float']['output']>;
  _source?: Maybe<RawJson>;
  _type?: Maybe<Scalars['String']['output']>;
};

export type SiteSettings = {
  __typename?: 'SiteSettings';
  /** Attachment ID for logo */
  logo?: Maybe<Scalars['String']['output']>;
  /** Redirects */
  redirects?: Maybe<Scalars['String']['output']>;
  /** Identifying name */
  siteName?: Maybe<Scalars['String']['output']>;
};

export enum SortOrder {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING',
}

export type StaticPage = {
  __typename?: 'StaticPage';
  contentSection?: Maybe<LocalizedObject>;
  contentYype?: Maybe<Scalars['Int']['output']>;
  depth?: Maybe<Scalars['Int']['output']>;
  draftTitle?: Maybe<Scalars['String']['output']>;
  expireAt?: Maybe<Scalars['String']['output']>;
  expired?: Maybe<Scalars['Boolean']['output']>;
  firstPublishedAt?: Maybe<Scalars['String']['output']>;
  goLiveAt?: Maybe<Scalars['String']['output']>;
  hasUnpublishedChanges?: Maybe<Scalars['Boolean']['output']>;
  headingSection?: Maybe<LocalizedObject>;
  id: Scalars['ID']['output'];
  keywords?: Maybe<LocalizedCmsKeywords>;
  lastPublishedAt?: Maybe<Scalars['String']['output']>;
  latestRevisionCreatedAt?: Maybe<Scalars['String']['output']>;
  live?: Maybe<Scalars['Boolean']['output']>;
  liveRevision?: Maybe<Scalars['Int']['output']>;
  locked?: Maybe<Scalars['Boolean']['output']>;
  lockedAt?: Maybe<Scalars['String']['output']>;
  lockedBy?: Maybe<Scalars['String']['output']>;
  numchild?: Maybe<Scalars['Int']['output']>;
  owner?: Maybe<Scalars['Int']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  searchDescription?: Maybe<Scalars['String']['output']>;
  seoTitle?: Maybe<Scalars['String']['output']>;
  showInMenus?: Maybe<Scalars['Boolean']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  urlPath?: Maybe<Scalars['String']['output']>;
};

/** Vaiheen kenttä */
export type Step = {
  __typename?: 'Step';
  /** Vaiheen sisältö */
  content?: Maybe<Scalars['String']['output']>;
  /** Vaiheen otsikko */
  title?: Maybe<Scalars['String']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  _empty?: Maybe<Scalars['String']['output']>;
};

export type Suggestion = {
  __typename?: 'Suggestion';
  label: Scalars['String']['output'];
};

/** The tag type */
export type Tag = DatabaseIdentifier &
  MenuItemLinkable &
  Node &
  TermNode &
  UniformResourceIdentifiable & {
    __typename?: 'Tag';
    /** Connection between the Tag type and the ContentNode type */
    contentNodes?: Maybe<TagToContentNodeConnection>;
    /** The number of objects connected to the object */
    count?: Maybe<Scalars['Int']['output']>;
    /** The unique identifier stored in the database */
    databaseId: Scalars['Int']['output'];
    /** The description of the object */
    description?: Maybe<Scalars['String']['output']>;
    /** Connection between the TermNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<TermNodeToEnqueuedScriptConnection>;
    /** Connection between the TermNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<TermNodeToEnqueuedStylesheetConnection>;
    /** The globally unique ID for the object */
    id: Scalars['ID']['output'];
    /** Whether the node is a Comment */
    isComment: Scalars['Boolean']['output'];
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']['output'];
    /** Whether the node represents the front page. */
    isFrontPage: Scalars['Boolean']['output'];
    /** Whether  the node represents the blog page. */
    isPostsPage: Scalars['Boolean']['output'];
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']['output']>;
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']['output'];
    /** List available translations for this post */
    language?: Maybe<Language>;
    /** The link to the term */
    link?: Maybe<Scalars['String']['output']>;
    /** The human friendly name of the object. */
    name?: Maybe<Scalars['String']['output']>;
    /** Connection between the Tag type and the post type */
    posts?: Maybe<TagToPostConnection>;
    /** An alphanumeric identifier for the object unique to its type. */
    slug?: Maybe<Scalars['String']['output']>;
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of databaseId
     */
    tagId?: Maybe<Scalars['Int']['output']>;
    /** Connection between the Tag type and the Taxonomy type */
    taxonomy?: Maybe<TagToTaxonomyConnectionEdge>;
    /** The name of the taxonomy that the object is associated with */
    taxonomyName?: Maybe<Scalars['String']['output']>;
    /** The ID of the term group that this term object belongs to */
    termGroupId?: Maybe<Scalars['Int']['output']>;
    /** The taxonomy ID that the object is associated with */
    termTaxonomyId?: Maybe<Scalars['Int']['output']>;
    /** Get specific translation version of this object */
    translation?: Maybe<Tag>;
    /** List all translated versions of this term */
    translations?: Maybe<Array<Maybe<Tag>>>;
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']['output']>;
  };

/** The tag type */
export type TagContentNodesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TagToContentNodeConnectionWhereArgs>;
};

/** The tag type */
export type TagEnqueuedScriptsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The tag type */
export type TagEnqueuedStylesheetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The tag type */
export type TagPostsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TagToPostConnectionWhereArgs>;
};

/** The tag type */
export type TagTranslationArgs = {
  language: LanguageCodeEnum;
};

/** Connection to tag Nodes */
export type TagConnection = {
  /** A list of edges (relational context) between RootQuery and connected tag Nodes */
  edges: Array<TagConnectionEdge>;
  /** A list of connected tag Nodes */
  nodes: Array<Tag>;
  /** Information about pagination in a connection. */
  pageInfo: TagConnectionPageInfo;
};

/** Edge between a Node and a connected tag */
export type TagConnectionEdge = {
  /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The connected tag Node */
  node: Tag;
};

/** Page Info on the connected TagConnectionEdge */
export type TagConnectionPageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum TagIdType {
  /** The Database ID for the node */
  DatabaseId = 'DATABASE_ID',
  /** The hashed Global ID */
  Id = 'ID',
  /** The name of the node */
  Name = 'NAME',
  /** Url friendly name of the node */
  Slug = 'SLUG',
  /** The URI for the node */
  Uri = 'URI',
}

/** Connection between the Tag type and the ContentNode type */
export type TagToContentNodeConnection = Connection &
  ContentNodeConnection & {
    __typename?: 'TagToContentNodeConnection';
    /** Edges for the TagToContentNodeConnection connection */
    edges: Array<TagToContentNodeConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<ContentNode>;
    /** Information about pagination in a connection. */
    pageInfo: TagToContentNodeConnectionPageInfo;
  };

/** An edge in a connection */
export type TagToContentNodeConnectionEdge = ContentNodeConnectionEdge &
  Edge & {
    __typename?: 'TagToContentNodeConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: ContentNode;
  };

/** Page Info on the &quot;TagToContentNodeConnection&quot; */
export type TagToContentNodeConnectionPageInfo = ContentNodeConnectionPageInfo &
  PageInfo &
  WpPageInfo & {
    __typename?: 'TagToContentNodeConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the TagToContentNodeConnection connection */
export type TagToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypesOfTagEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the Tag type and the post type */
export type TagToPostConnection = Connection &
  PostConnection & {
    __typename?: 'TagToPostConnection';
    /** Edges for the TagToPostConnection connection */
    edges: Array<TagToPostConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Post>;
    /** Information about pagination in a connection. */
    pageInfo: TagToPostConnectionPageInfo;
  };

/** An edge in a connection */
export type TagToPostConnectionEdge = Edge &
  PostConnectionEdge & {
    __typename?: 'TagToPostConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Post;
  };

/** Page Info on the &quot;TagToPostConnection&quot; */
export type TagToPostConnectionPageInfo = PageInfo &
  PostConnectionPageInfo &
  WpPageInfo & {
    __typename?: 'TagToPostConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the TagToPostConnection connection */
export type TagToPostConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']['input']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']['input']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Category ID */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Use Category Slug */
  categoryName?: InputMaybe<Scalars['String']['input']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Use Tag ID */
  tagId?: InputMaybe<Scalars['String']['input']>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of tag slugs, used to display objects from one tag AND another */
  tagSlugAnd?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of tag slugs, used to include objects in ANY specified tags */
  tagSlugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the Tag type and the Taxonomy type */
export type TagToTaxonomyConnectionEdge = Edge &
  OneToOneConnection &
  TaxonomyConnectionEdge & {
    __typename?: 'TagToTaxonomyConnectionEdge';
    /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The node of the connection, without the edges */
    node: Taxonomy;
  };

export enum TargetGroup {
  Associations = 'ASSOCIATIONS',
  ChildrenAndFamilies = 'CHILDREN_AND_FAMILIES',
  Disabled = 'DISABLED',
  ElderlyPeople = 'ELDERLY_PEOPLE',
  Enterprises = 'ENTERPRISES',
  Immigrants = 'IMMIGRANTS',
  Individuals = 'INDIVIDUALS',
  Youth = 'YOUTH',
}

/** A taxonomy object */
export type Taxonomy = Node & {
  __typename?: 'Taxonomy';
  /** List of Content Types associated with the Taxonomy */
  connectedContentTypes?: Maybe<TaxonomyToContentTypeConnection>;
  /** List of Term Nodes associated with the Taxonomy */
  connectedTerms?: Maybe<TaxonomyToTermNodeConnection>;
  /** Description of the taxonomy. This field is equivalent to WP_Taxonomy-&gt;description */
  description?: Maybe<Scalars['String']['output']>;
  /** The plural name of the post type within the GraphQL Schema. */
  graphqlPluralName?: Maybe<Scalars['String']['output']>;
  /** The singular name of the post type within the GraphQL Schema. */
  graphqlSingleName?: Maybe<Scalars['String']['output']>;
  /** Whether the taxonomy is hierarchical */
  hierarchical?: Maybe<Scalars['Boolean']['output']>;
  /** The globally unique identifier of the taxonomy object. */
  id: Scalars['ID']['output'];
  /** Whether the object is restricted from the current viewer */
  isRestricted?: Maybe<Scalars['Boolean']['output']>;
  /** Name of the taxonomy shown in the menu. Usually plural. */
  label?: Maybe<Scalars['String']['output']>;
  /** The display name of the taxonomy. This field is equivalent to WP_Taxonomy-&gt;label */
  name?: Maybe<Scalars['String']['output']>;
  /** Whether the taxonomy is publicly queryable */
  public?: Maybe<Scalars['Boolean']['output']>;
  /** Name of content type to display in REST API &quot;wp/v2&quot; namespace. */
  restBase?: Maybe<Scalars['String']['output']>;
  /** The REST Controller class assigned to handling this content type. */
  restControllerClass?: Maybe<Scalars['String']['output']>;
  /** Whether to show the taxonomy as part of a tag cloud widget. This field is equivalent to WP_Taxonomy-&gt;show_tagcloud */
  showCloud?: Maybe<Scalars['Boolean']['output']>;
  /** Whether to display a column for the taxonomy on its post type listing screens. */
  showInAdminColumn?: Maybe<Scalars['Boolean']['output']>;
  /** Whether to add the post type to the GraphQL Schema. */
  showInGraphql?: Maybe<Scalars['Boolean']['output']>;
  /** Whether to show the taxonomy in the admin menu */
  showInMenu?: Maybe<Scalars['Boolean']['output']>;
  /** Whether the taxonomy is available for selection in navigation menus. */
  showInNavMenus?: Maybe<Scalars['Boolean']['output']>;
  /** Whether to show the taxonomy in the quick/bulk edit panel. */
  showInQuickEdit?: Maybe<Scalars['Boolean']['output']>;
  /** Whether to add the post type route in the REST API &quot;wp/v2&quot; namespace. */
  showInRest?: Maybe<Scalars['Boolean']['output']>;
  /** Whether to generate and allow a UI for managing terms in this taxonomy in the admin */
  showUi?: Maybe<Scalars['Boolean']['output']>;
};

/** A taxonomy object */
export type TaxonomyConnectedContentTypesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** A taxonomy object */
export type TaxonomyConnectedTermsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** Connection to Taxonomy Nodes */
export type TaxonomyConnection = {
  /** A list of edges (relational context) between RootQuery and connected Taxonomy Nodes */
  edges: Array<TaxonomyConnectionEdge>;
  /** A list of connected Taxonomy Nodes */
  nodes: Array<Taxonomy>;
  /** Information about pagination in a connection. */
  pageInfo: TaxonomyConnectionPageInfo;
};

/** Edge between a Node and a connected Taxonomy */
export type TaxonomyConnectionEdge = {
  /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The connected Taxonomy Node */
  node: Taxonomy;
};

/** Page Info on the connected TaxonomyConnectionEdge */
export type TaxonomyConnectionPageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** Allowed taxonomies */
export enum TaxonomyEnum {
  /** Taxonomy enum category */
  Category = 'CATEGORY',
  /** Taxonomy enum post_format */
  Postformat = 'POSTFORMAT',
  /** Taxonomy enum post_tag */
  Tag = 'TAG',
}

/** The Type of Identifier used to fetch a single Taxonomy node. To be used along with the "id" field. Default is "ID". */
export enum TaxonomyIdTypeEnum {
  /** The globally unique ID */
  Id = 'ID',
  /** The name of the taxonomy */
  Name = 'NAME',
}

/** Connection between the Taxonomy type and the ContentType type */
export type TaxonomyToContentTypeConnection = Connection &
  ContentTypeConnection & {
    __typename?: 'TaxonomyToContentTypeConnection';
    /** Edges for the TaxonomyToContentTypeConnection connection */
    edges: Array<TaxonomyToContentTypeConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<ContentType>;
    /** Information about pagination in a connection. */
    pageInfo: TaxonomyToContentTypeConnectionPageInfo;
  };

/** An edge in a connection */
export type TaxonomyToContentTypeConnectionEdge = ContentTypeConnectionEdge &
  Edge & {
    __typename?: 'TaxonomyToContentTypeConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: ContentType;
  };

/** Page Info on the &quot;TaxonomyToContentTypeConnection&quot; */
export type TaxonomyToContentTypeConnectionPageInfo =
  ContentTypeConnectionPageInfo &
    PageInfo &
    WpPageInfo & {
      __typename?: 'TaxonomyToContentTypeConnectionPageInfo';
      /** When paginating forwards, the cursor to continue. */
      endCursor?: Maybe<Scalars['String']['output']>;
      /** When paginating forwards, are there more items? */
      hasNextPage: Scalars['Boolean']['output'];
      /** When paginating backwards, are there more items? */
      hasPreviousPage: Scalars['Boolean']['output'];
      /** When paginating backwards, the cursor to continue. */
      startCursor?: Maybe<Scalars['String']['output']>;
    };

/** Connection between the Taxonomy type and the TermNode type */
export type TaxonomyToTermNodeConnection = Connection &
  TermNodeConnection & {
    __typename?: 'TaxonomyToTermNodeConnection';
    /** Edges for the TaxonomyToTermNodeConnection connection */
    edges: Array<TaxonomyToTermNodeConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<TermNode>;
    /** Information about pagination in a connection. */
    pageInfo: TaxonomyToTermNodeConnectionPageInfo;
  };

/** An edge in a connection */
export type TaxonomyToTermNodeConnectionEdge = Edge &
  TermNodeConnectionEdge & {
    __typename?: 'TaxonomyToTermNodeConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: TermNode;
  };

/** Page Info on the &quot;TaxonomyToTermNodeConnection&quot; */
export type TaxonomyToTermNodeConnectionPageInfo = PageInfo &
  TermNodeConnectionPageInfo &
  WpPageInfo & {
    __typename?: 'TaxonomyToTermNodeConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Hae sivuobjekti sivupohjan mukaan */
export enum TemplateEnum {
  FrontPage = 'frontPage',
  PostsPage = 'postsPage',
}

/** Terms are nodes within a Taxonomy, used to group and relate other nodes. */
export type TermNode = {
  /** The number of objects connected to the object */
  count?: Maybe<Scalars['Int']['output']>;
  /** Identifies the primary key from the database. */
  databaseId: Scalars['Int']['output'];
  /** The description of the object */
  description?: Maybe<Scalars['String']['output']>;
  /** Connection between the TermNode type and the EnqueuedScript type */
  enqueuedScripts?: Maybe<TermNodeToEnqueuedScriptConnection>;
  /** Connection between the TermNode type and the EnqueuedStylesheet type */
  enqueuedStylesheets?: Maybe<TermNodeToEnqueuedStylesheetConnection>;
  /** The globally unique ID for the object */
  id: Scalars['ID']['output'];
  /** Whether the node is a Comment */
  isComment: Scalars['Boolean']['output'];
  /** Whether the node is a Content Node */
  isContentNode: Scalars['Boolean']['output'];
  /** Whether the node represents the front page. */
  isFrontPage: Scalars['Boolean']['output'];
  /** Whether  the node represents the blog page. */
  isPostsPage: Scalars['Boolean']['output'];
  /** Whether the object is restricted from the current viewer */
  isRestricted?: Maybe<Scalars['Boolean']['output']>;
  /** Whether the node is a Term */
  isTermNode: Scalars['Boolean']['output'];
  /** The link to the term */
  link?: Maybe<Scalars['String']['output']>;
  /** The human friendly name of the object. */
  name?: Maybe<Scalars['String']['output']>;
  /** An alphanumeric identifier for the object unique to its type. */
  slug?: Maybe<Scalars['String']['output']>;
  /** The name of the taxonomy that the object is associated with */
  taxonomyName?: Maybe<Scalars['String']['output']>;
  /** The ID of the term group that this term object belongs to */
  termGroupId?: Maybe<Scalars['Int']['output']>;
  /** The taxonomy ID that the object is associated with */
  termTaxonomyId?: Maybe<Scalars['Int']['output']>;
  /** The unique resource identifier path */
  uri?: Maybe<Scalars['String']['output']>;
};

/** Terms are nodes within a Taxonomy, used to group and relate other nodes. */
export type TermNodeEnqueuedScriptsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** Terms are nodes within a Taxonomy, used to group and relate other nodes. */
export type TermNodeEnqueuedStylesheetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** Connection to TermNode Nodes */
export type TermNodeConnection = {
  /** A list of edges (relational context) between RootQuery and connected TermNode Nodes */
  edges: Array<TermNodeConnectionEdge>;
  /** A list of connected TermNode Nodes */
  nodes: Array<TermNode>;
  /** Information about pagination in a connection. */
  pageInfo: TermNodeConnectionPageInfo;
};

/** Edge between a Node and a connected TermNode */
export type TermNodeConnectionEdge = {
  /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The connected TermNode Node */
  node: TermNode;
};

/** Page Info on the connected TermNodeConnectionEdge */
export type TermNodeConnectionPageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The Type of Identifier used to fetch a single resource. Default is "ID". To be used along with the "id" field. */
export enum TermNodeIdTypeEnum {
  /** The Database ID for the node */
  DatabaseId = 'DATABASE_ID',
  /** The hashed Global ID */
  Id = 'ID',
  /** The name of the node */
  Name = 'NAME',
  /** Url friendly name of the node */
  Slug = 'SLUG',
  /** The URI for the node */
  Uri = 'URI',
}

/** Connection between the TermNode type and the EnqueuedScript type */
export type TermNodeToEnqueuedScriptConnection = Connection &
  EnqueuedScriptConnection & {
    __typename?: 'TermNodeToEnqueuedScriptConnection';
    /** Edges for the TermNodeToEnqueuedScriptConnection connection */
    edges: Array<TermNodeToEnqueuedScriptConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<EnqueuedScript>;
    /** Information about pagination in a connection. */
    pageInfo: TermNodeToEnqueuedScriptConnectionPageInfo;
  };

/** An edge in a connection */
export type TermNodeToEnqueuedScriptConnectionEdge = Edge &
  EnqueuedScriptConnectionEdge & {
    __typename?: 'TermNodeToEnqueuedScriptConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: EnqueuedScript;
  };

/** Page Info on the &quot;TermNodeToEnqueuedScriptConnection&quot; */
export type TermNodeToEnqueuedScriptConnectionPageInfo =
  EnqueuedScriptConnectionPageInfo &
    PageInfo &
    WpPageInfo & {
      __typename?: 'TermNodeToEnqueuedScriptConnectionPageInfo';
      /** When paginating forwards, the cursor to continue. */
      endCursor?: Maybe<Scalars['String']['output']>;
      /** When paginating forwards, are there more items? */
      hasNextPage: Scalars['Boolean']['output'];
      /** When paginating backwards, are there more items? */
      hasPreviousPage: Scalars['Boolean']['output'];
      /** When paginating backwards, the cursor to continue. */
      startCursor?: Maybe<Scalars['String']['output']>;
    };

/** Connection between the TermNode type and the EnqueuedStylesheet type */
export type TermNodeToEnqueuedStylesheetConnection = Connection &
  EnqueuedStylesheetConnection & {
    __typename?: 'TermNodeToEnqueuedStylesheetConnection';
    /** Edges for the TermNodeToEnqueuedStylesheetConnection connection */
    edges: Array<TermNodeToEnqueuedStylesheetConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<EnqueuedStylesheet>;
    /** Information about pagination in a connection. */
    pageInfo: TermNodeToEnqueuedStylesheetConnectionPageInfo;
  };

/** An edge in a connection */
export type TermNodeToEnqueuedStylesheetConnectionEdge = Edge &
  EnqueuedStylesheetConnectionEdge & {
    __typename?: 'TermNodeToEnqueuedStylesheetConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: EnqueuedStylesheet;
  };

/** Page Info on the &quot;TermNodeToEnqueuedStylesheetConnection&quot; */
export type TermNodeToEnqueuedStylesheetConnectionPageInfo =
  EnqueuedStylesheetConnectionPageInfo &
    PageInfo &
    WpPageInfo & {
      __typename?: 'TermNodeToEnqueuedStylesheetConnectionPageInfo';
      /** When paginating forwards, the cursor to continue. */
      endCursor?: Maybe<Scalars['String']['output']>;
      /** When paginating forwards, are there more items? */
      hasNextPage: Scalars['Boolean']['output'];
      /** When paginating backwards, are there more items? */
      hasPreviousPage: Scalars['Boolean']['output'];
      /** When paginating backwards, the cursor to continue. */
      startCursor?: Maybe<Scalars['String']['output']>;
    };

/** Options for ordering the connection by */
export enum TermObjectsConnectionOrderbyEnum {
  /** Order the connection by item count. */
  Count = 'COUNT',
  /** Order the connection by description. */
  Description = 'DESCRIPTION',
  /** Order the connection by name. */
  Name = 'NAME',
  /** Order the connection by slug. */
  Slug = 'SLUG',
  /** Order the connection by term group. */
  TermGroup = 'TERM_GROUP',
  /** Order the connection by term id. */
  TermId = 'TERM_ID',
  /** Order the connection by term order. */
  TermOrder = 'TERM_ORDER',
}

/** A theme object */
export type Theme = Node & {
  __typename?: 'Theme';
  /** Name of the theme author(s), could also be a company name. This field is equivalent to WP_Theme-&gt;get( &quot;Author&quot; ). */
  author?: Maybe<Scalars['String']['output']>;
  /** URI for the author/company website. This field is equivalent to WP_Theme-&gt;get( &quot;AuthorURI&quot; ). */
  authorUri?: Maybe<Scalars['String']['output']>;
  /** The description of the theme. This field is equivalent to WP_Theme-&gt;get( &quot;Description&quot; ). */
  description?: Maybe<Scalars['String']['output']>;
  /** The globally unique identifier of the theme object. */
  id: Scalars['ID']['output'];
  /** Whether the object is restricted from the current viewer */
  isRestricted?: Maybe<Scalars['Boolean']['output']>;
  /** Display name of the theme. This field is equivalent to WP_Theme-&gt;get( &quot;Name&quot; ). */
  name?: Maybe<Scalars['String']['output']>;
  /** The URL of the screenshot for the theme. The screenshot is intended to give an overview of what the theme looks like. This field is equivalent to WP_Theme-&gt;get_screenshot(). */
  screenshot?: Maybe<Scalars['String']['output']>;
  /** The theme slug is used to internally match themes. Theme slugs can have subdirectories like: my-theme/sub-theme. This field is equivalent to WP_Theme-&gt;get_stylesheet(). */
  slug?: Maybe<Scalars['String']['output']>;
  /** URI for the author/company website. This field is equivalent to WP_Theme-&gt;get( &quot;Tags&quot; ). */
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** A URI if the theme has a website associated with it. The Theme URI is handy for directing users to a theme site for support etc. This field is equivalent to WP_Theme-&gt;get( &quot;ThemeURI&quot; ). */
  themeUri?: Maybe<Scalars['String']['output']>;
  /** The current version of the theme. This field is equivalent to WP_Theme-&gt;get( &quot;Version&quot; ). */
  version?: Maybe<Scalars['String']['output']>;
};

/** Connection to Theme Nodes */
export type ThemeConnection = {
  /** A list of edges (relational context) between RootQuery and connected Theme Nodes */
  edges: Array<ThemeConnectionEdge>;
  /** A list of connected Theme Nodes */
  nodes: Array<Theme>;
  /** Information about pagination in a connection. */
  pageInfo: ThemeConnectionPageInfo;
};

/** Edge between a Node and a connected Theme */
export type ThemeConnectionEdge = {
  /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The connected Theme Node */
  node: Theme;
};

/** Page Info on the connected ThemeConnectionEdge */
export type ThemeConnectionPageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Time = {
  __typename?: 'Time';
  description: Scalars['String']['output'];
  endTime: Scalars['String']['output'];
  endTimeOnNextDay: Scalars['Boolean']['output'];
  fullDay: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  periods: Array<Scalars['Int']['output']>;
  resourceState: ResourceState;
  startTime: Scalars['String']['output'];
};

/** any kind of description answering the question "when". */
export type TimeDescription = {
  __typename?: 'TimeDescription';
  ending?: Maybe<Scalars['DateTime']['output']>;
  otherTime?: Maybe<TimeDescription>;
  starting?: Maybe<Scalars['DateTime']['output']>;
};

/** The translation type */
export type Translation = ContentNode &
  DatabaseIdentifier &
  Node &
  NodeWithRevisions &
  NodeWithTemplate &
  NodeWithTitle &
  Previewable &
  UniformResourceIdentifiable & {
    __typename?: 'Translation';
    /** Connection between the ContentNode type and the ContentType type */
    contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
    /** The name of the Content Type the node belongs to */
    contentTypeName: Scalars['String']['output'];
    /** The unique identifier stored in the database */
    databaseId: Scalars['Int']['output'];
    /** Post publishing date. */
    date?: Maybe<Scalars['String']['output']>;
    /** The publishing date set in GMT. */
    dateGmt?: Maybe<Scalars['String']['output']>;
    /** The desired slug of the post */
    desiredSlug?: Maybe<Scalars['String']['output']>;
    /** If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds */
    editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
    /** The RSS enclosure for the object */
    enclosure?: Maybe<Scalars['String']['output']>;
    /** Connection between the ContentNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<ContentNodeToEnqueuedScriptConnection>;
    /** Connection between the ContentNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<ContentNodeToEnqueuedStylesheetConnection>;
    /** The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table. */
    guid?: Maybe<Scalars['String']['output']>;
    /** The globally unique identifier of the translation-cpt object. */
    id: Scalars['ID']['output'];
    /** Whether the node is a Comment */
    isComment: Scalars['Boolean']['output'];
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']['output'];
    /** Whether the node represents the front page. */
    isFrontPage: Scalars['Boolean']['output'];
    /** Whether  the node represents the blog page. */
    isPostsPage: Scalars['Boolean']['output'];
    /** Whether the object is a node in the preview state */
    isPreview?: Maybe<Scalars['Boolean']['output']>;
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']['output']>;
    /** True if the node is a revision of another node */
    isRevision?: Maybe<Scalars['Boolean']['output']>;
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']['output'];
    /** The user that most recently edited the node */
    lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
    /** The permalink of the post */
    link?: Maybe<Scalars['String']['output']>;
    /** The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time. */
    modified?: Maybe<Scalars['String']['output']>;
    /** The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT. */
    modifiedGmt?: Maybe<Scalars['String']['output']>;
    /** Connection between the Translation type and the translation type */
    preview?: Maybe<TranslationToPreviewConnectionEdge>;
    /** The database id of the preview node */
    previewRevisionDatabaseId?: Maybe<Scalars['Int']['output']>;
    /** Whether the object is a node in the preview state */
    previewRevisionId?: Maybe<Scalars['ID']['output']>;
    /** If the current node is a revision, this field exposes the node this is a revision of. Returns null if the node is not a revision of another node. */
    revisionOf?: Maybe<NodeWithRevisionsToContentNodeConnectionEdge>;
    /** Connection between the Translation type and the translation type */
    revisions?: Maybe<TranslationToRevisionConnection>;
    /** The SEO Framework data of the translation */
    seo?: Maybe<Seo>;
    /** The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table. */
    slug?: Maybe<Scalars['String']['output']>;
    /** The current status of the object */
    status?: Maybe<Scalars['String']['output']>;
    /** The template assigned to the node */
    template?: Maybe<ContentTemplate>;
    /** The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made. */
    title?: Maybe<Scalars['String']['output']>;
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of the databaseId field
     */
    translationId: Scalars['Int']['output'];
    /** Translations */
    translations?: Maybe<Array<Maybe<TranslationResponse>>>;
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']['output']>;
  };

/** The translation type */
export type TranslationEnqueuedScriptsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The translation type */
export type TranslationEnqueuedStylesheetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The translation type */
export type TranslationRevisionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TranslationToRevisionConnectionWhereArgs>;
};

/** The translation type */
export type TranslationTitleArgs = {
  format?: InputMaybe<PostObjectFieldFormatEnum>;
};

/** Connection to translation Nodes */
export type TranslationConnection = {
  /** A list of edges (relational context) between RootQuery and connected translation Nodes */
  edges: Array<TranslationConnectionEdge>;
  /** A list of connected translation Nodes */
  nodes: Array<Translation>;
  /** Information about pagination in a connection. */
  pageInfo: TranslationConnectionPageInfo;
};

/** Edge between a Node and a connected translation */
export type TranslationConnectionEdge = {
  /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The connected translation Node */
  node: Translation;
};

/** Page Info on the connected TranslationConnectionEdge */
export type TranslationConnectionPageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum TranslationIdType {
  /** Identify a resource by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  Id = 'ID',
  /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
  Slug = 'SLUG',
  /** Identify a resource by the URI. */
  Uri = 'URI',
}

/** Translation with language/value pairs */
export type TranslationItems = {
  __typename?: 'TranslationItems';
  /** Translation string */
  en?: Maybe<Scalars['String']['output']>;
  /** Translation string */
  fi?: Maybe<Scalars['String']['output']>;
  /** Translation string */
  sv?: Maybe<Scalars['String']['output']>;
};

/** Translation response contains translation key and translations */
export type TranslationResponse = {
  __typename?: 'TranslationResponse';
  /** Translation key for frontend */
  key?: Maybe<Scalars['String']['output']>;
  /** Translations for frontend */
  translations?: Maybe<TranslationItems>;
};

/** Connection between the Translation type and the translation type */
export type TranslationToPreviewConnectionEdge = Edge &
  OneToOneConnection &
  TranslationConnectionEdge & {
    __typename?: 'TranslationToPreviewConnectionEdge';
    /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The node of the connection, without the edges */
    node: Translation;
  };

/** Connection between the Translation type and the translation type */
export type TranslationToRevisionConnection = Connection &
  TranslationConnection & {
    __typename?: 'TranslationToRevisionConnection';
    /** Edges for the TranslationToRevisionConnection connection */
    edges: Array<TranslationToRevisionConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Translation>;
    /** Information about pagination in a connection. */
    pageInfo: TranslationToRevisionConnectionPageInfo;
  };

/** An edge in a connection */
export type TranslationToRevisionConnectionEdge = Edge &
  TranslationConnectionEdge & {
    __typename?: 'TranslationToRevisionConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Translation;
  };

/** Page Info on the &quot;TranslationToRevisionConnection&quot; */
export type TranslationToRevisionConnectionPageInfo = PageInfo &
  TranslationConnectionPageInfo &
  WpPageInfo & {
    __typename?: 'TranslationToRevisionConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the TranslationToRevisionConnection connection */
export type TranslationToRevisionConnectionWhereArgs = {
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

export enum UnifiedSearchIndex {
  AdministrativeDivision = 'administrative_division',
  Event = 'event',
  HelsinkiCommonAdministrativeDivision = 'helsinki_common_administrative_division',
  Location = 'location',
  OntologyTree = 'ontology_tree',
  OntologyWord = 'ontology_word',
}

export enum UnifiedSearchLanguage {
  English = 'ENGLISH',
  Finnish = 'FINNISH',
  Swedish = 'SWEDISH',
}

/** TODO: take from Profile or external source */
export enum UnifiedSearchLanguageEnum {
  Fi = 'FI',
}

export enum UnifiedSearchResultCategory {
  Article = 'ARTICLE',
  Artwork = 'ARTWORK',
  Enrollable = 'ENROLLABLE',
  Event = 'EVENT',
  PointOfInterest = 'POINT_OF_INTEREST',
  Reservable = 'RESERVABLE',
  Service = 'SERVICE',
}

/**
 * A place that forms a unit and can be used for some specific purpose -
 * respa unit or resource, service map unit, beta.kultus venue, linked
 * events place, Kukkuu venue
 */
export type UnifiedSearchVenue = {
  __typename?: 'UnifiedSearchVenue';
  accessibility?: Maybe<Accessibility>;
  /** Accessibility shortcoming for a specific accessibility profile. */
  accessibilityShortcomingFor?: Maybe<AccessibilityShortcoming>;
  additionalInfo?: Maybe<Scalars['String']['output']>;
  arrivalInstructions?: Maybe<Scalars['String']['output']>;
  contactDetails?: Maybe<ContactInfo>;
  description?: Maybe<LanguageString>;
  descriptionResources?: Maybe<DescriptionResources>;
  facilities?: Maybe<Array<VenueFacility>>;
  images?: Maybe<Array<Maybe<LocationImage>>>;
  location?: Maybe<LocationDescription>;
  manager?: Maybe<LegalEntity>;
  meta?: Maybe<NodeMeta>;
  name?: Maybe<LanguageString>;
  ontologyWords?: Maybe<Array<Maybe<OntologyWord>>>;
  openingHours?: Maybe<OpeningHours>;
  partOf?: Maybe<UnifiedSearchVenue>;
  reservation?: Maybe<Reservation>;
  serviceOwner?: Maybe<ServiceOwner>;
  targetGroups?: Maybe<Array<Maybe<TargetGroup>>>;
};

/**
 * A place that forms a unit and can be used for some specific purpose -
 * respa unit or resource, service map unit, beta.kultus venue, linked
 * events place, Kukkuu venue
 */
export type UnifiedSearchVenueAccessibilityShortcomingForArgs = {
  profile?: InputMaybe<AccessibilityProfile>;
};

/** Any node that has a URI */
export type UniformResourceIdentifiable = {
  /** The globally unique ID for the object */
  id: Scalars['ID']['output'];
  /** Whether the node is a Comment */
  isComment: Scalars['Boolean']['output'];
  /** Whether the node is a Content Node */
  isContentNode: Scalars['Boolean']['output'];
  /** Whether the node represents the front page. */
  isFrontPage: Scalars['Boolean']['output'];
  /** Whether  the node represents the blog page. */
  isPostsPage: Scalars['Boolean']['output'];
  /** Whether the node is a Term */
  isTermNode: Scalars['Boolean']['output'];
  /** The unique resource identifier path */
  uri?: Maybe<Scalars['String']['output']>;
};

/** Input for the updateCategory mutation. */
export type UpdateCategoryInput = {
  /** The slug that the category will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the category object */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the category object to update */
  id: Scalars['ID']['input'];
  language?: InputMaybe<LanguageCodeEnum>;
  /** The name of the category object to mutate */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the category that should be set as the parent */
  parentId?: InputMaybe<Scalars['ID']['input']>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** The payload for the updateCategory mutation. */
export type UpdateCategoryPayload = {
  __typename?: 'UpdateCategoryPayload';
  /** The created category */
  category?: Maybe<Category>;
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

/** Input for the updateCollection mutation. */
export type UpdateCollectionInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the collection object */
  id: Scalars['ID']['input'];
  /** Override the edit lock when another user is editing the post */
  ignoreEditLock?: InputMaybe<Scalars['Boolean']['input']>;
  language?: InputMaybe<LanguageCodeEnum>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars['Int']['input']>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars['String']['input']>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** The title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** The payload for the updateCollection mutation. */
export type UpdateCollectionPayload = {
  __typename?: 'UpdateCollectionPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The Post object mutation type. */
  collection?: Maybe<Collection>;
};

/** Input for the updateComment mutation. */
export type UpdateCommentInput = {
  /** The approval status of the comment. */
  approved?: InputMaybe<Scalars['String']['input']>;
  /** The name of the comment's author. */
  author?: InputMaybe<Scalars['String']['input']>;
  /** The email of the comment's author. */
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  /** The url of the comment's author. */
  authorUrl?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The database ID of the post object the comment belongs to. */
  commentOn?: InputMaybe<Scalars['Int']['input']>;
  /** Content of the comment. */
  content?: InputMaybe<Scalars['String']['input']>;
  /** The date of the object. Preferable to enter as year/month/day ( e.g. 01/31/2017 ) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the comment being updated. */
  id: Scalars['ID']['input'];
  /** Parent comment ID of current comment. */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** The approval status of the comment */
  status?: InputMaybe<CommentStatusEnum>;
  /** Type of comment. */
  type?: InputMaybe<Scalars['String']['input']>;
};

/** The payload for the updateComment mutation. */
export type UpdateCommentPayload = {
  __typename?: 'UpdateCommentPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The comment that was created */
  comment?: Maybe<Comment>;
  /** Whether the mutation succeeded. If the comment is not approved, the server will not return the comment to a non authenticated user, but a success message can be returned if the create succeeded, and the client can optimistically add the comment to the client cache */
  success?: Maybe<Scalars['Boolean']['output']>;
};

/** Input for the updateContact mutation. */
export type UpdateContactInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the contact object */
  id: Scalars['ID']['input'];
  /** Override the edit lock when another user is editing the post */
  ignoreEditLock?: InputMaybe<Scalars['Boolean']['input']>;
  language?: InputMaybe<LanguageCodeEnum>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars['Int']['input']>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars['String']['input']>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** The title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** The payload for the updateContact mutation. */
export type UpdateContactPayload = {
  __typename?: 'UpdateContactPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The Post object mutation type. */
  contact?: Maybe<Contact>;
};

/** Input for the updateLandingPage mutation. */
export type UpdateLandingPageInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the landingPage object */
  id: Scalars['ID']['input'];
  /** Override the edit lock when another user is editing the post */
  ignoreEditLock?: InputMaybe<Scalars['Boolean']['input']>;
  language?: InputMaybe<LanguageCodeEnum>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars['Int']['input']>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars['String']['input']>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** The title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** The payload for the updateLandingPage mutation. */
export type UpdateLandingPagePayload = {
  __typename?: 'UpdateLandingPagePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The Post object mutation type. */
  landingPage?: Maybe<LandingPage>;
};

/** Input for the updateMediaItem mutation. */
export type UpdateMediaItemInput = {
  /** Alternative text to display when mediaItem is not displayed */
  altText?: InputMaybe<Scalars['String']['input']>;
  /** The userId to assign as the author of the mediaItem */
  authorId?: InputMaybe<Scalars['ID']['input']>;
  /** The caption for the mediaItem */
  caption?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The comment status for the mediaItem */
  commentStatus?: InputMaybe<Scalars['String']['input']>;
  /** The date of the mediaItem */
  date?: InputMaybe<Scalars['String']['input']>;
  /** The date (in GMT zone) of the mediaItem */
  dateGmt?: InputMaybe<Scalars['String']['input']>;
  /** Description of the mediaItem */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The file name of the mediaItem */
  filePath?: InputMaybe<Scalars['String']['input']>;
  /** The file type of the mediaItem */
  fileType?: InputMaybe<MimeTypeEnum>;
  /** The ID of the mediaItem object */
  id: Scalars['ID']['input'];
  language?: InputMaybe<LanguageCodeEnum>;
  /** The ID of the parent object */
  parentId?: InputMaybe<Scalars['ID']['input']>;
  /** The ping status for the mediaItem */
  pingStatus?: InputMaybe<Scalars['String']['input']>;
  /** The slug of the mediaItem */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The status of the mediaItem */
  status?: InputMaybe<MediaItemStatusEnum>;
  /** The title of the mediaItem */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** The payload for the updateMediaItem mutation. */
export type UpdateMediaItemPayload = {
  __typename?: 'UpdateMediaItemPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The MediaItem object mutation type. */
  mediaItem?: Maybe<MediaItem>;
};

/** Input for the updatePage mutation. */
export type UpdatePageInput = {
  /** The userId to assign as the author of the object */
  authorId?: InputMaybe<Scalars['ID']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The content of the object */
  content?: InputMaybe<Scalars['String']['input']>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the page object */
  id: Scalars['ID']['input'];
  /** Override the edit lock when another user is editing the post */
  ignoreEditLock?: InputMaybe<Scalars['Boolean']['input']>;
  language?: InputMaybe<LanguageCodeEnum>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars['Int']['input']>;
  /** The ID of the parent object */
  parentId?: InputMaybe<Scalars['ID']['input']>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars['String']['input']>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** The title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** The payload for the updatePage mutation. */
export type UpdatePagePayload = {
  __typename?: 'UpdatePagePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The Post object mutation type. */
  page?: Maybe<Page>;
};

/** Input for the updatePostFormat mutation. */
export type UpdatePostFormatInput = {
  /** The slug that the post_format will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the post_format object */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the postFormat object to update */
  id: Scalars['ID']['input'];
  /** The name of the post_format object to mutate */
  name?: InputMaybe<Scalars['String']['input']>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** The payload for the updatePostFormat mutation. */
export type UpdatePostFormatPayload = {
  __typename?: 'UpdatePostFormatPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The created post_format */
  postFormat?: Maybe<PostFormat>;
};

/** Input for the updatePost mutation. */
export type UpdatePostInput = {
  /** The userId to assign as the author of the object */
  authorId?: InputMaybe<Scalars['ID']['input']>;
  /** Set connections between the post and categories */
  categories?: InputMaybe<PostCategoriesInput>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The content of the object */
  content?: InputMaybe<Scalars['String']['input']>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the post object */
  id: Scalars['ID']['input'];
  /** Override the edit lock when another user is editing the post */
  ignoreEditLock?: InputMaybe<Scalars['Boolean']['input']>;
  language?: InputMaybe<LanguageCodeEnum>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars['Int']['input']>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Set connections between the post and postFormats */
  postFormats?: InputMaybe<PostPostFormatsInput>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** Set connections between the post and tags */
  tags?: InputMaybe<PostTagsInput>;
  /** The title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** The payload for the updatePost mutation. */
export type UpdatePostPayload = {
  __typename?: 'UpdatePostPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The Post object mutation type. */
  post?: Maybe<Post>;
};

/** Input for the updateRelease mutation. */
export type UpdateReleaseInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The content of the object */
  content?: InputMaybe<Scalars['String']['input']>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the release object */
  id: Scalars['ID']['input'];
  /** Override the edit lock when another user is editing the post */
  ignoreEditLock?: InputMaybe<Scalars['Boolean']['input']>;
  language?: InputMaybe<LanguageCodeEnum>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars['Int']['input']>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars['String']['input']>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** The title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** The payload for the updateRelease mutation. */
export type UpdateReleasePayload = {
  __typename?: 'UpdateReleasePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The Post object mutation type. */
  release?: Maybe<Release>;
};

/** Input for the updateSettings mutation. */
export type UpdateSettingsInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Salli uusien artikkelien kommentointi. */
  discussionSettingsDefaultCommentStatus?: InputMaybe<
    Scalars['String']['input']
  >;
  /** Salli linkki-ilmoitukset muista blogeista (pingback ja trackback) uusiin artikkeleihin. */
  discussionSettingsDefaultPingStatus?: InputMaybe<Scalars['String']['input']>;
  /** Muoto kaikille päivämäärän merkkijonoille. */
  generalSettingsDateFormat?: InputMaybe<Scalars['String']['input']>;
  /** Sivuston kuvaus. */
  generalSettingsDescription?: InputMaybe<Scalars['String']['input']>;
  /** WordPressin kieli- ja maakoodi. */
  generalSettingsLanguage?: InputMaybe<Scalars['String']['input']>;
  /** Viikonpäivän numero josta viikko alkaa. */
  generalSettingsStartOfWeek?: InputMaybe<Scalars['Int']['input']>;
  /** Muoto kaikille kellonajan merkkijonoille. */
  generalSettingsTimeFormat?: InputMaybe<Scalars['String']['input']>;
  /** Kaupunki samalla aikavyöhykkeellä kuin sinä. */
  generalSettingsTimezone?: InputMaybe<Scalars['String']['input']>;
  /** Sivuston otsikko. */
  generalSettingsTitle?: InputMaybe<Scalars['String']['input']>;
  /** Tunniste sivusta, joka näyttää uusimmat artikkelit */
  readingSettingsPageForPosts?: InputMaybe<Scalars['Int']['input']>;
  /** Tunniste sivusta, joka näytetään etusivulla */
  readingSettingsPageOnFront?: InputMaybe<Scalars['Int']['input']>;
  /** Näytä enintään */
  readingSettingsPostsPerPage?: InputMaybe<Scalars['Int']['input']>;
  /** Mitä näytetään etusivulla */
  readingSettingsShowOnFront?: InputMaybe<Scalars['String']['input']>;
  /** Oletuskategoria artikkeleille. */
  writingSettingsDefaultCategory?: InputMaybe<Scalars['Int']['input']>;
  /** Artikkelisivujen oletusmuoto. */
  writingSettingsDefaultPostFormat?: InputMaybe<Scalars['String']['input']>;
  /** Muunna hymiöt kuviksi. */
  writingSettingsUseSmilies?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The payload for the updateSettings mutation. */
export type UpdateSettingsPayload = {
  __typename?: 'UpdateSettingsPayload';
  /** Update all settings. */
  allSettings?: Maybe<Settings>;
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Update the DiscussionSettings setting. */
  discussionSettings?: Maybe<DiscussionSettings>;
  /** Update the GeneralSettings setting. */
  generalSettings?: Maybe<GeneralSettings>;
  /** Update the ReadingSettings setting. */
  readingSettings?: Maybe<ReadingSettings>;
  /** Update the WritingSettings setting. */
  writingSettings?: Maybe<WritingSettings>;
};

/** Input for the updateTag mutation. */
export type UpdateTagInput = {
  /** The slug that the post_tag will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the post_tag object */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the tag object to update */
  id: Scalars['ID']['input'];
  language?: InputMaybe<LanguageCodeEnum>;
  /** The name of the post_tag object to mutate */
  name?: InputMaybe<Scalars['String']['input']>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** The payload for the updateTag mutation. */
export type UpdateTagPayload = {
  __typename?: 'UpdateTagPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The created post_tag */
  tag?: Maybe<Tag>;
};

/** Input for the updateTranslation mutation. */
export type UpdateTranslationInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the translation object */
  id: Scalars['ID']['input'];
  /** Override the edit lock when another user is editing the post */
  ignoreEditLock?: InputMaybe<Scalars['Boolean']['input']>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars['Int']['input']>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars['String']['input']>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** The title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** The payload for the updateTranslation mutation. */
export type UpdateTranslationPayload = {
  __typename?: 'UpdateTranslationPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The Post object mutation type. */
  translation?: Maybe<Translation>;
};

/** Input for the updateUser mutation. */
export type UpdateUserInput = {
  /** User's AOL IM account. */
  aim?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** A string containing content about the user. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** A string that will be shown on the site. Defaults to user's username. It is likely that you will want to change this, for both appearance and security through obscurity (that is if you dont use and delete the default admin user). */
  displayName?: InputMaybe<Scalars['String']['input']>;
  /** A string containing the user's email address. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** 	The user's first name. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the user */
  id: Scalars['ID']['input'];
  /** User's Jabber account. */
  jabber?: InputMaybe<Scalars['String']['input']>;
  /** The user's last name. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** User's locale. */
  locale?: InputMaybe<Scalars['String']['input']>;
  /** A string that contains a URL-friendly name for the user. The default is the user's username. */
  nicename?: InputMaybe<Scalars['String']['input']>;
  /** The user's nickname, defaults to the user's username. */
  nickname?: InputMaybe<Scalars['String']['input']>;
  /** A string that contains the plain text password for the user. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** If true, this will refresh the users JWT secret. */
  refreshJwtUserSecret?: InputMaybe<Scalars['Boolean']['input']>;
  /** The date the user registered. Format is Y-m-d H:i:s. */
  registered?: InputMaybe<Scalars['String']['input']>;
  /** If true, this will revoke the users JWT secret. If false, this will unrevoke the JWT secret AND issue a new one. To revoke, the user must have proper capabilities to edit users JWT secrets. */
  revokeJwtUserSecret?: InputMaybe<Scalars['Boolean']['input']>;
  /** A string for whether to enable the rich editor or not. False if not empty. */
  richEditing?: InputMaybe<Scalars['String']['input']>;
  /** An array of roles to be assigned to the user. */
  roles?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** A string containing the user's URL for the user's web site. */
  websiteUrl?: InputMaybe<Scalars['String']['input']>;
  /** User's Yahoo IM account. */
  yim?: InputMaybe<Scalars['String']['input']>;
};

/** The payload for the updateUser mutation. */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The User object mutation type. */
  user?: Maybe<User>;
};

/** A User object */
export type User = Commenter &
  DatabaseIdentifier &
  Node &
  UniformResourceIdentifiable & {
    __typename?: 'User';
    /** Avatar object for user. The avatar object can be retrieved in different sizes by specifying the size argument. */
    avatar?: Maybe<Avatar>;
    /** User metadata option name. Usually it will be &quot;wp_capabilities&quot;. */
    capKey?: Maybe<Scalars['String']['output']>;
    /** A list of capabilities (permissions) granted to the user */
    capabilities?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
    /** Connection between the User type and the Comment type */
    comments?: Maybe<UserToCommentConnection>;
    /** Identifies the primary key from the database. */
    databaseId: Scalars['Int']['output'];
    /** Description of the user. */
    description?: Maybe<Scalars['String']['output']>;
    /** Email address of the user. This is equivalent to the WP_User-&gt;user_email property. */
    email?: Maybe<Scalars['String']['output']>;
    /** Connection between the User type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<UserToEnqueuedScriptConnection>;
    /** Connection between the User type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<UserToEnqueuedStylesheetConnection>;
    /** A complete list of capabilities including capabilities inherited from a role. This is equivalent to the array keys of WP_User-&gt;allcaps. */
    extraCapabilities?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
    /** First name of the user. This is equivalent to the WP_User-&gt;user_first_name property. */
    firstName?: Maybe<Scalars['String']['output']>;
    /** The globally unique identifier for the user object. */
    id: Scalars['ID']['output'];
    /** Whether the node is a Comment */
    isComment: Scalars['Boolean']['output'];
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']['output'];
    /** Whether the node represents the front page. */
    isFrontPage: Scalars['Boolean']['output'];
    /** Whether the JWT User secret has been revoked. If the secret has been revoked, auth tokens will not be issued until an admin, or user with proper capabilities re-issues a secret for the user. */
    isJwtAuthSecretRevoked: Scalars['Boolean']['output'];
    /** Whether  the node represents the blog page. */
    isPostsPage: Scalars['Boolean']['output'];
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']['output']>;
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']['output'];
    /** The expiration for the JWT Token for the user. If not set custom for the user, it will use the default sitewide expiration setting */
    jwtAuthExpiration?: Maybe<Scalars['String']['output']>;
    /** A JWT token that can be used in future requests for authentication/authorization */
    jwtAuthToken?: Maybe<Scalars['String']['output']>;
    /** A JWT token that can be used in future requests to get a refreshed jwtAuthToken. If the refresh token used in a request is revoked or otherwise invalid, a valid Auth token will NOT be issued in the response headers. */
    jwtRefreshToken?: Maybe<Scalars['String']['output']>;
    /** A unique secret tied to the users JWT token that can be revoked or refreshed. Revoking the secret prevents JWT tokens from being issued to the user. Refreshing the token invalidates previously issued tokens, but allows new tokens to be issued. */
    jwtUserSecret?: Maybe<Scalars['String']['output']>;
    /** Last name of the user. This is equivalent to the WP_User-&gt;user_last_name property. */
    lastName?: Maybe<Scalars['String']['output']>;
    /** The preferred language locale set for the user. Value derived from get_user_locale(). */
    locale?: Maybe<Scalars['String']['output']>;
    /** Connection between the User type and the mediaItem type */
    mediaItems?: Maybe<UserToMediaItemConnection>;
    /** Display name of the user. This is equivalent to the WP_User-&gt;display_name property. */
    name?: Maybe<Scalars['String']['output']>;
    /** The nicename for the user. This field is equivalent to WP_User-&gt;user_nicename */
    nicename?: Maybe<Scalars['String']['output']>;
    /** Nickname of the user. */
    nickname?: Maybe<Scalars['String']['output']>;
    /** Connection between the User type and the page type */
    pages?: Maybe<UserToPageConnection>;
    /** Connection between the User type and the post type */
    posts?: Maybe<UserToPostConnection>;
    /** The date the user registered or was created. The field follows a full ISO8601 date string format. */
    registeredDate?: Maybe<Scalars['String']['output']>;
    /** Connection between the User and Revisions authored by the user */
    revisions?: Maybe<UserToRevisionsConnection>;
    /** Connection between the User type and the UserRole type */
    roles?: Maybe<UserToUserRoleConnection>;
    /** Whether the Toolbar should be displayed when the user is viewing the site. */
    shouldShowAdminToolbar?: Maybe<Scalars['Boolean']['output']>;
    /** The slug for the user. This field is equivalent to WP_User-&gt;user_nicename */
    slug?: Maybe<Scalars['String']['output']>;
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']['output']>;
    /** A website url that is associated with the user. */
    url?: Maybe<Scalars['String']['output']>;
    /**
     * The Id of the user. Equivalent to WP_User-&gt;ID
     * @deprecated Deprecated in favor of the databaseId field
     */
    userId?: Maybe<Scalars['Int']['output']>;
    /** Username for the user. This field is equivalent to WP_User-&gt;user_login. */
    username?: Maybe<Scalars['String']['output']>;
  };

/** A User object */
export type UserAvatarArgs = {
  forceDefault?: InputMaybe<Scalars['Boolean']['input']>;
  rating?: InputMaybe<AvatarRatingEnum>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

/** A User object */
export type UserCommentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserToCommentConnectionWhereArgs>;
};

/** A User object */
export type UserEnqueuedScriptsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** A User object */
export type UserEnqueuedStylesheetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** A User object */
export type UserMediaItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserToMediaItemConnectionWhereArgs>;
};

/** A User object */
export type UserPagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserToPageConnectionWhereArgs>;
};

/** A User object */
export type UserPostsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserToPostConnectionWhereArgs>;
};

/** A User object */
export type UserRevisionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserToRevisionsConnectionWhereArgs>;
};

/** A User object */
export type UserRolesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** Connection to User Nodes */
export type UserConnection = {
  /** A list of edges (relational context) between RootQuery and connected User Nodes */
  edges: Array<UserConnectionEdge>;
  /** A list of connected User Nodes */
  nodes: Array<User>;
  /** Information about pagination in a connection. */
  pageInfo: UserConnectionPageInfo;
};

/** Edge between a Node and a connected User */
export type UserConnectionEdge = {
  /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The connected User Node */
  node: User;
};

/** Page Info on the connected UserConnectionEdge */
export type UserConnectionPageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The Type of Identifier used to fetch a single User node. To be used along with the "id" field. Default is "ID". */
export enum UserNodeIdTypeEnum {
  /** The Database ID for the node */
  DatabaseId = 'DATABASE_ID',
  /** The Email of the User */
  Email = 'EMAIL',
  /** The hashed Global ID */
  Id = 'ID',
  /** The slug of the User */
  Slug = 'SLUG',
  /** The URI for the node */
  Uri = 'URI',
  /** The username the User uses to login with */
  Username = 'USERNAME',
}

/** A user role object */
export type UserRole = Node & {
  __typename?: 'UserRole';
  /** The capabilities that belong to this role */
  capabilities?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** The display name of the role */
  displayName?: Maybe<Scalars['String']['output']>;
  /** The globally unique identifier for the user role object. */
  id: Scalars['ID']['output'];
  /** Whether the object is restricted from the current viewer */
  isRestricted?: Maybe<Scalars['Boolean']['output']>;
  /** The registered name of the role */
  name?: Maybe<Scalars['String']['output']>;
};

/** Connection to UserRole Nodes */
export type UserRoleConnection = {
  /** A list of edges (relational context) between RootQuery and connected UserRole Nodes */
  edges: Array<UserRoleConnectionEdge>;
  /** A list of connected UserRole Nodes */
  nodes: Array<UserRole>;
  /** Information about pagination in a connection. */
  pageInfo: UserRoleConnectionPageInfo;
};

/** Edge between a Node and a connected UserRole */
export type UserRoleConnectionEdge = {
  /** Opaque reference to the nodes position in the connection. Value can be used with pagination args. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The connected UserRole Node */
  node: UserRole;
};

/** Page Info on the connected UserRoleConnectionEdge */
export type UserRoleConnectionPageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** Names of available user roles */
export enum UserRoleEnum {
  /** User role with specific capabilities */
  Administrator = 'ADMINISTRATOR',
  /** User role with specific capabilities */
  Author = 'AUTHOR',
  /** User role with specific capabilities */
  Contributor = 'CONTRIBUTOR',
  /** User role with specific capabilities */
  Editor = 'EDITOR',
  /** User role with specific capabilities */
  HeadlessCmsAdmin = 'HEADLESS_CMS_ADMIN',
  /** User role with specific capabilities */
  HeadlessCmsContributor = 'HEADLESS_CMS_CONTRIBUTOR',
  /** User role with specific capabilities */
  HeadlessCmsEditor = 'HEADLESS_CMS_EDITOR',
  /** User role with specific capabilities */
  HeadlessCmsViewer = 'HEADLESS_CMS_VIEWER',
  /** User role with specific capabilities */
  Revisor = 'REVISOR',
  /** User role with specific capabilities */
  Subscriber = 'SUBSCRIBER',
}

/** Connection between the User type and the Comment type */
export type UserToCommentConnection = CommentConnection &
  Connection & {
    __typename?: 'UserToCommentConnection';
    /** Edges for the UserToCommentConnection connection */
    edges: Array<UserToCommentConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Comment>;
    /** Information about pagination in a connection. */
    pageInfo: UserToCommentConnectionPageInfo;
  };

/** An edge in a connection */
export type UserToCommentConnectionEdge = CommentConnectionEdge &
  Edge & {
    __typename?: 'UserToCommentConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Comment;
  };

/** Page Info on the &quot;UserToCommentConnection&quot; */
export type UserToCommentConnectionPageInfo = CommentConnectionPageInfo &
  PageInfo &
  WpPageInfo & {
    __typename?: 'UserToCommentConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the UserToCommentConnection connection */
export type UserToCommentConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars['String']['input']>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars['String']['input']>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars['String']['input']>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars['ID']['input']>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars['String']['input']>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars['Int']['input']>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars['Int']['input']>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Comment status to limit results by. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars['ID']['input']>;
};

/** Connection between the User type and the EnqueuedScript type */
export type UserToEnqueuedScriptConnection = Connection &
  EnqueuedScriptConnection & {
    __typename?: 'UserToEnqueuedScriptConnection';
    /** Edges for the UserToEnqueuedScriptConnection connection */
    edges: Array<UserToEnqueuedScriptConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<EnqueuedScript>;
    /** Information about pagination in a connection. */
    pageInfo: UserToEnqueuedScriptConnectionPageInfo;
  };

/** An edge in a connection */
export type UserToEnqueuedScriptConnectionEdge = Edge &
  EnqueuedScriptConnectionEdge & {
    __typename?: 'UserToEnqueuedScriptConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: EnqueuedScript;
  };

/** Page Info on the &quot;UserToEnqueuedScriptConnection&quot; */
export type UserToEnqueuedScriptConnectionPageInfo =
  EnqueuedScriptConnectionPageInfo &
    PageInfo &
    WpPageInfo & {
      __typename?: 'UserToEnqueuedScriptConnectionPageInfo';
      /** When paginating forwards, the cursor to continue. */
      endCursor?: Maybe<Scalars['String']['output']>;
      /** When paginating forwards, are there more items? */
      hasNextPage: Scalars['Boolean']['output'];
      /** When paginating backwards, are there more items? */
      hasPreviousPage: Scalars['Boolean']['output'];
      /** When paginating backwards, the cursor to continue. */
      startCursor?: Maybe<Scalars['String']['output']>;
    };

/** Connection between the User type and the EnqueuedStylesheet type */
export type UserToEnqueuedStylesheetConnection = Connection &
  EnqueuedStylesheetConnection & {
    __typename?: 'UserToEnqueuedStylesheetConnection';
    /** Edges for the UserToEnqueuedStylesheetConnection connection */
    edges: Array<UserToEnqueuedStylesheetConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<EnqueuedStylesheet>;
    /** Information about pagination in a connection. */
    pageInfo: UserToEnqueuedStylesheetConnectionPageInfo;
  };

/** An edge in a connection */
export type UserToEnqueuedStylesheetConnectionEdge = Edge &
  EnqueuedStylesheetConnectionEdge & {
    __typename?: 'UserToEnqueuedStylesheetConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: EnqueuedStylesheet;
  };

/** Page Info on the &quot;UserToEnqueuedStylesheetConnection&quot; */
export type UserToEnqueuedStylesheetConnectionPageInfo =
  EnqueuedStylesheetConnectionPageInfo &
    PageInfo &
    WpPageInfo & {
      __typename?: 'UserToEnqueuedStylesheetConnectionPageInfo';
      /** When paginating forwards, the cursor to continue. */
      endCursor?: Maybe<Scalars['String']['output']>;
      /** When paginating forwards, are there more items? */
      hasNextPage: Scalars['Boolean']['output'];
      /** When paginating backwards, are there more items? */
      hasPreviousPage: Scalars['Boolean']['output'];
      /** When paginating backwards, the cursor to continue. */
      startCursor?: Maybe<Scalars['String']['output']>;
    };

/** Connection between the User type and the mediaItem type */
export type UserToMediaItemConnection = Connection &
  MediaItemConnection & {
    __typename?: 'UserToMediaItemConnection';
    /** Edges for the UserToMediaItemConnection connection */
    edges: Array<UserToMediaItemConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<MediaItem>;
    /** Information about pagination in a connection. */
    pageInfo: UserToMediaItemConnectionPageInfo;
  };

/** An edge in a connection */
export type UserToMediaItemConnectionEdge = Edge &
  MediaItemConnectionEdge & {
    __typename?: 'UserToMediaItemConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: MediaItem;
  };

/** Page Info on the &quot;UserToMediaItemConnection&quot; */
export type UserToMediaItemConnectionPageInfo = MediaItemConnectionPageInfo &
  PageInfo &
  WpPageInfo & {
    __typename?: 'UserToMediaItemConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the UserToMediaItemConnection connection */
export type UserToMediaItemConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']['input']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']['input']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the User type and the page type */
export type UserToPageConnection = Connection &
  PageConnection & {
    __typename?: 'UserToPageConnection';
    /** Edges for the UserToPageConnection connection */
    edges: Array<UserToPageConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Page>;
    /** Information about pagination in a connection. */
    pageInfo: UserToPageConnectionPageInfo;
  };

/** An edge in a connection */
export type UserToPageConnectionEdge = Edge &
  PageConnectionEdge & {
    __typename?: 'UserToPageConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Page;
  };

/** Page Info on the &quot;UserToPageConnection&quot; */
export type UserToPageConnectionPageInfo = PageConnectionPageInfo &
  PageInfo &
  WpPageInfo & {
    __typename?: 'UserToPageConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the UserToPageConnection connection */
export type UserToPageConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']['input']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']['input']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the User type and the post type */
export type UserToPostConnection = Connection &
  PostConnection & {
    __typename?: 'UserToPostConnection';
    /** Edges for the UserToPostConnection connection */
    edges: Array<UserToPostConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<Post>;
    /** Information about pagination in a connection. */
    pageInfo: UserToPostConnectionPageInfo;
  };

/** An edge in a connection */
export type UserToPostConnectionEdge = Edge &
  PostConnectionEdge & {
    __typename?: 'UserToPostConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: Post;
  };

/** Page Info on the &quot;UserToPostConnection&quot; */
export type UserToPostConnectionPageInfo = PageInfo &
  PostConnectionPageInfo &
  WpPageInfo & {
    __typename?: 'UserToPostConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the UserToPostConnection connection */
export type UserToPostConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']['input']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']['input']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Category ID */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Use Category Slug */
  categoryName?: InputMaybe<Scalars['String']['input']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Use Tag ID */
  tagId?: InputMaybe<Scalars['String']['input']>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of tag slugs, used to display objects from one tag AND another */
  tagSlugAnd?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of tag slugs, used to include objects in ANY specified tags */
  tagSlugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the User type and the ContentNode type */
export type UserToRevisionsConnection = Connection &
  ContentNodeConnection & {
    __typename?: 'UserToRevisionsConnection';
    /** Edges for the UserToRevisionsConnection connection */
    edges: Array<UserToRevisionsConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<ContentNode>;
    /** Information about pagination in a connection. */
    pageInfo: UserToRevisionsConnectionPageInfo;
  };

/** An edge in a connection */
export type UserToRevisionsConnectionEdge = ContentNodeConnectionEdge &
  Edge & {
    __typename?: 'UserToRevisionsConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: ContentNode;
  };

/** Page Info on the &quot;UserToRevisionsConnection&quot; */
export type UserToRevisionsConnectionPageInfo = ContentNodeConnectionPageInfo &
  PageInfo &
  WpPageInfo & {
    __typename?: 'UserToRevisionsConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Arguments for filtering the UserToRevisionsConnection connection */
export type UserToRevisionsConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Connection between the User type and the UserRole type */
export type UserToUserRoleConnection = Connection &
  UserRoleConnection & {
    __typename?: 'UserToUserRoleConnection';
    /** Edges for the UserToUserRoleConnection connection */
    edges: Array<UserToUserRoleConnectionEdge>;
    /** The nodes of the connection, without the edges */
    nodes: Array<UserRole>;
    /** Information about pagination in a connection. */
    pageInfo: UserToUserRoleConnectionPageInfo;
  };

/** An edge in a connection */
export type UserToUserRoleConnectionEdge = Edge &
  UserRoleConnectionEdge & {
    __typename?: 'UserToUserRoleConnectionEdge';
    /** A cursor for use in pagination */
    cursor?: Maybe<Scalars['String']['output']>;
    /** The item at the end of the edge */
    node: UserRole;
  };

/** Page Info on the &quot;UserToUserRoleConnection&quot; */
export type UserToUserRoleConnectionPageInfo = PageInfo &
  UserRoleConnectionPageInfo &
  WpPageInfo & {
    __typename?: 'UserToUserRoleConnectionPageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
  };

/** Field to order the connection by */
export enum UsersConnectionOrderbyEnum {
  /** Order by display name */
  DisplayName = 'DISPLAY_NAME',
  /** Order by email address */
  Email = 'EMAIL',
  /** Order by login */
  Login = 'LOGIN',
  /** Preserve the login order given in the LOGIN_IN array */
  LoginIn = 'LOGIN_IN',
  /** Order by nice name */
  NiceName = 'NICE_NAME',
  /** Preserve the nice name order given in the NICE_NAME_IN array */
  NiceNameIn = 'NICE_NAME_IN',
  /** Order by registration date */
  Registered = 'REGISTERED',
  /** Order by URL */
  Url = 'URL',
}

/** Options for ordering the connection */
export type UsersConnectionOrderbyInput = {
  /** The field name used to sort the results. */
  field: UsersConnectionOrderbyEnum;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
};

/** Column used for searching for users. */
export enum UsersConnectionSearchColumnEnum {
  /** The user's email address. */
  Email = 'EMAIL',
  /** The globally unique ID. */
  Id = 'ID',
  /** The username the User uses to login with. */
  Login = 'LOGIN',
  /** A URL-friendly name for the user. The default is the user's username. */
  Nicename = 'NICENAME',
  /** The URL of the user's website. */
  Url = 'URL',
}

export type Venue = {
  __typename?: 'Venue';
  accessibilitySentences: Array<Maybe<AccessibilitySentences>>;
  addressLocality?: Maybe<Scalars['String']['output']>;
  addressPostalFull?: Maybe<Scalars['String']['output']>;
  connections: Array<Maybe<VenueConnection>>;
  dataSource?: Maybe<Scalars['String']['output']>;
  department?: Maybe<VenueDepartment>;
  departmentId?: Maybe<Scalars['ID']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  displayedServiceOwner?: Maybe<Scalars['String']['output']>;
  displayedServiceOwnerType?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  infoUrl?: Maybe<Scalars['String']['output']>;
  isOpen?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ontologyTree: Array<Maybe<Ontology>>;
  ontologyWords: Array<Maybe<Ontology>>;
  openingHours?: Maybe<Array<OpeningHour>>;
  organization?: Maybe<VenueDepartment>;
  organizationId?: Maybe<Scalars['ID']['output']>;
  position?: Maybe<Point>;
  postalCode?: Maybe<Scalars['String']['output']>;
  providerType?: Maybe<Scalars['String']['output']>;
  shortDescription?: Maybe<Scalars['String']['output']>;
  streetAddress?: Maybe<Scalars['String']['output']>;
  telephone?: Maybe<Scalars['String']['output']>;
};

export type VenueConnection = {
  __typename?: 'VenueConnection';
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  sectionType?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type VenueDepartment = {
  __typename?: 'VenueDepartment';
  abbreviation?: Maybe<Scalars['String']['output']>;
  addressCity?: Maybe<Scalars['String']['output']>;
  addressPostalFull?: Maybe<Scalars['String']['output']>;
  addressZip?: Maybe<Scalars['String']['output']>;
  businessId?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  hierarchyLevel?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  municipalityCode?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  oid?: Maybe<Scalars['ID']['output']>;
  organizationId?: Maybe<Scalars['ID']['output']>;
  organizationType?: Maybe<Scalars['String']['output']>;
  parentId?: Maybe<Scalars['ID']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  streetAddress?: Maybe<Scalars['String']['output']>;
  www?: Maybe<Scalars['String']['output']>;
};

/** TODO: combine beta.kultus Venue stuff with respa equipment type */
export type VenueFacility = {
  __typename?: 'VenueFacility';
  categories?: Maybe<Array<KeywordString>>;
  meta?: Maybe<NodeMeta>;
  name: Scalars['String']['output'];
};

/** Information about pagination in a connection. */
export type WpPageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The writing setting type */
export type WritingSettings = {
  __typename?: 'WritingSettings';
  /** Oletuskategoria artikkeleille. */
  defaultCategory?: Maybe<Scalars['Int']['output']>;
  /** Artikkelisivujen oletusmuoto. */
  defaultPostFormat?: Maybe<Scalars['String']['output']>;
  /** Muunna hymiöt kuviksi. */
  useSmilies?: Maybe<Scalars['Boolean']['output']>;
};

export type PageByTemplateBreadcrumbTitleQueryVariables = Exact<{
  template?: InputMaybe<TemplateEnum>;
  language?: InputMaybe<Scalars['String']['input']>;
}>;

export type PageByTemplateBreadcrumbTitleQuery = {
  __typename?: 'Query';
  pageByTemplate?: {
    __typename?: 'Page';
    title?: string | null;
    breadcrumbs?: Array<{
      __typename?: 'Breadcrumb';
      title?: string | null;
      uri?: string | null;
    } | null> | null;
  } | null;
};

export type PageBreadcrumbTitleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type PageBreadcrumbTitleQuery = {
  __typename?: 'Query';
  page?: {
    __typename?: 'Page';
    title?: string | null;
    breadcrumbs?: Array<{
      __typename?: 'Breadcrumb';
      title?: string | null;
      uri?: string | null;
    } | null> | null;
  } | null;
};

export type LocalizedFieldsFragment = {
  __typename?: 'LocalizedObject';
  en?: string | null;
  fi?: string | null;
  sv?: string | null;
};

export type OfferFieldsFragment = {
  __typename?: 'Offer';
  isFree?: boolean | null;
  price?: {
    __typename?: 'LocalizedObject';
    en?: string | null;
    fi?: string | null;
    sv?: string | null;
  } | null;
  description?: {
    __typename?: 'LocalizedObject';
    en?: string | null;
    fi?: string | null;
    sv?: string | null;
  } | null;
  infoUrl?: {
    __typename?: 'LocalizedObject';
    en?: string | null;
    fi?: string | null;
    sv?: string | null;
  } | null;
};

export type EventFieldsFragment = {
  __typename?: 'EventDetails';
  audienceMinAge?: string | null;
  audienceMaxAge?: string | null;
  id: string;
  eventStatus?: string | null;
  typeId?: EventTypeId | null;
  endTime?: string | null;
  startTime?: string | null;
  publisher?: string | null;
  enrolmentStartTime?: string | null;
  enrolmentEndTime?: string | null;
  remainingAttendeeCapacity?: number | null;
  externalLinks: Array<{
    __typename?: 'ExternalLink';
    name?: string | null;
    link?: string | null;
  }>;
  images: Array<{
    __typename?: 'EventImage';
    id?: string | null;
    name: string;
    url: string;
    photographerName?: string | null;
  }>;
  subEvents: Array<{
    __typename?: 'InternalIdObject';
    internalId?: string | null;
  }>;
  superEvent?: {
    __typename?: 'InternalIdObject';
    internalId?: string | null;
  } | null;
  inLanguage: Array<{
    __typename?: 'InLanguage';
    name?: {
      __typename?: 'LocalizedObject';
      en?: string | null;
      fi?: string | null;
      sv?: string | null;
    } | null;
  }>;
  keywords: Array<{
    __typename?: 'Keyword';
    id?: string | null;
    internalId: string;
    dataSource?: string | null;
    hasUpcomingEvents?: boolean | null;
    name?: {
      __typename?: 'LocalizedObject';
      fi?: string | null;
      sv?: string | null;
      en?: string | null;
    } | null;
  }>;
  location?: {
    __typename?: 'Place';
    id?: string | null;
    hasUpcomingEvents?: boolean | null;
    internalId: string;
    email?: string | null;
    postalCode?: string | null;
    divisions?: Array<{
      __typename?: 'Division';
      type: string;
      name?: {
        __typename?: 'LocalizedObject';
        fi?: string | null;
        sv?: string | null;
        en?: string | null;
      } | null;
    }> | null;
    infoUrl?: {
      __typename?: 'LocalizedObject';
      fi?: string | null;
      sv?: string | null;
      en?: string | null;
    } | null;
    name?: {
      __typename?: 'LocalizedObject';
      fi?: string | null;
      en?: string | null;
      sv?: string | null;
    } | null;
    addressLocality?: {
      __typename?: 'LocalizedObject';
      fi?: string | null;
      sv?: string | null;
      en?: string | null;
    } | null;
    streetAddress?: {
      __typename?: 'LocalizedObject';
      fi?: string | null;
      sv?: string | null;
      en?: string | null;
    } | null;
    position?: {
      __typename?: 'PlacePosition';
      coordinates: Array<number>;
    } | null;
    telephone?: {
      __typename?: 'LocalizedObject';
      fi?: string | null;
      sv?: string | null;
      en?: string | null;
    } | null;
  } | null;
  offers: Array<{
    __typename?: 'Offer';
    isFree?: boolean | null;
    price?: {
      __typename?: 'LocalizedObject';
      en?: string | null;
      fi?: string | null;
      sv?: string | null;
    } | null;
    description?: {
      __typename?: 'LocalizedObject';
      en?: string | null;
      fi?: string | null;
      sv?: string | null;
    } | null;
    infoUrl?: {
      __typename?: 'LocalizedObject';
      en?: string | null;
      fi?: string | null;
      sv?: string | null;
    } | null;
  }>;
  name: {
    __typename?: 'LocalizedObject';
    en?: string | null;
    fi?: string | null;
    sv?: string | null;
  };
  description?: {
    __typename?: 'LocalizedObject';
    en?: string | null;
    fi?: string | null;
    sv?: string | null;
  } | null;
  shortDescription?: {
    __typename?: 'LocalizedObject';
    en?: string | null;
    fi?: string | null;
    sv?: string | null;
  } | null;
  provider?: {
    __typename?: 'LocalizedObject';
    en?: string | null;
    fi?: string | null;
    sv?: string | null;
  } | null;
  providerContactInfo?: {
    __typename?: 'LocalizedObject';
    en?: string | null;
    fi?: string | null;
    sv?: string | null;
  } | null;
  infoUrl?: {
    __typename?: 'LocalizedObject';
    en?: string | null;
    fi?: string | null;
    sv?: string | null;
  } | null;
  audience: Array<{
    __typename?: 'Audience';
    id?: string | null;
    name?: {
      __typename?: 'LocalizedObject';
      en?: string | null;
      fi?: string | null;
      sv?: string | null;
    } | null;
  }>;
  locationExtraInfo?: {
    __typename?: 'LocalizedObject';
    en?: string | null;
    fi?: string | null;
    sv?: string | null;
  } | null;
};

export type EventDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  include?: InputMaybe<
    | Array<InputMaybe<Scalars['String']['input']>>
    | InputMaybe<Scalars['String']['input']>
  >;
}>;

export type EventDetailsQuery = {
  __typename?: 'Query';
  eventDetails: {
    __typename?: 'EventDetails';
    audienceMinAge?: string | null;
    audienceMaxAge?: string | null;
    id: string;
    eventStatus?: string | null;
    typeId?: EventTypeId | null;
    endTime?: string | null;
    startTime?: string | null;
    publisher?: string | null;
    enrolmentStartTime?: string | null;
    enrolmentEndTime?: string | null;
    remainingAttendeeCapacity?: number | null;
    externalLinks: Array<{
      __typename?: 'ExternalLink';
      name?: string | null;
      link?: string | null;
    }>;
    images: Array<{
      __typename?: 'EventImage';
      id?: string | null;
      name: string;
      url: string;
      photographerName?: string | null;
    }>;
    subEvents: Array<{
      __typename?: 'InternalIdObject';
      internalId?: string | null;
    }>;
    superEvent?: {
      __typename?: 'InternalIdObject';
      internalId?: string | null;
    } | null;
    inLanguage: Array<{
      __typename?: 'InLanguage';
      name?: {
        __typename?: 'LocalizedObject';
        en?: string | null;
        fi?: string | null;
        sv?: string | null;
      } | null;
    }>;
    keywords: Array<{
      __typename?: 'Keyword';
      id?: string | null;
      internalId: string;
      dataSource?: string | null;
      hasUpcomingEvents?: boolean | null;
      name?: {
        __typename?: 'LocalizedObject';
        fi?: string | null;
        sv?: string | null;
        en?: string | null;
      } | null;
    }>;
    location?: {
      __typename?: 'Place';
      id?: string | null;
      hasUpcomingEvents?: boolean | null;
      internalId: string;
      email?: string | null;
      postalCode?: string | null;
      divisions?: Array<{
        __typename?: 'Division';
        type: string;
        name?: {
          __typename?: 'LocalizedObject';
          fi?: string | null;
          sv?: string | null;
          en?: string | null;
        } | null;
      }> | null;
      infoUrl?: {
        __typename?: 'LocalizedObject';
        fi?: string | null;
        sv?: string | null;
        en?: string | null;
      } | null;
      name?: {
        __typename?: 'LocalizedObject';
        fi?: string | null;
        en?: string | null;
        sv?: string | null;
      } | null;
      addressLocality?: {
        __typename?: 'LocalizedObject';
        fi?: string | null;
        sv?: string | null;
        en?: string | null;
      } | null;
      streetAddress?: {
        __typename?: 'LocalizedObject';
        fi?: string | null;
        sv?: string | null;
        en?: string | null;
      } | null;
      position?: {
        __typename?: 'PlacePosition';
        coordinates: Array<number>;
      } | null;
      telephone?: {
        __typename?: 'LocalizedObject';
        fi?: string | null;
        sv?: string | null;
        en?: string | null;
      } | null;
    } | null;
    offers: Array<{
      __typename?: 'Offer';
      isFree?: boolean | null;
      price?: {
        __typename?: 'LocalizedObject';
        en?: string | null;
        fi?: string | null;
        sv?: string | null;
      } | null;
      description?: {
        __typename?: 'LocalizedObject';
        en?: string | null;
        fi?: string | null;
        sv?: string | null;
      } | null;
      infoUrl?: {
        __typename?: 'LocalizedObject';
        en?: string | null;
        fi?: string | null;
        sv?: string | null;
      } | null;
    }>;
    name: {
      __typename?: 'LocalizedObject';
      en?: string | null;
      fi?: string | null;
      sv?: string | null;
    };
    description?: {
      __typename?: 'LocalizedObject';
      en?: string | null;
      fi?: string | null;
      sv?: string | null;
    } | null;
    shortDescription?: {
      __typename?: 'LocalizedObject';
      en?: string | null;
      fi?: string | null;
      sv?: string | null;
    } | null;
    provider?: {
      __typename?: 'LocalizedObject';
      en?: string | null;
      fi?: string | null;
      sv?: string | null;
    } | null;
    providerContactInfo?: {
      __typename?: 'LocalizedObject';
      en?: string | null;
      fi?: string | null;
      sv?: string | null;
    } | null;
    infoUrl?: {
      __typename?: 'LocalizedObject';
      en?: string | null;
      fi?: string | null;
      sv?: string | null;
    } | null;
    audience: Array<{
      __typename?: 'Audience';
      id?: string | null;
      name?: {
        __typename?: 'LocalizedObject';
        en?: string | null;
        fi?: string | null;
        sv?: string | null;
      } | null;
    }>;
    locationExtraInfo?: {
      __typename?: 'LocalizedObject';
      en?: string | null;
      fi?: string | null;
      sv?: string | null;
    } | null;
  };
};

export type EventListQueryVariables = Exact<{
  audienceMaxAgeGt?: InputMaybe<Scalars['String']['input']>;
  audienceMinAgeLt?: InputMaybe<Scalars['String']['input']>;
  eventType?: InputMaybe<
    Array<InputMaybe<EventTypeId>> | InputMaybe<EventTypeId>
  >;
  internetBased?: InputMaybe<Scalars['Boolean']['input']>;
  suitableFor?: InputMaybe<
    | Array<InputMaybe<Scalars['Int']['input']>>
    | InputMaybe<Scalars['Int']['input']>
  >;
  allOngoing?: InputMaybe<Scalars['Boolean']['input']>;
  allOngoingAnd?: InputMaybe<
    | Array<InputMaybe<Scalars['String']['input']>>
    | InputMaybe<Scalars['String']['input']>
  >;
  division?: InputMaybe<
    | Array<InputMaybe<Scalars['String']['input']>>
    | InputMaybe<Scalars['String']['input']>
  >;
  end?: InputMaybe<Scalars['String']['input']>;
  endsAfter?: InputMaybe<Scalars['String']['input']>;
  endsBefore?: InputMaybe<Scalars['String']['input']>;
  inLanguage?: InputMaybe<Scalars['String']['input']>;
  include?: InputMaybe<
    | Array<InputMaybe<Scalars['String']['input']>>
    | InputMaybe<Scalars['String']['input']>
  >;
  isFree?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<
    | Array<InputMaybe<Scalars['String']['input']>>
    | InputMaybe<Scalars['String']['input']>
  >;
  keywordAnd?: InputMaybe<
    | Array<InputMaybe<Scalars['String']['input']>>
    | InputMaybe<Scalars['String']['input']>
  >;
  keywordOrSet1?: InputMaybe<
    | Array<InputMaybe<Scalars['String']['input']>>
    | InputMaybe<Scalars['String']['input']>
  >;
  keywordOrSet2?: InputMaybe<
    | Array<InputMaybe<Scalars['String']['input']>>
    | InputMaybe<Scalars['String']['input']>
  >;
  keywordOrSet3?: InputMaybe<
    | Array<InputMaybe<Scalars['String']['input']>>
    | InputMaybe<Scalars['String']['input']>
  >;
  keywordNot?: InputMaybe<
    | Array<InputMaybe<Scalars['String']['input']>>
    | InputMaybe<Scalars['String']['input']>
  >;
  language?: InputMaybe<Scalars['String']['input']>;
  localOngoingAnd?: InputMaybe<
    | Array<InputMaybe<Scalars['String']['input']>>
    | InputMaybe<Scalars['String']['input']>
  >;
  location?: InputMaybe<
    | Array<InputMaybe<Scalars['String']['input']>>
    | InputMaybe<Scalars['String']['input']>
  >;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  publisher?: InputMaybe<Scalars['ID']['input']>;
  publisherAncestor?: InputMaybe<Scalars['ID']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
  startsAfter?: InputMaybe<Scalars['String']['input']>;
  startsBefore?: InputMaybe<Scalars['String']['input']>;
  superEvent?: InputMaybe<Scalars['ID']['input']>;
  superEventType?: InputMaybe<
    | Array<InputMaybe<Scalars['String']['input']>>
    | InputMaybe<Scalars['String']['input']>
  >;
  text?: InputMaybe<Scalars['String']['input']>;
  translation?: InputMaybe<Scalars['String']['input']>;
  xFullText?: InputMaybe<Scalars['String']['input']>;
  xOngoing?: InputMaybe<Scalars['Boolean']['input']>;
}>;

export type EventListQuery = {
  __typename?: 'Query';
  eventList: {
    __typename?: 'EventListResponse';
    meta: {
      __typename?: 'Meta';
      count: number;
      next?: string | null;
      previous?: string | null;
    };
    data: Array<{
      __typename?: 'EventDetails';
      audienceMinAge?: string | null;
      audienceMaxAge?: string | null;
      id: string;
      eventStatus?: string | null;
      typeId?: EventTypeId | null;
      endTime?: string | null;
      startTime?: string | null;
      publisher?: string | null;
      enrolmentStartTime?: string | null;
      enrolmentEndTime?: string | null;
      remainingAttendeeCapacity?: number | null;
      externalLinks: Array<{
        __typename?: 'ExternalLink';
        name?: string | null;
        link?: string | null;
      }>;
      images: Array<{
        __typename?: 'EventImage';
        id?: string | null;
        name: string;
        url: string;
        photographerName?: string | null;
      }>;
      subEvents: Array<{
        __typename?: 'InternalIdObject';
        internalId?: string | null;
      }>;
      superEvent?: {
        __typename?: 'InternalIdObject';
        internalId?: string | null;
      } | null;
      inLanguage: Array<{
        __typename?: 'InLanguage';
        name?: {
          __typename?: 'LocalizedObject';
          en?: string | null;
          fi?: string | null;
          sv?: string | null;
        } | null;
      }>;
      keywords: Array<{
        __typename?: 'Keyword';
        id?: string | null;
        internalId: string;
        dataSource?: string | null;
        hasUpcomingEvents?: boolean | null;
        name?: {
          __typename?: 'LocalizedObject';
          fi?: string | null;
          sv?: string | null;
          en?: string | null;
        } | null;
      }>;
      location?: {
        __typename?: 'Place';
        id?: string | null;
        hasUpcomingEvents?: boolean | null;
        internalId: string;
        email?: string | null;
        postalCode?: string | null;
        divisions?: Array<{
          __typename?: 'Division';
          type: string;
          name?: {
            __typename?: 'LocalizedObject';
            fi?: string | null;
            sv?: string | null;
            en?: string | null;
          } | null;
        }> | null;
        infoUrl?: {
          __typename?: 'LocalizedObject';
          fi?: string | null;
          sv?: string | null;
          en?: string | null;
        } | null;
        name?: {
          __typename?: 'LocalizedObject';
          fi?: string | null;
          en?: string | null;
          sv?: string | null;
        } | null;
        addressLocality?: {
          __typename?: 'LocalizedObject';
          fi?: string | null;
          sv?: string | null;
          en?: string | null;
        } | null;
        streetAddress?: {
          __typename?: 'LocalizedObject';
          fi?: string | null;
          sv?: string | null;
          en?: string | null;
        } | null;
        position?: {
          __typename?: 'PlacePosition';
          coordinates: Array<number>;
        } | null;
        telephone?: {
          __typename?: 'LocalizedObject';
          fi?: string | null;
          sv?: string | null;
          en?: string | null;
        } | null;
      } | null;
      offers: Array<{
        __typename?: 'Offer';
        isFree?: boolean | null;
        price?: {
          __typename?: 'LocalizedObject';
          en?: string | null;
          fi?: string | null;
          sv?: string | null;
        } | null;
        description?: {
          __typename?: 'LocalizedObject';
          en?: string | null;
          fi?: string | null;
          sv?: string | null;
        } | null;
        infoUrl?: {
          __typename?: 'LocalizedObject';
          en?: string | null;
          fi?: string | null;
          sv?: string | null;
        } | null;
      }>;
      name: {
        __typename?: 'LocalizedObject';
        en?: string | null;
        fi?: string | null;
        sv?: string | null;
      };
      description?: {
        __typename?: 'LocalizedObject';
        en?: string | null;
        fi?: string | null;
        sv?: string | null;
      } | null;
      shortDescription?: {
        __typename?: 'LocalizedObject';
        en?: string | null;
        fi?: string | null;
        sv?: string | null;
      } | null;
      provider?: {
        __typename?: 'LocalizedObject';
        en?: string | null;
        fi?: string | null;
        sv?: string | null;
      } | null;
      providerContactInfo?: {
        __typename?: 'LocalizedObject';
        en?: string | null;
        fi?: string | null;
        sv?: string | null;
      } | null;
      infoUrl?: {
        __typename?: 'LocalizedObject';
        en?: string | null;
        fi?: string | null;
        sv?: string | null;
      } | null;
      audience: Array<{
        __typename?: 'Audience';
        id?: string | null;
        name?: {
          __typename?: 'LocalizedObject';
          en?: string | null;
          fi?: string | null;
          sv?: string | null;
        } | null;
      }>;
      locationExtraInfo?: {
        __typename?: 'LocalizedObject';
        en?: string | null;
        fi?: string | null;
        sv?: string | null;
      } | null;
    }>;
  };
};

export type EventsByIdsQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
  eventType?: InputMaybe<
    Array<InputMaybe<EventTypeId>> | InputMaybe<EventTypeId>
  >;
  include?: InputMaybe<
    | Array<InputMaybe<Scalars['String']['input']>>
    | InputMaybe<Scalars['String']['input']>
  >;
  sort?: InputMaybe<Scalars['String']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
}>;

export type EventsByIdsQuery = {
  __typename?: 'Query';
  eventsByIds: {
    __typename?: 'EventListResponse';
    data: Array<{
      __typename?: 'EventDetails';
      audienceMinAge?: string | null;
      audienceMaxAge?: string | null;
      id: string;
      eventStatus?: string | null;
      typeId?: EventTypeId | null;
      endTime?: string | null;
      startTime?: string | null;
      publisher?: string | null;
      enrolmentStartTime?: string | null;
      enrolmentEndTime?: string | null;
      remainingAttendeeCapacity?: number | null;
      externalLinks: Array<{
        __typename?: 'ExternalLink';
        name?: string | null;
        link?: string | null;
      }>;
      images: Array<{
        __typename?: 'EventImage';
        id?: string | null;
        name: string;
        url: string;
        photographerName?: string | null;
      }>;
      subEvents: Array<{
        __typename?: 'InternalIdObject';
        internalId?: string | null;
      }>;
      superEvent?: {
        __typename?: 'InternalIdObject';
        internalId?: string | null;
      } | null;
      inLanguage: Array<{
        __typename?: 'InLanguage';
        name?: {
          __typename?: 'LocalizedObject';
          en?: string | null;
          fi?: string | null;
          sv?: string | null;
        } | null;
      }>;
      keywords: Array<{
        __typename?: 'Keyword';
        id?: string | null;
        internalId: string;
        dataSource?: string | null;
        hasUpcomingEvents?: boolean | null;
        name?: {
          __typename?: 'LocalizedObject';
          fi?: string | null;
          sv?: string | null;
          en?: string | null;
        } | null;
      }>;
      location?: {
        __typename?: 'Place';
        id?: string | null;
        hasUpcomingEvents?: boolean | null;
        internalId: string;
        email?: string | null;
        postalCode?: string | null;
        divisions?: Array<{
          __typename?: 'Division';
          type: string;
          name?: {
            __typename?: 'LocalizedObject';
            fi?: string | null;
            sv?: string | null;
            en?: string | null;
          } | null;
        }> | null;
        infoUrl?: {
          __typename?: 'LocalizedObject';
          fi?: string | null;
          sv?: string | null;
          en?: string | null;
        } | null;
        name?: {
          __typename?: 'LocalizedObject';
          fi?: string | null;
          en?: string | null;
          sv?: string | null;
        } | null;
        addressLocality?: {
          __typename?: 'LocalizedObject';
          fi?: string | null;
          sv?: string | null;
          en?: string | null;
        } | null;
        streetAddress?: {
          __typename?: 'LocalizedObject';
          fi?: string | null;
          sv?: string | null;
          en?: string | null;
        } | null;
        position?: {
          __typename?: 'PlacePosition';
          coordinates: Array<number>;
        } | null;
        telephone?: {
          __typename?: 'LocalizedObject';
          fi?: string | null;
          sv?: string | null;
          en?: string | null;
        } | null;
      } | null;
      offers: Array<{
        __typename?: 'Offer';
        isFree?: boolean | null;
        price?: {
          __typename?: 'LocalizedObject';
          en?: string | null;
          fi?: string | null;
          sv?: string | null;
        } | null;
        description?: {
          __typename?: 'LocalizedObject';
          en?: string | null;
          fi?: string | null;
          sv?: string | null;
        } | null;
        infoUrl?: {
          __typename?: 'LocalizedObject';
          en?: string | null;
          fi?: string | null;
          sv?: string | null;
        } | null;
      }>;
      name: {
        __typename?: 'LocalizedObject';
        en?: string | null;
        fi?: string | null;
        sv?: string | null;
      };
      description?: {
        __typename?: 'LocalizedObject';
        en?: string | null;
        fi?: string | null;
        sv?: string | null;
      } | null;
      shortDescription?: {
        __typename?: 'LocalizedObject';
        en?: string | null;
        fi?: string | null;
        sv?: string | null;
      } | null;
      provider?: {
        __typename?: 'LocalizedObject';
        en?: string | null;
        fi?: string | null;
        sv?: string | null;
      } | null;
      providerContactInfo?: {
        __typename?: 'LocalizedObject';
        en?: string | null;
        fi?: string | null;
        sv?: string | null;
      } | null;
      infoUrl?: {
        __typename?: 'LocalizedObject';
        en?: string | null;
        fi?: string | null;
        sv?: string | null;
      } | null;
      audience: Array<{
        __typename?: 'Audience';
        id?: string | null;
        name?: {
          __typename?: 'LocalizedObject';
          en?: string | null;
          fi?: string | null;
          sv?: string | null;
        } | null;
      }>;
      locationExtraInfo?: {
        __typename?: 'LocalizedObject';
        en?: string | null;
        fi?: string | null;
        sv?: string | null;
      } | null;
    }>;
    meta: {
      __typename?: 'Meta';
      count: number;
      next?: string | null;
      previous?: string | null;
    };
  };
};

export type KeywordFieldsFragment = {
  __typename?: 'Keyword';
  id?: string | null;
  internalId: string;
  dataSource?: string | null;
  hasUpcomingEvents?: boolean | null;
  name?: {
    __typename?: 'LocalizedObject';
    fi?: string | null;
    sv?: string | null;
    en?: string | null;
  } | null;
};

export type KeywordDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type KeywordDetailsQuery = {
  __typename?: 'Query';
  keywordDetails: {
    __typename?: 'Keyword';
    id?: string | null;
    internalId: string;
    dataSource?: string | null;
    hasUpcomingEvents?: boolean | null;
    name?: {
      __typename?: 'LocalizedObject';
      fi?: string | null;
      sv?: string | null;
      en?: string | null;
    } | null;
  };
};

export type KeywordListQueryVariables = Exact<{
  dataSource?: InputMaybe<Scalars['String']['input']>;
  hasUpcomingEvents?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  showAllKeywords?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
}>;

export type KeywordListQuery = {
  __typename?: 'Query';
  keywordList: {
    __typename?: 'KeywordListResponse';
    meta: {
      __typename?: 'Meta';
      count: number;
      next?: string | null;
      previous?: string | null;
    };
    data: Array<{
      __typename?: 'Keyword';
      id?: string | null;
      internalId: string;
      dataSource?: string | null;
      hasUpcomingEvents?: boolean | null;
      name?: {
        __typename?: 'LocalizedObject';
        fi?: string | null;
        sv?: string | null;
        en?: string | null;
      } | null;
    }>;
  };
};

export type NeighborhoodListQueryVariables = Exact<{ [key: string]: never }>;

export type NeighborhoodListQuery = {
  __typename?: 'Query';
  neighborhoodList: {
    __typename?: 'NeighborhoodListResponse';
    meta: {
      __typename?: 'Meta';
      count: number;
      next?: string | null;
      previous?: string | null;
    };
    data: Array<{
      __typename?: 'Neighborhood';
      id: string;
      name: {
        __typename?: 'LocalizedObject';
        fi?: string | null;
        sv?: string | null;
        en?: string | null;
      };
    }>;
  };
};

export type OrganizationFieldsFragment = {
  __typename?: 'OrganizationDetails';
  id?: string | null;
  name?: string | null;
};

export type OrganizationDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type OrganizationDetailsQuery = {
  __typename?: 'Query';
  organizationDetails: {
    __typename?: 'OrganizationDetails';
    id?: string | null;
    name?: string | null;
  };
};

export type PlaceFieldsFragment = {
  __typename?: 'Place';
  id?: string | null;
  hasUpcomingEvents?: boolean | null;
  internalId: string;
  email?: string | null;
  postalCode?: string | null;
  divisions?: Array<{
    __typename?: 'Division';
    type: string;
    name?: {
      __typename?: 'LocalizedObject';
      fi?: string | null;
      sv?: string | null;
      en?: string | null;
    } | null;
  }> | null;
  infoUrl?: {
    __typename?: 'LocalizedObject';
    fi?: string | null;
    sv?: string | null;
    en?: string | null;
  } | null;
  name?: {
    __typename?: 'LocalizedObject';
    fi?: string | null;
    en?: string | null;
    sv?: string | null;
  } | null;
  addressLocality?: {
    __typename?: 'LocalizedObject';
    fi?: string | null;
    sv?: string | null;
    en?: string | null;
  } | null;
  streetAddress?: {
    __typename?: 'LocalizedObject';
    fi?: string | null;
    sv?: string | null;
    en?: string | null;
  } | null;
  position?: {
    __typename?: 'PlacePosition';
    coordinates: Array<number>;
  } | null;
  telephone?: {
    __typename?: 'LocalizedObject';
    fi?: string | null;
    sv?: string | null;
    en?: string | null;
  } | null;
};

export type PlaceDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type PlaceDetailsQuery = {
  __typename?: 'Query';
  placeDetails: {
    __typename?: 'Place';
    id?: string | null;
    hasUpcomingEvents?: boolean | null;
    internalId: string;
    email?: string | null;
    postalCode?: string | null;
    divisions?: Array<{
      __typename?: 'Division';
      type: string;
      name?: {
        __typename?: 'LocalizedObject';
        fi?: string | null;
        sv?: string | null;
        en?: string | null;
      } | null;
    }> | null;
    infoUrl?: {
      __typename?: 'LocalizedObject';
      fi?: string | null;
      sv?: string | null;
      en?: string | null;
    } | null;
    name?: {
      __typename?: 'LocalizedObject';
      fi?: string | null;
      en?: string | null;
      sv?: string | null;
    } | null;
    addressLocality?: {
      __typename?: 'LocalizedObject';
      fi?: string | null;
      sv?: string | null;
      en?: string | null;
    } | null;
    streetAddress?: {
      __typename?: 'LocalizedObject';
      fi?: string | null;
      sv?: string | null;
      en?: string | null;
    } | null;
    position?: {
      __typename?: 'PlacePosition';
      coordinates: Array<number>;
    } | null;
    telephone?: {
      __typename?: 'LocalizedObject';
      fi?: string | null;
      sv?: string | null;
      en?: string | null;
    } | null;
  };
};

export type PlaceListQueryVariables = Exact<{
  dataSource?: InputMaybe<Scalars['String']['input']>;
  divisions?: InputMaybe<
    | Array<InputMaybe<Scalars['String']['input']>>
    | InputMaybe<Scalars['String']['input']>
  >;
  hasUpcomingEvents?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  showAllPlaces?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
}>;

export type PlaceListQuery = {
  __typename?: 'Query';
  placeList: {
    __typename?: 'PlaceListResponse';
    meta: {
      __typename?: 'Meta';
      count: number;
      next?: string | null;
      previous?: string | null;
    };
    data: Array<{
      __typename?: 'Place';
      id?: string | null;
      hasUpcomingEvents?: boolean | null;
      internalId: string;
      email?: string | null;
      postalCode?: string | null;
      divisions?: Array<{
        __typename?: 'Division';
        type: string;
        name?: {
          __typename?: 'LocalizedObject';
          fi?: string | null;
          sv?: string | null;
          en?: string | null;
        } | null;
      }> | null;
      infoUrl?: {
        __typename?: 'LocalizedObject';
        fi?: string | null;
        sv?: string | null;
        en?: string | null;
      } | null;
      name?: {
        __typename?: 'LocalizedObject';
        fi?: string | null;
        en?: string | null;
        sv?: string | null;
      } | null;
      addressLocality?: {
        __typename?: 'LocalizedObject';
        fi?: string | null;
        sv?: string | null;
        en?: string | null;
      } | null;
      streetAddress?: {
        __typename?: 'LocalizedObject';
        fi?: string | null;
        sv?: string | null;
        en?: string | null;
      } | null;
      position?: {
        __typename?: 'PlacePosition';
        coordinates: Array<number>;
      } | null;
      telephone?: {
        __typename?: 'LocalizedObject';
        fi?: string | null;
        sv?: string | null;
        en?: string | null;
      } | null;
    }>;
  };
};

export type AdministrativeDivisionsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type AdministrativeDivisionsQuery = {
  __typename?: 'Query';
  administrativeDivisions?: Array<{
    __typename?: 'AdministrativeDivision';
    id?: string | null;
    type?: string | null;
    name?: {
      __typename?: 'LanguageString';
      fi?: string | null;
      sv?: string | null;
      en?: string | null;
    } | null;
  } | null> | null;
};

export type OntologyTreeQueryVariables = Exact<{
  rootId?: InputMaybe<Scalars['ID']['input']>;
}>;

export type OntologyTreeQuery = {
  __typename?: 'Query';
  ontologyTree?: Array<{
    __typename?: 'OntologyTree';
    id?: string | null;
    name?: {
      __typename?: 'LanguageString';
      fi?: string | null;
      sv?: string | null;
      en?: string | null;
    } | null;
  } | null> | null;
};

export type OntologyWordsQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;

export type OntologyWordsQuery = {
  __typename?: 'Query';
  ontologyWords?: Array<{
    __typename?: 'OntologyWord';
    id?: string | null;
    label?: {
      __typename?: 'LanguageString';
      fi?: string | null;
      sv?: string | null;
      en?: string | null;
    } | null;
  } | null> | null;
};

export type UnifiedSearchCompletionSuggestionsQueryVariables = Exact<{
  prefix?: InputMaybe<Scalars['String']['input']>;
  language: UnifiedSearchLanguage;
}>;

export type UnifiedSearchCompletionSuggestionsQuery = {
  __typename?: 'Query';
  unifiedSearchCompletionSuggestions?: {
    __typename?: 'SearchSuggestionConnection';
    suggestions: Array<{ __typename?: 'Suggestion'; label: string } | null>;
  } | null;
};

export type SearchListQueryVariables = Exact<{
  text?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  language: UnifiedSearchLanguage;
  administrativeDivisionIds?: InputMaybe<
    Array<Scalars['ID']['input']> | Scalars['ID']['input']
  >;
  ontologyTreeIdOrSets?: InputMaybe<
    | Array<Array<Scalars['ID']['input']> | Scalars['ID']['input']>
    | Array<Scalars['ID']['input']>
    | Scalars['ID']['input']
  >;
  ontologyWordIdOrSets?: InputMaybe<
    | Array<Array<Scalars['ID']['input']> | Scalars['ID']['input']>
    | Array<Scalars['ID']['input']>
    | Scalars['ID']['input']
  >;
  providerTypes?: InputMaybe<
    Array<InputMaybe<ProviderType>> | InputMaybe<ProviderType>
  >;
  serviceOwnerTypes?: InputMaybe<
    Array<InputMaybe<ServiceOwnerType>> | InputMaybe<ServiceOwnerType>
  >;
  targetGroups?: InputMaybe<
    Array<InputMaybe<TargetGroup>> | InputMaybe<TargetGroup>
  >;
  openAt?: InputMaybe<Scalars['String']['input']>;
  orderByDistance?: InputMaybe<OrderByDistance>;
  orderByName?: InputMaybe<OrderByName>;
  orderByAccessibilityProfile?: InputMaybe<AccessibilityProfile>;
  showAccessibilityShortcomingsFor?: InputMaybe<AccessibilityProfile>;
  mustHaveReservableResource?: InputMaybe<Scalars['Boolean']['input']>;
  includeHaukiFields?: InputMaybe<Scalars['Boolean']['input']>;
}>;

export type SearchListQuery = {
  __typename?: 'Query';
  unifiedSearch?: {
    __typename?: 'SearchResultConnection';
    count?: number | null;
    pageInfo?: {
      __typename?: 'SearchResultPageInfo';
      endCursor?: string | null;
      hasNextPage: boolean;
    } | null;
    edges: Array<{
      __typename?: 'SearchResultEdge';
      node: {
        __typename?: 'SearchResultNode';
        venue?: {
          __typename?: 'UnifiedSearchVenue';
          targetGroups?: Array<TargetGroup | null> | null;
          meta?: { __typename?: 'NodeMeta'; id: string } | null;
          name?: {
            __typename?: 'LanguageString';
            fi?: string | null;
            sv?: string | null;
            en?: string | null;
          } | null;
          description?: {
            __typename?: 'LanguageString';
            fi?: string | null;
            sv?: string | null;
            en?: string | null;
          } | null;
          images?: Array<{
            __typename?: 'LocationImage';
            url?: string | null;
          } | null> | null;
          reservation?: {
            __typename?: 'Reservation';
            reservable?: boolean | null;
            externalReservationUrl?: {
              __typename?: 'LanguageString';
              fi?: string | null;
              sv?: string | null;
              en?: string | null;
            } | null;
          } | null;
          openingHours?: {
            __typename?: 'OpeningHours';
            today?: Array<{
              __typename?: 'OpeningHoursTimes';
              startTime?: string | null;
              endTime?: string | null;
              endTimeOnNextDay?: boolean | null;
              fullDay?: boolean | null;
              resourceState?: string | null;
            } | null> | null;
            data?: Array<{
              __typename?: 'OpeningHoursDay';
              date?: string | null;
              times?: Array<{
                __typename?: 'OpeningHoursTimes';
                startTime?: string | null;
                endTime?: string | null;
                endTimeOnNextDay?: boolean | null;
                fullDay?: boolean | null;
                resourceState?: string | null;
              } | null> | null;
            } | null> | null;
          } | null;
          location?: {
            __typename?: 'LocationDescription';
            address?: {
              __typename?: 'Address';
              postalCode?: string | null;
              streetAddress?: {
                __typename?: 'LanguageString';
                fi?: string | null;
                sv?: string | null;
                en?: string | null;
              } | null;
              city?: {
                __typename?: 'LanguageString';
                fi?: string | null;
                sv?: string | null;
                en?: string | null;
              } | null;
            } | null;
            geoLocation?: {
              __typename?: 'GeoJSONFeature';
              geometry?:
                | { __typename?: 'GeoJSONLineString'; coordinates?: any | null }
                | {
                    __typename?: 'GeoJSONMultiLineString';
                    coordinates?: any | null;
                  }
                | { __typename?: 'GeoJSONMultiPoint'; coordinates?: any | null }
                | {
                    __typename?: 'GeoJSONMultiPolygon';
                    coordinates?: any | null;
                  }
                | { __typename?: 'GeoJSONPoint'; coordinates?: any | null }
                | { __typename?: 'GeoJSONPolygon'; coordinates?: any | null }
                | null;
            } | null;
          } | null;
          ontologyWords?: Array<{
            __typename?: 'OntologyWord';
            id?: string | null;
            label?: {
              __typename?: 'LanguageString';
              fi?: string | null;
              sv?: string | null;
              en?: string | null;
            } | null;
          } | null> | null;
          serviceOwner?: {
            __typename?: 'ServiceOwner';
            providerType?: ProviderType | null;
            type?: ServiceOwnerType | null;
            name?: {
              __typename?: 'LanguageString';
              fi?: string | null;
              sv?: string | null;
              en?: string | null;
            } | null;
          } | null;
          accessibilityShortcomingFor?: {
            __typename?: 'AccessibilityShortcoming';
            profile: AccessibilityProfile;
            count?: number | null;
          } | null;
        } | null;
      };
    }>;
  } | null;
};

export type SearchMapQueryVariables = Exact<{
  text?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  language: UnifiedSearchLanguage;
  administrativeDivisionIds?: InputMaybe<
    Array<Scalars['ID']['input']> | Scalars['ID']['input']
  >;
  ontologyTreeIdOrSets?: InputMaybe<
    | Array<Array<Scalars['ID']['input']> | Scalars['ID']['input']>
    | Array<Scalars['ID']['input']>
    | Scalars['ID']['input']
  >;
  ontologyWordIdOrSets?: InputMaybe<
    | Array<Array<Scalars['ID']['input']> | Scalars['ID']['input']>
    | Array<Scalars['ID']['input']>
    | Scalars['ID']['input']
  >;
  providerTypes?: InputMaybe<
    Array<InputMaybe<ProviderType>> | InputMaybe<ProviderType>
  >;
  serviceOwnerTypes?: InputMaybe<
    Array<InputMaybe<ServiceOwnerType>> | InputMaybe<ServiceOwnerType>
  >;
  targetGroups?: InputMaybe<
    Array<InputMaybe<TargetGroup>> | InputMaybe<TargetGroup>
  >;
  openAt?: InputMaybe<Scalars['String']['input']>;
  orderByDistance?: InputMaybe<OrderByDistance>;
  orderByName?: InputMaybe<OrderByName>;
}>;

export type SearchMapQuery = {
  __typename?: 'Query';
  unifiedSearch?: {
    __typename?: 'SearchResultConnection';
    count?: number | null;
    edges: Array<{
      __typename?: 'SearchResultEdge';
      node: {
        __typename?: 'SearchResultNode';
        venue?: {
          __typename?: 'UnifiedSearchVenue';
          meta?: { __typename?: 'NodeMeta'; id: string } | null;
          name?: {
            __typename?: 'LanguageString';
            fi?: string | null;
            sv?: string | null;
            en?: string | null;
          } | null;
          location?: {
            __typename?: 'LocationDescription';
            geoLocation?: {
              __typename?: 'GeoJSONFeature';
              geometry?:
                | { __typename?: 'GeoJSONLineString'; coordinates?: any | null }
                | {
                    __typename?: 'GeoJSONMultiLineString';
                    coordinates?: any | null;
                  }
                | { __typename?: 'GeoJSONMultiPoint'; coordinates?: any | null }
                | {
                    __typename?: 'GeoJSONMultiPolygon';
                    coordinates?: any | null;
                  }
                | { __typename?: 'GeoJSONPoint'; coordinates?: any | null }
                | { __typename?: 'GeoJSONPolygon'; coordinates?: any | null }
                | null;
            } | null;
          } | null;
        } | null;
      };
    }>;
  } | null;
};

export type VenueFieldsFragment = {
  __typename?: 'Venue';
  addressLocality?: string | null;
  addressPostalFull?: string | null;
  dataSource?: string | null;
  departmentId?: string | null;
  description?: string | null;
  displayedServiceOwner?: string | null;
  displayedServiceOwnerType?: string | null;
  email?: string | null;
  id: string;
  isOpen?: boolean | null;
  image?: string | null;
  infoUrl?: string | null;
  name?: string | null;
  organizationId?: string | null;
  postalCode?: string | null;
  providerType?: string | null;
  shortDescription?: string | null;
  streetAddress?: string | null;
  telephone?: string | null;
  accessibilitySentences: Array<{
    __typename?: 'AccessibilitySentences';
    groupName?: string | null;
    sentences?: Array<string | null> | null;
  } | null>;
  openingHours?: Array<{
    __typename?: 'OpeningHour';
    date: string;
    times: Array<{
      __typename?: 'Time';
      startTime: string;
      endTime: string;
      endTimeOnNextDay: boolean;
      resourceState: ResourceState;
      fullDay: boolean;
    }>;
  }> | null;
  position?: {
    __typename?: 'Point';
    type?: string | null;
    coordinates: Array<number>;
  } | null;
  ontologyWords: Array<{
    __typename?: 'Ontology';
    id?: number | null;
    label?: string | null;
  } | null>;
  connections: Array<{
    __typename?: 'VenueConnection';
    sectionType?: string | null;
    name?: string | null;
    phone?: string | null;
    url?: string | null;
  } | null>;
};

export type VenueQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  includeHaukiFields?: InputMaybe<Scalars['Boolean']['input']>;
}>;

export type VenueQuery = {
  __typename?: 'Query';
  venue: {
    __typename?: 'Venue';
    addressLocality?: string | null;
    addressPostalFull?: string | null;
    dataSource?: string | null;
    departmentId?: string | null;
    description?: string | null;
    displayedServiceOwner?: string | null;
    displayedServiceOwnerType?: string | null;
    email?: string | null;
    id: string;
    isOpen?: boolean | null;
    image?: string | null;
    infoUrl?: string | null;
    name?: string | null;
    organizationId?: string | null;
    postalCode?: string | null;
    providerType?: string | null;
    shortDescription?: string | null;
    streetAddress?: string | null;
    telephone?: string | null;
    accessibilitySentences: Array<{
      __typename?: 'AccessibilitySentences';
      groupName?: string | null;
      sentences?: Array<string | null> | null;
    } | null>;
    openingHours?: Array<{
      __typename?: 'OpeningHour';
      date: string;
      times: Array<{
        __typename?: 'Time';
        startTime: string;
        endTime: string;
        endTimeOnNextDay: boolean;
        resourceState: ResourceState;
        fullDay: boolean;
      }>;
    }> | null;
    position?: {
      __typename?: 'Point';
      type?: string | null;
      coordinates: Array<number>;
    } | null;
    ontologyWords: Array<{
      __typename?: 'Ontology';
      id?: number | null;
      label?: string | null;
    } | null>;
    connections: Array<{
      __typename?: 'VenueConnection';
      sectionType?: string | null;
      name?: string | null;
      phone?: string | null;
      url?: string | null;
    } | null>;
  };
};

export type VenuesByIdsQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
  includeHaukiFields?: InputMaybe<Scalars['Boolean']['input']>;
}>;

export type VenuesByIdsQuery = {
  __typename?: 'Query';
  venuesByIds: Array<{
    __typename?: 'Venue';
    addressLocality?: string | null;
    addressPostalFull?: string | null;
    dataSource?: string | null;
    departmentId?: string | null;
    description?: string | null;
    displayedServiceOwner?: string | null;
    displayedServiceOwnerType?: string | null;
    email?: string | null;
    id: string;
    isOpen?: boolean | null;
    image?: string | null;
    infoUrl?: string | null;
    name?: string | null;
    organizationId?: string | null;
    postalCode?: string | null;
    providerType?: string | null;
    shortDescription?: string | null;
    streetAddress?: string | null;
    telephone?: string | null;
    accessibilitySentences: Array<{
      __typename?: 'AccessibilitySentences';
      groupName?: string | null;
      sentences?: Array<string | null> | null;
    } | null>;
    openingHours?: Array<{
      __typename?: 'OpeningHour';
      date: string;
      times: Array<{
        __typename?: 'Time';
        startTime: string;
        endTime: string;
        endTimeOnNextDay: boolean;
        resourceState: ResourceState;
        fullDay: boolean;
      }>;
    }> | null;
    position?: {
      __typename?: 'Point';
      type?: string | null;
      coordinates: Array<number>;
    } | null;
    ontologyWords: Array<{
      __typename?: 'Ontology';
      id?: number | null;
      label?: string | null;
    } | null>;
    connections: Array<{
      __typename?: 'VenueConnection';
      sectionType?: string | null;
      name?: string | null;
      phone?: string | null;
      url?: string | null;
    } | null>;
  }>;
};

export const LocalizedFieldsFragmentDoc = gql`
  fragment localizedFields on LocalizedObject {
    en
    fi
    sv
  }
`;
export const KeywordFieldsFragmentDoc = gql`
  fragment keywordFields on Keyword {
    id
    internalId
    dataSource
    hasUpcomingEvents
    name {
      fi
      sv
      en
    }
  }
`;
export const PlaceFieldsFragmentDoc = gql`
  fragment placeFields on Place {
    id
    divisions {
      type
      name {
        fi
        sv
        en
      }
    }
    hasUpcomingEvents
    internalId
    email
    infoUrl {
      fi
      sv
      en
    }
    name {
      fi
      en
      sv
    }
    addressLocality {
      fi
      sv
      en
    }
    streetAddress {
      fi
      sv
      en
    }
    postalCode
    position {
      coordinates
    }
    telephone {
      fi
      sv
      en
    }
  }
`;
export const OfferFieldsFragmentDoc = gql`
  fragment offerFields on Offer {
    isFree
    price {
      ...localizedFields
    }
    description {
      ...localizedFields
    }
    infoUrl {
      ...localizedFields
    }
  }
  ${LocalizedFieldsFragmentDoc}
`;
export const EventFieldsFragmentDoc = gql`
  fragment eventFields on EventDetails {
    audienceMinAge
    audienceMaxAge
    id
    eventStatus
    externalLinks {
      name
      link
    }
    images {
      id
      name
      url
      photographerName
    }
    subEvents {
      internalId
    }
    typeId
    superEvent {
      internalId
    }
    inLanguage {
      name {
        ...localizedFields
      }
    }
    keywords {
      ...keywordFields
    }
    location {
      ...placeFields
    }
    offers {
      ...offerFields
    }
    name {
      ...localizedFields
    }
    description {
      ...localizedFields
    }
    shortDescription {
      ...localizedFields
    }
    endTime
    startTime
    publisher
    provider {
      ...localizedFields
    }
    providerContactInfo {
      ...localizedFields
    }
    infoUrl {
      ...localizedFields
    }
    audience {
      id
      name {
        ...localizedFields
      }
    }
    locationExtraInfo {
      ...localizedFields
    }
    enrolmentStartTime
    enrolmentEndTime
    remainingAttendeeCapacity
  }
  ${LocalizedFieldsFragmentDoc}
  ${KeywordFieldsFragmentDoc}
  ${PlaceFieldsFragmentDoc}
  ${OfferFieldsFragmentDoc}
`;
export const OrganizationFieldsFragmentDoc = gql`
  fragment organizationFields on OrganizationDetails {
    id
    name
  }
`;
export const VenueFieldsFragmentDoc = gql`
  fragment venueFields on Venue {
    addressLocality
    addressPostalFull
    dataSource
    departmentId
    description
    displayedServiceOwner
    displayedServiceOwnerType
    email
    id
    isOpen @include(if: $includeHaukiFields)
    image
    infoUrl
    name
    organizationId
    accessibilitySentences {
      groupName
      sentences
    }
    openingHours @include(if: $includeHaukiFields) {
      date
      times {
        startTime
        endTime
        endTimeOnNextDay
        resourceState
        fullDay
      }
    }
    position {
      type
      coordinates
    }
    postalCode
    providerType
    shortDescription
    streetAddress
    telephone
    ontologyWords {
      id
      label
    }
    connections {
      sectionType
      name
      phone
      url
    }
  }
`;
export const PageByTemplateBreadcrumbTitleDocument = gql`
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

/**
 * __usePageByTemplateBreadcrumbTitleQuery__
 *
 * To run a query within a React component, call `usePageByTemplateBreadcrumbTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageByTemplateBreadcrumbTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageByTemplateBreadcrumbTitleQuery({
 *   variables: {
 *      template: // value for 'template'
 *      language: // value for 'language'
 *   },
 * });
 */
export function usePageByTemplateBreadcrumbTitleQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PageByTemplateBreadcrumbTitleQuery,
    PageByTemplateBreadcrumbTitleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    PageByTemplateBreadcrumbTitleQuery,
    PageByTemplateBreadcrumbTitleQueryVariables
  >(PageByTemplateBreadcrumbTitleDocument, options);
}
export function usePageByTemplateBreadcrumbTitleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PageByTemplateBreadcrumbTitleQuery,
    PageByTemplateBreadcrumbTitleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PageByTemplateBreadcrumbTitleQuery,
    PageByTemplateBreadcrumbTitleQueryVariables
  >(PageByTemplateBreadcrumbTitleDocument, options);
}
export type PageByTemplateBreadcrumbTitleQueryHookResult = ReturnType<
  typeof usePageByTemplateBreadcrumbTitleQuery
>;
export type PageByTemplateBreadcrumbTitleLazyQueryHookResult = ReturnType<
  typeof usePageByTemplateBreadcrumbTitleLazyQuery
>;
export type PageByTemplateBreadcrumbTitleQueryResult = Apollo.QueryResult<
  PageByTemplateBreadcrumbTitleQuery,
  PageByTemplateBreadcrumbTitleQueryVariables
>;
export const PageBreadcrumbTitleDocument = gql`
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

/**
 * __usePageBreadcrumbTitleQuery__
 *
 * To run a query within a React component, call `usePageBreadcrumbTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageBreadcrumbTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageBreadcrumbTitleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePageBreadcrumbTitleQuery(
  baseOptions: Apollo.QueryHookOptions<
    PageBreadcrumbTitleQuery,
    PageBreadcrumbTitleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    PageBreadcrumbTitleQuery,
    PageBreadcrumbTitleQueryVariables
  >(PageBreadcrumbTitleDocument, options);
}
export function usePageBreadcrumbTitleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PageBreadcrumbTitleQuery,
    PageBreadcrumbTitleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PageBreadcrumbTitleQuery,
    PageBreadcrumbTitleQueryVariables
  >(PageBreadcrumbTitleDocument, options);
}
export type PageBreadcrumbTitleQueryHookResult = ReturnType<
  typeof usePageBreadcrumbTitleQuery
>;
export type PageBreadcrumbTitleLazyQueryHookResult = ReturnType<
  typeof usePageBreadcrumbTitleLazyQuery
>;
export type PageBreadcrumbTitleQueryResult = Apollo.QueryResult<
  PageBreadcrumbTitleQuery,
  PageBreadcrumbTitleQueryVariables
>;
export const EventDetailsDocument = gql`
  query EventDetails($id: ID!, $include: [String]) {
    eventDetails(id: $id, include: $include) {
      ...eventFields
    }
  }
  ${EventFieldsFragmentDoc}
`;

/**
 * __useEventDetailsQuery__
 *
 * To run a query within a React component, call `useEventDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      include: // value for 'include'
 *   },
 * });
 */
export function useEventDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    EventDetailsQuery,
    EventDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<EventDetailsQuery, EventDetailsQueryVariables>(
    EventDetailsDocument,
    options
  );
}
export function useEventDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EventDetailsQuery,
    EventDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<EventDetailsQuery, EventDetailsQueryVariables>(
    EventDetailsDocument,
    options
  );
}
export type EventDetailsQueryHookResult = ReturnType<
  typeof useEventDetailsQuery
>;
export type EventDetailsLazyQueryHookResult = ReturnType<
  typeof useEventDetailsLazyQuery
>;
export type EventDetailsQueryResult = Apollo.QueryResult<
  EventDetailsQuery,
  EventDetailsQueryVariables
>;
export const EventListDocument = gql`
  query EventList(
    $audienceMaxAgeGt: String
    $audienceMinAgeLt: String
    $eventType: [EventTypeId]
    $internetBased: Boolean
    $suitableFor: [Int]
    $allOngoing: Boolean
    $allOngoingAnd: [String]
    $division: [String]
    $end: String
    $endsAfter: String
    $endsBefore: String
    $inLanguage: String
    $include: [String]
    $isFree: Boolean
    $keyword: [String]
    $keywordAnd: [String]
    $keywordOrSet1: [String]
    $keywordOrSet2: [String]
    $keywordOrSet3: [String]
    $keywordNot: [String]
    $language: String
    $localOngoingAnd: [String]
    $location: [String]
    $page: Int
    $pageSize: Int
    $publisher: ID
    $publisherAncestor: ID
    $sort: String
    $start: String
    $startsAfter: String
    $startsBefore: String
    $superEvent: ID
    $superEventType: [String]
    $text: String
    $translation: String
    $xFullText: String
    $xOngoing: Boolean
  ) {
    eventList(
      audienceMaxAgeGt: $audienceMaxAgeGt
      audienceMinAgeLt: $audienceMinAgeLt
      eventType: $eventType
      internetBased: $internetBased
      suitableFor: $suitableFor
      allOngoing: $allOngoing
      allOngoingAnd: $allOngoingAnd
      division: $division
      end: $end
      endsAfter: $endsAfter
      endsBefore: $endsBefore
      include: $include
      inLanguage: $inLanguage
      isFree: $isFree
      keyword: $keyword
      keywordAnd: $keywordAnd
      keywordOrSet1: $keywordOrSet1
      keywordOrSet2: $keywordOrSet2
      keywordOrSet3: $keywordOrSet3
      keywordNot: $keywordNot
      language: $language
      localOngoingAnd: $localOngoingAnd
      location: $location
      page: $page
      pageSize: $pageSize
      publisher: $publisher
      publisherAncestor: $publisherAncestor
      sort: $sort
      start: $start
      startsAfter: $startsAfter
      startsBefore: $startsBefore
      superEvent: $superEvent
      superEventType: $superEventType
      text: $text
      translation: $translation
      xFullText: $xFullText
      xOngoing: $xOngoing
    ) {
      meta {
        count
        next
        previous
      }
      data {
        ...eventFields
      }
    }
  }
  ${EventFieldsFragmentDoc}
`;

/**
 * __useEventListQuery__
 *
 * To run a query within a React component, call `useEventListQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventListQuery({
 *   variables: {
 *      audienceMaxAgeGt: // value for 'audienceMaxAgeGt'
 *      audienceMinAgeLt: // value for 'audienceMinAgeLt'
 *      eventType: // value for 'eventType'
 *      internetBased: // value for 'internetBased'
 *      suitableFor: // value for 'suitableFor'
 *      allOngoing: // value for 'allOngoing'
 *      allOngoingAnd: // value for 'allOngoingAnd'
 *      division: // value for 'division'
 *      end: // value for 'end'
 *      endsAfter: // value for 'endsAfter'
 *      endsBefore: // value for 'endsBefore'
 *      inLanguage: // value for 'inLanguage'
 *      include: // value for 'include'
 *      isFree: // value for 'isFree'
 *      keyword: // value for 'keyword'
 *      keywordAnd: // value for 'keywordAnd'
 *      keywordOrSet1: // value for 'keywordOrSet1'
 *      keywordOrSet2: // value for 'keywordOrSet2'
 *      keywordOrSet3: // value for 'keywordOrSet3'
 *      keywordNot: // value for 'keywordNot'
 *      language: // value for 'language'
 *      localOngoingAnd: // value for 'localOngoingAnd'
 *      location: // value for 'location'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      publisher: // value for 'publisher'
 *      publisherAncestor: // value for 'publisherAncestor'
 *      sort: // value for 'sort'
 *      start: // value for 'start'
 *      startsAfter: // value for 'startsAfter'
 *      startsBefore: // value for 'startsBefore'
 *      superEvent: // value for 'superEvent'
 *      superEventType: // value for 'superEventType'
 *      text: // value for 'text'
 *      translation: // value for 'translation'
 *      xFullText: // value for 'xFullText'
 *      xOngoing: // value for 'xOngoing'
 *   },
 * });
 */
export function useEventListQuery(
  baseOptions?: Apollo.QueryHookOptions<EventListQuery, EventListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<EventListQuery, EventListQueryVariables>(
    EventListDocument,
    options
  );
}
export function useEventListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EventListQuery,
    EventListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<EventListQuery, EventListQueryVariables>(
    EventListDocument,
    options
  );
}
export type EventListQueryHookResult = ReturnType<typeof useEventListQuery>;
export type EventListLazyQueryHookResult = ReturnType<
  typeof useEventListLazyQuery
>;
export type EventListQueryResult = Apollo.QueryResult<
  EventListQuery,
  EventListQueryVariables
>;
export const EventsByIdsDocument = gql`
  query EventsByIds(
    $ids: [ID!]!
    $eventType: [EventTypeId]
    $include: [String]
    $sort: String
    $pageSize: Int
    $page: Int
    $start: String
    $end: String
  ) {
    eventsByIds(
      ids: $ids
      eventType: $eventType
      include: $include
      sort: $sort
      pageSize: $pageSize
      page: $page
      start: $start
      end: $end
    ) {
      data {
        ...eventFields
      }
      meta {
        count
        next
        previous
      }
    }
  }
  ${EventFieldsFragmentDoc}
`;

/**
 * __useEventsByIdsQuery__
 *
 * To run a query within a React component, call `useEventsByIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsByIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsByIdsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *      eventType: // value for 'eventType'
 *      include: // value for 'include'
 *      sort: // value for 'sort'
 *      pageSize: // value for 'pageSize'
 *      page: // value for 'page'
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useEventsByIdsQuery(
  baseOptions: Apollo.QueryHookOptions<
    EventsByIdsQuery,
    EventsByIdsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<EventsByIdsQuery, EventsByIdsQueryVariables>(
    EventsByIdsDocument,
    options
  );
}
export function useEventsByIdsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EventsByIdsQuery,
    EventsByIdsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<EventsByIdsQuery, EventsByIdsQueryVariables>(
    EventsByIdsDocument,
    options
  );
}
export type EventsByIdsQueryHookResult = ReturnType<typeof useEventsByIdsQuery>;
export type EventsByIdsLazyQueryHookResult = ReturnType<
  typeof useEventsByIdsLazyQuery
>;
export type EventsByIdsQueryResult = Apollo.QueryResult<
  EventsByIdsQuery,
  EventsByIdsQueryVariables
>;
export const KeywordDetailsDocument = gql`
  query KeywordDetails($id: ID!) {
    keywordDetails(id: $id) {
      ...keywordFields
    }
  }
  ${KeywordFieldsFragmentDoc}
`;

/**
 * __useKeywordDetailsQuery__
 *
 * To run a query within a React component, call `useKeywordDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useKeywordDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKeywordDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useKeywordDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    KeywordDetailsQuery,
    KeywordDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<KeywordDetailsQuery, KeywordDetailsQueryVariables>(
    KeywordDetailsDocument,
    options
  );
}
export function useKeywordDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    KeywordDetailsQuery,
    KeywordDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<KeywordDetailsQuery, KeywordDetailsQueryVariables>(
    KeywordDetailsDocument,
    options
  );
}
export type KeywordDetailsQueryHookResult = ReturnType<
  typeof useKeywordDetailsQuery
>;
export type KeywordDetailsLazyQueryHookResult = ReturnType<
  typeof useKeywordDetailsLazyQuery
>;
export type KeywordDetailsQueryResult = Apollo.QueryResult<
  KeywordDetailsQuery,
  KeywordDetailsQueryVariables
>;
export const KeywordListDocument = gql`
  query KeywordList(
    $dataSource: String
    $hasUpcomingEvents: Boolean
    $page: Int
    $pageSize: Int
    $showAllKeywords: Boolean
    $sort: String
    $text: String
  ) {
    keywordList(
      dataSource: $dataSource
      hasUpcomingEvents: $hasUpcomingEvents
      page: $page
      pageSize: $pageSize
      showAllKeywords: $showAllKeywords
      sort: $sort
      text: $text
    ) {
      meta {
        count
        next
        previous
      }
      data {
        ...keywordFields
      }
    }
  }
  ${KeywordFieldsFragmentDoc}
`;

/**
 * __useKeywordListQuery__
 *
 * To run a query within a React component, call `useKeywordListQuery` and pass it any options that fit your needs.
 * When your component renders, `useKeywordListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKeywordListQuery({
 *   variables: {
 *      dataSource: // value for 'dataSource'
 *      hasUpcomingEvents: // value for 'hasUpcomingEvents'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      showAllKeywords: // value for 'showAllKeywords'
 *      sort: // value for 'sort'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useKeywordListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    KeywordListQuery,
    KeywordListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<KeywordListQuery, KeywordListQueryVariables>(
    KeywordListDocument,
    options
  );
}
export function useKeywordListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    KeywordListQuery,
    KeywordListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<KeywordListQuery, KeywordListQueryVariables>(
    KeywordListDocument,
    options
  );
}
export type KeywordListQueryHookResult = ReturnType<typeof useKeywordListQuery>;
export type KeywordListLazyQueryHookResult = ReturnType<
  typeof useKeywordListLazyQuery
>;
export type KeywordListQueryResult = Apollo.QueryResult<
  KeywordListQuery,
  KeywordListQueryVariables
>;
export const NeighborhoodListDocument = gql`
  query NeighborhoodList {
    neighborhoodList {
      meta {
        count
        next
        previous
      }
      data {
        id
        name {
          fi
          sv
          en
        }
      }
    }
  }
`;

/**
 * __useNeighborhoodListQuery__
 *
 * To run a query within a React component, call `useNeighborhoodListQuery` and pass it any options that fit your needs.
 * When your component renders, `useNeighborhoodListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNeighborhoodListQuery({
 *   variables: {
 *   },
 * });
 */
export function useNeighborhoodListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    NeighborhoodListQuery,
    NeighborhoodListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<NeighborhoodListQuery, NeighborhoodListQueryVariables>(
    NeighborhoodListDocument,
    options
  );
}
export function useNeighborhoodListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    NeighborhoodListQuery,
    NeighborhoodListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    NeighborhoodListQuery,
    NeighborhoodListQueryVariables
  >(NeighborhoodListDocument, options);
}
export type NeighborhoodListQueryHookResult = ReturnType<
  typeof useNeighborhoodListQuery
>;
export type NeighborhoodListLazyQueryHookResult = ReturnType<
  typeof useNeighborhoodListLazyQuery
>;
export type NeighborhoodListQueryResult = Apollo.QueryResult<
  NeighborhoodListQuery,
  NeighborhoodListQueryVariables
>;
export const OrganizationDetailsDocument = gql`
  query OrganizationDetails($id: ID!) {
    organizationDetails(id: $id) {
      ...organizationFields
    }
  }
  ${OrganizationFieldsFragmentDoc}
`;

/**
 * __useOrganizationDetailsQuery__
 *
 * To run a query within a React component, call `useOrganizationDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOrganizationDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    OrganizationDetailsQuery,
    OrganizationDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    OrganizationDetailsQuery,
    OrganizationDetailsQueryVariables
  >(OrganizationDetailsDocument, options);
}
export function useOrganizationDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    OrganizationDetailsQuery,
    OrganizationDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    OrganizationDetailsQuery,
    OrganizationDetailsQueryVariables
  >(OrganizationDetailsDocument, options);
}
export type OrganizationDetailsQueryHookResult = ReturnType<
  typeof useOrganizationDetailsQuery
>;
export type OrganizationDetailsLazyQueryHookResult = ReturnType<
  typeof useOrganizationDetailsLazyQuery
>;
export type OrganizationDetailsQueryResult = Apollo.QueryResult<
  OrganizationDetailsQuery,
  OrganizationDetailsQueryVariables
>;
export const PlaceDetailsDocument = gql`
  query PlaceDetails($id: ID!) {
    placeDetails(id: $id) {
      ...placeFields
    }
  }
  ${PlaceFieldsFragmentDoc}
`;

/**
 * __usePlaceDetailsQuery__
 *
 * To run a query within a React component, call `usePlaceDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaceDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaceDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePlaceDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    PlaceDetailsQuery,
    PlaceDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PlaceDetailsQuery, PlaceDetailsQueryVariables>(
    PlaceDetailsDocument,
    options
  );
}
export function usePlaceDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PlaceDetailsQuery,
    PlaceDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PlaceDetailsQuery, PlaceDetailsQueryVariables>(
    PlaceDetailsDocument,
    options
  );
}
export type PlaceDetailsQueryHookResult = ReturnType<
  typeof usePlaceDetailsQuery
>;
export type PlaceDetailsLazyQueryHookResult = ReturnType<
  typeof usePlaceDetailsLazyQuery
>;
export type PlaceDetailsQueryResult = Apollo.QueryResult<
  PlaceDetailsQuery,
  PlaceDetailsQueryVariables
>;
export const PlaceListDocument = gql`
  query PlaceList(
    $dataSource: String
    $divisions: [String]
    $hasUpcomingEvents: Boolean
    $page: Int
    $pageSize: Int
    $showAllPlaces: Boolean
    $sort: String
    $text: String
  ) {
    placeList(
      dataSource: $dataSource
      divisions: $divisions
      hasUpcomingEvents: $hasUpcomingEvents
      page: $page
      pageSize: $pageSize
      showAllPlaces: $showAllPlaces
      sort: $sort
      text: $text
    ) {
      meta {
        count
        next
        previous
      }
      data {
        ...placeFields
      }
    }
  }
  ${PlaceFieldsFragmentDoc}
`;

/**
 * __usePlaceListQuery__
 *
 * To run a query within a React component, call `usePlaceListQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaceListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaceListQuery({
 *   variables: {
 *      dataSource: // value for 'dataSource'
 *      divisions: // value for 'divisions'
 *      hasUpcomingEvents: // value for 'hasUpcomingEvents'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      showAllPlaces: // value for 'showAllPlaces'
 *      sort: // value for 'sort'
 *      text: // value for 'text'
 *   },
 * });
 */
export function usePlaceListQuery(
  baseOptions?: Apollo.QueryHookOptions<PlaceListQuery, PlaceListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PlaceListQuery, PlaceListQueryVariables>(
    PlaceListDocument,
    options
  );
}
export function usePlaceListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PlaceListQuery,
    PlaceListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PlaceListQuery, PlaceListQueryVariables>(
    PlaceListDocument,
    options
  );
}
export type PlaceListQueryHookResult = ReturnType<typeof usePlaceListQuery>;
export type PlaceListLazyQueryHookResult = ReturnType<
  typeof usePlaceListLazyQuery
>;
export type PlaceListQueryResult = Apollo.QueryResult<
  PlaceListQuery,
  PlaceListQueryVariables
>;
export const AdministrativeDivisionsDocument = gql`
  query AdministrativeDivisions {
    administrativeDivisions(helsinkiCommonOnly: true) {
      id
      type
      name {
        fi
        sv
        en
      }
    }
  }
`;

/**
 * __useAdministrativeDivisionsQuery__
 *
 * To run a query within a React component, call `useAdministrativeDivisionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdministrativeDivisionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdministrativeDivisionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdministrativeDivisionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    AdministrativeDivisionsQuery,
    AdministrativeDivisionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    AdministrativeDivisionsQuery,
    AdministrativeDivisionsQueryVariables
  >(AdministrativeDivisionsDocument, options);
}
export function useAdministrativeDivisionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AdministrativeDivisionsQuery,
    AdministrativeDivisionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    AdministrativeDivisionsQuery,
    AdministrativeDivisionsQueryVariables
  >(AdministrativeDivisionsDocument, options);
}
export type AdministrativeDivisionsQueryHookResult = ReturnType<
  typeof useAdministrativeDivisionsQuery
>;
export type AdministrativeDivisionsLazyQueryHookResult = ReturnType<
  typeof useAdministrativeDivisionsLazyQuery
>;
export type AdministrativeDivisionsQueryResult = Apollo.QueryResult<
  AdministrativeDivisionsQuery,
  AdministrativeDivisionsQueryVariables
>;
export const OntologyTreeDocument = gql`
  query OntologyTree($rootId: ID) {
    ontologyTree(rootId: $rootId, leavesOnly: true) {
      id
      name {
        fi
        sv
        en
      }
    }
  }
`;

/**
 * __useOntologyTreeQuery__
 *
 * To run a query within a React component, call `useOntologyTreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useOntologyTreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOntologyTreeQuery({
 *   variables: {
 *      rootId: // value for 'rootId'
 *   },
 * });
 */
export function useOntologyTreeQuery(
  baseOptions?: Apollo.QueryHookOptions<
    OntologyTreeQuery,
    OntologyTreeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<OntologyTreeQuery, OntologyTreeQueryVariables>(
    OntologyTreeDocument,
    options
  );
}
export function useOntologyTreeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    OntologyTreeQuery,
    OntologyTreeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<OntologyTreeQuery, OntologyTreeQueryVariables>(
    OntologyTreeDocument,
    options
  );
}
export type OntologyTreeQueryHookResult = ReturnType<
  typeof useOntologyTreeQuery
>;
export type OntologyTreeLazyQueryHookResult = ReturnType<
  typeof useOntologyTreeLazyQuery
>;
export type OntologyTreeQueryResult = Apollo.QueryResult<
  OntologyTreeQuery,
  OntologyTreeQueryVariables
>;
export const OntologyWordsDocument = gql`
  query OntologyWords($ids: [ID!]) {
    ontologyWords(ids: $ids) {
      id
      label {
        fi
        sv
        en
      }
    }
  }
`;

/**
 * __useOntologyWordsQuery__
 *
 * To run a query within a React component, call `useOntologyWordsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOntologyWordsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOntologyWordsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useOntologyWordsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    OntologyWordsQuery,
    OntologyWordsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<OntologyWordsQuery, OntologyWordsQueryVariables>(
    OntologyWordsDocument,
    options
  );
}
export function useOntologyWordsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    OntologyWordsQuery,
    OntologyWordsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<OntologyWordsQuery, OntologyWordsQueryVariables>(
    OntologyWordsDocument,
    options
  );
}
export type OntologyWordsQueryHookResult = ReturnType<
  typeof useOntologyWordsQuery
>;
export type OntologyWordsLazyQueryHookResult = ReturnType<
  typeof useOntologyWordsLazyQuery
>;
export type OntologyWordsQueryResult = Apollo.QueryResult<
  OntologyWordsQuery,
  OntologyWordsQueryVariables
>;
export const UnifiedSearchCompletionSuggestionsDocument = gql`
  query UnifiedSearchCompletionSuggestions(
    $prefix: String
    $language: UnifiedSearchLanguage!
  ) {
    unifiedSearchCompletionSuggestions(
      prefix: $prefix
      index: location
      languages: [$language]
    ) {
      suggestions {
        label
      }
    }
  }
`;

/**
 * __useUnifiedSearchCompletionSuggestionsQuery__
 *
 * To run a query within a React component, call `useUnifiedSearchCompletionSuggestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnifiedSearchCompletionSuggestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnifiedSearchCompletionSuggestionsQuery({
 *   variables: {
 *      prefix: // value for 'prefix'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useUnifiedSearchCompletionSuggestionsQuery(
  baseOptions: Apollo.QueryHookOptions<
    UnifiedSearchCompletionSuggestionsQuery,
    UnifiedSearchCompletionSuggestionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    UnifiedSearchCompletionSuggestionsQuery,
    UnifiedSearchCompletionSuggestionsQueryVariables
  >(UnifiedSearchCompletionSuggestionsDocument, options);
}
export function useUnifiedSearchCompletionSuggestionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UnifiedSearchCompletionSuggestionsQuery,
    UnifiedSearchCompletionSuggestionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    UnifiedSearchCompletionSuggestionsQuery,
    UnifiedSearchCompletionSuggestionsQueryVariables
  >(UnifiedSearchCompletionSuggestionsDocument, options);
}
export type UnifiedSearchCompletionSuggestionsQueryHookResult = ReturnType<
  typeof useUnifiedSearchCompletionSuggestionsQuery
>;
export type UnifiedSearchCompletionSuggestionsLazyQueryHookResult = ReturnType<
  typeof useUnifiedSearchCompletionSuggestionsLazyQuery
>;
export type UnifiedSearchCompletionSuggestionsQueryResult = Apollo.QueryResult<
  UnifiedSearchCompletionSuggestionsQuery,
  UnifiedSearchCompletionSuggestionsQueryVariables
>;
export const SearchListDocument = gql`
  query SearchList(
    $text: String
    $first: Int
    $after: String
    $language: UnifiedSearchLanguage!
    $administrativeDivisionIds: [ID!]
    $ontologyTreeIdOrSets: [[ID!]!]
    $ontologyWordIdOrSets: [[ID!]!]
    $providerTypes: [ProviderType]
    $serviceOwnerTypes: [ServiceOwnerType]
    $targetGroups: [TargetGroup]
    $openAt: String
    $orderByDistance: OrderByDistance
    $orderByName: OrderByName
    $orderByAccessibilityProfile: AccessibilityProfile
    $showAccessibilityShortcomingsFor: AccessibilityProfile
    $mustHaveReservableResource: Boolean
    $includeHaukiFields: Boolean = true
  ) {
    unifiedSearch(
      text: $text
      index: location
      first: $first
      after: $after
      languages: [$language]
      administrativeDivisionIds: $administrativeDivisionIds
      ontologyTreeIdOrSets: $ontologyTreeIdOrSets
      ontologyWordIdOrSets: $ontologyWordIdOrSets
      providerTypes: $providerTypes
      serviceOwnerTypes: $serviceOwnerTypes
      mustHaveReservableResource: $mustHaveReservableResource
      targetGroups: $targetGroups
      openAt: $openAt
      orderByDistance: $orderByDistance
      orderByName: $orderByName
      orderByAccessibilityProfile: $orderByAccessibilityProfile
    ) {
      count
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          venue {
            meta {
              id
            }
            name {
              fi
              sv
              en
            }
            description {
              fi
              sv
              en
            }
            images {
              url
            }
            reservation {
              reservable
              externalReservationUrl {
                fi
                sv
                en
              }
            }
            openingHours @include(if: $includeHaukiFields) {
              today {
                startTime
                endTime
                endTimeOnNextDay
                fullDay
                resourceState
              }
              data {
                date
                times {
                  startTime
                  endTime
                  endTimeOnNextDay
                  fullDay
                  resourceState
                }
              }
            }
            location {
              address {
                streetAddress {
                  fi
                  sv
                  en
                }
                postalCode
                city {
                  fi
                  sv
                  en
                }
              }
              geoLocation {
                geometry {
                  coordinates
                }
              }
            }
            ontologyWords {
              id
              label {
                fi
                sv
                en
              }
            }
            serviceOwner {
              name {
                fi
                sv
                en
              }
              providerType
              type
            }
            targetGroups
            accessibilityShortcomingFor(
              profile: $showAccessibilityShortcomingsFor
            ) {
              profile
              count
            }
          }
        }
      }
    }
  }
`;

/**
 * __useSearchListQuery__
 *
 * To run a query within a React component, call `useSearchListQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchListQuery({
 *   variables: {
 *      text: // value for 'text'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      language: // value for 'language'
 *      administrativeDivisionIds: // value for 'administrativeDivisionIds'
 *      ontologyTreeIdOrSets: // value for 'ontologyTreeIdOrSets'
 *      ontologyWordIdOrSets: // value for 'ontologyWordIdOrSets'
 *      providerTypes: // value for 'providerTypes'
 *      serviceOwnerTypes: // value for 'serviceOwnerTypes'
 *      targetGroups: // value for 'targetGroups'
 *      openAt: // value for 'openAt'
 *      orderByDistance: // value for 'orderByDistance'
 *      orderByName: // value for 'orderByName'
 *      orderByAccessibilityProfile: // value for 'orderByAccessibilityProfile'
 *      showAccessibilityShortcomingsFor: // value for 'showAccessibilityShortcomingsFor'
 *      mustHaveReservableResource: // value for 'mustHaveReservableResource'
 *      includeHaukiFields: // value for 'includeHaukiFields'
 *   },
 * });
 */
export function useSearchListQuery(
  baseOptions: Apollo.QueryHookOptions<
    SearchListQuery,
    SearchListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SearchListQuery, SearchListQueryVariables>(
    SearchListDocument,
    options
  );
}
export function useSearchListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchListQuery,
    SearchListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SearchListQuery, SearchListQueryVariables>(
    SearchListDocument,
    options
  );
}
export type SearchListQueryHookResult = ReturnType<typeof useSearchListQuery>;
export type SearchListLazyQueryHookResult = ReturnType<
  typeof useSearchListLazyQuery
>;
export type SearchListQueryResult = Apollo.QueryResult<
  SearchListQuery,
  SearchListQueryVariables
>;
export const SearchMapDocument = gql`
  query SearchMap(
    $text: String
    $first: Int
    $after: String
    $language: UnifiedSearchLanguage!
    $administrativeDivisionIds: [ID!]
    $ontologyTreeIdOrSets: [[ID!]!]
    $ontologyWordIdOrSets: [[ID!]!]
    $providerTypes: [ProviderType]
    $serviceOwnerTypes: [ServiceOwnerType]
    $targetGroups: [TargetGroup]
    $openAt: String
    $orderByDistance: OrderByDistance
    $orderByName: OrderByName
  ) {
    unifiedSearch(
      text: $text
      index: location
      first: $first
      after: $after
      languages: [$language]
      administrativeDivisionIds: $administrativeDivisionIds
      ontologyTreeIdOrSets: $ontologyTreeIdOrSets
      ontologyWordIdOrSets: $ontologyWordIdOrSets
      providerTypes: $providerTypes
      serviceOwnerTypes: $serviceOwnerTypes
      targetGroups: $targetGroups
      openAt: $openAt
      orderByDistance: $orderByDistance
      orderByName: $orderByName
    ) {
      count
      edges {
        node {
          venue {
            meta {
              id
            }
            name {
              fi
              sv
              en
            }
            location {
              geoLocation {
                geometry {
                  coordinates
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useSearchMapQuery__
 *
 * To run a query within a React component, call `useSearchMapQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchMapQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchMapQuery({
 *   variables: {
 *      text: // value for 'text'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      language: // value for 'language'
 *      administrativeDivisionIds: // value for 'administrativeDivisionIds'
 *      ontologyTreeIdOrSets: // value for 'ontologyTreeIdOrSets'
 *      ontologyWordIdOrSets: // value for 'ontologyWordIdOrSets'
 *      providerTypes: // value for 'providerTypes'
 *      serviceOwnerTypes: // value for 'serviceOwnerTypes'
 *      targetGroups: // value for 'targetGroups'
 *      openAt: // value for 'openAt'
 *      orderByDistance: // value for 'orderByDistance'
 *      orderByName: // value for 'orderByName'
 *   },
 * });
 */
export function useSearchMapQuery(
  baseOptions: Apollo.QueryHookOptions<SearchMapQuery, SearchMapQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SearchMapQuery, SearchMapQueryVariables>(
    SearchMapDocument,
    options
  );
}
export function useSearchMapLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchMapQuery,
    SearchMapQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SearchMapQuery, SearchMapQueryVariables>(
    SearchMapDocument,
    options
  );
}
export type SearchMapQueryHookResult = ReturnType<typeof useSearchMapQuery>;
export type SearchMapLazyQueryHookResult = ReturnType<
  typeof useSearchMapLazyQuery
>;
export type SearchMapQueryResult = Apollo.QueryResult<
  SearchMapQuery,
  SearchMapQueryVariables
>;
export const VenueDocument = gql`
  query Venue($id: ID!, $includeHaukiFields: Boolean = true) {
    venue(id: $id) {
      ...venueFields
    }
  }
  ${VenueFieldsFragmentDoc}
`;

/**
 * __useVenueQuery__
 *
 * To run a query within a React component, call `useVenueQuery` and pass it any options that fit your needs.
 * When your component renders, `useVenueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVenueQuery({
 *   variables: {
 *      id: // value for 'id'
 *      includeHaukiFields: // value for 'includeHaukiFields'
 *   },
 * });
 */
export function useVenueQuery(
  baseOptions: Apollo.QueryHookOptions<VenueQuery, VenueQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<VenueQuery, VenueQueryVariables>(
    VenueDocument,
    options
  );
}
export function useVenueLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<VenueQuery, VenueQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<VenueQuery, VenueQueryVariables>(
    VenueDocument,
    options
  );
}
export type VenueQueryHookResult = ReturnType<typeof useVenueQuery>;
export type VenueLazyQueryHookResult = ReturnType<typeof useVenueLazyQuery>;
export type VenueQueryResult = Apollo.QueryResult<
  VenueQuery,
  VenueQueryVariables
>;
export const VenuesByIdsDocument = gql`
  query VenuesByIds($ids: [ID!], $includeHaukiFields: Boolean = true) {
    venuesByIds(ids: $ids) {
      ...venueFields
    }
  }
  ${VenueFieldsFragmentDoc}
`;

/**
 * __useVenuesByIdsQuery__
 *
 * To run a query within a React component, call `useVenuesByIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useVenuesByIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVenuesByIdsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *      includeHaukiFields: // value for 'includeHaukiFields'
 *   },
 * });
 */
export function useVenuesByIdsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    VenuesByIdsQuery,
    VenuesByIdsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<VenuesByIdsQuery, VenuesByIdsQueryVariables>(
    VenuesByIdsDocument,
    options
  );
}
export function useVenuesByIdsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    VenuesByIdsQuery,
    VenuesByIdsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<VenuesByIdsQuery, VenuesByIdsQueryVariables>(
    VenuesByIdsDocument,
    options
  );
}
export type VenuesByIdsQueryHookResult = ReturnType<typeof useVenuesByIdsQuery>;
export type VenuesByIdsLazyQueryHookResult = ReturnType<
  typeof useVenuesByIdsLazyQuery
>;
export type VenuesByIdsQueryResult = Apollo.QueryResult<
  VenuesByIdsQuery,
  VenuesByIdsQueryVariables
>;
