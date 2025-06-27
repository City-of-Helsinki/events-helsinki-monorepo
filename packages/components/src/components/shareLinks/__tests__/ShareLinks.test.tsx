import { render, screen } from '@/test-utils';

import type { ShareLinksProps } from '../ShareLinks';
import ShareLinks from '../ShareLinks';

const renderComponent = (props: ShareLinksProps) =>
  render(<ShareLinks {...props} />);

// eslint-disable-next-line @stylistic/max-len
it('should have discoverable link address copy button as well as Facebook, Twitter and LinkedIn share link buttons', async () => {
  renderComponent({ title: 'Jaa tapahtuma' });
  const shareLinkLabelsFI = [
    /Kopioi linkin osoite/,
    /Jaa Facebookissa/,
    /Jaa Twitterissä/,
    /Jaa LinkedInissä/,
  ];

  for (const label of shareLinkLabelsFI) {
    expect(
      await screen.findByRole('button', { name: label })
    ).toBeInTheDocument();
  }
});
