import React from 'react';
import { isClient } from '../utils';

const usePageScrollRestoration = () => {
  React.useEffect(() => {
    if (!isClient) {
      return;
    }
    const hasScrollHistory = sessionStorage.getItem(
      `__next_scroll_${window.history.state.key}`
    );
    if (hasScrollHistory) {
      const scrollPosition = JSON.parse(hasScrollHistory);
      if (scrollPosition.y !== window.scrollY) {
        window.scrollTo(0, scrollPosition.y);
      }
    }
  }, []);
};

export default usePageScrollRestoration;
