import { Role } from 'testcafe';
import { getEnvUrl } from '../utils/url.utils';
import {
  ensureConsentDismissed,
  seedHdsConsentCookies,
} from './ensureConsentDismissed';

export { ensureConsentDismissed, seedHdsConsentCookies };
export { ensureConsentDismissed as acceptAllCookies } from './ensureConsentDismissed';

/**
 * Kept for fixtures that still call useRole(...). Prefer ensureConsentDismissed
 * in beforeEach — Role navigation is what hangs Azure browser tests.
 */
const userAcceptingAllCookies = Role(
  getEnvUrl('/#login'),
  async (testController) => {
    await ensureConsentDismissed(testController);
  },
  { preserveUrl: true }
);

export default userAcceptingAllCookies;
