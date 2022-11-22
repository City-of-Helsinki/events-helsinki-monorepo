import {
  changeLanguageAndTrySearch,
  getEnvUrl,
} from '../../../../packages/common-tests/browser-tests';
import HobbiesConsentModal from '../page-models/hobbies-consent-modal';

fixture('Landing page header').page(getEnvUrl());

test('Verify header title', async () => {
  const cookieConsentModal = new HobbiesConsentModal();
  await cookieConsentModal.isOpened();
  await cookieConsentModal.clickAcceptAllCookies();
  await changeLanguageAndTrySearch('appHobbies');
});
