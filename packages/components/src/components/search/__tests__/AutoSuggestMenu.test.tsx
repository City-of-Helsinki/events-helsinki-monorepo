import * as React from 'react';

import { render } from '@/test-utils';
import { AUTOSUGGEST_TYPES } from '../../../constants';
import AutoSuggestMenu from '../AutoSuggestMenu';
it('AutosuggestMenu matches snapshot', () => {
  const { container } = render(
    <AutoSuggestMenu
      focusedOption={0}
      options={[{ text: 'foo', type: AUTOSUGGEST_TYPES.TEXT, value: 'foo' }]}
      isOpen={true}
      onClose={jest.fn()}
      onOptionClick={jest.fn()}
    />
  );

  expect(container.firstChild).toMatchSnapshot();
});
