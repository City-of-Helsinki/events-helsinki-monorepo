import React from 'react';
import { vi } from 'vitest';
import { act, fireEvent, render, screen } from '@/test-utils';
import CopyButton from '../CopyButton';

// `copy-to-clipboard` is not jsdom compatible so we are replacing it with a
// simple function call.
vi.mock('copy-to-clipboard', () => vi.fn());

const testString = 'Test string';
const testLabel = 'Test label';
const testMessage = 'Copied successfully';
const defaultProps = {
  'aria-label': testLabel,
  string: testString,
  successMessage: testMessage,
};
const renderComponent = (props) =>
  render(<CopyButton {...defaultProps} {...props} />);

it('should show success message when copying succeeds that displays for 4 seconds', () => {
  vi.useFakeTimers();

  renderComponent();

  fireEvent.click(screen.getByLabelText(testLabel));

  expect(screen.getByText(testMessage)).toBeInTheDocument();

  // Fast forwards by 4s
  act(() => {
    vi.advanceTimersByTime(4000);
  });

  expect(screen.queryByText(testMessage)).not.toBeInTheDocument();
});

it('should add success class for 4s after a successful copy', () => {
  vi.useFakeTimers();
  const testClass = 'class';
  const testSuccessClass = 'success-class';
  renderComponent({
    className: testClass,
    successClass: testSuccessClass,
  });

  fireEvent.click(screen.getByLabelText(testLabel));
  expect(screen.getByLabelText(testLabel)).toHaveClass(
    testClass,
    testSuccessClass
  );

  act(() => {
    vi.advanceTimersByTime(4000);
  });

  expect(screen.getByLabelText(testLabel)).toHaveClass(testClass);
});
