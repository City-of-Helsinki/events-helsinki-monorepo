import {
  ConsentModal,
  getEnvUrl,
} from 'events-helsinki-common-tests/browser-tests';
import { Role } from 'testcafe';

export const acceptAllCookies = async (t: TestController) => {
  console.log('allCookiesUser: acceptAllCookies!');
  await t.wait(1000).setTestSpeed(0.5);
  const cookieConsentModal = new ConsentModal();
  await cookieConsentModal.isOpened();
  await cookieConsentModal.clickAcceptAllCookies();
  await t.wait(1000);
};

const userAcceptingAllCookies = Role(
  getEnvUrl('/'),
  async (t) => {
    await acceptAllCookies(t);
  },
  { preserveUrl: false }
);

export default userAcceptingAllCookies;
