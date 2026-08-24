import { ensureConsentDismissed } from './ensureConsentDismissed';

/**
 * Historically applied a cookie Role then navigated back. Role navigations hang
 * Azure TestCafe runs on this stack — just dismiss consent in place.
 */
const useRoleAndNavigateBack = async (_role: unknown, t: TestController) => {
  await ensureConsentDismissed(t);
};

export default useRoleAndNavigateBack;
