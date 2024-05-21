import { render, screen } from '@/test-utils';
import FacebookShareLink from '../FacebookShareLink';
import type { ShareLinkProps } from '../types';

const renderComponent = (props: ShareLinkProps) =>
  render(<FacebookShareLink {...props} />);

it('should apply aria label', async () => {
  const sharedLink = 'https://helsinki.fi/some/';
  renderComponent({ sharedLink });

  expect(
    await screen.findByRole('button', { name: /Jaa Facebookissa/ })
  ).toBeInTheDocument();
});
