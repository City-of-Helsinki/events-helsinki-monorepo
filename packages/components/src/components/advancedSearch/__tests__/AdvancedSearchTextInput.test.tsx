import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import AdvancedSearchTextInput from '../AdvancedSearchTextInput';

describe('AdvancedSearchTextInput', () => {
  it('renders an input field', () => {
    render(<AdvancedSearchTextInput id="search" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('passes placeholder to the input', () => {
    const placeholder = 'Hae...';
    render(<AdvancedSearchTextInput id="search" placeholder={placeholder} />);
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('allows user to type in the input', async () => {
    const user = userEvent.setup();
    render(<AdvancedSearchTextInput id="search" />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'test value');
    expect(input).toHaveValue('test value');
  });

  it('calls onChange handler when input value changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<AdvancedSearchTextInput id="search" onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'test');
    expect(handleChange).toHaveBeenCalledTimes(4);
  });

  it('focuses input on container click', async () => {
    const user = userEvent.setup();
    const { container } = render(<AdvancedSearchTextInput id="search" />);
    const input = screen.getByRole('textbox');
    // The container is the first child of the render container
    const advancedSearchInputContainer = container.firstChild;

    expect(input).not.toHaveFocus();

    if (advancedSearchInputContainer) {
      await user.click(advancedSearchInputContainer as Element);
    }

    expect(input).toHaveFocus();
  });

  it('renders a search icon', () => {
    const { container } = render(<AdvancedSearchTextInput id="search" />);
    // The IconSearch is an SVG
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });
});
