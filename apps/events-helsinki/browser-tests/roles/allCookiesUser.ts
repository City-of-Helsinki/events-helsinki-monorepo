import { Role } from 'testcafe';
import { getEnvUrl } from '../../../../packages/common-tests/browser-tests';
import EventsConsentModal from '../page-models/events-consent-modal';

export const acceptAllCookies = async () => {
  const cookieConsentModal = new EventsConsentModal();
  //   await cookieConsentModal.isOpened();
  await cookieConsentModal.clickAcceptAllCookies();
};

const userAcceptingAllCookies = Role(getEnvUrl('/'), async () => {
  await acceptAllCookies();
});

export default userAcceptingAllCookies;
