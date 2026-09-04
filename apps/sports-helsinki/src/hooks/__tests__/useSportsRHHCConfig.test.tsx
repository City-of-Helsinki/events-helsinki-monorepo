import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { ModuleItemTypeEnum } from '@city-of-helsinki/react-helsinki-headless-cms';
import React from 'react';
import { renderHook } from '@/test-utils';
import { fakeEvent } from '../../../config/vitest/mockDataUtils';
import { ROUTES } from '../../constants';
import routerHelper from '../../domain/app/routerHelper';
import useSportsRHHCConfig from '../useSportsRHHCConfig';

const apolloClient = {} as ApolloClient<NormalizedCacheObject>;

describe('useSportsRHHCConfig', () => {
  const originalEnrolmentFlag =
    process.env.NEXT_PUBLIC_SHOW_ENROLMENT_STATUS_IN_CARD_DETAILS;

  afterEach(() => {
    if (originalEnrolmentFlag === undefined) {
      delete process.env.NEXT_PUBLIC_SHOW_ENROLMENT_STATUS_IN_CARD_DETAILS;
    } else {
      process.env.NEXT_PUBLIC_SHOW_ENROLMENT_STATUS_IN_CARD_DETAILS =
        originalEnrolmentFlag;
    }
  });

  it('builds a config with translated site name, language and apollo clients wired up', () => {
    const { result } = renderHook(() => useSportsRHHCConfig({ apolloClient }));

    expect(result.current.currentLanguageCode).toBeDefined();
    expect(result.current.apolloClient).toBe(apolloClient);
    expect(result.current.eventsApolloClient).toBe(apolloClient);
    expect(result.current.venuesApolloClient).toBe(apolloClient);
    expect(typeof result.current.siteName).toBe('string');
    expect(result.current.siteName.length).toBeGreaterThan(0);
  });

  it('exposes the components needed by react-helsinki-headless-cms as functions', () => {
    const { result } = renderHook(() => useSportsRHHCConfig({ apolloClient }));
    const { components } = result.current;

    expect(React.isValidElement(components.Head?.({ children: null }))).toBe(
      true
    );
    expect(
      React.isValidElement(components.Link?.({ href: '/foo', children: null }))
    ).toBe(true);
    expect(
      React.isValidElement(components.EventCardContent?.({ children: null }))
    ).toBe(true);
    expect(
      React.isValidElement(components.ArticleCardContent?.({ children: null }))
    ).toBe(true);
    expect(
      React.isValidElement(components.VenueCardContent?.({ children: null }))
    ).toBe(true);
    expect(
      React.isValidElement(
        components.HelsinkiCityOwnedIcon?.({ children: null })
      )
    ).toBe(true);
  });

  it('getIsHrefExternal returns false for relative and internal hrefs, true otherwise', () => {
    const { result } = renderHook(() => useSportsRHHCConfig({ apolloClient }));
    const { getIsHrefExternal } = result.current.utils;

    expect(getIsHrefExternal('/some/path')).toBe(false);
    expect(getIsHrefExternal('https://www.external-domain.example')).toBe(true);
  });

  it('getRoutedInternalHref builds a localized venue url for Venue type', () => {
    const { result } = renderHook(() => useSportsRHHCConfig({ apolloClient }));
    const { getRoutedInternalHref } = result.current.utils;

    const href = getRoutedInternalHref('tprek:12345', ModuleItemTypeEnum.Venue);

    expect(href).toBe(
      routerHelper.getLocalizedCmsItemUrl(
        ROUTES.VENUES,
        { venueId: 'tprek:tprek:12345' },
        'fi'
      )
    );
  });

  it('getRoutedInternalHref returns the link as-is for non-Venue types', () => {
    const { result } = renderHook(() => useSportsRHHCConfig({ apolloClient }));
    const { getRoutedInternalHref } = result.current.utils;

    expect(
      getRoutedInternalHref('/some/link', ModuleItemTypeEnum.Article)
    ).toBe('/some/link');
  });

  it('getRoutedInternalHref falls back to "#" when the link is missing for non-Venue types', () => {
    const { result } = renderHook(() => useSportsRHHCConfig({ apolloClient }));
    const { getRoutedInternalHref } = result.current.utils;

    expect(getRoutedInternalHref(null, ModuleItemTypeEnum.Article)).toBe('#');
  });

  it('getEventCardProps delegates to the default implementation when the enrolment flag is off', () => {
    process.env.NEXT_PUBLIC_SHOW_ENROLMENT_STATUS_IN_CARD_DETAILS = 'false';
    const { result } = renderHook(() => useSportsRHHCConfig({ apolloClient }));

    const props = result.current.utils.getEventCardProps(
      fakeEvent() as never,
      [],
      'fi'
    );

    expect(props).toBeDefined();
  });

  it('getEventCardProps still returns card props when the enrolment flag is on', () => {
    process.env.NEXT_PUBLIC_SHOW_ENROLMENT_STATUS_IN_CARD_DETAILS = 'true';
    const { result } = renderHook(() => useSportsRHHCConfig({ apolloClient }));

    const props = result.current.utils.getEventCardProps(
      fakeEvent() as never,
      [],
      'fi'
    );

    expect(props).toBeDefined();
  });
});
