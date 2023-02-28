import {
  getLanguageOrDefault,
  UnknownError,
  useCommonTranslation,
} from 'events-helsinki-components';

import type { GetStaticPropsContext, NextPage } from 'next';
import React from 'react';
import getHobbiesStaticProps from '../domain/app/getHobbiesStaticProps';
import serverSideTranslationsWithCommon from '../domain/i18n/serverSideTranslationsWithCommon';

/**
 * 500.tsx page doesnt work with middleware.ts: https://github.com/vercel/next.js/issues/38762
 * Let's use this page instead. the `_error_tsx` routes also to this page
 */
const Error: NextPage = () => {
  const { t } = useCommonTranslation();
  return <UnknownError appName={t(`appSports:appName`)} />;
};
export default Error;

export async function getStaticProps(context: GetStaticPropsContext) {
  return getHobbiesStaticProps(
    context,
    async () => {
      const language = getLanguageOrDefault(context.locale);
      return {
        props: {
          ...(await serverSideTranslationsWithCommon(language, [
            'common',
            'errors',
          ])),
        },
      };
    },
    false
  );
}
