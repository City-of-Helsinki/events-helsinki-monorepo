import { Selector, t } from 'testcafe';
import {
  buildHdsConsentCookieRawValue,
  CONSENT_APPS,
  getConsentCookieName,
} from '../utils/consent-cookie.utils';
import { getEnvUrl } from '../utils/url.utils';

const acceptAllCookiesButton = () =>
  Selector('button')
    .withText(/hyväksy kaikki evästeet/i)
    .with({ timeout: 1500 });

export const seedHdsConsentCookies = async (
  testController: TestController = t
) => {
  await testController.setCookies(
    CONSENT_APPS.map((app) => ({
      name: getConsentCookieName(app),
      value: buildHdsConsentCookieRawValue(app),
      path: '/',
    })),
    getEnvUrl('/')
  );
};

/**
 * Dismiss HDS CookieConsent without TestCafe Role navigation.
 * Role + extra navigations hang in Azure (request barrier / Condition evaluation)
 * while the same helpers pass locally against the review URL.
 */
export const ensureConsentDismissed = async (
  testController: TestController = t
) => {
  // eslint-disable-next-line no-console
  console.log('ensureConsentDismissed: start');

  try {
    await seedHdsConsentCookies(testController);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ensureConsentDismissed: setCookies failed', error);
  }

  const button = acceptAllCookiesButton();
  const modalVisible = await button.exists;
  // eslint-disable-next-line no-console
  console.log('ensureConsentDismissed:', { modalVisible });

  if (!modalVisible) {
    return;
  }

  await testController.click(button);
  await testController
    .expect(
      Selector('button')
        .withText(/hyväksy kaikki evästeet/i)
        .with({ timeout: 500 }).exists
    )
    .notOk({ timeout: 15000 });
  // eslint-disable-next-line no-console
  console.log('ensureConsentDismissed: accepted');
};
