import translations from 'events-helsinki-common-i18n/locales/fi/common.json';
import * as React from 'react';
import {
  arrowDownKeyPressHelper,
  arrowUpKeyPressHelper,
  escKeyPressHelper,
  render,
  screen,
  userEvent,
  waitFor,
} from '@/test-utils';
import { DATE_TYPES } from '../../../../src/constants';
import type { DateSelectorProps } from '../DateSelector';
import DateSelector from '../DateSelector';
import { testIds } from '../DateSelectorMenu';

const defaultProps: DateSelectorProps = {
  dateTypes: [],
  endDate: null,
  isCustomDate: false,
  name: 'date',
  onChangeDateTypes: jest.fn(),
  onChangeEndDate: jest.fn(),
  onChangeStartDate: jest.fn(),
  startDate: null,
  toggleIsCustomDate: jest.fn(),
};

const renderComponent = (props?: Partial<DateSelectorProps>) =>
  render(<DateSelector {...defaultProps} {...props} />);

it('should render selected date types when single option is selected', () => {
  renderComponent({ dateTypes: [DATE_TYPES.TODAY] });

  expect(
    screen.getByText(translations.dateSelector.dateTypeToday)
  ).toBeInTheDocument();
});

it('should render selected date types when multiple options are selected', () => {
  renderComponent({ dateTypes: [DATE_TYPES.TOMORROW, DATE_TYPES.TODAY] });

  expect(
    screen.getByText(`${translations.dateSelector.dateTypeToday} + 1`)
  ).toBeInTheDocument();
});

it('should add date type', async () => {
  const onChangeDateTypes = jest.fn();
  renderComponent({
    dateTypes: [],
    onChangeDateTypes,
  });

  const toggleButton = screen.getByRole('button', {
    name: translations.dateSelector.title,
  });

  await userEvent.click(toggleButton);
  expect(screen.getByTestId(testIds.menu)).toBeInTheDocument();

  await userEvent.click(
    screen.getByRole('checkbox', {
      name: translations.dateSelector.dateTypeToday,
    })
  );

  expect(onChangeDateTypes).toHaveBeenCalledWith([DATE_TYPES.TODAY]);
});

it('should call toggleIsCustomDate function', async () => {
  const toggleIsCustomDate = jest.fn();
  renderComponent({
    dateTypes: [],
    toggleIsCustomDate,
  });

  const toggleButton = screen.getByRole('button', {
    name: translations.dateSelector.title,
  });

  await userEvent.click(toggleButton);
  expect(screen.getByTestId(testIds.menu)).toBeInTheDocument();

  const customDatesButton = screen.getByRole('button', {
    name: translations.dateSelector.menu.buttonCustom,
  });
  await userEvent.click(customDatesButton);

  expect(toggleIsCustomDate).toHaveBeenCalled();
});

it('should remove date type', async () => {
  const onChangeDateTypes = jest.fn();
  renderComponent({
    dateTypes: [DATE_TYPES.TODAY, DATE_TYPES.TOMORROW],
    onChangeDateTypes,
  });

  const toggleButton = screen.getByRole('button', {
    name: translations.dateSelector.title,
  });

  await userEvent.click(toggleButton);
  expect(screen.getByTestId(testIds.menu)).toBeInTheDocument();

  await userEvent.click(
    screen.getByRole('checkbox', {
      name: translations.dateSelector.dateTypeToday,
    })
  );

  expect(onChangeDateTypes).toHaveBeenCalledWith([DATE_TYPES.TOMORROW]);
});

describe('should open menu with', () => {
  const getClosedMenu = async () => {
    renderComponent();

    const toggleButton = screen.getByRole('button', {
      name: translations.dateSelector.title,
    });

    await userEvent.click(toggleButton);
    expect(screen.getByTestId(testIds.menu)).toBeInTheDocument();

    escKeyPressHelper();

    await waitFor(() =>
      expect(screen.queryByTestId(testIds.menu)).not.toBeInTheDocument()
    );
    expect(toggleButton).toHaveFocus();
  };

  it('ArrowDown', async () => {
    await getClosedMenu();

    arrowDownKeyPressHelper();

    expect(screen.getByTestId(testIds.menu)).toBeInTheDocument();
  });

  it('ArrowUp', async () => {
    await getClosedMenu();

    arrowUpKeyPressHelper();

    expect(screen.getByTestId(testIds.menu)).toBeInTheDocument();
  });
});
