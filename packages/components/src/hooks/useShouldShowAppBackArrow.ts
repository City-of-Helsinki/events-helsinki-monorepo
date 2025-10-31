import React from 'react';

/**
 * Determines whether a custom in-app "back" arrow should be rendered.
 *
 * This hook is designed to solve a specific UI problem where
 * an in-app custom back navigation (e.g., "<- Back to list")
 * should be shown for internal navigation and direct page loads (bookmarks, typed URLs),
 * but hidden if the user landed *directly* on this page
 * from an external domain.
 *
 * This hook correctly handles client-side (Next.js) navigation.
 *
 * @returns {boolean} `showAppBackArrow`
 * - `true`: If the user navigated internally (client-side) OR arrived
 * directly (bookmark, typed URL, or internal full refresh).
 * - `false`: If the user landed on this page from an external domain.
 */
const useShouldShowAppBackArrow = () => {
  // 1. Default to `false` (no arrow) for SSR and initial render
  //    to prevent a React hydration mismatch.
  const [showAppBackArrow, setShowAppBackArrow] = React.useState(false);

  React.useEffect(() => {
    // This effect runs *only* on the client, after hydration.

    // A determination is needed as to whether this component mount was due to:
    // 1. A CLIENT-SIDE navigation (e.g., <Link> or router.push)
    // 2. A FULL PAGE LOAD (e.g., external link, bookmark, typed URL)

    let isFullPageLoad = false;

    // Use the modern PerformanceNavigationTiming API.
    // If this API is not supported, `isFullPageLoad` will remain `false`,
    // and the hook will safely default to showing the back arrow.
    if (performance.getEntriesByType) {
      const navigationEntries = performance.getEntriesByType('navigation');

      if (navigationEntries.length > 0) {
        const entry = navigationEntries[0];

        // Use `instanceof` for a robust, runtime type check.
        // This confirms 'entry' is the specific object type expected.
        if (entry instanceof PerformanceNavigationTiming) {
          isFullPageLoad = entry.type === 'navigate';
        }
      }
    }

    if (isFullPageLoad) {
      // This was a FULL PAGE LOAD.
      // The referrer must now be checked to determine *where* the user came from.
      const referrer = document.referrer;
      const origin = window.location.origin;

      // An external referrer is one that exists AND is not our own origin.
      const isExternalReferrer = referrer && !referrer.startsWith(origin);

      if (isExternalReferrer) {
        // Full page load from an external site (e.g., Google). HIDE arrow.
        setShowAppBackArrow(false);
      } else {
        // Full page load from an internal site OR a direct navigation
        // (empty referrer). In both cases, SHOW arrow.
        setShowAppBackArrow(true);
      }
    } else {
      // This was NOT a full page load.
      // It was a CLIENT-SIDE navigation, a page reload, or a back/fwd action.
      // In all these cases, the app's back arrow should be shown.
      setShowAppBackArrow(true);
    }
  }, []); // Runs only once on mount.

  return showAppBackArrow;
};

export default useShouldShowAppBackArrow;
