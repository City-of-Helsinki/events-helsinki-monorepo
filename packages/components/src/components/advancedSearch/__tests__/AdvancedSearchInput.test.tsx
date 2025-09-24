import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IconSearch, TextInput } from 'hds-react';
import React from 'react';

import AdvancedSearchInput from '../AdvancedSearchInput';

const renderComponent = () =>
  render(
    <AdvancedSearchInput
      IconComponent={<IconSearch />}
      InputComponent={<TextInput id="test-input" label="test" />}
    />
  );

describe('AdvancedSearchInput', () => {
  it('should render the icon and the input', () => {
    renderComponent();
    expect(screen.getByLabelText('test')).toBeInTheDocument();
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  it('should focus the input when the container is clicked', async () => {
    const { container } = renderComponent();
    const input = screen.getByLabelText('test');
    expect(input).not.toHaveFocus();
    await userEvent.click(container.firstChild as Element);
    expect(input).toHaveFocus();
  });

  it('should apply and remove focus styles', async () => {
    const { container } = renderComponent();
    const input = screen.getByLabelText('test');
    const containerDiv = container.firstChild;

    expect(containerDiv).not.toHaveClass(/focused/);

    await userEvent.click(input);
    expect(containerDiv).toHaveClass(/focused/);

    await userEvent.tab();
    expect(containerDiv).not.toHaveClass(/focused/);
  });
});
