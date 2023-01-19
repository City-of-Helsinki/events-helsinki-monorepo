import { render, screen } from '@/test-utils';
import FacebookShareLink from '../FacebookShareLink';
import type { ShareLinkProps } from '../types';

const renderComponent = (props: ShareLinkProps) =>
  render(<FacebookShareLink {...props} />);

it('should apply aria label', () => {
  const sharedLink = 'https://helsinki.fi/some/';
  renderComponent({ sharedLink });

  expect(screen.getByLabelText(/Jaa Facebookissa/)).toBeInTheDocument();
});
