import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { TARGET_GROUP_AGE_GROUPS_IN_ORDER } from '../../../../../constants';
import TargetAgeGroupSelector from '../TargetAgeGroupSelector';

const targetAgeGroupOptions = [
  'Vauvat',
  'Lapset',
  'Nuoret',
  'Aikuiset',
  'Ikääntyneet',
] as const;

describe('<TargetAgeGroupSelector />', () => {
  it('renders without crashing', () => {
    render(<TargetAgeGroupSelector label="Target group" />);
    expect(
      screen.getByRole('button', { name: 'Target group' })
    ).toBeInTheDocument();
  });

  it('renders with correct placeholder', () => {
    render(<TargetAgeGroupSelector label="Target group" />);
    expect(screen.getByText('Valitse ikäryhmä')).toBeInTheDocument();
  });

  it('renders with correct placeholder without label', () => {
    render(<TargetAgeGroupSelector />);
    expect(
      screen.getByRole('button', { name: 'Valitse ikäryhmä' })
    ).toBeInTheDocument();
  });

  it('shows all age group options when opened', async () => {
    render(<TargetAgeGroupSelector label="Target group" />);
    const selectButton = screen.getByRole('button', { name: 'Target group' });
    await userEvent.click(selectButton);

    // +1 for the empty option
    const options = screen.getAllByRole('option', { hidden: true });
    expect(options).toHaveLength(TARGET_GROUP_AGE_GROUPS_IN_ORDER.length + 1);

    targetAgeGroupOptions.forEach((optionText) => {
      expect(screen.getByText(optionText)).toBeInTheDocument();
    });
  });

  it('calls onChange with the correct value when an option is selected', async () => {
    const onChange = vi.fn();
    render(<TargetAgeGroupSelector label="Target group" onChange={onChange} />);
    const selectButton = screen.getByRole('button', { name: 'Target group' });
    await userEvent.click(selectButton);

    const childrenOption = screen.getByText('Lapset');
    await userEvent.click(childrenOption);

    expect(onChange).toHaveBeenCalledTimes(1);
    const selectedOption = onChange.mock.calls[0][0];
    expect(selectedOption.value).toBe('children');
  });

  it('displays the selected value', () => {
    render(<TargetAgeGroupSelector label="Target group" value="youth" />);
    expect(screen.getByText('Nuoret')).toBeInTheDocument();
  });

  it('can be cleared', async () => {
    const onChange = vi.fn();
    render(
      <TargetAgeGroupSelector
        label="Target group"
        value="seniors"
        onChange={onChange}
        clearable
      />
    );
    expect(screen.getByText('Ikääntyneet')).toBeInTheDocument();

    const clearButton = screen.getByRole('button', { name: 'Tyhjennä' });
    await userEvent.click(clearButton);

    expect(onChange).toHaveBeenCalledTimes(1);
    const selectedOption = onChange.mock.calls[0][0];
    expect(selectedOption).toBeNull();
  });
});
