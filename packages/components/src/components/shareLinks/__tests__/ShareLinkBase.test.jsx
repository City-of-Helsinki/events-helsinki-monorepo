import React from 'react';

import { fireEvent, render, screen } from '@/test-utils';
import ShareLinkBase from '../ShareLinkBase';
const renderComponent = (props) => render(<ShareLinkBase {...props} />);
const testLabel = 'Share Link';
const testWindowName = 'Window name';

let jestOpen = null;

beforeAll(() => {
  jestOpen = window.open;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  window.open = () => {};
});

afterAll(() => {
  window.open = jestOpen;
});

it('should apply an aria label', () => {
  renderComponent({
    linkLabel: testLabel,
    windowName: testWindowName,
  });

  expect(screen.getByLabelText(testLabel)).toBeDefined();
});

it('should have button attribute', () => {
  renderComponent({
    linkLabel: testLabel,
    windowName: testWindowName,
  });

  expect(screen.getByLabelText(testLabel)).toHaveAttribute('type', 'button');
});

it('should launch sharing link in a pop up window with encoded uri components', () => {
  const url = 'https://localhost';
  const queryParameters = {
    url: 'https://helsinki.fi/path/',
  };
  const spy = jest.spyOn(window, 'open');
  renderComponent({
    linkLabel: testLabel,
    queryParameters,
    url,
    windowName: testWindowName,
  });
  const link = screen.getByLabelText(testLabel);

  fireEvent.click(link);

  expect(spy).toHaveBeenLastCalledWith(
    `${url}?url=${encodeURIComponent(queryParameters.url)}`,
    testWindowName,
    expect.any(String)
  );
});
