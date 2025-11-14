import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import { hideConsoleMessages } from '@events-helsinki/common-tests';
import { loadEnvConfig } from '@next/env';

import { expect } from 'vitest';
import * as matchers from 'vitest-axe/matchers';
import { setup as setupFakedIndexedDB } from 'vitest-indexeddb';
import { initializeI18nWithConfig } from './config/tests/initI18n';

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

vi.mock('next/config', async () => ({
  default: vi.fn(() => ({
    publicRuntimeConfig: {
      federationRouter: 'https://localhost/federationrouter/',
      cmsOrigin: 'https://localhost/cms/graphql',
      linkedEvents: 'https://linkedevents-url.fi',
    },
  })),
}));

vi.mock('next/router', async () => {
  // If next-router-mock is ESM, importActual will work.
  // If it's CJS, Vitest will handle the interop.
  const actual = await vi.importActual('next-router-mock');
  return actual;
});

vi.mock('next/dist/client/router', async () => {
  const actual = await vi.importActual('next-router-mock');
  return actual;
});

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

vi.mock('next-i18next', async () => {
  const i18nInstance = await initializeI18nWithConfig();

  // Return the mock for next-i18next exports
  return {
    ...vi.importActual('next-i18next'),
    useTranslation: (ns: unknown) => ({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      t: i18nInstance.getFixedT(null, ns),
      i18n: i18nInstance,
      ready: true,
    }),
    // Other exports that next-i18next might have (like appWithTranslation, serverSideTranslations)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    appWithTranslation: (Component) => (props) => Component(props), // Simple pass-through for HOC
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    Trans: ({ i18nKey, children }) => i18nInstance.t(i18nKey) || children, // Minimal Trans component mock
    i18n: i18nInstance, // Export the initialized instance
  };
});

// Mock the ResizeObserver
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Stub the global ResizeObserver
vi.stubGlobal('ResizeObserver', ResizeObserverMock);

loadEnvConfig(process.cwd());

hideConsoleMessages({
  error: [
    // Hide error message caused by hds-react v3:
    // eslint-disable-next-line @stylistic/max-len
    // https://github.com/City-of-Helsinki/helsinki-design-system/blob/v3.11.0/packages/react/src/components/dropdown/select/Select.tsx#L669
    //
    // Example use case:
    // TargetAgeGroupSelector (apps/events-helsinki) → Select (hds-react)
    // Removing this hiding & running TargetAgeGroupSelector tests should show this error if HDS v3.11.0 is still used.
    //
    // Related issue:
    // https://github.com/facebook/react/issues/29233
    /Support for defaultProps will be removed.*Use JavaScript default parameters instead.*hds-react/s,
    /Could not parse CSS stylesheet/,
  ],
  warn: [
    /`canonizeResults` is deprecated and will be removed in Apollo Client 4.0. Please remove this option./,
  ],
});

/**
 * Fake IndexedDB for vitest.
 */
setupFakedIndexedDB();
