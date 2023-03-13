import {
  getLanguageOrDefault,
  NotFound,
  useCommonTranslation,
} from 'events-helsinki-components';
import type { GetStaticPropsContext, NextPage } from 'next';
import React from 'react';
import getHobbiesStaticProps from '../domain/app/getHobbiesStaticProps';
import serverSideTranslationsWithCommon from '../domain/i18n/serverSideTranslationsWithCommon';

const FourOhFour: NextPage = () => {
  const { t } = useCommonTranslation();
  return <NotFound appName={t(`appSports:appName`)} />;
};
export default FourOhFour;

export async function getStaticProps(context: GetStaticPropsContext) {
  return getHobbiesStaticProps(context, async () => {
    const language = getLanguageOrDefault(context.locale);
    return {
      props: {
        ...(await serverSideTranslationsWithCommon(language, ['common'])),
      },
    };
  });
}
