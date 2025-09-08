import { render } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import PageMeta from '../PageMeta';

describe('PageMeta', () => {
  // Clean up document.head after each test to prevent side effects
  afterEach(() => {
    document.head.innerHTML = '';
    document.title = ''; // Also reset the document title
  });

  it('should render basic title and description', () => {
    const title = 'Page Title';
    const description = 'Page Description';
    render(<PageMeta title={title} description={description} />);

    // Check for the <title> tag
    expect(document.title).toStrictEqual(title);

    // Check for the description meta tag
    const metaDesc = document.head.querySelector('meta[name="description"]');
    expect(metaDesc).not.toBeNull();
    expect(metaDesc?.getAttribute('content')).toStrictEqual(description);
  });

  /**
   * NOTE: OG meta-tags are using property-attribute (not "name").
   * */
  it('should render Open Graph meta tags', () => {
    const props = {
      title: 'Title',
      openGraphTitle: 'OG Title',
      description: 'Description',
      openGraphDescription: 'OG Description',
      image: 'https://example.com/og-image.png',
      url: 'https://example.com/page-url',
    };
    render(<PageMeta {...props} />);

    const ogType = document.head.querySelector('meta[property="og:type"]');
    expect(ogType?.getAttribute('content')).toStrictEqual('website');

    const ogTitle = document.head.querySelector('meta[property="og:title"]');
    expect(ogTitle?.getAttribute('content')).toStrictEqual(
      props.openGraphTitle
    );

    const ogDesc = document.head.querySelector(
      'meta[property="og:description"]'
    );
    expect(ogDesc?.getAttribute('content')).toStrictEqual(
      props.openGraphDescription
    );

    const ogImage = document.head.querySelector('meta[property="og:image"]');
    expect(ogImage?.getAttribute('content')).toStrictEqual(props.image);

    const ogUrl = document.head.querySelector('meta[property="og:url"]');
    expect(ogUrl?.getAttribute('content')).not.toBeNull();
  });

  /**
   * NOTE: Twitter meta-tags are using name-attribute (not "property").
   * */
  it('should render Twitter card meta tags', () => {
    const props = {
      title: 'Title',
      twitterTitle: 'Twitter Title',
      description: 'Description',
      twitterDescription: 'Twitter Description',
      image: 'https://example.com/twitter-image.png',
    };
    render(<PageMeta {...props} />);

    const twitterCard = document.head.querySelector(
      'meta[name="twitter:card"]'
    );
    expect(twitterCard?.getAttribute('content')).toStrictEqual(
      'summary_large_image'
    );

    const twitterTitle = document.head.querySelector(
      'meta[name="twitter:title"]'
    );
    expect(twitterTitle?.getAttribute('content')).toStrictEqual(
      props.twitterTitle
    );

    const twitterDesc = document.head.querySelector(
      'meta[name="twitter:description"]'
    );
    expect(twitterDesc?.getAttribute('content')).toStrictEqual(
      props.twitterDescription
    );

    const twitterImage = document.head.querySelector(
      'meta[name="twitter:image"]'
    );
    expect(twitterImage?.getAttribute('content')).toStrictEqual(props.image);
  });
});
