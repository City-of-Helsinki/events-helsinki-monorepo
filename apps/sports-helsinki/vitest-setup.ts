import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import { hideConsoleMessages } from '@events-helsinki/common-tests';
import { loadEnvConfig } from '@next/env';
import { VirtualConsole } from 'jsdom';

// Suppress jsdom CSS parse errors at the VirtualConsole level
const originalEmit = VirtualConsole.prototype.emit;
VirtualConsole.prototype.emit = function (event: string, ...args: unknown[]) {
  if (
    event === 'jsdomError' &&
    args[0] instanceof Error &&
    args[0].message.includes('Could not parse CSS stylesheet')
  ) {
    return false;
  }
  return originalEmit.call(this, event, ...args);
};

import { expect } from 'vitest';
import * as matchers from 'vitest-axe/matchers';
import { initializeI18nWithConfig } from './config/vitest/initI18n';

import '@testing-library/jest-dom/vitest';

// Load error messages for Apollo client so it's easier to debug errors
loadDevMessages();
loadErrorMessages();

expect.extend(matchers);

global.scrollTo = vi.fn();

vi.mock('ics', async () => ({
  createEvent: vi.fn(() =>
    // eslint-disable-next-line no-console
    console.log('ics: createEvent (mocked with vi.mock)')
  ),
}));

process.env.NEXT_PUBLIC_FEDERATION_ROUTER_ENDPOINT =
  'https://localhost/federationrouter/';
process.env.NEXT_PUBLIC_CMS_ORIGIN = 'https://localhost/cms/graphql';
process.env.NEXT_PUBLIC_LINKEDEVENTS_EVENT_ENDPOINT =
  'https://linkedevents-url.fi';

vi.mock('next/router', async () => {
  // If next-router-mock is ESM, importActual will work.
  // If it's CJS, Vitest will handle the interop.
  return await vi.importActual('next-router-mock');
});

vi.mock(
  'next/dist/client/router',
  async () => await vi.importActual('next-router-mock')
);

vi.mock('next/head', async () => {
  // ReactDOMServer might need specific handling or mock if it pulls heavy dependencies.
  // Vitest can often resolve it, but if errors, you might mock ReactDOMServer too.
  const ReactDOMServer = await vi.importActual('react-dom/server');
  return {
    __esModule: true,
    default: vi.fn(({ children }) => {
      if (children) {
        global.document.head.insertAdjacentHTML(
          'afterbegin',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (ReactDOMServer as any).renderToString(children) || ''
        );
      }
      return null;
    }),
  };
});

vi.mock('next-i18next/pages', async () => {
  const i18nInstance = await initializeI18nWithConfig();

  return {
    ...(await vi.importActual('next-i18next/pages')),
    useTranslation: (ns: unknown) => ({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      t: i18nInstance.getFixedT(null, ns),
      i18n: i18nInstance,
      ready: true,
    }),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    appWithTranslation: (Component) => (props) => Component(props),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    Trans: ({ i18nKey, children }) => i18nInstance.t(i18nKey) || children,
    i18n: i18nInstance,
  };
});

// Mock the ResizeObserver
// Use class syntax so it works with `new` in vitest 4.x
class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

// Stub the global ResizeObserver
vi.stubGlobal('ResizeObserver', ResizeObserverMock);

loadEnvConfig(process.cwd());

hideConsoleMessages({
  error: [
    // CSS stylesheets are not ever parsed by JSDOM, so the message is useless.
    /Could not parse CSS stylesheet/,
  ],
  warn: [
    // Apollo deprecation message is spammed in tests, just for future info. It's not useful in unit tests.
    /`canonizeResults` is deprecated and will be removed in Apollo Client 4.0. Please remove this option./,
  ],
});
