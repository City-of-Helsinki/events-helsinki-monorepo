/* eslint-disable @typescript-eslint/no-require-imports */
import '@testing-library/jest-dom/extend-expect';
import { TextEncoder, TextDecoder } from 'util';
// import { initI18n } from '@events-helsinki/common-i18n';

import { loadEnvConfig } from '@next/env';
// import { server } from "./tests/mocks/server";
import { toHaveNoViolations } from 'jest-axe';

const trueEnv = ['true', '1', 'yes'];
const isCI = trueEnv.includes(process.env?.CI ?? 'false');

// Raise the default timeout from 5000
jest.setTimeout(process.env?.CI ? 50_000 : 10_000);

// Mock the NextJS-router
jest.mock('next/router', () => require('next-router-mock'));
jest.mock('next/dist/client/router', () => require('next-router-mock'));

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

// https://stackoverflow.com/questions/67872622/jest-spyon-not-working-on-index-file-cannot-redefine-property/69951703#69951703
jest.mock('../src/hooks/useLocale', () => ({
  __esModule: true,
  ...jest.requireActual('../src/hooks/useLocale'),
}));

loadEnvConfig(process.cwd());

// Mock the fetch
// global.fetch = jest.fn();

// mock scrollTo in order to fix: "Error: Not implemented: window.scrollTo"
global.scrollTo = jest.fn();

// Extend except with jest-axe
expect.extend(toHaveNoViolations);

// To avoid error: ReferenceError: TextEncoder is not defined
// discusssed here: https://github.com/jsdom/jsdom/issues/2524
global.TextEncoder = TextEncoder;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.TextDecoder = TextDecoder as any;
