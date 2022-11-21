import {
  getEnvUrl,
  changeLanguageAndTrySearch,
} from '../../../../packages/common-tests/browser-tests';
import EventsConsentModal from '../page-models/events-consent-modal';

fixture('Landing page header').page(getEnvUrl());

test('Verify header title', async () => {
  const cookieConsentModal = new EventsConsentModal();
  await cookieConsentModal.isOpened();
  await cookieConsentModal.clickAcceptAllCookies();
  await changeLanguageAndTrySearch('appEvents');
});
