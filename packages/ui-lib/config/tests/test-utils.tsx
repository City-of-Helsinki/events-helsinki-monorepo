/**
 * Automatically add app-providers
 * @see https://testing-library.com/docs/react-testing-library/setup#configuring-jest-with-test-utils
 */

import { fireEvent, render } from '@testing-library/react';
import type React from 'react';
import { AppTestProviders } from './app-test-providers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customRender = (ui: React.ReactElement, options?: any) =>
  render(ui, { wrapper: AppTestProviders, ...options });

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

// re-export everything
export { default as userEvent } from '@testing-library/user-event';
export * from '@testing-library/react';

// override render method
export { customRender as render };
