import { initTestI18n as i18n } from '../../../../packages/common-i18n/src/';
import {
  EventSearchPage,
  getEnvUrl,
} from '../../../../packages/common-tests/browser-tests';
import { ROUTES } from '../../src/constants';
import EventsConsentModal from '../page-models/events-consent-modal';

fixture('Search page')
  .page(getEnvUrl(ROUTES.SEARCH))
  .beforeEach(async () => i18n.changeLanguage('default'));

// TODO: Load this from fixture or something
// so that it does not need to be repeated in every test
const acceptAllCookies = async () => {
  const cookieConsentModal = new EventsConsentModal();
  //   await cookieConsentModal.isOpened();
  await cookieConsentModal.clickAcceptAllCookies();
};

test('Verify searching', async () => {
  await acceptAllCookies();
  const searchPage = new EventSearchPage('appEvents');
  await searchPage.verify();
});
