import { render, screen } from '@/test-utils';
import type { ShareLinkProps } from 'events-helsinki-components';
import FacebookShareLink from 'events-helsinki-components/src/components/shareLinks/FacebookShareLink';

const renderComponent = (props: ShareLinkProps) =>
  render(<FacebookShareLink {...props} />);

it('should apply aria label', () => {
  const sharedLink = 'https://helsinki.fi/some/';
  renderComponent({ sharedLink });

  expect(screen.getByLabelText(/Jaa Facebookissa/)).toBeInTheDocument();
});
