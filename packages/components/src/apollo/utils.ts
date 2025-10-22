import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import type { AppMenuItem } from '../types';
import { LanguageCodeEnum } from '../types';

export const excludeArgs =
  (excludedArgs: string[]) => (args: Record<string, unknown> | null) =>
    args
      ? Object.keys(args).filter((key: string) => !excludedArgs.includes(key))
      : false;

export function sortMenuItems(menuItemsConnection: { nodes: AppMenuItem[] }) {
  const menuItems = menuItemsConnection.nodes;
  const sortedMenuItems = [...menuItems].sort((a, b) => a.order - b.order);

  return {
    ...menuItemsConnection,
    nodes: sortedMenuItems,
  };
}

export function getQlLanguage(language: string): LanguageCodeEnum {
  return (
    {
      fi: LanguageCodeEnum.Fi,
      sv: LanguageCodeEnum.Sv,
      en: LanguageCodeEnum.En,
    }[language] || LanguageCodeEnum.Fi
  );
}

export function getUnifiedSearchLanguage(language: string) {
  return {
    fi: 'FINNISH',
    sv: 'SWEDISH',
    en: 'ENGLISH',
  }[language];
}

export function getMenuLocationFromLanguage(language: string) {
  switch (language) {
    case 'fi':
      return 'PRIMARY';
    case 'sv':
      return 'PRIMARY___SV';
    case 'en':
      return 'PRIMARY___EN';
    default:
      return 'PRIMARY';
  }
}

export class MutableReference<Ref = unknown> {
  _value?: Ref;

  constructor(initialReference?: Ref) {
    this._value = initialReference;
  }

  get reference(): Ref | undefined {
    return this._value;
  }

  set reference(ref: Ref | undefined) {
    this._value = ref;
  }
}

type InitApolloClientConfig<
  TCacheShape,
  Client extends ApolloClient<TCacheShape>,
> = {
  mutableCachedClient: MutableReference<Client>;
  createClient: () => Client;
};

// https://www.apollographql.com/blog/building-a-next-js-app-with-apollo-client-slash-graphql/
export function initializeApolloClient<
  TCacheShape = NormalizedCacheObject,
  Client extends ApolloClient<TCacheShape> = ApolloClient<TCacheShape>,
>({
  mutableCachedClient,
  createClient,
}: InitApolloClientConfig<TCacheShape, Client>) {
  // For SSG and SSR always create a new Apollo Client
  if (typeof globalThis.window === 'undefined') {
    return createClient();
  }

  // Create the Apollo Client once in the client.
  mutableCachedClient.reference ??= createClient();

  return mutableCachedClient.reference;
}
