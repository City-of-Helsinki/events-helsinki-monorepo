import { render, screen } from '@/test-utils';
import LinkedInShareLink from '../LinkedInShareLink';
import type { ShareLinkProps } from '../types';

const renderComponent = (props: ShareLinkProps) =>
  render(<LinkedInShareLink {...props} />);

it('should apply aria label', async () => {
  const sharedLink = 'https://helsinki.fi/some/';
  renderComponent({ sharedLink });

  expect(
    await screen.findByRole('button', { name: /Jaa LinkedInissä/i })
  ).toBeInTheDocument();
});
