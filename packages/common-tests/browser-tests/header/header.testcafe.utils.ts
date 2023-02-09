import { SUPPORT_LANGUAGES } from '../../../components/src/constants';
import Header from '../page-model/header';
import LandingPage from '../page-model/landingPage';
import type { AppNamespace } from '../types/app-namespace';

export const changeLanguageAndTrySearch = async (
  appNamespace: AppNamespace
) => {
  const header = new Header();
  const landingPage = new LandingPage(appNamespace);

  await header.verify();
  await landingPage.verify();

  await header.changeLanguage(SUPPORT_LANGUAGES.EN);
  await header.verify();
  await landingPage.verify();

  await header.changeLanguage(SUPPORT_LANGUAGES.SV);
  await header.verify();
  await landingPage.verify();
};
