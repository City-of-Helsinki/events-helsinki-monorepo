import {
  getLanguageOrDefault,
  UnknownError,
  useAppHobbiesTranslation,
} from '@events-helsinki/components';
import type { GetStaticPropsContext, NextPage } from 'next';
import React from 'react';
import serverSideTranslationsWithCommon from '../domain/i18n/serverSideTranslationsWithCommon';

const NextErrorPage: NextPage = () => {
  const { t } = useAppHobbiesTranslation();
  return <UnknownError appName={t(`appHobbies:appName`)} />;
};

export async function getServerSideProps(context: GetStaticPropsContext) {
  const language = getLanguageOrDefault(context.locale);
  return {
    props: {
      ...(await serverSideTranslationsWithCommon(language)),
    },
  };
}

export default NextErrorPage;
