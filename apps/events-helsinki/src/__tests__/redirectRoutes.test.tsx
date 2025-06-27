import Link from 'next/link';
import router from 'next/router';

import {
  render,
  waitFor,
  screen,
  userEvent,
} from '../../config/vitest/test-utils';

// Skip until there is a fix for this NextJS bug https://github.com/vercel/next.js/discussions/26426
describe.skip('NextJS redirects', () => {
  it.each([
    ['/fi/home', '/fi'],
    ['/sv/home', '/sv'],
    ['/en/home', '/en'],
    ['/fi/events', '/fi/haku'],
    ['/sv/events', '/sv/sok'],
    ['/en/events', '/en/search'],
  ])(
    'should redirect the requests of the old app-version path (%s) to the new path (%s)',
    async (redirectFrom, redirectTo) => {
      render(
        <Link href={redirectFrom}>
          <a>
            from {redirectFrom} to {redirectTo}
          </a>
        </Link>
      );
      const link = screen.getByRole('link');
      userEvent.click(link);
      await waitFor(() => {
        expect(router.asPath).toBe(redirectTo);
      });
    }
  );
});
