import { useRouter } from 'next/router';
import { useRef, useEffect } from 'react';

/**
 * Use an URL parameter to scroll to
 * the previously used search result card on a page change.
 */
export const useScrollToSearchResultItem = () => {
  const router = useRouter();
  const scrollTo = router.query?.scrollTo;
  // TODO: `listRef` is never returned by this hook nor attached to any
  // rendered DOM element by its consumers (CombinedSearchPage's
  // VenueSearchPanel/EventSearchPanel just call this hook with no JSX), so
  // `listRef.current` is always `null`. This means `listElement?.querySelector(...)`
  // below always short-circuits and the decode/query/scrollIntoView logic
  // never actually runs — scrolling to the previous search result is
  // currently dead code. Fixing this requires returning `listRef` and wiring
  // it through CombinedSearchPage -> VenueSearchPage/EventSearchPage -> the
  // list container (e.g. VenueList) so it's attached to a real element.
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const listElement = listRef.current;

    if (scrollTo) {
      const listItemElement = listElement?.querySelector(
        decodeURIComponent(scrollTo.toString())
      );

      if (listItemElement) {
        listItemElement.scrollIntoView({
          block: 'center',
        });
      }
    }
  }, [scrollTo]);
};

export default useScrollToSearchResultItem;
