import {
  getLanguageOrDefault,
  UnknownError,
} from '@events-helsinki/components';

import type { GetStaticPropsContext, NextPage } from 'next';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import getEventsStaticProps from '../domain/app/getEventsStaticProps';
import serverSideTranslationsWithCommon, {
  COMMON_TRANSLATIONS,
} from '../domain/i18n/serverSideTranslationsWithCommon';

/**
 * 500.tsx page doesnt work with middleware.ts: https://github.com/vercel/next.js/issues/38762
 * Let's use this page instead. the `_error_tsx` routes also to this page
 */
const Error: NextPage = () => {
  const { t, i18n } = useTranslation(COMMON_TRANSLATIONS, {
    bindI18n: 'languageChanged loaded',
  });
  // bindI18n: loaded is needed because of the reloadResources call
  // if all pages use the reloadResources mechanism, the bindI18n option can also be defined in next-i18next.config.js
  useEffect(() => {
    i18n.reloadResources(i18n.resolvedLanguage, COMMON_TRANSLATIONS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <UnknownError appName={t(`appEvents:appName`)} />;
};
export default Error;

export async function getStaticProps(context: GetStaticPropsContext) {
  return getEventsStaticProps(context, async () => {
    const language = getLanguageOrDefault(context.locale);
    return {
      props: {
        ...(await serverSideTranslationsWithCommon(language)),
      },
    };
  });
}
