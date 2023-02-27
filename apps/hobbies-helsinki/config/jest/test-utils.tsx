import type { ApolloCache, InMemoryCache } from '@apollo/client/cache';
import type { MockedResponse } from '@apollo/client/testing';
import type { RenderResult } from '@testing-library/react';
import { act, fireEvent, render } from '@testing-library/react';
import type { NextRouter } from 'next/router';
import Router from 'next/router';
import type { ReactElement } from 'react';
import React from 'react';
import wait from 'waait';

import { hobbiesApolloClient } from '../../src/domain/clients/hobbiesApolloClient';
import TestProviders from './TestProviders';

type CustomRender = {
  (
    ui: React.ReactElement,
    options?: {
      mocks?: MockedResponse[];
      cache?: ApolloCache<Record<string, unknown>> | InMemoryCache;
      routes?: string | string[];
    }
  ): CustomRenderResult;
};

export type CustomRenderResult = RenderResult & { router: NextRouter };

export const arrowUpKeyPressHelper = (): boolean =>
  fireEvent.keyDown(document, { code: 38, key: 'ArrowUp' });

export const arrowDownKeyPressHelper = (): boolean =>
  fireEvent.keyDown(document, { code: 40, key: 'ArrowDown' });

export const enterKeyPressHelper = (): boolean =>
  fireEvent.keyDown(document, { code: 13, key: 'Enter' });

export const escKeyPressHelper = (): boolean =>
  fireEvent.keyDown(document, { code: 27, key: 'Escape' });

export const tabKeyPressHelper = (): boolean =>
  fireEvent.keyDown(document, { code: 9, key: 'Tab' });

const customRender: CustomRender = (
  ui: ReactElement,
  { mocks = [], cache = hobbiesApolloClient.cache, routes = [] } = {}
) => {
  if (routes) {
    if (!Array.isArray(routes)) {
      routes = [routes];
    }
    routes.forEach((route) => Router.push(route));
  }

  // set locales so that the routing tests for default locale worked
  Router.locales = ['fi', 'en', 'sv'];

  const renderResult = render(ui, {
    wrapper: ({ children }) => (
      <TestProviders mocks={mocks} router={Router} cache={cache}>
        {children}
      </TestProviders>
    ),
  });
  return {
    ...renderResult,
    router: Router,
  };
};

// eslint-disable-next-line testing-library/no-unnecessary-act
const actWait = (amount?: number): Promise<void> => act(() => wait(amount));

// eslint-disable-next-line import/export
export { actWait, customRender as render };

// re-export everything
// eslint-disable-next-line import/export
export * from '@testing-library/react';
export { render as defaultRender } from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
