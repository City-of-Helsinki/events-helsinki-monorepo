import { render, screen } from '@/test-utils';
import TwitterShareLink from '../TwitterShareLink';

const renderComponent = (props: { sharedLink: string }) =>
  render(<TwitterShareLink {...props} />);

it('should apply aria label', async () => {
  const sharedLink = 'https://helsinki.fi/some/';
  renderComponent({ sharedLink });

  expect(
    await screen.findByRole('button', { name: /Jaa Twitterissä/ })
  ).toBeInTheDocument();
});
