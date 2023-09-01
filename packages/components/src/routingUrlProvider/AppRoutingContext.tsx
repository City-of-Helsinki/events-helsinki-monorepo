import type { NextRouter } from 'next/router';
import React from 'react';
import type { EventFieldsFragment, Venue } from '../types/generated/graphql';
import type {
  GetCardUrlType,
  GetEventUrlType,
  GetEventListLinkUrlType,
  GetOrganizationSearchUrlType,
  GetHelsinkiOnlySearchUrlType,
  GetPlainEventUrlType,
  KeywordOnClickHandlerType,
  AppLanguage,
} from '../types/types';

export type AppRoutingContextProps = {
  getCardUrl: GetCardUrlType;
  getEventUrl: GetEventUrlType;
  getEventListLinkUrl: GetEventListLinkUrlType;
  getOrganizationSearchUrl: GetOrganizationSearchUrlType;
  getHelsinkiOnlySearchUrl: GetHelsinkiOnlySearchUrlType;
  getPlainEventUrl: GetPlainEventUrlType;
  getKeywordOnClickHandler: KeywordOnClickHandlerType;
};

const defaultRoutingContext: AppRoutingContextProps = {
  getCardUrl: function (
    _event: EventFieldsFragment,
    _locale: AppLanguage
  ): string {
    throw new Error('Function not implemented.');
  },
  getEventUrl: function (
    _event: EventFieldsFragment,
    _router: NextRouter,
    _locale: AppLanguage
  ): string {
    throw new Error('Function not implemented.');
  },
  getEventListLinkUrl: function (
    _event: EventFieldsFragment,
    _router: NextRouter,
    _locale: AppLanguage
  ): string {
    throw new Error('Function not implemented.');
  },
  getOrganizationSearchUrl: function (
    _event: EventFieldsFragment,
    _router: NextRouter,
    _locale: AppLanguage
  ): string {
    throw new Error('Function not implemented.');
  },
  getHelsinkiOnlySearchUrl: function (
    _source: EventFieldsFragment | Venue,
    _router: NextRouter,
    _locale: AppLanguage
  ): string {
    throw new Error('Function not implemented.');
  },
  getPlainEventUrl: function (
    _event: EventFieldsFragment,
    _locale: AppLanguage
  ): string {
    throw new Error('Function not implemented.');
  },
  getKeywordOnClickHandler: function (
    _router: NextRouter,
    _locale: AppLanguage,
    _type: 'text' | 'dateType' | 'isFree',
    _value?: string | undefined
  ): () => void {
    throw new Error('Function not implemented.');
  },
};

const AppRoutingContext = React.createContext<AppRoutingContextProps>(
  defaultRoutingContext
);

export default AppRoutingContext;
