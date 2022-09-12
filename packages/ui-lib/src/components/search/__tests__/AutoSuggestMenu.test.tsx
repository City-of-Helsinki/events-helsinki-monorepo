import { AUTOSUGGEST_TYPES } from '@events-helsinki/core-lib';
import * as React from 'react';

import { vi } from 'vitest';
import AutoSuggestMenu from '@/components/search/AutoSuggestMenu';
import { render } from '@/test-utils';
it('AutosuggestMenu matches snapshot', () => {
  const { container } = render(
    <AutoSuggestMenu
      focusedOption={0}
      options={[{ text: 'foo', type: AUTOSUGGEST_TYPES.TEXT, value: 'foo' }]}
      isOpen={true}
      onClose={vi.fn()}
      onOptionClick={vi.fn()}
    />
  );

  expect(container.firstChild).toMatchSnapshot();
});
