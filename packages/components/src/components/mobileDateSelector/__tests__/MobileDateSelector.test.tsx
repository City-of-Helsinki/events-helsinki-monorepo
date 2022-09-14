import userEvent from '@testing-library/user-event';
import { DATE_TYPES } from 'events-helsinki-core';
import React from 'react';
import {
  arrowDownKeyPressHelper,
  arrowUpKeyPressHelper,
  escKeyPressHelper,
  render,
  screen,
  waitFor,
} from '@/test-utils';
import MobileDateSelector from '../MobileDateSelector';
import { testIds } from '../MobileDateSelectorMenu';

const dateTypeOptions = [
  'Tänään',
  'Huomenna',
  'Viikonloppuna',
  'Tällä viikolla',
  'Valitse päivät',
];

const defaultProps = {
  dateTypes: [DATE_TYPES.TODAY, DATE_TYPES.WEEKEND],
  endDate: null,
  onChangeDateTypes: jest.fn(),
  onChangeEndDate: jest.fn(),
  onChangeStartDate: jest.fn(),
  startDate: null,
};

const renderComponent = (props?: any) =>
  render(<MobileDateSelector {...defaultProps} {...props} />);

it('should have correct date types selected', async () => {
  renderComponent();

  expect(screen.getByRole('button', { name: dateTypeOptions[0] })).toHaveClass(
    'isSelected'
  );
  expect(
    screen.getByRole('button', { name: dateTypeOptions[1] })
  ).not.toHaveClass('isSelected');
  expect(screen.getByRole('button', { name: dateTypeOptions[2] })).toHaveClass(
    'isSelected'
  );
  expect(
    screen.getByRole('button', { name: dateTypeOptions[3] })
  ).not.toHaveClass('isSelected');
  expect(
    screen.getByRole('button', { name: dateTypeOptions[4] })
  ).not.toHaveClass('isSelected');
});

it('should call onChangeDateTypes and unselect option', async () => {
  const onChangeDateTypes = jest.fn();
  renderComponent({ onChangeDateTypes });
  await userEvent.click(
    screen.getByRole('button', { name: dateTypeOptions[0] })
  );
  expect(onChangeDateTypes).toHaveBeenCalledWith([DATE_TYPES.WEEKEND]);
});

it('should call onChangeDateTypes and select option', async () => {
  const onChangeDateTypes = jest.fn();
  renderComponent({ onChangeDateTypes, dateTypes: [] });

  await userEvent.click(
    screen.getByRole('button', { name: dateTypeOptions[0] })
  );
  expect(onChangeDateTypes).toHaveBeenCalledWith([DATE_TYPES.TODAY]);
});

it('custom date type should be selected when startDate is selected', async () => {
  renderComponent({ startDate: new Date('2018-12-12') });

  expect(screen.getByRole('button', { name: dateTypeOptions[4] })).toHaveClass(
    'isSelected'
  );
});

it('custom date type should be selected when endDate is selected', async () => {
  renderComponent({ startDate: new Date('2018-12-12') });

  expect(screen.getByRole('button', { name: dateTypeOptions[4] })).toHaveClass(
    'isSelected'
  );
});

it('should close date selector menu with escape', async () => {
  renderComponent();
  await userEvent.click(
    screen.getByRole('button', { name: /valitse päivät/i })
  );

  // Check that menu is open
  await waitFor(() => {
    expect(screen.getByTestId(testIds.menu)).toBeInTheDocument();
  });
  escKeyPressHelper();
  // Check that menu is closed
  expect(screen.queryByTestId(testIds.menu)).not.toBeInTheDocument();
});

it('should close date selector menu with close button', async () => {
  renderComponent();
  await userEvent.click(
    screen.getByRole('button', { name: /valitse päivät/i })
  );
  // Check that menu is open
  await waitFor(() => {
    expect(screen.getByTestId(testIds.menu)).toBeInTheDocument();
  });
  await userEvent.click(screen.getByRole('button', { name: /sulje/i }));

  // Check that menu is closed
  expect(screen.queryByTestId(testIds.menu)).not.toBeInTheDocument();
});

describe('when menu has been closed, it should reopen with', () => {
  const renderClosedMenu = async () => {
    renderComponent();

    await userEvent.click(
      screen.getByRole('button', { name: /valitse päivät/i })
    );

    await waitFor(() => {
      expect(screen.getByTestId(testIds.menu)).toBeInTheDocument();
    });

    escKeyPressHelper();

    expect(screen.queryByTestId(testIds.menu)).not.toBeInTheDocument();

    arrowDownKeyPressHelper();

    expect(screen.getByTestId(testIds.menu)).toBeInTheDocument();
  };

  it('ArrowDown', async () => {
    await renderClosedMenu();

    arrowDownKeyPressHelper();

    await waitFor(() => {
      expect(screen.getByTestId(testIds.menu)).toBeInTheDocument();
    });
  });

  it('ArrowUp', async () => {
    renderClosedMenu();

    arrowUpKeyPressHelper();

    await waitFor(() => {
      expect(screen.getByTestId(testIds.menu)).toBeInTheDocument();
    });
  });
});
