import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  userEvent,
} from '@/test-utils';
import type { RangeDropdownProps } from '../RangeDropdown';
import RangeDropdown from '../RangeDropdown';

const title = 'test title';

const defaultProps: RangeDropdownProps = {
  icon: <div />,
  rangeIcon: <div />,
  minInputStartValue: '0',
  minInputValue: '0',
  minInputFixedValue: '18',
  minInputLabel: 'Start integer',
  maxInputEndValue: '100',
  maxInputValue: '100',
  maxInputLabel: 'End integer',
  maxInputFixedValue: '80',
  name: 'range',
  onChange: vi.fn(),
  fixedValuesText: 'Set default values',
  showFixedValuesText: true,
  title: title,
  value: [],
};
const renderComponent = (props?: Partial<RangeDropdownProps>) => {
  const { rerender, ...utils } = render(
    <RangeDropdown {...defaultProps} {...props} />
  );
  return {
    ...utils,
    rerender: (props?: Partial<RangeDropdownProps>) =>
      rerender(<RangeDropdown {...defaultProps} {...props} />),
  };
};

describe('Escape', () => {
  it('should close range dropdown with escape', async () => {
    renderComponent();

    const toggleButton = screen.getByRole('button', { name: title });
    await userEvent.click(toggleButton);

    expect(
      screen.getByRole('spinbutton', {
        name: /start integer/i,
      })
    ).toBeInTheDocument();

    fireEvent.keyDown(toggleButton, { code: 27, key: 'Escape' });

    // Assert that we can no longer find the menu content after we have pressed
    // Escape.
    expect(
      screen.queryByRole('spinbutton', {
        name: /start integer/i,
      })
    ).not.toBeInTheDocument();
  });
});

it('should not open dropdown when user focuses toggle button', () => {
  renderComponent();

  const toggleButton = screen.getByRole('button', { name: title });
  act(() => toggleButton.focus());

  expect(
    screen.queryByRole('spinbutton', {
      name: /start integer/i,
    })
  ).not.toBeInTheDocument();
});

it('should open dropdown when user clicks on toggle button', async () => {
  renderComponent();

  const toggleButton = screen.getByRole('button', { name: title });
  await userEvent.click(toggleButton);

  expect(
    screen.getByRole('spinbutton', {
      name: /start integer/i,
    })
  ).toBeInTheDocument();
});

it('should open dropdown when toggle button is active and user presses ArrowDown', () => {
  renderComponent();

  const toggleButton = screen.getByRole('button', { name: title });
  act(() => toggleButton.focus());

  fireEvent.keyDown(toggleButton, { code: 40, key: 'ArrowDown' });

  expect(
    screen.getByRole('spinbutton', {
      name: /start integer/i,
    })
  ).toBeInTheDocument();
});

it('should close dropdown when toggle button is active and user presses ArrowUp', () => {
  renderComponent();

  const toggleButton = screen.getByRole('button', { name: title });
  act(() => toggleButton.focus());

  fireEvent.keyDown(toggleButton, { code: 38, key: 'ArrowUp' });

  expect(
    screen.queryByRole('spinbutton', {
      name: /start integer/i,
    })
  ).not.toBeInTheDocument();
});

it('can be navigated with tab', async () => {
  renderComponent();
  const toggleButton = screen.getByRole('button', { name: title });
  await userEvent.click(toggleButton);

  const minValueTextbox = screen.queryByRole('spinbutton', {
    name: /start integer/i,
  }) as HTMLInputElement;

  const maxValueTextbox = screen.queryByRole('spinbutton', {
    name: /end integer/i,
  }) as HTMLInputElement;

  await userEvent.tab();
  await waitFor(() => {
    expect(minValueTextbox).toHaveFocus();
  });

  await userEvent.tab();
  await waitFor(() => {
    expect(maxValueTextbox).toHaveFocus();
  });
});

it('should call onChange correctly when setting fixed values with checkbox', async () => {
  const onChange = vi.fn();
  const { rerender } = renderComponent({ onChange });

  const toggleButton = screen.getByRole('button', { name: title });
  await userEvent.click(toggleButton);

  const minValueTextbox = screen.queryByRole('spinbutton', {
    name: /start integer/i,
  }) as HTMLInputElement;
  const maxValueTextbox = screen.queryByRole('spinbutton', {
    name: /end integer/i,
  }) as HTMLInputElement;
  const setDefaultsCheckbox = screen.getByRole('checkbox', {
    name: /set default values/i,
  });

  expect(minValueTextbox).toBeInTheDocument();
  expect(minValueTextbox).toHaveValue(0);
  expect(maxValueTextbox).toBeInTheDocument();
  expect(maxValueTextbox).toHaveValue(100);
  expect(setDefaultsCheckbox).toBeInTheDocument();

  // click defaults
  await userEvent.click(setDefaultsCheckbox);

  expect(onChange).toHaveBeenCalledWith('18', '80');

  expect(minValueTextbox).toHaveAttribute('disabled');
  expect(maxValueTextbox).toHaveAttribute('disabled');

  expect(minValueTextbox).toHaveValue(0);
  expect(maxValueTextbox).toHaveValue(100);

  rerender({ minInputValue: '18', maxInputValue: '80' });

  expect(minValueTextbox).toHaveValue(18);
  expect(maxValueTextbox).toHaveValue(80);
});

describe('Validation', () => {
  it('should fix min value and max value if initial values are negative', async () => {
    const onChange = vi.fn();
    const { rerender } = renderComponent({ onChange });

    const toggleButton = screen.getByRole('button', { name: title });
    await userEvent.click(toggleButton);
    await userEvent.tab();
    const minValueTextbox = screen.queryByRole('spinbutton', {
      name: /start integer/i,
    }) as HTMLInputElement;
    const maxValueTextbox = screen.queryByRole('spinbutton', {
      name: /end integer/i,
    }) as HTMLInputElement;

    expect(minValueTextbox).toBeInTheDocument();
    expect(minValueTextbox).toHaveValue(0);
    expect(maxValueTextbox).toBeInTheDocument();
    expect(maxValueTextbox).toHaveValue(100);

    // min is negative
    rerender({ minInputValue: '-1', maxInputValue: '100', onChange });

    await userEvent.tab();
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('0', '100');
    });

    // max is negative
    rerender({ minInputValue: '0', maxInputValue: '-1', onChange });

    await userEvent.tab();
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('0', '0');
    });
  });

  it('should fix min value and max value if min > max', async () => {
    const onChange = vi.fn();
    const { rerender } = renderComponent({ onChange });

    const toggleButton = screen.getByRole('button', { name: title });
    await userEvent.click(toggleButton);
    await userEvent.tab();
    const minValueTextbox = screen.queryByRole('spinbutton', {
      name: /start integer/i,
    }) as HTMLInputElement;
    const maxValueTextbox = screen.queryByRole('spinbutton', {
      name: /end integer/i,
    }) as HTMLInputElement;

    expect(minValueTextbox).toBeInTheDocument();
    expect(minValueTextbox).toHaveValue(0);
    expect(maxValueTextbox).toBeInTheDocument();
    expect(maxValueTextbox).toHaveValue(100);

    rerender({ minInputValue: '10', maxInputValue: '5', onChange });

    await userEvent.tab();
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('5', '5');
    });
  });
});
