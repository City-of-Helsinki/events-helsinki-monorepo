import React from 'react';
import { configure, render, screen, userEvent } from '@/test-utils';
import SearchHeader from '../SearchHeader';

configure({ defaultHidden: true });

describe('SearchHeader', () => {
  const mockSwitchShowMode = vi.fn();
  const searchForm = <input data-testid="search-input" />;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render search results count', () => {
    const { container } = render(
      <SearchHeader
        count={42}
        switchShowMode={mockSwitchShowMode}
        searchForm={searchForm}
      />
    );
    // Check that the count text is in the DOM
    expect(container.textContent).toContain('42');
  });

  it('should not render search form when initially not collapsed', () => {
    render(
      <SearchHeader
        count={10}
        switchShowMode={mockSwitchShowMode}
        searchForm={searchForm}
      />
    );
    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
  });

  it('should render two buttons', () => {
    render(
      <SearchHeader
        count={10}
        switchShowMode={mockSwitchShowMode}
        searchForm={searchForm}
      />
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  it('should toggle collapsed state when collapse button is clicked', async () => {
    render(
      <SearchHeader
        count={10}
        switchShowMode={mockSwitchShowMode}
        searchForm={searchForm}
      />
    );
    const buttons = screen.getAllByRole('button');
    const collapseButton = buttons[0]; // First button is collapse/expand

    // Initially form should not be visible
    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();

    // Click to show (collapsed becomes true)
    await userEvent.click(collapseButton);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();

    // Click to hide (collapsed becomes false)
    await userEvent.click(collapseButton);
    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
  });

  it('should show search form when collapse button is clicked', async () => {
    render(
      <SearchHeader
        count={10}
        switchShowMode={mockSwitchShowMode}
        searchForm={searchForm}
      />
    );
    const buttons = screen.getAllByRole('button');
    const collapseButton = buttons[0];

    // Click to show form
    await userEvent.click(collapseButton);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  it('should call switchShowMode when list button is clicked', async () => {
    render(
      <SearchHeader
        count={10}
        switchShowMode={mockSwitchShowMode}
        searchForm={searchForm}
      />
    );
    const buttons = screen.getAllByRole('button');
    const listButton = buttons[1]; // Second button is show as list
    await userEvent.click(listButton);
    expect(mockSwitchShowMode).toHaveBeenCalledTimes(1);
  });

  it('should render with zero count', () => {
    const { container } = render(
      <SearchHeader
        count={0}
        switchShowMode={mockSwitchShowMode}
        searchForm={searchForm}
      />
    );
    expect(container.textContent).toContain('0');
  });

  it('should render with large count', () => {
    const { container } = render(
      <SearchHeader
        count={9999}
        switchShowMode={mockSwitchShowMode}
        searchForm={searchForm}
      />
    );
    expect(container.textContent).toContain('9999');
  });

  it('should focus first form input when toggling to show form', async () => {
    const formWithInput = (
      <form>
        <input data-testid="first-input" />
        <input data-testid="second-input" />
      </form>
    );

    render(
      <SearchHeader
        count={10}
        switchShowMode={mockSwitchShowMode}
        searchForm={formWithInput}
      />
    );

    const buttons = screen.getAllByRole('button');
    const collapseButton = buttons[0];

    // Click to show form - this should focus the first input
    await userEvent.click(collapseButton);

    // Give the setTimeout time to execute
    await new Promise((resolve) => setTimeout(resolve, 50));

    const firstInput = screen.getByTestId('first-input') as HTMLInputElement;
    expect(document.activeElement).toBe(firstInput);
  });

  it('should have main content id', () => {
    const { container } = render(
      <SearchHeader
        count={10}
        switchShowMode={mockSwitchShowMode}
        searchForm={searchForm}
      />
    );
    const mainContent = container.querySelector('#main-content');
    expect(mainContent).toBeInTheDocument();
  });

  it('should apply correct CSS classes', () => {
    const { container } = render(
      <SearchHeader
        count={10}
        switchShowMode={mockSwitchShowMode}
        searchForm={searchForm}
      />
    );
    const searchHeader = container.querySelector('[id="main-content"]');
    expect(searchHeader).toHaveClass('_searchHeader_5d0484');
  });

  it('should only call switchShowMode once per click', async () => {
    render(
      <SearchHeader
        count={10}
        switchShowMode={mockSwitchShowMode}
        searchForm={searchForm}
      />
    );
    const buttons = screen.getAllByRole('button');
    const listButton = buttons[1];

    await userEvent.click(listButton);
    await userEvent.click(listButton);
    await userEvent.click(listButton);

    expect(mockSwitchShowMode).toHaveBeenCalledTimes(3);
  });

  it('should render divider when not collapsed', () => {
    const { container } = render(
      <SearchHeader
        count={10}
        switchShowMode={mockSwitchShowMode}
        searchForm={searchForm}
      />
    );
    const divider = container.querySelector('._horizontalDivider_5d0484');
    expect(divider).toBeInTheDocument();
  });

  it('should not render divider when collapsed', async () => {
    const { container } = render(
      <SearchHeader
        count={10}
        switchShowMode={mockSwitchShowMode}
        searchForm={searchForm}
      />
    );
    const buttons = screen.getAllByRole('button');
    const collapseButton = buttons[0];

    // Show form (collapsed = true)
    await userEvent.click(collapseButton);

    // Divider should not be visible
    const divider = container.querySelector('._horizontalDivider_5d0484');
    expect(divider).not.toBeInTheDocument();
  });
});
