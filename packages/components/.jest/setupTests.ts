/* eslint-disable @typescript-eslint/no-require-imports */
import '@testing-library/jest-dom/extend-expect';
import { TextEncoder, TextDecoder } from 'util';
// import { initI18n } from 'events-helsinki-common-i18n';

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
