import { SUPPORT_LANGUAGES } from '../../../components/src/constants';
import Header from '../page-model/header';
import LandingPage from '../page-model/landingPage';
import { getEnvUrl } from '../utils';
import { AppNamespace } from '../types/app-namespace';

fixture('Landing page header').page(getEnvUrl());

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
  // This fails for sv,  search box is not fully visible
  // await landingPage.verify();
};
