import { screen } from '@testing-library/testcafe';
import {
  EventDetailsPage,
  ClosedEventDetailsPage,
  EventSearchPage,
} from '@events-helsinki/common-tests/browser-tests';
import { ClientFunction, t } from 'testcafe';

/**
 * Use the `window.history.back()` -client function.
 */
export const goBack = ClientFunction(() => window.history.back());

/**
 * Test wheter or not the user is in a closed event details page.
 * @returns true, if on closed event details page
 */
export async function isOnEventClosedPage() {
  const closedDetailsPage = new ClosedEventDetailsPage();
  return await closedDetailsPage.heading.exists;
}

/**
 * Sometimes the event card comes from the cache but the event is already "closed".
 * Check whether the user is on closed event page or event details page
 * and return back to search page, by clicking the return back -button.
 * */
export async function useClosedPageAwareGoBackFeature() {
  const detailsPage = new EventDetailsPage();
  if (await isOnEventClosedPage()) {
    // eslint-disable-next-line no-console
    console.info('The event was already closed!');
    await goBack();
  } else {
    await detailsPage.verifyBasicContent();
    await detailsPage.clickReturnButton();
  }
}

async function isCardInScreen(name: string) {
  return await t
    .expect(
      screen.getByRole('link', {
        name,
      }).exists
    )
    .ok();
}

export async function testNavigationFromSearchToDetailsAndBack(
  eventCard: Selector
) {
  // when creating EventSearchPage, just use any app namespace as parameter, to init a common instance
  const searchPage = new EventSearchPage('appEvents');
  await t.click(eventCard);
  // Returned back to search - UI should be focuesed to clicked card
  await useClosedPageAwareGoBackFeature();
  // Refresh the results
  const results = searchPage.results;
  results.nth(0).id == eventCard.id;
  const ariaLabel = await eventCard.getAttribute('aria-label');
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await isCardInScreen(ariaLabel!);
}
