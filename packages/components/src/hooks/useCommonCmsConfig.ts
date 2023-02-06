import type { Config } from 'react-helsinki-headless-cms';
import useCmsTranslation from './useCmsTranslation';
import useCommonTranslation from './useCommonTranslation';

const useCommonCmsConfig = (): Partial<Config> => {
  const { t: commonTranslation } = useCommonTranslation();
  const { t: cmsTranslation } = useCmsTranslation();
  return {
    fallbackImageUrls: [
      '/shared-assets/images/event_placeholder_A.jpg',
      '/shared-assets/images/event_placeholder_B.jpg',
      '/shared-assets/images/event_placeholder_C.jpg',
      '/shared-assets/images/event_placeholder_D.jpg',
    ],
    copy: {
      next: commonTranslation('common:next'),
      previous: commonTranslation('common:previous'),
      breadcrumbNavigationLabel: commonTranslation(
        'common:breadcrumb.breadcrumbNavigationLabel'
      ),
      breadcrumbListLabel: commonTranslation(
        'common:breadcrumb.breadcrumbListLabel'
      ),
      menuToggleAriaLabel: commonTranslation('common:menu.menuToggleAriaLabel'),
      skipToContentLabel: commonTranslation('common:linkSkipToContent'),
      openInExternalDomainAriaLabel: commonTranslation(
        'common:srOnly.opensInAnExternalSite'
      ),
      openInNewTabAriaLabel: commonTranslation('common:srOnly.opensInANewTab'),
      closeButtonLabelText: commonTranslation('common:button.close'),
      loadMoreButtonLabelText: commonTranslation('common:button.loadMore'),
      showAllText: commonTranslation('common:button.showAll'),
      archiveSearch: {
        title: cmsTranslation('cms:archiveSearch.title'),
        searchTextPlaceholder: cmsTranslation(
          'cms:archiveSearch.searchTextPlaceholder'
        ),
        searchButtonLabelText: cmsTranslation(
          'cms:archiveSearch.searchButtonLabelText'
        ),
        loadMoreButtonLabelText: cmsTranslation(
          'cms:archiveSearch.loadMoreButtonLabelText'
        ),
        noResultsTitle: cmsTranslation('cms:archiveSearch.noResultsTitle'),
        noResultsText: cmsTranslation('cms:archiveSearch.noResultsText'),
        clearAll: cmsTranslation('cms:archiveSearch.buttonClearFilters'),
      },
    },
    meta: {
      appleTouchIconUrl: '/shared-assets/images/apple-touch-icon.png',
      favIconUrl: '/shared-assets/images/favicon.ico',
      favIconSvgUrl: '/shared-assets/images/favicon.svg',
      manifestUrl: '/shared-assets/images/manifest.webmanifest',
    },
  };
};

export default useCommonCmsConfig;
