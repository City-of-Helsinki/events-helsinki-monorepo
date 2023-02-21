import {
  ConsentModal,
  getEnvUrl,
} from 'events-helsinki-common-tests/browser-tests';
import { ClientFunction, Role } from 'testcafe';

const hasGivenConsent = ClientFunction((consentCookieName: string) => {
  return {
    cookie: window.document.cookie,
    consentCookieName,
  };
});

export const acceptAllCookies = async (t: TestController) => {
  console.log('allCookiesUser: acceptAllCookies!');
  //  await t.wait(1000).setTestSpeed(0.5);
  const cookieConsentModal = new ConsentModal();
  await cookieConsentModal.isOpened();
  await cookieConsentModal.clickAcceptAllCookies();

  // const cookies = await t.getCookies('city-of-helsinki-cookie-consents');
  // console.log('acceptAllCookies');
  // console.log(cookies);
  //  await t.wait(1000);
};

const userAcceptingAllCookies = Role(
  getEnvUrl('/'),
  async (t) => {
    await acceptAllCookies(t);

    const consentCookieName = 'city-of-helsinki-cookie-consents';
    const hasCookies = await hasGivenConsent(consentCookieName);
    console.log({ hasCookies });
  },
  { preserveUrl: false }
);

export default userAcceptingAllCookies;
