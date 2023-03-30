import {
  getLanguageOrDefault,
  NotFound,
  useAppSportsTranslation,
} from '@events-helsinki/components';
import type { GetStaticPropsContext, NextPage } from 'next';
import React from 'react';
import getSportsStaticProps from '../domain/app/getSportsStaticProps';
import serverSideTranslationsWithCommon from '../domain/i18n/serverSideTranslationsWithCommon';

const FourOhFour: NextPage = () => {
  const { t } = useAppSportsTranslation();
  return <NotFound appName={t('appSports:appName')} />;
};
export default FourOhFour;

export async function getStaticProps(context: GetStaticPropsContext) {
  return getSportsStaticProps(context, async () => {
    const language = getLanguageOrDefault(context.locale);
    return {
      props: {
        ...(await serverSideTranslationsWithCommon(language)),
      },
    };
  });
}
