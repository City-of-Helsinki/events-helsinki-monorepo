import { render, screen } from '@testing-library/react';
import React from 'react';

import List from '../List';
import type { ListItemProps } from '../List';

vi.mock('../list.module.scss', () => ({
  default: {
    list: 'list',
    item: 'item',
    default: 'default',
    'collection-grid': 'collection-grid',
    searchResult: 'searchResult',
    'grid-3': 'grid-3',
    'grid-2': 'grid-2',
    'fixed-grid-4': 'fixed-grid-4',
    column: 'column',
    'gap-xs': 'gap-xs',
    'gap-s': 'gap-s',
    'gap-m': 'gap-m',
    'gap-l': 'gap-l',
  },
}));

describe('<List />', () => {
  const items = [
    <div key="1">Item 1</div>,
    <div key="2">Item 2</div>,
    <div key="3">Item 3</div>,
  ];

  it('should render the list of items', () => {
    render(<List items={items} />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
  });

  it('should apply the default variant class when no variant is provided', () => {
    const { container } = render(<List items={items} />);
    const ul = container.querySelector('ul');
    expect(ul).toHaveClass('list');
    expect(ul).toHaveClass('default');
  });

  it.each([
    'default',
    'collection-grid',
    'searchResult',
    'grid-3',
    'grid-2',
    'fixed-grid-4',
    'column',
  ] as const)('should apply the correct class for variant "%s"', (variant) => {
    const { container } = render(<List items={items} variant={variant} />);
    const ul = container.querySelector('ul');
    expect(ul).toHaveClass(variant);
  });

  it.each(['xs', 's', 'm', 'l'] as const)(
    'should apply the correct gap class for gap "%s"',
    (gap) => {
      const { container } = render(<List items={items} gap={gap} />);
      const ul = container.querySelector('ul');
      expect(ul).toHaveClass(`gap-${gap}`);
    }
  );

  it('should use a custom component for list items when provided', () => {
    const CustomLi = ({
      children,
      index,
      className,
    }: ListItemProps & { children?: React.ReactNode }) => (
      <div
        role="listitem"
        data-testid={`custom-li-${index}`}
        className={className}
      >
        {children}
      </div>
    );

    render(<List items={items} li={CustomLi} />);

    expect(screen.getByTestId('custom-li-0')).toBeInTheDocument();
    expect(screen.getByTestId('custom-li-1')).toBeInTheDocument();
    expect(screen.getByTestId('custom-li-2')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('should attach the ref to the ul element', () => {
    const ref = React.createRef<HTMLUListElement>();
    render(<List items={items} listContainerRef={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLUListElement);
  });

  it('should pass className to custom li component', () => {
    const CustomLi = ({
      children,
      className,
    }: ListItemProps & { children?: React.ReactNode }) => (
      <li className={className}>{children}</li>
    );
    const { container } = render(<List items={items} li={CustomLi} />);
    const listItems = container.querySelectorAll('li');
    listItems.forEach((li) => {
      expect(li).toHaveClass('item');
    });
  });

  it('should render an empty list if items is an empty array', () => {
    const { container } = render(<List items={[]} />);
    const ul = container.querySelector('ul');
    expect(ul).toBeInTheDocument();
    expect(ul?.children.length).toBe(0);
  });
});
