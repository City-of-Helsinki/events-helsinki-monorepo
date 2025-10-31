import React from 'react';

/**
 * Determines whether a custom in-app "back" arrow should be rendered.
 *
 * This hook is designed to solve a specific UI problem:
 * We want to show our app's custom back navigation (e.g., "<- Back to search")
 * for internal navigation and direct page loads (bookmarks, typed URLs),
 * but we want to *hide* it if the user landed on this page from an
 * external domain. This prevents confusing the user, as our in-app arrow
 * would not take them back to the external site (only the browser's back
 * button can do that).
 *
 * @returns {boolean} `showAppBackArrow`
 * - `true`: If the user navigated internally OR arrived directly
 * (e.g., bookmark, typed URL, or page reload).
 * - `false`: If the user landed from an external domain.
 */
const useShouldShowAppBackArrow = (): boolean => {
  // Default to `false` (no arrow) for the server-side render
  // and the initial client render. This is crucial to prevent
  // a React hydration mismatch.
  const [showAppBackArrow, setShowAppBackArrow] = React.useState(false);

  React.useEffect(() => {
    // This effect runs *only* on the client, after hydration.

    const referrer = document.referrer; // e.g., "https://www.google.com/" or ""
    const origin = window.location.origin; // e.g., "https://tapahtumat.hel.fi"

    const isExternalReferrer = referrer && !referrer.startsWith(origin);

    if (isExternalReferrer) {
      // The user came from an external site.
      setShowAppBackArrow(false);
    } else {
      // This `else` block covers all other cases where we *want* the arrow:
      // a) Internal navigation: `referrer` starts with our `origin`.
      // b) Direct navigation: `referrer` is an empty string `""`.
      // c) Page reload: `referrer` is our own URL (or empty in some cases).
      // In all these cases, we want to show the app's back button.
      setShowAppBackArrow(true);
    }
  }, []); // Run only once on mount.

  return showAppBackArrow;
};

export default useShouldShowAppBackArrow;
