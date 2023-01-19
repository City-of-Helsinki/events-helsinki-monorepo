import { render, screen } from '@/test-utils';
import LinkedInShareLink from '../LinkedInShareLink';
import type { ShareLinkProps } from '../types';

const renderComponent = (props: ShareLinkProps) =>
  render(<LinkedInShareLink {...props} />);

it('should apply aria label', () => {
  const sharedLink = 'https://helsinki.fi/some/';
  renderComponent({ sharedLink });

  expect(screen.getByLabelText(/Jaa LinkedInissä/i)).toBeInTheDocument();
});
