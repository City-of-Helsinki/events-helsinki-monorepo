import type { LanguageCodeEnum } from '../../types';

export type MenuQuery = {
  __typename?: 'RootQuery';
  menu?: {
    __typename?: 'Menu';
    id: string;
    menuItems?: {
      __typename?: 'MenuToMenuItemConnection';
      nodes: Array<{
        __typename?: 'MenuItem';
        id: string;
        order?: number | null;
        target?: string | null;
        title?: string | null;
        path?: string | null;
        label?: string | null;
        connectedNode?: {
          __typename?: 'MenuItemToMenuItemLinkableConnectionEdge';
          node:
            | { __typename?: 'Category' }
            | {
                __typename?: 'Page';
                id: string;
                content?: string | null;
                slug?: string | null;
                title?: string | null;
                uri?: string | null;
                link?: string | null;
                lead?: string | null;
                children?: {
                  __typename?: 'HierarchicalContentNodeToContentNodeChildrenConnection';
                  nodes: Array<
                    | { __typename?: 'Collection' }
                    | { __typename?: 'Contact' }
                    | { __typename?: 'LandingPage' }
                    | { __typename?: 'MediaItem' }
                    | {
                        __typename?: 'Page';
                        id: string;
                        content?: string | null;
                        slug?: string | null;
                        title?: string | null;
                        uri?: string | null;
                        link?: string | null;
                        lead?: string | null;
                        translations?: Array<{
                          __typename?: 'Page';
                          uri?: string | null;
                          slug?: string | null;
                          id: string;
                          content?: string | null;
                          title?: string | null;
                          link?: string | null;
                          lead?: string | null;
                          language?: {
                            __typename?: 'Language';
                            code?: LanguageCodeEnum | null;
                            id: string;
                            locale?: string | null;
                            name?: string | null;
                            slug?: string | null;
                          } | null;
                          seo?: {
                            __typename?: 'SEO';
                            title?: string | null;
                            description?: string | null;
                            openGraphTitle?: string | null;
                            openGraphDescription?: string | null;
                            openGraphType?: string | null;
                            twitterTitle?: string | null;
                            twitterDescription?: string | null;
                            canonicalUrl?: string | null;
                            socialImage?: {
                              __typename?: 'MediaItem';
                              mediaItemUrl?: string | null;
                            } | null;
                          } | null;
                          hero?: {
                            __typename?: 'Hero';
                            background_color?: string | null;
                            background_image_url?: string | null;
                            description?: string | null;
                            title?: string | null;
                            wave_motif?: string | null;
                            link?: {
                              __typename?: 'Link';
                              target?: string | null;
                              title?: string | null;
                              url?: string | null;
                            } | null;
                          } | null;
                          translations?: Array<{
                            __typename?: 'Page';
                            uri?: string | null;
                            slug?: string | null;
                            language?: {
                              __typename?: 'Language';
                              code?: LanguageCodeEnum | null;
                              id: string;
                              locale?: string | null;
                              name?: string | null;
                              slug?: string | null;
                            } | null;
                            seo?: {
                              __typename?: 'SEO';
                              title?: string | null;
                              description?: string | null;
                              openGraphTitle?: string | null;
                              openGraphDescription?: string | null;
                              openGraphType?: string | null;
                              twitterTitle?: string | null;
                              twitterDescription?: string | null;
                              canonicalUrl?: string | null;
                              socialImage?: {
                                __typename?: 'MediaItem';
                                mediaItemUrl?: string | null;
                              } | null;
                            } | null;
                          } | null> | null;
                          featuredImage?: {
                            __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                            node: {
                              __typename?: 'MediaItem';
                              mediaItemUrl?: string | null;
                              link?: string | null;
                              altText?: string | null;
                              mimeType?: string | null;
                              title?: string | null;
                              uri?: string | null;
                              photographerName?: string | null;
                            };
                          } | null;
                          sidebar?: Array<
                            | {
                                __typename: 'LayoutArticles';
                                title?: string | null;
                                showAllLink?: string | null;
                                articles?: Array<{
                                  __typename?: 'Post';
                                  id: string;
                                  uri?: string | null;
                                  slug?: string | null;
                                  link?: string | null;
                                  date?: string | null;
                                  title?: string | null;
                                  lead?: string | null;
                                  featuredImage?: {
                                    __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                                    node: {
                                      __typename?: 'MediaItem';
                                      altText?: string | null;
                                      mediaItemUrl?: string | null;
                                    };
                                  } | null;
                                  categories?: {
                                    __typename?: 'PostToCategoryConnection';
                                    nodes: Array<{
                                      __typename?: 'Category';
                                      name?: string | null;
                                    }>;
                                  } | null;
                                } | null> | null;
                              }
                            | { __typename?: 'LayoutCards' }
                            | {
                                __typename: 'LayoutLinkList';
                                anchor?: string | null;
                                title?: string | null;
                                description?: string | null;
                                links?: Array<{
                                  __typename?: 'Link';
                                  target?: string | null;
                                  title?: string | null;
                                  url?: string | null;
                                } | null> | null;
                              }
                            | {
                                __typename: 'LayoutPages';
                                title?: string | null;
                                description?: string | null;
                                showAllLink?: string | null;
                                pages?: Array<{
                                  __typename?: 'Page';
                                  id: string;
                                  uri?: string | null;
                                  slug?: string | null;
                                  link?: string | null;
                                  date?: string | null;
                                  title?: string | null;
                                  lead?: string | null;
                                  featuredImage?: {
                                    __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                                    node: {
                                      __typename?: 'MediaItem';
                                      altText?: string | null;
                                      mediaItemUrl?: string | null;
                                    };
                                  } | null;
                                } | null> | null;
                              }
                            | null
                          > | null;
                          modules?: Array<
                            | {
                                __typename: 'EventSearch';
                                title?: string | null;
                                url?: string | null;
                                module?: string | null;
                                showAllLink?: string | null;
                                showAllLinkCustom?: string | null;
                              }
                            | {
                                __typename: 'EventSearchCarousel';
                                title?: string | null;
                                url?: string | null;
                                orderNewestFirst?: boolean | null;
                                eventsNearby?: boolean | null;
                                amountOfCards?: number | null;
                                showAllLink?: string | null;
                                showAllLinkCustom?: string | null;
                              }
                            | {
                                __typename: 'EventSelected';
                                title?: string | null;
                                events?: Array<string | null> | null;
                                module?: string | null;
                              }
                            | {
                                __typename: 'EventSelectedCarousel';
                                title?: string | null;
                                module?: string | null;
                                eventsNearby?: boolean | null;
                                events?: Array<string | null> | null;
                                amountOfCardsPerRow?: number | null;
                                amountOfCards?: number | null;
                              }
                            | { __typename?: 'LayoutArticleHighlights' }
                            | {
                                __typename: 'LayoutArticles';
                                title?: string | null;
                                showAllLink?: string | null;
                                articles?: Array<{
                                  __typename?: 'Post';
                                  id: string;
                                  uri?: string | null;
                                  slug?: string | null;
                                  link?: string | null;
                                  date?: string | null;
                                  title?: string | null;
                                  lead?: string | null;
                                  featuredImage?: {
                                    __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                                    node: {
                                      __typename?: 'MediaItem';
                                      altText?: string | null;
                                      mediaItemUrl?: string | null;
                                    };
                                  } | null;
                                  categories?: {
                                    __typename?: 'PostToCategoryConnection';
                                    nodes: Array<{
                                      __typename?: 'Category';
                                      name?: string | null;
                                    }>;
                                  } | null;
                                } | null> | null;
                              }
                            | {
                                __typename: 'LayoutArticlesCarousel';
                                title?: string | null;
                                showMore?: Array<string | null> | null;
                                showAllLink?: string | null;
                                articles?: Array<{
                                  __typename?: 'Post';
                                  id: string;
                                  uri?: string | null;
                                  slug?: string | null;
                                  link?: string | null;
                                  date?: string | null;
                                  title?: string | null;
                                  lead?: string | null;
                                  featuredImage?: {
                                    __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                                    node: {
                                      __typename?: 'MediaItem';
                                      altText?: string | null;
                                      mediaItemUrl?: string | null;
                                    };
                                  } | null;
                                  categories?: {
                                    __typename?: 'PostToCategoryConnection';
                                    nodes: Array<{
                                      __typename?: 'Category';
                                      name?: string | null;
                                    }>;
                                  } | null;
                                } | null> | null;
                              }
                            | {
                                __typename: 'LayoutCard';
                                alignment?: string | null;
                                backgroundColor?: string | null;
                                description?: string | null;
                                title?: string | null;
                                link?: {
                                  __typename?: 'Link';
                                  target?: string | null;
                                  title?: string | null;
                                  url?: string | null;
                                } | null;
                                image?: {
                                  __typename?: 'Image';
                                  caption?: string | null;
                                  description?: string | null;
                                  large?: string | null;
                                  medium?: string | null;
                                  medium_large?: string | null;
                                  thumbnail?: string | null;
                                  title?: string | null;
                                } | null;
                              }
                            | {
                                __typename: 'LayoutCards';
                                cards?: Array<{
                                  __typename?: 'Card';
                                  backgroundColor?: string | null;
                                  description?: string | null;
                                  icon?: string | null;
                                  title?: string | null;
                                  link?: {
                                    __typename?: 'Link';
                                    target?: string | null;
                                    title?: string | null;
                                    url?: string | null;
                                  } | null;
                                } | null> | null;
                              }
                            | {
                                __typename: 'LayoutCollection';
                                collection?: {
                                  __typename?: 'Collection';
                                  title?: string | null;
                                } | null;
                              }
                            | { __typename?: 'LayoutContact' }
                            | {
                                __typename: 'LayoutContent';
                                backgroundColor?: string | null;
                                content?: string | null;
                                title?: string | null;
                              }
                            | {
                                __typename: 'LayoutImage';
                                border?: boolean | null;
                                photographer_name?: string | null;
                                show_on_lightbox?: boolean | null;
                                image?: {
                                  __typename?: 'Image';
                                  caption?: string | null;
                                  description?: string | null;
                                  large?: string | null;
                                  medium?: string | null;
                                  thumbnail?: string | null;
                                  title?: string | null;
                                  medium_large?: string | null;
                                } | null;
                              }
                            | { __typename?: 'LayoutImageGallery' }
                            | {
                                __typename: 'LayoutPages';
                                title?: string | null;
                                description?: string | null;
                                showAllLink?: string | null;
                                pages?: Array<{
                                  __typename?: 'Page';
                                  id: string;
                                  uri?: string | null;
                                  slug?: string | null;
                                  link?: string | null;
                                  date?: string | null;
                                  title?: string | null;
                                  lead?: string | null;
                                  featuredImage?: {
                                    __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                                    node: {
                                      __typename?: 'MediaItem';
                                      altText?: string | null;
                                      mediaItemUrl?: string | null;
                                    };
                                  } | null;
                                } | null> | null;
                              }
                            | {
                                __typename: 'LayoutPagesCarousel';
                                title?: string | null;
                                description?: string | null;
                                pages?: Array<{
                                  __typename?: 'Page';
                                  id: string;
                                  uri?: string | null;
                                  slug?: string | null;
                                  link?: string | null;
                                  date?: string | null;
                                  title?: string | null;
                                  lead?: string | null;
                                  featuredImage?: {
                                    __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                                    node: {
                                      __typename?: 'MediaItem';
                                      altText?: string | null;
                                      mediaItemUrl?: string | null;
                                    };
                                  } | null;
                                } | null> | null;
                              }
                            | { __typename?: 'LayoutSocialMediaFeed' }
                            | {
                                __typename: 'LayoutSteps';
                                color?: string | null;
                                description?: string | null;
                                title?: string | null;
                                type?: string | null;
                                steps?: Array<{
                                  __typename?: 'Step';
                                  content?: string | null;
                                  title?: string | null;
                                } | null> | null;
                              }
                            | {
                                __typename: 'LocationsSelected';
                                title?: string | null;
                                locations?: Array<number | null> | null;
                                module?: string | null;
                              }
                            | {
                                __typename: 'LocationsSelectedCarousel';
                                title?: string | null;
                                locations?: Array<number | null> | null;
                                module?: string | null;
                              }
                            | null
                          > | null;
                        } | null> | null;
                        seo?: {
                          __typename?: 'SEO';
                          title?: string | null;
                          description?: string | null;
                          openGraphTitle?: string | null;
                          openGraphDescription?: string | null;
                          openGraphType?: string | null;
                          twitterTitle?: string | null;
                          twitterDescription?: string | null;
                          canonicalUrl?: string | null;
                          socialImage?: {
                            __typename?: 'MediaItem';
                            mediaItemUrl?: string | null;
                          } | null;
                        } | null;
                        hero?: {
                          __typename?: 'Hero';
                          background_color?: string | null;
                          background_image_url?: string | null;
                          description?: string | null;
                          title?: string | null;
                          wave_motif?: string | null;
                          link?: {
                            __typename?: 'Link';
                            target?: string | null;
                            title?: string | null;
                            url?: string | null;
                          } | null;
                        } | null;
                        language?: {
                          __typename?: 'Language';
                          code?: LanguageCodeEnum | null;
                          id: string;
                          locale?: string | null;
                          name?: string | null;
                          slug?: string | null;
                        } | null;
                        featuredImage?: {
                          __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                          node: {
                            __typename?: 'MediaItem';
                            mediaItemUrl?: string | null;
                            link?: string | null;
                            altText?: string | null;
                            mimeType?: string | null;
                            title?: string | null;
                            uri?: string | null;
                            photographerName?: string | null;
                          };
                        } | null;
                        sidebar?: Array<
                          | {
                              __typename: 'LayoutArticles';
                              title?: string | null;
                              showAllLink?: string | null;
                              articles?: Array<{
                                __typename?: 'Post';
                                id: string;
                                uri?: string | null;
                                slug?: string | null;
                                link?: string | null;
                                date?: string | null;
                                title?: string | null;
                                lead?: string | null;
                                featuredImage?: {
                                  __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                                  node: {
                                    __typename?: 'MediaItem';
                                    altText?: string | null;
                                    mediaItemUrl?: string | null;
                                  };
                                } | null;
                                categories?: {
                                  __typename?: 'PostToCategoryConnection';
                                  nodes: Array<{
                                    __typename?: 'Category';
                                    name?: string | null;
                                  }>;
                                } | null;
                              } | null> | null;
                            }
                          | { __typename?: 'LayoutCards' }
                          | {
                              __typename: 'LayoutLinkList';
                              anchor?: string | null;
                              title?: string | null;
                              description?: string | null;
                              links?: Array<{
                                __typename?: 'Link';
                                target?: string | null;
                                title?: string | null;
                                url?: string | null;
                              } | null> | null;
                            }
                          | {
                              __typename: 'LayoutPages';
                              title?: string | null;
                              description?: string | null;
                              showAllLink?: string | null;
                              pages?: Array<{
                                __typename?: 'Page';
                                id: string;
                                uri?: string | null;
                                slug?: string | null;
                                link?: string | null;
                                date?: string | null;
                                title?: string | null;
                                lead?: string | null;
                                featuredImage?: {
                                  __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                                  node: {
                                    __typename?: 'MediaItem';
                                    altText?: string | null;
                                    mediaItemUrl?: string | null;
                                  };
                                } | null;
                              } | null> | null;
                            }
                          | null
                        > | null;
                        modules?: Array<
                          | {
                              __typename: 'EventSearch';
                              title?: string | null;
                              url?: string | null;
                              module?: string | null;
                              showAllLink?: string | null;
                              showAllLinkCustom?: string | null;
                            }
                          | {
                              __typename: 'EventSearchCarousel';
                              title?: string | null;
                              url?: string | null;
                              orderNewestFirst?: boolean | null;
                              eventsNearby?: boolean | null;
                              amountOfCards?: number | null;
                              showAllLink?: string | null;
                              showAllLinkCustom?: string | null;
                            }
                          | {
                              __typename: 'EventSelected';
                              title?: string | null;
                              events?: Array<string | null> | null;
                              module?: string | null;
                            }
                          | {
                              __typename: 'EventSelectedCarousel';
                              title?: string | null;
                              module?: string | null;
                              eventsNearby?: boolean | null;
                              events?: Array<string | null> | null;
                              amountOfCardsPerRow?: number | null;
                              amountOfCards?: number | null;
                            }
                          | { __typename?: 'LayoutArticleHighlights' }
                          | {
                              __typename: 'LayoutArticles';
                              title?: string | null;
                              showAllLink?: string | null;
                              articles?: Array<{
                                __typename?: 'Post';
                                id: string;
                                uri?: string | null;
                                slug?: string | null;
                                link?: string | null;
                                date?: string | null;
                                title?: string | null;
                                lead?: string | null;
                                featuredImage?: {
                                  __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                                  node: {
                                    __typename?: 'MediaItem';
                                    altText?: string | null;
                                    mediaItemUrl?: string | null;
                                  };
                                } | null;
                                categories?: {
                                  __typename?: 'PostToCategoryConnection';
                                  nodes: Array<{
                                    __typename?: 'Category';
                                    name?: string | null;
                                  }>;
                                } | null;
                              } | null> | null;
                            }
                          | {
                              __typename: 'LayoutArticlesCarousel';
                              title?: string | null;
                              showMore?: Array<string | null> | null;
                              showAllLink?: string | null;
                              articles?: Array<{
                                __typename?: 'Post';
                                id: string;
                                uri?: string | null;
                                slug?: string | null;
                                link?: string | null;
                                date?: string | null;
                                title?: string | null;
                                lead?: string | null;
                                featuredImage?: {
                                  __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                                  node: {
                                    __typename?: 'MediaItem';
                                    altText?: string | null;
                                    mediaItemUrl?: string | null;
                                  };
                                } | null;
                                categories?: {
                                  __typename?: 'PostToCategoryConnection';
                                  nodes: Array<{
                                    __typename?: 'Category';
                                    name?: string | null;
                                  }>;
                                } | null;
                              } | null> | null;
                            }
                          | {
                              __typename: 'LayoutCard';
                              alignment?: string | null;
                              backgroundColor?: string | null;
                              description?: string | null;
                              title?: string | null;
                              link?: {
                                __typename?: 'Link';
                                target?: string | null;
                                title?: string | null;
                                url?: string | null;
                              } | null;
                              image?: {
                                __typename?: 'Image';
                                caption?: string | null;
                                description?: string | null;
                                large?: string | null;
                                medium?: string | null;
                                medium_large?: string | null;
                                thumbnail?: string | null;
                                title?: string | null;
                              } | null;
                            }
                          | {
                              __typename: 'LayoutCards';
                              cards?: Array<{
                                __typename?: 'Card';
                                backgroundColor?: string | null;
                                description?: string | null;
                                icon?: string | null;
                                title?: string | null;
                                link?: {
                                  __typename?: 'Link';
                                  target?: string | null;
                                  title?: string | null;
                                  url?: string | null;
                                } | null;
                              } | null> | null;
                            }
                          | {
                              __typename: 'LayoutCollection';
                              collection?: {
                                __typename?: 'Collection';
                                title?: string | null;
                              } | null;
                            }
                          | { __typename?: 'LayoutContact' }
                          | {
                              __typename: 'LayoutContent';
                              backgroundColor?: string | null;
                              content?: string | null;
                              title?: string | null;
                            }
                          | {
                              __typename: 'LayoutImage';
                              border?: boolean | null;
                              photographer_name?: string | null;
                              show_on_lightbox?: boolean | null;
                              image?: {
                                __typename?: 'Image';
                                caption?: string | null;
                                description?: string | null;
                                large?: string | null;
                                medium?: string | null;
                                thumbnail?: string | null;
                                title?: string | null;
                                medium_large?: string | null;
                              } | null;
                            }
                          | { __typename?: 'LayoutImageGallery' }
                          | {
                              __typename: 'LayoutPages';
                              title?: string | null;
                              description?: string | null;
                              showAllLink?: string | null;
                              pages?: Array<{
                                __typename?: 'Page';
                                id: string;
                                uri?: string | null;
                                slug?: string | null;
                                link?: string | null;
                                date?: string | null;
                                title?: string | null;
                                lead?: string | null;
                                featuredImage?: {
                                  __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                                  node: {
                                    __typename?: 'MediaItem';
                                    altText?: string | null;
                                    mediaItemUrl?: string | null;
                                  };
                                } | null;
                              } | null> | null;
                            }
                          | {
                              __typename: 'LayoutPagesCarousel';
                              title?: string | null;
                              description?: string | null;
                              pages?: Array<{
                                __typename?: 'Page';
                                id: string;
                                uri?: string | null;
                                slug?: string | null;
                                link?: string | null;
                                date?: string | null;
                                title?: string | null;
                                lead?: string | null;
                                featuredImage?: {
                                  __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                                  node: {
                                    __typename?: 'MediaItem';
                                    altText?: string | null;
                                    mediaItemUrl?: string | null;
                                  };
                                } | null;
                              } | null> | null;
                            }
                          | { __typename?: 'LayoutSocialMediaFeed' }
                          | {
                              __typename: 'LayoutSteps';
                              color?: string | null;
                              description?: string | null;
                              title?: string | null;
                              type?: string | null;
                              steps?: Array<{
                                __typename?: 'Step';
                                content?: string | null;
                                title?: string | null;
                              } | null> | null;
                            }
                          | {
                              __typename: 'LocationsSelected';
                              title?: string | null;
                              locations?: Array<number | null> | null;
                              module?: string | null;
                            }
                          | {
                              __typename: 'LocationsSelectedCarousel';
                              title?: string | null;
                              locations?: Array<number | null> | null;
                              module?: string | null;
                            }
                          | null
                        > | null;
                      }
                    | { __typename?: 'Post' }
                    | { __typename?: 'Release' }
                    | { __typename?: 'Translation' }
                  >;
                } | null;
                translations?: Array<{
                  __typename?: 'Page';
                  uri?: string | null;
                  slug?: string | null;
                  id: string;
                  content?: string | null;
                  title?: string | null;
                  link?: string | null;
                  lead?: string | null;
                  language?: {
                    __typename?: 'Language';
                    code?: LanguageCodeEnum | null;
                    id: string;
                    locale?: string | null;
                    name?: string | null;
                    slug?: string | null;
                  } | null;
                  seo?: {
                    __typename?: 'SEO';
                    title?: string | null;
                    description?: string | null;
                    openGraphTitle?: string | null;
                    openGraphDescription?: string | null;
                    openGraphType?: string | null;
                    twitterTitle?: string | null;
                    twitterDescription?: string | null;
                    canonicalUrl?: string | null;
                    socialImage?: {
                      __typename?: 'MediaItem';
                      mediaItemUrl?: string | null;
                    } | null;
                  } | null;
                  hero?: {
                    __typename?: 'Hero';
                    background_color?: string | null;
                    background_image_url?: string | null;
                    description?: string | null;
                    title?: string | null;
                    wave_motif?: string | null;
                    link?: {
                      __typename?: 'Link';
                      target?: string | null;
                      title?: string | null;
                      url?: string | null;
                    } | null;
                  } | null;
                  translations?: Array<{
                    __typename?: 'Page';
                    uri?: string | null;
                    slug?: string | null;
                    language?: {
                      __typename?: 'Language';
                      code?: LanguageCodeEnum | null;
                      id: string;
                      locale?: string | null;
                      name?: string | null;
                      slug?: string | null;
                    } | null;
                    seo?: {
                      __typename?: 'SEO';
                      title?: string | null;
                      description?: string | null;
                      openGraphTitle?: string | null;
                      openGraphDescription?: string | null;
                      openGraphType?: string | null;
                      twitterTitle?: string | null;
                      twitterDescription?: string | null;
                      canonicalUrl?: string | null;
                      socialImage?: {
                        __typename?: 'MediaItem';
                        mediaItemUrl?: string | null;
                      } | null;
                    } | null;
                  } | null> | null;
                  featuredImage?: {
                    __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                    node: {
                      __typename?: 'MediaItem';
                      mediaItemUrl?: string | null;
                      link?: string | null;
                      altText?: string | null;
                      mimeType?: string | null;
                      title?: string | null;
                      uri?: string | null;
                      photographerName?: string | null;
                    };
                  } | null;
                  sidebar?: Array<
                    | {
                        __typename: 'LayoutArticles';
                        title?: string | null;
                        showAllLink?: string | null;
                        articles?: Array<{
                          __typename?: 'Post';
                          id: string;
                          uri?: string | null;
                          slug?: string | null;
                          link?: string | null;
                          date?: string | null;
                          title?: string | null;
                          lead?: string | null;
                          featuredImage?: {
                            __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                            node: {
                              __typename?: 'MediaItem';
                              altText?: string | null;
                              mediaItemUrl?: string | null;
                            };
                          } | null;
                          categories?: {
                            __typename?: 'PostToCategoryConnection';
                            nodes: Array<{
                              __typename?: 'Category';
                              name?: string | null;
                            }>;
                          } | null;
                        } | null> | null;
                      }
                    | { __typename?: 'LayoutCards' }
                    | {
                        __typename: 'LayoutLinkList';
                        anchor?: string | null;
                        title?: string | null;
                        description?: string | null;
                        links?: Array<{
                          __typename?: 'Link';
                          target?: string | null;
                          title?: string | null;
                          url?: string | null;
                        } | null> | null;
                      }
                    | {
                        __typename: 'LayoutPages';
                        title?: string | null;
                        description?: string | null;
                        showAllLink?: string | null;
                        pages?: Array<{
                          __typename?: 'Page';
                          id: string;
                          uri?: string | null;
                          slug?: string | null;
                          link?: string | null;
                          date?: string | null;
                          title?: string | null;
                          lead?: string | null;
                          featuredImage?: {
                            __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                            node: {
                              __typename?: 'MediaItem';
                              altText?: string | null;
                              mediaItemUrl?: string | null;
                            };
                          } | null;
                        } | null> | null;
                      }
                    | null
                  > | null;
                  modules?: Array<
                    | {
                        __typename: 'EventSearch';
                        title?: string | null;
                        url?: string | null;
                        module?: string | null;
                        showAllLink?: string | null;
                        showAllLinkCustom?: string | null;
                      }
                    | {
                        __typename: 'EventSearchCarousel';
                        title?: string | null;
                        url?: string | null;
                        orderNewestFirst?: boolean | null;
                        eventsNearby?: boolean | null;
                        amountOfCards?: number | null;
                        showAllLink?: string | null;
                        showAllLinkCustom?: string | null;
                      }
                    | {
                        __typename: 'EventSelected';
                        title?: string | null;
                        events?: Array<string | null> | null;
                        module?: string | null;
                      }
                    | {
                        __typename: 'EventSelectedCarousel';
                        title?: string | null;
                        module?: string | null;
                        eventsNearby?: boolean | null;
                        events?: Array<string | null> | null;
                        amountOfCardsPerRow?: number | null;
                        amountOfCards?: number | null;
                      }
                    | { __typename?: 'LayoutArticleHighlights' }
                    | {
                        __typename: 'LayoutArticles';
                        title?: string | null;
                        showAllLink?: string | null;
                        articles?: Array<{
                          __typename?: 'Post';
                          id: string;
                          uri?: string | null;
                          slug?: string | null;
                          link?: string | null;
                          date?: string | null;
                          title?: string | null;
                          lead?: string | null;
                          featuredImage?: {
                            __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                            node: {
                              __typename?: 'MediaItem';
                              altText?: string | null;
                              mediaItemUrl?: string | null;
                            };
                          } | null;
                          categories?: {
                            __typename?: 'PostToCategoryConnection';
                            nodes: Array<{
                              __typename?: 'Category';
                              name?: string | null;
                            }>;
                          } | null;
                        } | null> | null;
                      }
                    | {
                        __typename: 'LayoutArticlesCarousel';
                        title?: string | null;
                        showMore?: Array<string | null> | null;
                        showAllLink?: string | null;
                        articles?: Array<{
                          __typename?: 'Post';
                          id: string;
                          uri?: string | null;
                          slug?: string | null;
                          link?: string | null;
                          date?: string | null;
                          title?: string | null;
                          lead?: string | null;
                          featuredImage?: {
                            __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                            node: {
                              __typename?: 'MediaItem';
                              altText?: string | null;
                              mediaItemUrl?: string | null;
                            };
                          } | null;
                          categories?: {
                            __typename?: 'PostToCategoryConnection';
                            nodes: Array<{
                              __typename?: 'Category';
                              name?: string | null;
                            }>;
                          } | null;
                        } | null> | null;
                      }
                    | {
                        __typename: 'LayoutCard';
                        alignment?: string | null;
                        backgroundColor?: string | null;
                        description?: string | null;
                        title?: string | null;
                        link?: {
                          __typename?: 'Link';
                          target?: string | null;
                          title?: string | null;
                          url?: string | null;
                        } | null;
                        image?: {
                          __typename?: 'Image';
                          caption?: string | null;
                          description?: string | null;
                          large?: string | null;
                          medium?: string | null;
                          medium_large?: string | null;
                          thumbnail?: string | null;
                          title?: string | null;
                        } | null;
                      }
                    | {
                        __typename: 'LayoutCards';
                        cards?: Array<{
                          __typename?: 'Card';
                          backgroundColor?: string | null;
                          description?: string | null;
                          icon?: string | null;
                          title?: string | null;
                          link?: {
                            __typename?: 'Link';
                            target?: string | null;
                            title?: string | null;
                            url?: string | null;
                          } | null;
                        } | null> | null;
                      }
                    | {
                        __typename: 'LayoutCollection';
                        collection?: {
                          __typename?: 'Collection';
                          title?: string | null;
                        } | null;
                      }
                    | { __typename?: 'LayoutContact' }
                    | {
                        __typename: 'LayoutContent';
                        backgroundColor?: string | null;
                        content?: string | null;
                        title?: string | null;
                      }
                    | {
                        __typename: 'LayoutImage';
                        border?: boolean | null;
                        photographer_name?: string | null;
                        show_on_lightbox?: boolean | null;
                        image?: {
                          __typename?: 'Image';
                          caption?: string | null;
                          description?: string | null;
                          large?: string | null;
                          medium?: string | null;
                          thumbnail?: string | null;
                          title?: string | null;
                          medium_large?: string | null;
                        } | null;
                      }
                    | { __typename?: 'LayoutImageGallery' }
                    | {
                        __typename: 'LayoutPages';
                        title?: string | null;
                        description?: string | null;
                        showAllLink?: string | null;
                        pages?: Array<{
                          __typename?: 'Page';
                          id: string;
                          uri?: string | null;
                          slug?: string | null;
                          link?: string | null;
                          date?: string | null;
                          title?: string | null;
                          lead?: string | null;
                          featuredImage?: {
                            __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                            node: {
                              __typename?: 'MediaItem';
                              altText?: string | null;
                              mediaItemUrl?: string | null;
                            };
                          } | null;
                        } | null> | null;
                      }
                    | {
                        __typename: 'LayoutPagesCarousel';
                        title?: string | null;
                        description?: string | null;
                        pages?: Array<{
                          __typename?: 'Page';
                          id: string;
                          uri?: string | null;
                          slug?: string | null;
                          link?: string | null;
                          date?: string | null;
                          title?: string | null;
                          lead?: string | null;
                          featuredImage?: {
                            __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                            node: {
                              __typename?: 'MediaItem';
                              altText?: string | null;
                              mediaItemUrl?: string | null;
                            };
                          } | null;
                        } | null> | null;
                      }
                    | { __typename?: 'LayoutSocialMediaFeed' }
                    | {
                        __typename: 'LayoutSteps';
                        color?: string | null;
                        description?: string | null;
                        title?: string | null;
                        type?: string | null;
                        steps?: Array<{
                          __typename?: 'Step';
                          content?: string | null;
                          title?: string | null;
                        } | null> | null;
                      }
                    | {
                        __typename: 'LocationsSelected';
                        title?: string | null;
                        locations?: Array<number | null> | null;
                        module?: string | null;
                      }
                    | {
                        __typename: 'LocationsSelectedCarousel';
                        title?: string | null;
                        locations?: Array<number | null> | null;
                        module?: string | null;
                      }
                    | null
                  > | null;
                } | null> | null;
                seo?: {
                  __typename?: 'SEO';
                  title?: string | null;
                  description?: string | null;
                  openGraphTitle?: string | null;
                  openGraphDescription?: string | null;
                  openGraphType?: string | null;
                  twitterTitle?: string | null;
                  twitterDescription?: string | null;
                  canonicalUrl?: string | null;
                  socialImage?: {
                    __typename?: 'MediaItem';
                    mediaItemUrl?: string | null;
                  } | null;
                } | null;
                hero?: {
                  __typename?: 'Hero';
                  background_color?: string | null;
                  background_image_url?: string | null;
                  description?: string | null;
                  title?: string | null;
                  wave_motif?: string | null;
                  link?: {
                    __typename?: 'Link';
                    target?: string | null;
                    title?: string | null;
                    url?: string | null;
                  } | null;
                } | null;
                language?: {
                  __typename?: 'Language';
                  code?: LanguageCodeEnum | null;
                  id: string;
                  locale?: string | null;
                  name?: string | null;
                  slug?: string | null;
                } | null;
                featuredImage?: {
                  __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                  node: {
                    __typename?: 'MediaItem';
                    mediaItemUrl?: string | null;
                    link?: string | null;
                    altText?: string | null;
                    mimeType?: string | null;
                    title?: string | null;
                    uri?: string | null;
                    photographerName?: string | null;
                  };
                } | null;
                sidebar?: Array<
                  | {
                      __typename: 'LayoutArticles';
                      title?: string | null;
                      showAllLink?: string | null;
                      articles?: Array<{
                        __typename?: 'Post';
                        id: string;
                        uri?: string | null;
                        slug?: string | null;
                        link?: string | null;
                        date?: string | null;
                        title?: string | null;
                        lead?: string | null;
                        featuredImage?: {
                          __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                          node: {
                            __typename?: 'MediaItem';
                            altText?: string | null;
                            mediaItemUrl?: string | null;
                          };
                        } | null;
                        categories?: {
                          __typename?: 'PostToCategoryConnection';
                          nodes: Array<{
                            __typename?: 'Category';
                            name?: string | null;
                          }>;
                        } | null;
                      } | null> | null;
                    }
                  | { __typename?: 'LayoutCards' }
                  | {
                      __typename: 'LayoutLinkList';
                      anchor?: string | null;
                      title?: string | null;
                      description?: string | null;
                      links?: Array<{
                        __typename?: 'Link';
                        target?: string | null;
                        title?: string | null;
                        url?: string | null;
                      } | null> | null;
                    }
                  | {
                      __typename: 'LayoutPages';
                      title?: string | null;
                      description?: string | null;
                      showAllLink?: string | null;
                      pages?: Array<{
                        __typename?: 'Page';
                        id: string;
                        uri?: string | null;
                        slug?: string | null;
                        link?: string | null;
                        date?: string | null;
                        title?: string | null;
                        lead?: string | null;
                        featuredImage?: {
                          __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                          node: {
                            __typename?: 'MediaItem';
                            altText?: string | null;
                            mediaItemUrl?: string | null;
                          };
                        } | null;
                      } | null> | null;
                    }
                  | null
                > | null;
                modules?: Array<
                  | {
                      __typename: 'EventSearch';
                      title?: string | null;
                      url?: string | null;
                      module?: string | null;
                      showAllLink?: string | null;
                      showAllLinkCustom?: string | null;
                    }
                  | {
                      __typename: 'EventSearchCarousel';
                      title?: string | null;
                      url?: string | null;
                      orderNewestFirst?: boolean | null;
                      eventsNearby?: boolean | null;
                      amountOfCards?: number | null;
                      showAllLink?: string | null;
                      showAllLinkCustom?: string | null;
                    }
                  | {
                      __typename: 'EventSelected';
                      title?: string | null;
                      events?: Array<string | null> | null;
                      module?: string | null;
                    }
                  | {
                      __typename: 'EventSelectedCarousel';
                      title?: string | null;
                      module?: string | null;
                      eventsNearby?: boolean | null;
                      events?: Array<string | null> | null;
                      amountOfCardsPerRow?: number | null;
                      amountOfCards?: number | null;
                    }
                  | { __typename?: 'LayoutArticleHighlights' }
                  | {
                      __typename: 'LayoutArticles';
                      title?: string | null;
                      showAllLink?: string | null;
                      articles?: Array<{
                        __typename?: 'Post';
                        id: string;
                        uri?: string | null;
                        slug?: string | null;
                        link?: string | null;
                        date?: string | null;
                        title?: string | null;
                        lead?: string | null;
                        featuredImage?: {
                          __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                          node: {
                            __typename?: 'MediaItem';
                            altText?: string | null;
                            mediaItemUrl?: string | null;
                          };
                        } | null;
                        categories?: {
                          __typename?: 'PostToCategoryConnection';
                          nodes: Array<{
                            __typename?: 'Category';
                            name?: string | null;
                          }>;
                        } | null;
                      } | null> | null;
                    }
                  | {
                      __typename: 'LayoutArticlesCarousel';
                      title?: string | null;
                      showMore?: Array<string | null> | null;
                      showAllLink?: string | null;
                      articles?: Array<{
                        __typename?: 'Post';
                        id: string;
                        uri?: string | null;
                        slug?: string | null;
                        link?: string | null;
                        date?: string | null;
                        title?: string | null;
                        lead?: string | null;
                        featuredImage?: {
                          __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                          node: {
                            __typename?: 'MediaItem';
                            altText?: string | null;
                            mediaItemUrl?: string | null;
                          };
                        } | null;
                        categories?: {
                          __typename?: 'PostToCategoryConnection';
                          nodes: Array<{
                            __typename?: 'Category';
                            name?: string | null;
                          }>;
                        } | null;
                      } | null> | null;
                    }
                  | {
                      __typename: 'LayoutCard';
                      alignment?: string | null;
                      backgroundColor?: string | null;
                      description?: string | null;
                      title?: string | null;
                      link?: {
                        __typename?: 'Link';
                        target?: string | null;
                        title?: string | null;
                        url?: string | null;
                      } | null;
                      image?: {
                        __typename?: 'Image';
                        caption?: string | null;
                        description?: string | null;
                        large?: string | null;
                        medium?: string | null;
                        medium_large?: string | null;
                        thumbnail?: string | null;
                        title?: string | null;
                      } | null;
                    }
                  | {
                      __typename: 'LayoutCards';
                      cards?: Array<{
                        __typename?: 'Card';
                        backgroundColor?: string | null;
                        description?: string | null;
                        icon?: string | null;
                        title?: string | null;
                        link?: {
                          __typename?: 'Link';
                          target?: string | null;
                          title?: string | null;
                          url?: string | null;
                        } | null;
                      } | null> | null;
                    }
                  | {
                      __typename: 'LayoutCollection';
                      collection?: {
                        __typename?: 'Collection';
                        title?: string | null;
                      } | null;
                    }
                  | { __typename?: 'LayoutContact' }
                  | {
                      __typename: 'LayoutContent';
                      backgroundColor?: string | null;
                      content?: string | null;
                      title?: string | null;
                    }
                  | {
                      __typename: 'LayoutImage';
                      border?: boolean | null;
                      photographer_name?: string | null;
                      show_on_lightbox?: boolean | null;
                      image?: {
                        __typename?: 'Image';
                        caption?: string | null;
                        description?: string | null;
                        large?: string | null;
                        medium?: string | null;
                        thumbnail?: string | null;
                        title?: string | null;
                        medium_large?: string | null;
                      } | null;
                    }
                  | { __typename?: 'LayoutImageGallery' }
                  | {
                      __typename: 'LayoutPages';
                      title?: string | null;
                      description?: string | null;
                      showAllLink?: string | null;
                      pages?: Array<{
                        __typename?: 'Page';
                        id: string;
                        uri?: string | null;
                        slug?: string | null;
                        link?: string | null;
                        date?: string | null;
                        title?: string | null;
                        lead?: string | null;
                        featuredImage?: {
                          __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                          node: {
                            __typename?: 'MediaItem';
                            altText?: string | null;
                            mediaItemUrl?: string | null;
                          };
                        } | null;
                      } | null> | null;
                    }
                  | {
                      __typename: 'LayoutPagesCarousel';
                      title?: string | null;
                      description?: string | null;
                      pages?: Array<{
                        __typename?: 'Page';
                        id: string;
                        uri?: string | null;
                        slug?: string | null;
                        link?: string | null;
                        date?: string | null;
                        title?: string | null;
                        lead?: string | null;
                        featuredImage?: {
                          __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                          node: {
                            __typename?: 'MediaItem';
                            altText?: string | null;
                            mediaItemUrl?: string | null;
                          };
                        } | null;
                      } | null> | null;
                    }
                  | { __typename?: 'LayoutSocialMediaFeed' }
                  | {
                      __typename: 'LayoutSteps';
                      color?: string | null;
                      description?: string | null;
                      title?: string | null;
                      type?: string | null;
                      steps?: Array<{
                        __typename?: 'Step';
                        content?: string | null;
                        title?: string | null;
                      } | null> | null;
                    }
                  | {
                      __typename: 'LocationsSelected';
                      title?: string | null;
                      locations?: Array<number | null> | null;
                      module?: string | null;
                    }
                  | {
                      __typename: 'LocationsSelectedCarousel';
                      title?: string | null;
                      locations?: Array<number | null> | null;
                      module?: string | null;
                    }
                  | null
                > | null;
              }
            | { __typename?: 'Post' }
            | { __typename?: 'Tag' };
        } | null;
      }>;
    } | null;
  } | null;
};

export type MenuItemFragment = {
  __typename?: 'MenuItem';
  id: string;
  order?: number | null;
  target?: string | null;
  title?: string | null;
  path?: string | null;
  label?: string | null;
  connectedNode?: {
    __typename?: 'MenuItemToMenuItemLinkableConnectionEdge';
    node:
      | { __typename?: 'Category' }
      | {
          __typename?: 'Page';
          id: string;
          content?: string | null;
          slug?: string | null;
          title?: string | null;
          uri?: string | null;
          link?: string | null;
          lead?: string | null;
          children?: {
            __typename?: 'HierarchicalContentNodeToContentNodeChildrenConnection';
            nodes: Array<
              | { __typename?: 'Collection' }
              | { __typename?: 'Contact' }
              | { __typename?: 'LandingPage' }
              | { __typename?: 'MediaItem' }
              | {
                  __typename?: 'Page';
                  id: string;
                  content?: string | null;
                  slug?: string | null;
                  title?: string | null;
                  uri?: string | null;
                  link?: string | null;
                  lead?: string | null;
                  translations?: Array<{
                    __typename?: 'Page';
                    uri?: string | null;
                    slug?: string | null;
                    id: string;
                    content?: string | null;
                    title?: string | null;
                    link?: string | null;
                    lead?: string | null;
                    language?: {
                      __typename?: 'Language';
                      code?: LanguageCodeEnum | null;
                      id: string;
                      locale?: string | null;
                      name?: string | null;
                      slug?: string | null;
                    } | null;
                    seo?: {
                      __typename?: 'SEO';
                      title?: string | null;
                      description?: string | null;
                      openGraphTitle?: string | null;
                      openGraphDescription?: string | null;
                      openGraphType?: string | null;
                      twitterTitle?: string | null;
                      twitterDescription?: string | null;
                      canonicalUrl?: string | null;
                      socialImage?: {
                        __typename?: 'MediaItem';
                        mediaItemUrl?: string | null;
                      } | null;
                    } | null;
                    hero?: {
                      __typename?: 'Hero';
                      background_color?: string | null;
                      background_image_url?: string | null;
                      description?: string | null;
                      title?: string | null;
                      wave_motif?: string | null;
                      link?: {
                        __typename?: 'Link';
                        target?: string | null;
                        title?: string | null;
                        url?: string | null;
                      } | null;
                    } | null;
                    translations?: Array<{
                      __typename?: 'Page';
                      uri?: string | null;
                      slug?: string | null;
                      language?: {
                        __typename?: 'Language';
                        code?: LanguageCodeEnum | null;
                        id: string;
                        locale?: string | null;
                        name?: string | null;
                        slug?: string | null;
                      } | null;
                      seo?: {
                        __typename?: 'SEO';
                        title?: string | null;
                        description?: string | null;
                        openGraphTitle?: string | null;
                        openGraphDescription?: string | null;
                        openGraphType?: string | null;
                        twitterTitle?: string | null;
                        twitterDescription?: string | null;
                        canonicalUrl?: string | null;
                        socialImage?: {
                          __typename?: 'MediaItem';
                          mediaItemUrl?: string | null;
                        } | null;
                      } | null;
                    } | null> | null;
                    featuredImage?: {
                      __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                      node: {
                        __typename?: 'MediaItem';
                        mediaItemUrl?: string | null;
                        link?: string | null;
                        altText?: string | null;
                        mimeType?: string | null;
                        title?: string | null;
                        uri?: string | null;
                        photographerName?: string | null;
                      };
                    } | null;
                    sidebar?: Array<
                      | {
                          __typename: 'LayoutArticles';
                          title?: string | null;
                          showAllLink?: string | null;
                          articles?: Array<{
                            __typename?: 'Post';
                            id: string;
                            uri?: string | null;
                            slug?: string | null;
                            link?: string | null;
                            date?: string | null;
                            title?: string | null;
                            lead?: string | null;
                            featuredImage?: {
                              __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                              node: {
                                __typename?: 'MediaItem';
                                altText?: string | null;
                                mediaItemUrl?: string | null;
                              };
                            } | null;
                            categories?: {
                              __typename?: 'PostToCategoryConnection';
                              nodes: Array<{
                                __typename?: 'Category';
                                name?: string | null;
                              }>;
                            } | null;
                          } | null> | null;
                        }
                      | { __typename?: 'LayoutCards' }
                      | {
                          __typename: 'LayoutLinkList';
                          anchor?: string | null;
                          title?: string | null;
                          description?: string | null;
                          links?: Array<{
                            __typename?: 'Link';
                            target?: string | null;
                            title?: string | null;
                            url?: string | null;
                          } | null> | null;
                        }
                      | {
                          __typename: 'LayoutPages';
                          title?: string | null;
                          description?: string | null;
                          showAllLink?: string | null;
                          pages?: Array<{
                            __typename?: 'Page';
                            id: string;
                            uri?: string | null;
                            slug?: string | null;
                            link?: string | null;
                            date?: string | null;
                            title?: string | null;
                            lead?: string | null;
                            featuredImage?: {
                              __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                              node: {
                                __typename?: 'MediaItem';
                                altText?: string | null;
                                mediaItemUrl?: string | null;
                              };
                            } | null;
                          } | null> | null;
                        }
                      | null
                    > | null;
                    modules?: Array<
                      | {
                          __typename: 'EventSearch';
                          title?: string | null;
                          url?: string | null;
                          module?: string | null;
                          showAllLink?: string | null;
                          showAllLinkCustom?: string | null;
                        }
                      | {
                          __typename: 'EventSearchCarousel';
                          title?: string | null;
                          url?: string | null;
                          orderNewestFirst?: boolean | null;
                          eventsNearby?: boolean | null;
                          amountOfCards?: number | null;
                          showAllLink?: string | null;
                          showAllLinkCustom?: string | null;
                        }
                      | {
                          __typename: 'EventSelected';
                          title?: string | null;
                          events?: Array<string | null> | null;
                          module?: string | null;
                        }
                      | {
                          __typename: 'EventSelectedCarousel';
                          title?: string | null;
                          module?: string | null;
                          eventsNearby?: boolean | null;
                          events?: Array<string | null> | null;
                          amountOfCardsPerRow?: number | null;
                          amountOfCards?: number | null;
                        }
                      | { __typename?: 'LayoutArticleHighlights' }
                      | {
                          __typename: 'LayoutArticles';
                          title?: string | null;
                          showAllLink?: string | null;
                          articles?: Array<{
                            __typename?: 'Post';
                            id: string;
                            uri?: string | null;
                            slug?: string | null;
                            link?: string | null;
                            date?: string | null;
                            title?: string | null;
                            lead?: string | null;
                            featuredImage?: {
                              __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                              node: {
                                __typename?: 'MediaItem';
                                altText?: string | null;
                                mediaItemUrl?: string | null;
                              };
                            } | null;
                            categories?: {
                              __typename?: 'PostToCategoryConnection';
                              nodes: Array<{
                                __typename?: 'Category';
                                name?: string | null;
                              }>;
                            } | null;
                          } | null> | null;
                        }
                      | {
                          __typename: 'LayoutArticlesCarousel';
                          title?: string | null;
                          showMore?: Array<string | null> | null;
                          showAllLink?: string | null;
                          articles?: Array<{
                            __typename?: 'Post';
                            id: string;
                            uri?: string | null;
                            slug?: string | null;
                            link?: string | null;
                            date?: string | null;
                            title?: string | null;
                            lead?: string | null;
                            featuredImage?: {
                              __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                              node: {
                                __typename?: 'MediaItem';
                                altText?: string | null;
                                mediaItemUrl?: string | null;
                              };
                            } | null;
                            categories?: {
                              __typename?: 'PostToCategoryConnection';
                              nodes: Array<{
                                __typename?: 'Category';
                                name?: string | null;
                              }>;
                            } | null;
                          } | null> | null;
                        }
                      | {
                          __typename: 'LayoutCard';
                          alignment?: string | null;
                          backgroundColor?: string | null;
                          description?: string | null;
                          title?: string | null;
                          link?: {
                            __typename?: 'Link';
                            target?: string | null;
                            title?: string | null;
                            url?: string | null;
                          } | null;
                          image?: {
                            __typename?: 'Image';
                            caption?: string | null;
                            description?: string | null;
                            large?: string | null;
                            medium?: string | null;
                            medium_large?: string | null;
                            thumbnail?: string | null;
                            title?: string | null;
                          } | null;
                        }
                      | {
                          __typename: 'LayoutCards';
                          cards?: Array<{
                            __typename?: 'Card';
                            backgroundColor?: string | null;
                            description?: string | null;
                            icon?: string | null;
                            title?: string | null;
                            link?: {
                              __typename?: 'Link';
                              target?: string | null;
                              title?: string | null;
                              url?: string | null;
                            } | null;
                          } | null> | null;
                        }
                      | {
                          __typename: 'LayoutCollection';
                          collection?: {
                            __typename?: 'Collection';
                            title?: string | null;
                          } | null;
                        }
                      | { __typename?: 'LayoutContact' }
                      | {
                          __typename: 'LayoutContent';
                          backgroundColor?: string | null;
                          content?: string | null;
                          title?: string | null;
                        }
                      | {
                          __typename: 'LayoutImage';
                          border?: boolean | null;
                          photographer_name?: string | null;
                          show_on_lightbox?: boolean | null;
                          image?: {
                            __typename?: 'Image';
                            caption?: string | null;
                            description?: string | null;
                            large?: string | null;
                            medium?: string | null;
                            thumbnail?: string | null;
                            title?: string | null;
                            medium_large?: string | null;
                          } | null;
                        }
                      | { __typename?: 'LayoutImageGallery' }
                      | {
                          __typename: 'LayoutPages';
                          title?: string | null;
                          description?: string | null;
                          showAllLink?: string | null;
                          pages?: Array<{
                            __typename?: 'Page';
                            id: string;
                            uri?: string | null;
                            slug?: string | null;
                            link?: string | null;
                            date?: string | null;
                            title?: string | null;
                            lead?: string | null;
                            featuredImage?: {
                              __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                              node: {
                                __typename?: 'MediaItem';
                                altText?: string | null;
                                mediaItemUrl?: string | null;
                              };
                            } | null;
                          } | null> | null;
                        }
                      | {
                          __typename: 'LayoutPagesCarousel';
                          title?: string | null;
                          description?: string | null;
                          pages?: Array<{
                            __typename?: 'Page';
                            id: string;
                            uri?: string | null;
                            slug?: string | null;
                            link?: string | null;
                            date?: string | null;
                            title?: string | null;
                            lead?: string | null;
                            featuredImage?: {
                              __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                              node: {
                                __typename?: 'MediaItem';
                                altText?: string | null;
                                mediaItemUrl?: string | null;
                              };
                            } | null;
                          } | null> | null;
                        }
                      | { __typename?: 'LayoutSocialMediaFeed' }
                      | {
                          __typename: 'LayoutSteps';
                          color?: string | null;
                          description?: string | null;
                          title?: string | null;
                          type?: string | null;
                          steps?: Array<{
                            __typename?: 'Step';
                            content?: string | null;
                            title?: string | null;
                          } | null> | null;
                        }
                      | {
                          __typename: 'LocationsSelected';
                          title?: string | null;
                          locations?: Array<number | null> | null;
                          module?: string | null;
                        }
                      | {
                          __typename: 'LocationsSelectedCarousel';
                          title?: string | null;
                          locations?: Array<number | null> | null;
                          module?: string | null;
                        }
                      | null
                    > | null;
                  } | null> | null;
                  seo?: {
                    __typename?: 'SEO';
                    title?: string | null;
                    description?: string | null;
                    openGraphTitle?: string | null;
                    openGraphDescription?: string | null;
                    openGraphType?: string | null;
                    twitterTitle?: string | null;
                    twitterDescription?: string | null;
                    canonicalUrl?: string | null;
                    socialImage?: {
                      __typename?: 'MediaItem';
                      mediaItemUrl?: string | null;
                    } | null;
                  } | null;
                  hero?: {
                    __typename?: 'Hero';
                    background_color?: string | null;
                    background_image_url?: string | null;
                    description?: string | null;
                    title?: string | null;
                    wave_motif?: string | null;
                    link?: {
                      __typename?: 'Link';
                      target?: string | null;
                      title?: string | null;
                      url?: string | null;
                    } | null;
                  } | null;
                  language?: {
                    __typename?: 'Language';
                    code?: LanguageCodeEnum | null;
                    id: string;
                    locale?: string | null;
                    name?: string | null;
                    slug?: string | null;
                  } | null;
                  featuredImage?: {
                    __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                    node: {
                      __typename?: 'MediaItem';
                      mediaItemUrl?: string | null;
                      link?: string | null;
                      altText?: string | null;
                      mimeType?: string | null;
                      title?: string | null;
                      uri?: string | null;
                      photographerName?: string | null;
                    };
                  } | null;
                  sidebar?: Array<
                    | {
                        __typename: 'LayoutArticles';
                        title?: string | null;
                        showAllLink?: string | null;
                        articles?: Array<{
                          __typename?: 'Post';
                          id: string;
                          uri?: string | null;
                          slug?: string | null;
                          link?: string | null;
                          date?: string | null;
                          title?: string | null;
                          lead?: string | null;
                          featuredImage?: {
                            __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                            node: {
                              __typename?: 'MediaItem';
                              altText?: string | null;
                              mediaItemUrl?: string | null;
                            };
                          } | null;
                          categories?: {
                            __typename?: 'PostToCategoryConnection';
                            nodes: Array<{
                              __typename?: 'Category';
                              name?: string | null;
                            }>;
                          } | null;
                        } | null> | null;
                      }
                    | { __typename?: 'LayoutCards' }
                    | {
                        __typename: 'LayoutLinkList';
                        anchor?: string | null;
                        title?: string | null;
                        description?: string | null;
                        links?: Array<{
                          __typename?: 'Link';
                          target?: string | null;
                          title?: string | null;
                          url?: string | null;
                        } | null> | null;
                      }
                    | {
                        __typename: 'LayoutPages';
                        title?: string | null;
                        description?: string | null;
                        showAllLink?: string | null;
                        pages?: Array<{
                          __typename?: 'Page';
                          id: string;
                          uri?: string | null;
                          slug?: string | null;
                          link?: string | null;
                          date?: string | null;
                          title?: string | null;
                          lead?: string | null;
                          featuredImage?: {
                            __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                            node: {
                              __typename?: 'MediaItem';
                              altText?: string | null;
                              mediaItemUrl?: string | null;
                            };
                          } | null;
                        } | null> | null;
                      }
                    | null
                  > | null;
                  modules?: Array<
                    | {
                        __typename: 'EventSearch';
                        title?: string | null;
                        url?: string | null;
                        module?: string | null;
                        showAllLink?: string | null;
                        showAllLinkCustom?: string | null;
                      }
                    | {
                        __typename: 'EventSearchCarousel';
                        title?: string | null;
                        url?: string | null;
                        orderNewestFirst?: boolean | null;
                        eventsNearby?: boolean | null;
                        amountOfCards?: number | null;
                        showAllLink?: string | null;
                        showAllLinkCustom?: string | null;
                      }
                    | {
                        __typename: 'EventSelected';
                        title?: string | null;
                        events?: Array<string | null> | null;
                        module?: string | null;
                      }
                    | {
                        __typename: 'EventSelectedCarousel';
                        title?: string | null;
                        module?: string | null;
                        eventsNearby?: boolean | null;
                        events?: Array<string | null> | null;
                        amountOfCardsPerRow?: number | null;
                        amountOfCards?: number | null;
                      }
                    | { __typename?: 'LayoutArticleHighlights' }
                    | {
                        __typename: 'LayoutArticles';
                        title?: string | null;
                        showAllLink?: string | null;
                        articles?: Array<{
                          __typename?: 'Post';
                          id: string;
                          uri?: string | null;
                          slug?: string | null;
                          link?: string | null;
                          date?: string | null;
                          title?: string | null;
                          lead?: string | null;
                          featuredImage?: {
                            __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                            node: {
                              __typename?: 'MediaItem';
                              altText?: string | null;
                              mediaItemUrl?: string | null;
                            };
                          } | null;
                          categories?: {
                            __typename?: 'PostToCategoryConnection';
                            nodes: Array<{
                              __typename?: 'Category';
                              name?: string | null;
                            }>;
                          } | null;
                        } | null> | null;
                      }
                    | {
                        __typename: 'LayoutArticlesCarousel';
                        title?: string | null;
                        showMore?: Array<string | null> | null;
                        showAllLink?: string | null;
                        articles?: Array<{
                          __typename?: 'Post';
                          id: string;
                          uri?: string | null;
                          slug?: string | null;
                          link?: string | null;
                          date?: string | null;
                          title?: string | null;
                          lead?: string | null;
                          featuredImage?: {
                            __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                            node: {
                              __typename?: 'MediaItem';
                              altText?: string | null;
                              mediaItemUrl?: string | null;
                            };
                          } | null;
                          categories?: {
                            __typename?: 'PostToCategoryConnection';
                            nodes: Array<{
                              __typename?: 'Category';
                              name?: string | null;
                            }>;
                          } | null;
                        } | null> | null;
                      }
                    | {
                        __typename: 'LayoutCard';
                        alignment?: string | null;
                        backgroundColor?: string | null;
                        description?: string | null;
                        title?: string | null;
                        link?: {
                          __typename?: 'Link';
                          target?: string | null;
                          title?: string | null;
                          url?: string | null;
                        } | null;
                        image?: {
                          __typename?: 'Image';
                          caption?: string | null;
                          description?: string | null;
                          large?: string | null;
                          medium?: string | null;
                          medium_large?: string | null;
                          thumbnail?: string | null;
                          title?: string | null;
                        } | null;
                      }
                    | {
                        __typename: 'LayoutCards';
                        cards?: Array<{
                          __typename?: 'Card';
                          backgroundColor?: string | null;
                          description?: string | null;
                          icon?: string | null;
                          title?: string | null;
                          link?: {
                            __typename?: 'Link';
                            target?: string | null;
                            title?: string | null;
                            url?: string | null;
                          } | null;
                        } | null> | null;
                      }
                    | {
                        __typename: 'LayoutCollection';
                        collection?: {
                          __typename?: 'Collection';
                          title?: string | null;
                        } | null;
                      }
                    | { __typename?: 'LayoutContact' }
                    | {
                        __typename: 'LayoutContent';
                        backgroundColor?: string | null;
                        content?: string | null;
                        title?: string | null;
                      }
                    | {
                        __typename: 'LayoutImage';
                        border?: boolean | null;
                        photographer_name?: string | null;
                        show_on_lightbox?: boolean | null;
                        image?: {
                          __typename?: 'Image';
                          caption?: string | null;
                          description?: string | null;
                          large?: string | null;
                          medium?: string | null;
                          thumbnail?: string | null;
                          title?: string | null;
                          medium_large?: string | null;
                        } | null;
                      }
                    | { __typename?: 'LayoutImageGallery' }
                    | {
                        __typename: 'LayoutPages';
                        title?: string | null;
                        description?: string | null;
                        showAllLink?: string | null;
                        pages?: Array<{
                          __typename?: 'Page';
                          id: string;
                          uri?: string | null;
                          slug?: string | null;
                          link?: string | null;
                          date?: string | null;
                          title?: string | null;
                          lead?: string | null;
                          featuredImage?: {
                            __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                            node: {
                              __typename?: 'MediaItem';
                              altText?: string | null;
                              mediaItemUrl?: string | null;
                            };
                          } | null;
                        } | null> | null;
                      }
                    | {
                        __typename: 'LayoutPagesCarousel';
                        title?: string | null;
                        description?: string | null;
                        pages?: Array<{
                          __typename?: 'Page';
                          id: string;
                          uri?: string | null;
                          slug?: string | null;
                          link?: string | null;
                          date?: string | null;
                          title?: string | null;
                          lead?: string | null;
                          featuredImage?: {
                            __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                            node: {
                              __typename?: 'MediaItem';
                              altText?: string | null;
                              mediaItemUrl?: string | null;
                            };
                          } | null;
                        } | null> | null;
                      }
                    | { __typename?: 'LayoutSocialMediaFeed' }
                    | {
                        __typename: 'LayoutSteps';
                        color?: string | null;
                        description?: string | null;
                        title?: string | null;
                        type?: string | null;
                        steps?: Array<{
                          __typename?: 'Step';
                          content?: string | null;
                          title?: string | null;
                        } | null> | null;
                      }
                    | {
                        __typename: 'LocationsSelected';
                        title?: string | null;
                        locations?: Array<number | null> | null;
                        module?: string | null;
                      }
                    | {
                        __typename: 'LocationsSelectedCarousel';
                        title?: string | null;
                        locations?: Array<number | null> | null;
                        module?: string | null;
                      }
                    | null
                  > | null;
                }
              | { __typename?: 'Post' }
              | { __typename?: 'Release' }
              | { __typename?: 'Translation' }
            >;
          } | null;
          translations?: Array<{
            __typename?: 'Page';
            uri?: string | null;
            slug?: string | null;
            id: string;
            content?: string | null;
            title?: string | null;
            link?: string | null;
            lead?: string | null;
            language?: {
              __typename?: 'Language';
              code?: LanguageCodeEnum | null;
              id: string;
              locale?: string | null;
              name?: string | null;
              slug?: string | null;
            } | null;
            seo?: {
              __typename?: 'SEO';
              title?: string | null;
              description?: string | null;
              openGraphTitle?: string | null;
              openGraphDescription?: string | null;
              openGraphType?: string | null;
              twitterTitle?: string | null;
              twitterDescription?: string | null;
              canonicalUrl?: string | null;
              socialImage?: {
                __typename?: 'MediaItem';
                mediaItemUrl?: string | null;
              } | null;
            } | null;
            hero?: {
              __typename?: 'Hero';
              background_color?: string | null;
              background_image_url?: string | null;
              description?: string | null;
              title?: string | null;
              wave_motif?: string | null;
              link?: {
                __typename?: 'Link';
                target?: string | null;
                title?: string | null;
                url?: string | null;
              } | null;
            } | null;
            translations?: Array<{
              __typename?: 'Page';
              uri?: string | null;
              slug?: string | null;
              language?: {
                __typename?: 'Language';
                code?: LanguageCodeEnum | null;
                id: string;
                locale?: string | null;
                name?: string | null;
                slug?: string | null;
              } | null;
              seo?: {
                __typename?: 'SEO';
                title?: string | null;
                description?: string | null;
                openGraphTitle?: string | null;
                openGraphDescription?: string | null;
                openGraphType?: string | null;
                twitterTitle?: string | null;
                twitterDescription?: string | null;
                canonicalUrl?: string | null;
                socialImage?: {
                  __typename?: 'MediaItem';
                  mediaItemUrl?: string | null;
                } | null;
              } | null;
            } | null> | null;
            featuredImage?: {
              __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
              node: {
                __typename?: 'MediaItem';
                mediaItemUrl?: string | null;
                link?: string | null;
                altText?: string | null;
                mimeType?: string | null;
                title?: string | null;
                uri?: string | null;
                photographerName?: string | null;
              };
            } | null;
            sidebar?: Array<
              | {
                  __typename: 'LayoutArticles';
                  title?: string | null;
                  showAllLink?: string | null;
                  articles?: Array<{
                    __typename?: 'Post';
                    id: string;
                    uri?: string | null;
                    slug?: string | null;
                    link?: string | null;
                    date?: string | null;
                    title?: string | null;
                    lead?: string | null;
                    featuredImage?: {
                      __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                      node: {
                        __typename?: 'MediaItem';
                        altText?: string | null;
                        mediaItemUrl?: string | null;
                      };
                    } | null;
                    categories?: {
                      __typename?: 'PostToCategoryConnection';
                      nodes: Array<{
                        __typename?: 'Category';
                        name?: string | null;
                      }>;
                    } | null;
                  } | null> | null;
                }
              | { __typename?: 'LayoutCards' }
              | {
                  __typename: 'LayoutLinkList';
                  anchor?: string | null;
                  title?: string | null;
                  description?: string | null;
                  links?: Array<{
                    __typename?: 'Link';
                    target?: string | null;
                    title?: string | null;
                    url?: string | null;
                  } | null> | null;
                }
              | {
                  __typename: 'LayoutPages';
                  title?: string | null;
                  description?: string | null;
                  showAllLink?: string | null;
                  pages?: Array<{
                    __typename?: 'Page';
                    id: string;
                    uri?: string | null;
                    slug?: string | null;
                    link?: string | null;
                    date?: string | null;
                    title?: string | null;
                    lead?: string | null;
                    featuredImage?: {
                      __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                      node: {
                        __typename?: 'MediaItem';
                        altText?: string | null;
                        mediaItemUrl?: string | null;
                      };
                    } | null;
                  } | null> | null;
                }
              | null
            > | null;
            modules?: Array<
              | {
                  __typename: 'EventSearch';
                  title?: string | null;
                  url?: string | null;
                  module?: string | null;
                  showAllLink?: string | null;
                  showAllLinkCustom?: string | null;
                }
              | {
                  __typename: 'EventSearchCarousel';
                  title?: string | null;
                  url?: string | null;
                  orderNewestFirst?: boolean | null;
                  eventsNearby?: boolean | null;
                  amountOfCards?: number | null;
                  showAllLink?: string | null;
                  showAllLinkCustom?: string | null;
                }
              | {
                  __typename: 'EventSelected';
                  title?: string | null;
                  events?: Array<string | null> | null;
                  module?: string | null;
                }
              | {
                  __typename: 'EventSelectedCarousel';
                  title?: string | null;
                  module?: string | null;
                  eventsNearby?: boolean | null;
                  events?: Array<string | null> | null;
                  amountOfCardsPerRow?: number | null;
                  amountOfCards?: number | null;
                }
              | { __typename?: 'LayoutArticleHighlights' }
              | {
                  __typename: 'LayoutArticles';
                  title?: string | null;
                  showAllLink?: string | null;
                  articles?: Array<{
                    __typename?: 'Post';
                    id: string;
                    uri?: string | null;
                    slug?: string | null;
                    link?: string | null;
                    date?: string | null;
                    title?: string | null;
                    lead?: string | null;
                    featuredImage?: {
                      __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                      node: {
                        __typename?: 'MediaItem';
                        altText?: string | null;
                        mediaItemUrl?: string | null;
                      };
                    } | null;
                    categories?: {
                      __typename?: 'PostToCategoryConnection';
                      nodes: Array<{
                        __typename?: 'Category';
                        name?: string | null;
                      }>;
                    } | null;
                  } | null> | null;
                }
              | {
                  __typename: 'LayoutArticlesCarousel';
                  title?: string | null;
                  showMore?: Array<string | null> | null;
                  showAllLink?: string | null;
                  articles?: Array<{
                    __typename?: 'Post';
                    id: string;
                    uri?: string | null;
                    slug?: string | null;
                    link?: string | null;
                    date?: string | null;
                    title?: string | null;
                    lead?: string | null;
                    featuredImage?: {
                      __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                      node: {
                        __typename?: 'MediaItem';
                        altText?: string | null;
                        mediaItemUrl?: string | null;
                      };
                    } | null;
                    categories?: {
                      __typename?: 'PostToCategoryConnection';
                      nodes: Array<{
                        __typename?: 'Category';
                        name?: string | null;
                      }>;
                    } | null;
                  } | null> | null;
                }
              | {
                  __typename: 'LayoutCard';
                  alignment?: string | null;
                  backgroundColor?: string | null;
                  description?: string | null;
                  title?: string | null;
                  link?: {
                    __typename?: 'Link';
                    target?: string | null;
                    title?: string | null;
                    url?: string | null;
                  } | null;
                  image?: {
                    __typename?: 'Image';
                    caption?: string | null;
                    description?: string | null;
                    large?: string | null;
                    medium?: string | null;
                    medium_large?: string | null;
                    thumbnail?: string | null;
                    title?: string | null;
                  } | null;
                }
              | {
                  __typename: 'LayoutCards';
                  cards?: Array<{
                    __typename?: 'Card';
                    backgroundColor?: string | null;
                    description?: string | null;
                    icon?: string | null;
                    title?: string | null;
                    link?: {
                      __typename?: 'Link';
                      target?: string | null;
                      title?: string | null;
                      url?: string | null;
                    } | null;
                  } | null> | null;
                }
              | {
                  __typename: 'LayoutCollection';
                  collection?: {
                    __typename?: 'Collection';
                    title?: string | null;
                  } | null;
                }
              | { __typename?: 'LayoutContact' }
              | {
                  __typename: 'LayoutContent';
                  backgroundColor?: string | null;
                  content?: string | null;
                  title?: string | null;
                }
              | {
                  __typename: 'LayoutImage';
                  border?: boolean | null;
                  photographer_name?: string | null;
                  show_on_lightbox?: boolean | null;
                  image?: {
                    __typename?: 'Image';
                    caption?: string | null;
                    description?: string | null;
                    large?: string | null;
                    medium?: string | null;
                    thumbnail?: string | null;
                    title?: string | null;
                    medium_large?: string | null;
                  } | null;
                }
              | { __typename?: 'LayoutImageGallery' }
              | {
                  __typename: 'LayoutPages';
                  title?: string | null;
                  description?: string | null;
                  showAllLink?: string | null;
                  pages?: Array<{
                    __typename?: 'Page';
                    id: string;
                    uri?: string | null;
                    slug?: string | null;
                    link?: string | null;
                    date?: string | null;
                    title?: string | null;
                    lead?: string | null;
                    featuredImage?: {
                      __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                      node: {
                        __typename?: 'MediaItem';
                        altText?: string | null;
                        mediaItemUrl?: string | null;
                      };
                    } | null;
                  } | null> | null;
                }
              | {
                  __typename: 'LayoutPagesCarousel';
                  title?: string | null;
                  description?: string | null;
                  pages?: Array<{
                    __typename?: 'Page';
                    id: string;
                    uri?: string | null;
                    slug?: string | null;
                    link?: string | null;
                    date?: string | null;
                    title?: string | null;
                    lead?: string | null;
                    featuredImage?: {
                      __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                      node: {
                        __typename?: 'MediaItem';
                        altText?: string | null;
                        mediaItemUrl?: string | null;
                      };
                    } | null;
                  } | null> | null;
                }
              | { __typename?: 'LayoutSocialMediaFeed' }
              | {
                  __typename: 'LayoutSteps';
                  color?: string | null;
                  description?: string | null;
                  title?: string | null;
                  type?: string | null;
                  steps?: Array<{
                    __typename?: 'Step';
                    content?: string | null;
                    title?: string | null;
                  } | null> | null;
                }
              | {
                  __typename: 'LocationsSelected';
                  title?: string | null;
                  locations?: Array<number | null> | null;
                  module?: string | null;
                }
              | {
                  __typename: 'LocationsSelectedCarousel';
                  title?: string | null;
                  locations?: Array<number | null> | null;
                  module?: string | null;
                }
              | null
            > | null;
          } | null> | null;
          seo?: {
            __typename?: 'SEO';
            title?: string | null;
            description?: string | null;
            openGraphTitle?: string | null;
            openGraphDescription?: string | null;
            openGraphType?: string | null;
            twitterTitle?: string | null;
            twitterDescription?: string | null;
            canonicalUrl?: string | null;
            socialImage?: {
              __typename?: 'MediaItem';
              mediaItemUrl?: string | null;
            } | null;
          } | null;
          hero?: {
            __typename?: 'Hero';
            background_color?: string | null;
            background_image_url?: string | null;
            description?: string | null;
            title?: string | null;
            wave_motif?: string | null;
            link?: {
              __typename?: 'Link';
              target?: string | null;
              title?: string | null;
              url?: string | null;
            } | null;
          } | null;
          language?: {
            __typename?: 'Language';
            code?: LanguageCodeEnum | null;
            id: string;
            locale?: string | null;
            name?: string | null;
            slug?: string | null;
          } | null;
          featuredImage?: {
            __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
            node: {
              __typename?: 'MediaItem';
              mediaItemUrl?: string | null;
              link?: string | null;
              altText?: string | null;
              mimeType?: string | null;
              title?: string | null;
              uri?: string | null;
              photographerName?: string | null;
            };
          } | null;
          sidebar?: Array<
            | {
                __typename: 'LayoutArticles';
                title?: string | null;
                showAllLink?: string | null;
                articles?: Array<{
                  __typename?: 'Post';
                  id: string;
                  uri?: string | null;
                  slug?: string | null;
                  link?: string | null;
                  date?: string | null;
                  title?: string | null;
                  lead?: string | null;
                  featuredImage?: {
                    __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                    node: {
                      __typename?: 'MediaItem';
                      altText?: string | null;
                      mediaItemUrl?: string | null;
                    };
                  } | null;
                  categories?: {
                    __typename?: 'PostToCategoryConnection';
                    nodes: Array<{
                      __typename?: 'Category';
                      name?: string | null;
                    }>;
                  } | null;
                } | null> | null;
              }
            | { __typename?: 'LayoutCards' }
            | {
                __typename: 'LayoutLinkList';
                anchor?: string | null;
                title?: string | null;
                description?: string | null;
                links?: Array<{
                  __typename?: 'Link';
                  target?: string | null;
                  title?: string | null;
                  url?: string | null;
                } | null> | null;
              }
            | {
                __typename: 'LayoutPages';
                title?: string | null;
                description?: string | null;
                showAllLink?: string | null;
                pages?: Array<{
                  __typename?: 'Page';
                  id: string;
                  uri?: string | null;
                  slug?: string | null;
                  link?: string | null;
                  date?: string | null;
                  title?: string | null;
                  lead?: string | null;
                  featuredImage?: {
                    __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                    node: {
                      __typename?: 'MediaItem';
                      altText?: string | null;
                      mediaItemUrl?: string | null;
                    };
                  } | null;
                } | null> | null;
              }
            | null
          > | null;
          modules?: Array<
            | {
                __typename: 'EventSearch';
                title?: string | null;
                url?: string | null;
                module?: string | null;
                showAllLink?: string | null;
                showAllLinkCustom?: string | null;
              }
            | {
                __typename: 'EventSearchCarousel';
                title?: string | null;
                url?: string | null;
                orderNewestFirst?: boolean | null;
                eventsNearby?: boolean | null;
                amountOfCards?: number | null;
                showAllLink?: string | null;
                showAllLinkCustom?: string | null;
              }
            | {
                __typename: 'EventSelected';
                title?: string | null;
                events?: Array<string | null> | null;
                module?: string | null;
              }
            | {
                __typename: 'EventSelectedCarousel';
                title?: string | null;
                module?: string | null;
                eventsNearby?: boolean | null;
                events?: Array<string | null> | null;
                amountOfCardsPerRow?: number | null;
                amountOfCards?: number | null;
              }
            | { __typename?: 'LayoutArticleHighlights' }
            | {
                __typename: 'LayoutArticles';
                title?: string | null;
                showAllLink?: string | null;
                articles?: Array<{
                  __typename?: 'Post';
                  id: string;
                  uri?: string | null;
                  slug?: string | null;
                  link?: string | null;
                  date?: string | null;
                  title?: string | null;
                  lead?: string | null;
                  featuredImage?: {
                    __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                    node: {
                      __typename?: 'MediaItem';
                      altText?: string | null;
                      mediaItemUrl?: string | null;
                    };
                  } | null;
                  categories?: {
                    __typename?: 'PostToCategoryConnection';
                    nodes: Array<{
                      __typename?: 'Category';
                      name?: string | null;
                    }>;
                  } | null;
                } | null> | null;
              }
            | {
                __typename: 'LayoutArticlesCarousel';
                title?: string | null;
                showMore?: Array<string | null> | null;
                showAllLink?: string | null;
                articles?: Array<{
                  __typename?: 'Post';
                  id: string;
                  uri?: string | null;
                  slug?: string | null;
                  link?: string | null;
                  date?: string | null;
                  title?: string | null;
                  lead?: string | null;
                  featuredImage?: {
                    __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                    node: {
                      __typename?: 'MediaItem';
                      altText?: string | null;
                      mediaItemUrl?: string | null;
                    };
                  } | null;
                  categories?: {
                    __typename?: 'PostToCategoryConnection';
                    nodes: Array<{
                      __typename?: 'Category';
                      name?: string | null;
                    }>;
                  } | null;
                } | null> | null;
              }
            | {
                __typename: 'LayoutCard';
                alignment?: string | null;
                backgroundColor?: string | null;
                description?: string | null;
                title?: string | null;
                link?: {
                  __typename?: 'Link';
                  target?: string | null;
                  title?: string | null;
                  url?: string | null;
                } | null;
                image?: {
                  __typename?: 'Image';
                  caption?: string | null;
                  description?: string | null;
                  large?: string | null;
                  medium?: string | null;
                  medium_large?: string | null;
                  thumbnail?: string | null;
                  title?: string | null;
                } | null;
              }
            | {
                __typename: 'LayoutCards';
                cards?: Array<{
                  __typename?: 'Card';
                  backgroundColor?: string | null;
                  description?: string | null;
                  icon?: string | null;
                  title?: string | null;
                  link?: {
                    __typename?: 'Link';
                    target?: string | null;
                    title?: string | null;
                    url?: string | null;
                  } | null;
                } | null> | null;
              }
            | {
                __typename: 'LayoutCollection';
                collection?: {
                  __typename?: 'Collection';
                  title?: string | null;
                } | null;
              }
            | { __typename?: 'LayoutContact' }
            | {
                __typename: 'LayoutContent';
                backgroundColor?: string | null;
                content?: string | null;
                title?: string | null;
              }
            | {
                __typename: 'LayoutImage';
                border?: boolean | null;
                photographer_name?: string | null;
                show_on_lightbox?: boolean | null;
                image?: {
                  __typename?: 'Image';
                  caption?: string | null;
                  description?: string | null;
                  large?: string | null;
                  medium?: string | null;
                  thumbnail?: string | null;
                  title?: string | null;
                  medium_large?: string | null;
                } | null;
              }
            | { __typename?: 'LayoutImageGallery' }
            | {
                __typename: 'LayoutPages';
                title?: string | null;
                description?: string | null;
                showAllLink?: string | null;
                pages?: Array<{
                  __typename?: 'Page';
                  id: string;
                  uri?: string | null;
                  slug?: string | null;
                  link?: string | null;
                  date?: string | null;
                  title?: string | null;
                  lead?: string | null;
                  featuredImage?: {
                    __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                    node: {
                      __typename?: 'MediaItem';
                      altText?: string | null;
                      mediaItemUrl?: string | null;
                    };
                  } | null;
                } | null> | null;
              }
            | {
                __typename: 'LayoutPagesCarousel';
                title?: string | null;
                description?: string | null;
                pages?: Array<{
                  __typename?: 'Page';
                  id: string;
                  uri?: string | null;
                  slug?: string | null;
                  link?: string | null;
                  date?: string | null;
                  title?: string | null;
                  lead?: string | null;
                  featuredImage?: {
                    __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
                    node: {
                      __typename?: 'MediaItem';
                      altText?: string | null;
                      mediaItemUrl?: string | null;
                    };
                  } | null;
                } | null> | null;
              }
            | { __typename?: 'LayoutSocialMediaFeed' }
            | {
                __typename: 'LayoutSteps';
                color?: string | null;
                description?: string | null;
                title?: string | null;
                type?: string | null;
                steps?: Array<{
                  __typename?: 'Step';
                  content?: string | null;
                  title?: string | null;
                } | null> | null;
              }
            | {
                __typename: 'LocationsSelected';
                title?: string | null;
                locations?: Array<number | null> | null;
                module?: string | null;
              }
            | {
                __typename: 'LocationsSelectedCarousel';
                title?: string | null;
                locations?: Array<number | null> | null;
                module?: string | null;
              }
            | null
          > | null;
        }
      | { __typename?: 'Post' }
      | { __typename?: 'Tag' };
  } | null;
};

export type Menu = MenuQuery['menu'];
export type MenuItem = MenuItemFragment;
