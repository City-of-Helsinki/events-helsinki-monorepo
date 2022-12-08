import { Role } from 'testcafe';
import { getEnvUrl } from '../../../../packages/common-tests/browser-tests';
import HobbiesConsentModal from '../page-models/hobbies-consent-modal';

export const acceptAllCookies = async () => {
  const cookieConsentModal = new HobbiesConsentModal();
  //   await cookieConsentModal.isOpened();
  await cookieConsentModal.clickAcceptAllCookies();
};

const userAcceptingAllCookies = Role(getEnvUrl('/'), async () => {
  await acceptAllCookies();
});

export default userAcceptingAllCookies;
