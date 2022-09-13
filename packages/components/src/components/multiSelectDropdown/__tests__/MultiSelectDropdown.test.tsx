import React from 'react';
import {
  arrowDownKeyPressHelper,
  arrowUpKeyPressHelper,
  enterKeyPressHelper,
  escKeyPressHelper,
  render,
  userEvent,
  waitFor,
  screen,
  fireEvent,
  act,
} from '@/test-utils';
import type { MultiselectDropdownProps } from '../MultiSelectDropdown';
import MultiSelectDropdown from '../MultiSelectDropdown';

const onChange = jest.fn();
const options = [
  {
    text: 'Squirrel',
    value: 'value1',
  },
  {
    text: 'Elephant',
    value: 'value2',
  },
  {
    text: 'Dog',
    value: 'value3',
  },
];
const title = 'test title';
const inputPlaceholder = 'Kirjoita hakusana';

const defaultProps: MultiselectDropdownProps = {
  checkboxName: 'multiselect-dropdown',
  icon: <div />,
  inputPlaceholder,
  name: 'test MultiSelectDropdown',
  onChange,
  options,
  showSearch: true,
  title,
  value: [],
};
const renderComponent = (props?: Partial<MultiselectDropdownProps>) =>
  render(<MultiSelectDropdown {...defaultProps} {...props} />);

it('should set focus to input after clicking toggle button', async () => {
  renderComponent();

  const toggleButton = screen.getByRole('button', { name: title });
  await userEvent.click(toggleButton);
  await waitFor(() => {
    expect(screen.getByPlaceholderText(inputPlaceholder)).toHaveFocus();
  });
});

it('should filter results based on user search and options[].text field', async () => {
  renderComponent();

  const toggleButton = screen.getByRole('button', { name: title });
  await userEvent.click(toggleButton);

  const searchInput = screen.getByPlaceholderText(inputPlaceholder);
  await userEvent.type(searchInput, 'Ele');

  expect(
    screen.getByRole('checkbox', { name: 'Elephant' })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('checkbox', { name: 'Dox' })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('checkbox', { name: 'Squirrel' })
  ).not.toBeInTheDocument();
});

it('should reset keyboard navigation position after a new search', async () => {
  renderComponent();

  const toggleButton = screen.getByRole('button', { name: title });

  fireEvent.click(toggleButton);

  const searchInput = screen.getByPlaceholderText(inputPlaceholder);
  await act(async () => searchInput.focus());

  arrowDownKeyPressHelper();

  expect(
    screen.getByRole('checkbox', { name: options[0].text }).parentElement
      ?.parentElement
  ).toHaveClass('dropdownItem--isFocused');

  // Find something, then reset the search to ensure that all results are listed
  fireEvent.change(searchInput, { target: { value: 'Ele' } });
  fireEvent.change(searchInput, { target: { value: '' } });

  const allOptions = options.map(({ text }) => text);

  // No element should have focus
  allOptions.forEach((text) => {
    expect(
      screen.getByRole('checkbox', { name: text }).parentElement?.parentElement
    ).not.toHaveClass('dropdownItem--isFocused');
  });
});

describe('ArrowUp, ArrowDown', () => {
  it('should allow navigation with up and down arrows', async () => {
    renderComponent();

    const toggleButton = screen.getByRole('button', { name: title });
    await userEvent.click(toggleButton);

    arrowDownKeyPressHelper();
    arrowDownKeyPressHelper();

    expect(
      screen.queryByRole('checkbox', { name: options[1].text })?.parentElement
        ?.parentElement
    ).toHaveClass('dropdownItem--isFocused');

    arrowUpKeyPressHelper();

    expect(
      screen.queryByRole('checkbox', { name: options[0].text })?.parentElement
        ?.parentElement
    ).toHaveClass('dropdownItem--isFocused');
  });

  it('should select last item if the first keyboard navigation is button up', async () => {
    renderComponent();

    const toggleButton = screen.getByRole('button', { name: title });
    await userEvent.click(toggleButton);

    arrowUpKeyPressHelper();

    expect(
      screen.getByRole('checkbox', { name: options[options.length - 1].text })
        ?.parentElement?.parentElement
    ).toHaveClass('dropdownItem--isFocused');
  });

  it('should reset to start position when user goes up in the first member of the list', async () => {
    renderComponent();

    const toggleButton = screen.getByRole('button', { name: title });
    userEvent.click(toggleButton);

    arrowDownKeyPressHelper();
    arrowUpKeyPressHelper();

    // No element should have focus
    options.forEach((option) => {
      expect(
        screen.getByRole('checkbox', { name: option.text }).parentElement
      ).not.toHaveClass('dropdownItem--isFocused');
    });
  });

  it('should reset to start position when user goes down from the last member of the list', async () => {
    renderComponent();

    const toggleButton = screen.getByRole('button', { name: title });
    await userEvent.click(toggleButton);

    // No element should have focus
    options.forEach((option) => {
      expect(
        screen.getByRole('checkbox', { name: option.text }).parentElement
      ).not.toHaveClass('dropdownItem--isFocused');
    });
  });
});

describe('Escape', () => {
  it('should close suggestions with escape', async () => {
    renderComponent();

    const toggleButton = screen.getByRole('button', { name: title });
    await userEvent.click(toggleButton);

    // Check that we can find some of the content of the MultiSelectDropdown: this suggests
    // that it is open.
    expect(
      screen.getByRole('checkbox', { name: options[0].text })
    ).toBeInTheDocument();

    escKeyPressHelper();

    // Assert that we can no longer find the menu content after we have pressed
    // Escape.
    expect(
      screen.queryByRole('checkbox', { name: options[0].text })
    ).not.toBeInTheDocument();
  });
});

it('should not open dropdown when user focuses toggle button', async () => {
  renderComponent();

  const toggleButton = screen.getByRole('button', { name: title });
  toggleButton.focus();

  expect(
    screen.queryByRole('checkbox', { name: options[0].text })
  ).not.toBeInTheDocument();
});

it('should open dropdown when user clicks on toggle button', async () => {
  renderComponent();

  const toggleButton = screen.getByRole('button', { name: title });
  await userEvent.click(toggleButton);

  expect(
    screen.getByRole('checkbox', { name: options[0].text })
  ).toBeInTheDocument();
});

it('should call onChange when clicking checkbox', async () => {
  const onChange = jest.fn();
  renderComponent({ onChange });

  const toggleButton = screen.getByRole('button', { name: title });
  await userEvent.click(toggleButton);

  await userEvent.click(
    screen.getByRole('checkbox', { name: options[0].text })
  );

  expect(onChange).toHaveBeenCalledWith([options[0].value]);
});

it('should uncheck option', async () => {
  const onChange = jest.fn();
  renderComponent({ onChange, value: [options[0].value] });

  const toggleButton = screen.getByRole('button', { name: title });
  await userEvent.click(toggleButton);

  await userEvent.click(
    screen.getByRole('checkbox', { name: options[0].text })
  );
  expect(onChange).toHaveBeenCalledWith([]);
});

it('should call onChange with empty array when clicking select all checkbox', async () => {
  const onChange = jest.fn();
  renderComponent({
    onChange,
    selectAllText: '',
    showSelectAll: true,
    value: [options[0].value],
  });

  const toggleButton = screen.getByRole('button', { name: title });
  await userEvent.click(toggleButton);

  await userEvent.click(
    screen.getByRole('checkbox', {
      name: 'common.multiSelectDropdown.selectAll',
    })
  );
  expect(onChange).toHaveBeenCalledWith([]);
});

it('should show selected text for single value', async () => {
  renderComponent({ value: [options[0].value] });

  expect(await screen.findByText(options[0].text)).toBeInTheDocument();
});

it('should show selected text for single value 2', async () => {
  renderComponent({ value: [options[0].value, options[1].value] });

  expect(await screen.findByText(`${options[1].text} + 1`)).toBeInTheDocument();
});

describe('when dropdown has been closed, it should reopen with', () => {
  const getClosedInput = async () => {
    renderComponent();

    const toggleButton = screen.getByRole('button', { name: title });
    await userEvent.click(toggleButton);

    escKeyPressHelper();

    expect(
      screen.queryByRole('checkbox', { name: options[0].text })
    ).not.toBeInTheDocument();

    expect(toggleButton).toHaveFocus();
  };

  it('Enter', async () => {
    await getClosedInput();

    enterKeyPressHelper();

    expect(
      screen.getByRole('checkbox', { name: options[0].text })
    ).toBeInTheDocument();
  });

  it('ArrowDown', async () => {
    await getClosedInput();

    arrowDownKeyPressHelper();

    expect(
      screen.getByRole('checkbox', { name: options[0].text })
    ).toBeInTheDocument();
  });

  it('ArrowUp', async () => {
    await getClosedInput();

    arrowDownKeyPressHelper();

    expect(
      screen.getByRole('checkbox', { name: options[0].text })
    ).toBeInTheDocument();
  });
});
