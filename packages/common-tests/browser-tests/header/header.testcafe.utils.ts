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
  await header.changeLanguage('en');
  await header.verify();
  await landingPage.verify();

  await header.changeLanguage('sv');
  await header.verify();
  await landingPage.verify();
};
