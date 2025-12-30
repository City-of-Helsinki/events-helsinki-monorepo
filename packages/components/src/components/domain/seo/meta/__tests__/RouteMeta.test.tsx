import type { PageType } from '@city-of-helsinki/react-helsinki-headless-cms';
import { render } from '@testing-library/react';
import router from 'next-router-mock';
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import RouteMeta from '../RouteMeta';

// Mock next/router
vi.mock('next/router', async () => await vi.importActual('next-router-mock'));

describe('RouteMeta', () => {
  const origin = 'https://test.hki.fi';

  afterEach(() => {
    document.head.innerHTML = '';
  });

  describe('without page prop', () => {
    it('should render canonical and alternate links based on router path', () => {
      router.locale = 'fi';
      router.asPath = '/test-path';

      render(<RouteMeta origin={origin} />);

      const canonicalLink = document.head.querySelector(
        'link[rel="canonical"]'
      );
      expect(canonicalLink?.getAttribute('href')).toBe(
        `${origin}/fi/test-path`
      );

      const alternateFi = document.head.querySelector(
        'link[rel="alternate"][hrefLang="fi"]'
      );
      expect(alternateFi?.getAttribute('href')).toBe(`${origin}/fi/test-path`);

      const alternateSv = document.head.querySelector(
        'link[rel="alternate"][hrefLang="sv"]'
      );
      expect(alternateSv?.getAttribute('href')).toBe(`${origin}/sv/test-path`);

      const alternateEn = document.head.querySelector(
        'link[rel="alternate"][hrefLang="en"]'
      );
      expect(alternateEn?.getAttribute('href')).toBe(`${origin}/en/test-path`);

      const alternateXDefault = document.head.querySelector(
        'link[rel="alternate"][hrefLang="x-default"]'
      );
      expect(alternateXDefault?.getAttribute('href')).toBe(
        `${origin}/fi/test-path`
      );

      const ogLocale = document.head.querySelector(
        'meta[property="og:locale"]'
      );
      expect(ogLocale?.getAttribute('content')).toBe('fi');

      const ogUrl = document.head.querySelector('meta[property="og:url"]');
      expect(ogUrl?.getAttribute('content')).toBe(`${origin}/fi/test-path`);

      const twitterUrl = document.head.querySelector(
        'meta[name="twitter:url"]'
      );
      expect(twitterUrl?.getAttribute('content')).toBe(
        `${origin}/fi/test-path`
      );
    });

    it('should handle root path correctly', () => {
      router.locale = 'en';
      router.asPath = '/';

      render(<RouteMeta origin={origin} />);

      const canonicalLink = document.head.querySelector(
        'link[rel="canonical"]'
      );
      expect(canonicalLink?.getAttribute('href')).toBe(`${origin}/en`);

      const alternateFi = document.head.querySelector(
        'link[rel="alternate"][hrefLang="fi"]'
      );
      expect(alternateFi?.getAttribute('href')).toBe(`${origin}/fi`);

      const alternateXDefault = document.head.querySelector(
        'link[rel="alternate"][hrefLang="x-default"]'
      );
      expect(alternateXDefault?.getAttribute('href')).toBe(`${origin}/fi`);
    });

    it('should handle path with trailing slash and query params', () => {
      router.locale = 'sv';
      router.asPath = '/test-path/?a=1';

      render(<RouteMeta origin={origin} />);

      const canonicalLink = document.head.querySelector(
        'link[rel="canonical"]'
      );
      expect(canonicalLink?.getAttribute('href')).toBe(
        `${origin}/sv/test-path`
      );

      const alternateSv = document.head.querySelector(
        'link[rel="alternate"][hrefLang="sv"]'
      );
      expect(alternateSv?.getAttribute('href')).toBe(`${origin}/sv/test-path/`);
    });
  });

  describe('with page prop', () => {
    const mockPage = {
      id: '1',
      title: 'Test Page',
      slug: 'test-page',
      uri: '/fi/test-page/',
      link: '/fi/test-page/',
      contentTypeName: 'Page',
      date: '2023-01-01',
      modified: '2023-01-01',
      language: {
        code: 'FI',
        id: '1',
        locale: 'fi',
        name: 'Suomi',
        slug: 'fi',
      },
      translations: [
        {
          uri: '/sv/test-sida/',
          language: { slug: 'sv' },
        },
        {
          uri: '/en/test-page/',
          language: { slug: 'en' },
        },
      ],
    } as unknown as PageType;

    it('should render alternate links based on page translations', () => {
      router.locale = 'fi';
      router.asPath = '/fi/test-page/';

      render(<RouteMeta origin={origin} page={mockPage} />);

      const canonicalLink = document.head.querySelector(
        'link[rel="canonical"]'
      );
      expect(canonicalLink?.getAttribute('href')).toBe(
        `${origin}/fi/test-page`
      );

      // Alternates from translations should exist
      const alternateSv = document.head.querySelector(
        'link[rel="alternate"][hrefLang="sv"]'
      );
      expect(alternateSv).not.toBeNull();
      expect(alternateSv?.getAttribute('href')).toBe(`${origin}/sv/test-sida`);

      const alternateEn = document.head.querySelector(
        'link[rel="alternate"][hrefLang="en"]'
      );
      expect(alternateEn).not.toBeNull();
      expect(alternateEn?.getAttribute('href')).toBe(`${origin}/en/test-page`);

      // No hardcoded alternates should exist
      const alternateFi = document.head.querySelector(
        'link[rel="alternate"][hrefLang="fi"]'
      );
      expect(alternateFi).toBeNull();

      const alternateXDefault = document.head.querySelector(
        'link[rel="alternate"][hrefLang="x-default"]'
      );
      expect(alternateXDefault).not.toBeNull();
      expect(alternateXDefault?.getAttribute('href')).toBe(
        `${origin}/fi/test-page`
      );
    });
  });
});
