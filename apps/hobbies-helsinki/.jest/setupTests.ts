/* eslint-disable @typescript-eslint/no-require-imports */
import '@testing-library/jest-dom/extend-expect';
import { TextEncoder, TextDecoder } from 'util';

import { loadEnvConfig } from '@next/env';
// import { server } from "./tests/mocks/server";
import '../config/jest/initI18n';
import { toHaveNoViolations } from 'jest-axe';

const trueEnv = ['true', '1', 'yes'];
const isCI = trueEnv.includes(process.env?.CI ?? 'false');

// Raise the default timeout from 5000
jest.setTimeout(process.env?.CI ? 50_000 : 10_000);

loadEnvConfig(process.cwd());

// Mock the fetch
// global.fetch = jest.fn();

// mock scrollTo in order to fix: "Error: Not implemented: window.scrollTo"
global.scrollTo = jest.fn();

// Mock the translations module
jest.mock('next-i18next', () => ({
  // When testing, i18n is set up with providers instead of the version that's
  // optimized for next. That's why we replace the next useTranslation with the
  // default react version.
  __esModule: true,
  ...jest.requireActual('next-i18next'),
}));

// Mock the ICS create event that fails during the tests
jest.mock('ics', () => {
  jest.fn();
});

// Mock the NextJS-router
jest.mock('next/router', () => require('next-router-mock'));
jest.mock('next/dist/client/router', () => require('next-router-mock'));

// Mock next/head
jest.mock('next/head', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const ReactDOMServer = require('react-dom/server');
  return {
    __esModule: true,
    default: ({
      children,
    }: {
      children: Array<React.ReactElement> | React.ReactElement | null;
    }) => {
      if (children) {
        global.document.head.insertAdjacentHTML(
          'afterbegin',
          ReactDOMServer.renderToString(children) || ''
        );
      }
      return null;
    },
  };
});

// Mock the public runtime config
jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    federationRouter: 'https://localhost/federationrouter/',
    cmsOrigin: 'https://localhost/cms/graphql',
    linkedEvents: 'https://linkedevents-url.fi',
  },
}));

// https://stackoverflow.com/questions/67872622/jest-spyon-not-working-on-index-file-cannot-redefine-property/69951703#69951703
jest.mock('@events-helsinki/components/hooks/useLocale', () => ({
  __esModule: true,
  ...jest.requireActual('@events-helsinki/components/hooks/useLocale'),
}));

// Extend except with jest-axe
expect.extend(toHaveNoViolations);

// To avoid error: ReferenceError: TextEncoder is not defined
// discusssed here: https://github.com/jsdom/jsdom/issues/2524
global.TextEncoder = TextEncoder;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.TextDecoder = TextDecoder as any;

// global.IntersectionObserver = class IntersectionObserver {
//   readonly root: Element | Document | null;
//   readonly rootMargin: string;
//   readonly thresholds: ReadonlyArray<number>;

//   constructor() {
//     // pass
//   }

//   disconnect() {
//     return null;
//   }

//   observe() {
//     return null;
//   }

//   takeRecords() {
//     return null;
//   }

//   unobserve() {
//     return null;
//   }
// };

// Mock depended services with msw
// beforeAll(() => {
//   // Enable the mocking in tests.
//   server.listen();
// });
// afterEach(() => {
//   // Reset any runtime handlers tests may use.
//   server.resetHandlers();
// });
// afterAll(() => {
//   // Clean up once the tests are done.
//   server.close();
// });
