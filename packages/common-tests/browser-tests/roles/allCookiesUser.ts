import {
  ConsentModal,
  getEnvUrl,
} from 'events-helsinki-common-tests/browser-tests';
import { ClientFunction, Role } from 'testcafe';

const consentCookieName = 'city-of-helsinki-cookie-consents';
const hasGivenConsent = ClientFunction((consentCookieName: string) => {
  window.console.log({ cookie: window.document.cookie, consentCookieName });
  return window.document.cookie.includes(consentCookieName);
});
const persistCurrentCookie = async (t: TestController) => {
  const cookie = await ClientFunction(() => window.document.cookie)();
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [name, value] = cookie.split('=');
  await t.setCookies({
    name,
    value,
    expires: tomorrow,
    path: undefined,
    secure: false,
  });
};

export const acceptAllCookies = async (t: TestController) => {
  console.log('allCookiesUser: acceptAllCookies!');
  await t.setTestSpeed(0.5);
  const cookieConsentModal = new ConsentModal();
  await cookieConsentModal.isOpened();
  await cookieConsentModal.clickAcceptAllCookies();
  await t.wait(1000);
  const hasCookies = await hasGivenConsent(consentCookieName);
  console.log({ hasCookies });
  await t.expect(hasCookies).ok();
  // await persistCurrentCookie(t);
  // await t.debug();
};

const userAcceptingAllCookies = Role(
  getEnvUrl('/#login'),
  async (t) => {
    await acceptAllCookies(t);
  },
  { preserveUrl: true }
);

export default userAcceptingAllCookies;
