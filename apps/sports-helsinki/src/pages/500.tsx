import {
  getLanguageOrDefault,
  UnknownError,
  useCommonTranslation,
} from 'events-helsinki-components';

import type { GetStaticPropsContext, NextPage } from 'next';
import React from 'react';
import getSportsStaticProps from '../domain/app/getSportsStaticProps';
import serverSideTranslationsWithCommon from '../domain/i18n/serverSideTranslationsWithCommon';

const FiveHundred: NextPage = () => {
  const { t } = useCommonTranslation();
  return <UnknownError appName={t(`appSports:appName`)} />;
};
export default FiveHundred;

export async function getStaticProps(context: GetStaticPropsContext) {
  return getSportsStaticProps(context, async () => {
    const language = getLanguageOrDefault(context.locale);
    return {
      props: {
        ...(await serverSideTranslationsWithCommon(language, ['common'])),
      },
    };
  });
}
