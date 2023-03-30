import {
  getLanguageOrDefault,
  NotFound,
  useAppEventsTranslation,
} from '@events-helsinki/components';
import type { GetStaticPropsContext, NextPage } from 'next';
import React from 'react';
import getEventsStaticProps from '../domain/app/getEventsStaticProps';
import serverSideTranslationsWithCommon from '../domain/i18n/serverSideTranslationsWithCommon';

const FourOhFour: NextPage = () => {
  const { t } = useAppEventsTranslation();
  return <NotFound appName={t('appEvents:appName')} />;
};
export default FourOhFour;

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
