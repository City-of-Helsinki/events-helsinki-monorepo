import { render } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import BasicMeta from '../BasicMeta';

describe('BasicMeta', () => {
  // Clean up document.head after each test to prevent side effects
  afterEach(() => {
    document.head.innerHTML = '';
  });

  it('should not render any meta tags when no props are provided', () => {
    render(<BasicMeta />);
    // The mock for next/head might add a wrapper, so we check for meta/link children
    expect(document.head.querySelector('meta, link')).toBeNull();
  });

  it('should render title meta tag', () => {
    const title = 'Test Title';
    render(<BasicMeta title={title} />);
    const meta = document.head.querySelector('meta[property="title"]');
    expect(meta).not.toBeNull();
    expect(meta?.getAttribute('content')).toBe(title);
  });

  it('should render description meta tag', () => {
    const description = 'Test Description';
    render(<BasicMeta description={description} />);
    const meta = document.head.querySelector('meta[property="description"]');
    expect(meta).not.toBeNull();
    expect(meta?.getAttribute('content')).toBe(description);
  });

  it('should render favicon link tag', () => {
    const favIconUrl = '/favicon.ico';
    render(<BasicMeta favIconUrl={favIconUrl} />);
    const link = document.head.querySelector('link[rel="icon"]');
    expect(link).not.toBeNull();
    expect(link?.getAttribute('href')).toBe(favIconUrl);
  });

  it('should render SVG favicon link tag', () => {
    const favIconSvgUrl = '/favicon.svg';
    render(<BasicMeta favIconSvgUrl={favIconSvgUrl} />);
    const link = document.head.querySelector(
      'link[rel="icon"][type="image/svg+xml"]'
    );
    expect(link).not.toBeNull();
    expect(link?.getAttribute('href')).toBe(favIconSvgUrl);
  });

  it('should render apple touch icon link tag', () => {
    const appleTouchIconUrl = '/apple-touch-icon.png';
    render(<BasicMeta appleTouchIconUrl={appleTouchIconUrl} />);
    const link = document.head.querySelector('link[rel="apple-touch-icon"]');
    expect(link).not.toBeNull();
    expect(link?.getAttribute('href')).toBe(appleTouchIconUrl);
    expect(link?.getAttribute('sizes')).toBe('180x180');
  });

  it('should render manifest link tag', () => {
    const manifestUrl = '/manifest.json';
    render(<BasicMeta manifestUrl={manifestUrl} />);
    const link = document.head.querySelector('link[rel="manifest"]');
    expect(link).not.toBeNull();
    expect(link?.getAttribute('href')).toBe(manifestUrl);
  });

  it('should render all tags when all props are provided', () => {
    const props = {
      title: 'Full Test Title',
      description: 'Full Test Description',
      favIconUrl: '/favicon.ico',
      favIconSvgUrl: '/favicon.svg',
      appleTouchIconUrl: '/apple-touch-icon.png',
      manifestUrl: '/manifest.json',
    };
    render(<BasicMeta {...props} />);

    expect(document.head.children).toHaveLength(6);
  });
});
