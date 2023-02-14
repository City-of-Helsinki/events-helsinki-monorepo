import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KeywordListDocument } from 'events-helsinki-components';
import * as React from 'react';

import {
  arrowDownKeyPressHelper,
  arrowUpKeyPressHelper,
  enterKeyPressHelper,
  escKeyPressHelper,
  render,
  tabKeyPressHelper,
} from '@/test-utils';
import { fakeKeywords } from '@/test-utils/mockDataUtils';
import type { SearchAutosuggestProps } from '../SearchAutosuggest';
import SearchAutosuggest from '../SearchAutosuggest';

const searchValue = 'musiikk';
const placeholder = 'Placeholder text';

const keywordNames = [
  'musiikki',
  'taidemusiikki',
  'populaarimusiikki',
  'musiikkiklubit',
  'elävä musiikki',
];

const keywords = fakeKeywords(
  keywordNames.length,
  keywordNames.map((keyword) => ({ name: { fi: keyword } }))
);
const keywordListResponse = { data: { keywordList: keywords } };

const mocks = [
  {
    request: {
      query: KeywordListDocument,
      variables: {
        hasUpcomingEvents: true,
        pageSize: 5,
        text: searchValue,
      },
    },
    result: keywordListResponse,
  },
];

const defaultProps = {
  name: 'search',
  onChangeSearchValue: jest.fn(),
  onOptionClick: jest.fn(),
  placeholder,
  searchValue,
};
const renderComponent = (props?: Partial<SearchAutosuggestProps>) =>
  render(<SearchAutosuggest {...defaultProps} {...props} />, { mocks });

it('should close menu with esc key', async () => {
  renderComponent();
  const searchInput = screen.getByPlaceholderText(placeholder);

  await userEvent.click(searchInput);

  expect(screen.getByRole('listbox')).toBeInTheDocument();

  escKeyPressHelper();

  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
});

it('should close menu with tab key', async () => {
  renderComponent();
  const searchInput = screen.getByPlaceholderText(placeholder);

  await userEvent.click(searchInput);

  expect(screen.getByRole('listbox')).toBeInTheDocument();

  tabKeyPressHelper();

  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
});

it('should allow navigation with down arrows', async () => {
  renderComponent();
  const searchInput = screen.getByPlaceholderText(placeholder);

  await userEvent.click(searchInput);

  const options = screen.getAllByRole('option');

  arrowDownKeyPressHelper();
  expect(options[0]).toHaveClass('autosuggestOption--isFocused');
  expect(options[0]).toHaveTextContent(searchValue);

  keywords.data.forEach((keyword, index) => {
    arrowDownKeyPressHelper();
    expect(options[index + 1]).toHaveClass('autosuggestOption--isFocused');
    const text = keyword.name?.fi;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(options[index + 1]).toHaveTextContent(text!);
  });
});

it('should allow navigation with up arrows', async () => {
  renderComponent();
  const searchInput = screen.getByPlaceholderText(placeholder);

  await userEvent.click(searchInput);

  const options = screen.getAllByRole('option');

  const reversedKeywords = [...keywords.data].reverse();

  reversedKeywords.forEach((keyword, index) => {
    arrowUpKeyPressHelper();
    const text = keyword.name?.fi;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(options[reversedKeywords.length - index]).toHaveTextContent(text!);
    expect(options[reversedKeywords.length - index]).toHaveClass(
      'autosuggestOption--isFocused'
    );
  });

  arrowUpKeyPressHelper();
  expect(options[0]).toHaveClass('autosuggestOption--isFocused');
  expect(options[0]).toHaveTextContent(searchValue);
});

it('first item should be focused when opening menu by down arrow', async () => {
  renderComponent();
  const searchInput = screen.getByPlaceholderText(placeholder);

  await userEvent.click(searchInput);

  escKeyPressHelper();

  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

  arrowDownKeyPressHelper();

  const options = screen.getAllByRole('option');

  expect(options[0]).toHaveClass('autosuggestOption--isFocused');
  expect(options[0]).toHaveTextContent(searchValue);
});

it('last item should be focused when opening menu by up arrow', async () => {
  renderComponent();
  const searchInput = screen.getByPlaceholderText(placeholder);

  await userEvent.click(searchInput);

  escKeyPressHelper();

  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

  arrowUpKeyPressHelper();

  const options = screen.getAllByRole('option');
  const lastIndex = keywords.data.length;
  const keyword = keywords.data[lastIndex - 1];
  const text = keyword?.name?.fi;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  expect(options[lastIndex]).toHaveTextContent(text!);
  expect(options[lastIndex]).toHaveClass('autosuggestOption--isFocused');
});

it('should call onOptionClick by text is no option is selected', async () => {
  const onEnter = jest.fn();
  renderComponent({ onOptionClick: onEnter });
  const searchInput = screen.getByPlaceholderText(placeholder);

  await userEvent.click(searchInput);

  enterKeyPressHelper();

  expect(onEnter).toHaveBeenCalledWith({
    text: searchValue,
    type: 'text',
    value: searchValue,
  });
});

it('should call onOptionClick by text is first option is selected', async () => {
  const onEnter = jest.fn();
  renderComponent({ onOptionClick: onEnter });
  const searchInput = screen.getByPlaceholderText(placeholder);

  await userEvent.click(searchInput);

  arrowDownKeyPressHelper();
  enterKeyPressHelper();

  expect(onEnter).toHaveBeenCalledWith({
    text: searchValue,
    type: 'text',
    value: searchValue,
  });
});

it('should call onOptionClick with option if keyword is selected', async () => {
  const onEnter = jest.fn();
  renderComponent({ onOptionClick: onEnter });
  const searchInput = screen.getByPlaceholderText(placeholder);

  await userEvent.click(searchInput);

  arrowDownKeyPressHelper();
  arrowDownKeyPressHelper();
  enterKeyPressHelper();
  const keyword = keywords.data[0];
  expect(onEnter).toHaveBeenCalledWith({
    text: keyword.name?.fi,
    type: 'keyword',
    value: keyword.id,
  });
});
