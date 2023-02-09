import { ClientFunction, Role } from 'testcafe';
import {
  ConsentModal,
  getEnvUrl,
} from 'events-helsinki-common-tests/browser-tests';

/** @deprecated This should not be needed if the using of the role and the cookies are fixed */
export const cookieConsentName = 'city-of-helsinki-cookie-consents';
/** @deprecated This should not be needed if the using of the role and the cookies are fixed */
const cookieConsentAllValue =
  'city-of-helsinki-cookie-consents=%7B%22wordpress%22%3Atrue%2C%22linkedevents%22%3Atrue%2C%22matomo%22%3Atrue%2C%22i18next%22%3Atrue%2C%22city-of-helsinki-cookie-consents%22%3Atrue%2C%22servicemap_analytics%22%3Atrue%2C%22servicemap_session%22%3Atrue%2C%22servicemap_ga%22%3Atrue%7D';

/**
 * @deprecated Set the consent all cookie.
 * The consent all cookie needs to be set with this,
 * so it's available when needed.
 * */
export const setConsentAllCookie = async () => {
  ClientFunction(() => {
    document.cookie = `${cookieConsentName}=${cookieConsentAllValue}; path=/`;
  });
};

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
    // await setConsentAllCookie();
  },
  { preserveUrl: true }
);

export default userAcceptingAllCookies;
