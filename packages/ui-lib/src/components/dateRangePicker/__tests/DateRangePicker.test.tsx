import userEvent from '@testing-library/user-event';
import { utcToZonedTime } from 'date-fns-tz';
import { advanceTo } from 'jest-date-mock';
import React from 'react';
import { vi } from 'vitest';
import type { DateRangePickerProps } from '@/components/dateRangePicker/DateRangePicker';
import DateRangePicker from '@/components/dateRangePicker/DateRangePicker';
import { configure, render, screen } from '@/test-utils';

configure({ defaultHidden: true });
const defaultProps: DateRangePickerProps = {
  endDate: null,
  onChangeEndDate: vi.fn(),
  onChangeStartDate: vi.fn(),
  startDate: null,
};

beforeEach(() => {
  vi.resetAllMocks();
  advanceTo('2020-10-10');
});
const renderComponent = (props?: Partial<DateRangePickerProps>) => {
  render(<DateRangePicker {...defaultProps} {...props} />);
};

describe('date range input', () => {
  it('should call onChangeEndDate', async () => {
    const endDate = new Date('2020-10-10');
    const onChangeEndDate = vi.fn();
    renderComponent({ endDate, onChangeEndDate });

    const endDateInput = await screen.findByRole('textbox', {
      name: 'dateSelector.labelEndDate',
    });

    const endDateStr = '12.10.2020';
    await userEvent.click(endDateInput);
    await userEvent.clear(endDateInput);
    await userEvent.type(endDateInput, endDateStr);

    const startDateInput = await screen.findByRole('textbox', {
      name: 'dateSelector.labelStartDate',
    });
    await userEvent.click(startDateInput);

    expect(onChangeEndDate).toHaveBeenCalledWith(
      utcToZonedTime(new Date('2020-10-12'), 'UTC')
    );
  });

  it('should call onChangeEndDate with clicking date', async () => {
    const endDate = new Date('2020-10-10');
    const onChangeEndDate = vi.fn();
    renderComponent({ endDate, onChangeEndDate });

    const endDateInput = await screen.findByRole('textbox', {
      name: 'dateSelector.labelEndDate',
    });

    await userEvent.click(endDateInput);
    await userEvent.click(
      screen.getAllByRole('button', { name: /valitse päivämäärä/i })[1]
    );
    await userEvent.click(
      screen.getByRole('button', {
        name: /lokakuu 15/i,
      })
    );

    const startDateInput = await screen.findByRole('textbox', {
      name: 'dateSelector.labelStartDate',
    });
    await userEvent.click(startDateInput);

    expect(onChangeEndDate).toHaveBeenCalledWith(
      utcToZonedTime(new Date('2020-10-15'), 'UTC')
    );
  }, 25000);

  it('should call onChangeStartDate', async () => {
    const startDate = new Date('2020-10-10');
    const onChangeStartDate = vi.fn();
    renderComponent({ startDate, onChangeStartDate });

    const startDateInput = await screen.findByRole('textbox', {
      name: 'dateSelector.labelStartDate',
    });

    const startDateStr = '12.10.2020';

    await userEvent.click(startDateInput);
    await userEvent.clear(startDateInput);
    await userEvent.type(startDateInput, startDateStr);

    const endDateInput = await screen.findByRole('textbox', {
      name: 'dateSelector.labelEndDate',
    });
    await userEvent.click(endDateInput);

    expect(onChangeStartDate).toHaveBeenCalledWith(
      utcToZonedTime(new Date('2020-10-12'), 'UTC')
    );
  });

  it('should call onChangeStartDate with clicking date', async () => {
    const startDate = new Date('2020-10-10');
    const onChangeStartDate = vi.fn();
    renderComponent({ startDate, onChangeStartDate });

    const startDateInput = await screen.findByRole('textbox', {
      name: 'dateSelector.labelStartDate',
    });
    await userEvent.click(startDateInput);

    await userEvent.click(
      screen.getAllByRole('button', { name: /valitse päivämäärä/i })[0]
    );
    await userEvent.click(
      screen.getByRole('button', {
        name: /lokakuu 15/i,
      })
    );

    const endDateInput = await screen.findByRole('textbox', {
      name: 'dateSelector.labelEndDate',
    });
    await userEvent.click(endDateInput);

    expect(onChangeStartDate).toHaveBeenCalledWith(
      utcToZonedTime(new Date('2020-10-15'), 'UTC')
    );
  });

  it('should show error start date must be before end date', async () => {
    renderComponent();

    const startDateInput = await screen.findByRole('textbox', {
      name: 'dateSelector.labelStartDate',
    });
    await userEvent.type(startDateInput, '23.6.2021');

    const endDateInput = await screen.findByRole('textbox', {
      name: 'dateSelector.labelEndDate',
    });
    await userEvent.type(endDateInput, '22.6.2021');

    await screen.findByText(/Alkamispäivän on oltava ennen loppumispäivää/i);

    userEvent.clear(endDateInput);
    await userEvent.type(endDateInput, '24.6.2021');

    expect(
      screen.queryByText(/Alkamispäivän on oltava ennen loppumispäivää/i)
    ).not.toBeInTheDocument();
  });

  /**
   * FIXME: Some reason why the HDS dateinput does not trigger handleStartDateValidation.
   * const startDateInput = screen.getByRole("textbox", {
   *  name: 'dateSelector.labelStartDate'
   * });
   * const endDateInput = screen.getByRole("textbox", {
   *  name: 'dateSelector.labelEndDate',
   * });
   * startDateInput.focus();
   * userEvent.clear(startDateInput);
   * userEvent.type(startDateInput, "23..2021");
   * userEvent.tab();
   * fireEvent.mouseUp(startDateInput);
   * endDateInput.focus();
   */
  it('should show formatting error', async () => {
    renderComponent();

    const startDateInput = screen.getByRole('textbox', {
      name: 'dateSelector.labelStartDate',
    });

    // Set invalid date as the input value
    await userEvent.type(startDateInput, '23..2021');

    expect(
      screen.queryByText(/Päivämäärän on oltava muotoa pp\.kk\.vvvv/i)
    ).not.toBeInTheDocument();

    // should show error when focusing out of the element
    await userEvent.tab();

    await screen.findByText(/Päivämäärän on oltava muotoa pp\.kk\.vvvv/i);

    // Error should disappear
    userEvent.clear(startDateInput);
    await userEvent.type(startDateInput, '23.6.2021');
    // should show the possible error when focusing out of the element
    await userEvent.tab();
    expect(
      screen.queryByText(/Päivämäärän on oltava muotoa pp\.kk\.vvvv/i)
    ).not.toBeInTheDocument();
  });
});
