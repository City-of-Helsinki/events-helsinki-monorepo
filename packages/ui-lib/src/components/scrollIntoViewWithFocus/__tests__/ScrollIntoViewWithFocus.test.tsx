import React from 'react';
import { vi } from 'vitest';
import { render } from '@/test-utils';
import ScrollIntoViewWithFocus from '../ScrollIntoViewWithFocus';

it('should scroll to component when focused', async () => {
  const scrollIntoViewMock = vi.fn();
  window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
  render(
    <ScrollIntoViewWithFocus isFocused={true}>
      <span>CHILDREN</span>
    </ScrollIntoViewWithFocus>
  );

  expect(scrollIntoViewMock).toHaveBeenCalledWith({
    block: 'nearest',
    inline: 'nearest',
  });
});
