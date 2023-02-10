import {
  ConsentModal,
  getEnvUrl,
} from 'events-helsinki-common-tests/browser-tests';
import { Role } from 'testcafe';

export const acceptAllCookies = async () => {
  console.log('allCookiesUser: acceptAllCookies!');
  const cookieConsentModal = new ConsentModal();
  await cookieConsentModal.isOpened();
  await cookieConsentModal.clickAcceptAllCookies();
};

const userAcceptingAllCookies = Role(
  getEnvUrl('/'),
  async () => {
    await acceptAllCookies();
  },
  { preserveUrl: false }
);

export default userAcceptingAllCookies;
