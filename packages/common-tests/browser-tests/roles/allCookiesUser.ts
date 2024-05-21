import { ClientFunction, Role } from 'testcafe';
import { ConsentModal } from '../../browser-tests/page-model/consent-modal';
import { getEnvUrl } from '../utils/url.utils';

export const consentCookieName = 'city-of-helsinki-cookie-consents';

const hasGivenConsent = ClientFunction((consentCookieName: string) => {
  window.console.log('Current consents in cookie', {
    cookie: window.document.cookie,
    consentCookieName,
  });
  return window.document.cookie.includes(consentCookieName);
});

export const acceptAllCookies = async (t: TestController) => {
  console.log('allCookiesUser: acceptAllCookies!');
  await t.wait(1000).setTestSpeed(0.5);
  const cookieConsentModal = new ConsentModal();
  await cookieConsentModal.isOpened();
  await cookieConsentModal.clickAcceptAllCookies();
  const hasCookies = await hasGivenConsent(consentCookieName);
  console.log({ hasCookies });
  await t.expect(hasCookies).ok();
};

const userAcceptingAllCookies = Role(
  getEnvUrl('/#login'),
  async (t) => {
    const hasCookies = await hasGivenConsent(consentCookieName);
    if (!hasCookies) {
      await acceptAllCookies(t);
    } else {
      console.log('userAcceptingAllCookies: all cookies already accepted!');
      console.log(
        '!!!!! NOTE: There is a clientScript active in the .testcaterc.json, that presets the document.cookie to consent all cookies!'
      );
    }
  },
  { preserveUrl: true }
);

export default userAcceptingAllCookies;
