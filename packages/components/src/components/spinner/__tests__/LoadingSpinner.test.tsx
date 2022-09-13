import React from 'react';
import { render } from '@/test-utils';

import LoadingSpinner from '../LoadingSpinner';

it('matches snapshot', () => {
  const { container } = render(<LoadingSpinner isLoading={true} />);
  expect(container.firstChild).toMatchSnapshot();
});

it('render spinner if isLoading is true', () => {
  const { container } = render(<LoadingSpinner isLoading={true} />);
  expect((container.firstChild?.firstChild as HTMLElement).classList).toContain(
    'spinner'
  );
});

it('render child component if isLoading is false', () => {
  const { container } = render(
    <LoadingSpinner isLoading={false}>
      <div className="component"></div>
    </LoadingSpinner>
  );
  expect((container.firstChild as HTMLElement).classList).toContain(
    'component'
  );
});
