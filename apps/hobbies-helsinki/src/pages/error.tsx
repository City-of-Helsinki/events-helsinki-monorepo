import {
  getLanguageOrDefault,
  UnknownError,
  useAppHobbiesTranslation,
} from '@events-helsinki/components';

import type { GetStaticPropsContext, NextPage } from 'next';
import React from 'react';
import serverSideTranslationsWithCommon from '../domain/i18n/serverSideTranslationsWithCommon';

/**
 * 500.tsx page doesnt work with middleware.ts: https://github.com/vercel/next.js/issues/38762
 * Let's use this page instead. the `_error_tsx` routes also to this page
 */
const Error: NextPage = () => {
  const { t } = useAppHobbiesTranslation();
  return <UnknownError appName={t(`appHobbies:appName`)} />;
};
export default Error;

export async function getServerSideProps(context: GetStaticPropsContext) {
  const language = getLanguageOrDefault(context.locale);
  return {
    props: {
      ...(await serverSideTranslationsWithCommon(language)),
    },
  };
}
