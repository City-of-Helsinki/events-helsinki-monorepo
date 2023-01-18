import { render, screen } from '@/test-utils';
import type { ShareLinkProps } from 'events-helsinki-components';
import LinkedInShareLink from '../LinkedInShareLink';

const renderComponent = (props: ShareLinkProps) =>
  render(<LinkedInShareLink {...props} />);

it('should apply aria label', () => {
  const sharedLink = 'https://helsinki.fi/some/';
  renderComponent({ sharedLink });

  expect(screen.getByLabelText(/Jaa LinkedInissä/i)).toBeInTheDocument();
});
