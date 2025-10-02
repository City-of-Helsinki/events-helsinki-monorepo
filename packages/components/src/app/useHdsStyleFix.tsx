import React from 'react';

/**
 * Unset hidden visibility that was applied to hide the first server render
 * that does not include styles from HDS. HDS applies styling by injecting
 * style tags into the head. This requires the existence of a document object.
 * The document object does not exist during server side renders.
 */
// TODO: Remove this hackfix to ensure that pre-rendered pages'
//      SEO performance is not impacted.
export default function useHdsStyleFix() {
  React.useEffect(() => {
    setTimeout(() => {
      if (typeof document !== 'undefined') {
        const body = document?.body;

        if (document?.body) {
          body.style.visibility = 'unset';
        }
      }
    }, 10);
  }, []);
}
