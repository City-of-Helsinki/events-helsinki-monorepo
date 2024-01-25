import {
  getLanguageOrDefault,
  UnknownError,
  useResilientTranslation,
} from '@events-helsinki/components';
import type { GetStaticPropsContext, NextPage } from 'next';
import React from 'react';
import getHobbiesStaticProps from '../domain/app/getHobbiesStaticProps';
import serverSideTranslationsWithCommon from '../domain/i18n/serverSideTranslationsWithCommon';

const NextErrorPage: NextPage = () => {
  const { resilientT } = useResilientTranslation();
  return <UnknownError appName={resilientT('appHobbies:appName')} />;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const language = getLanguageOrDefault(context.locale);
  return getHobbiesStaticProps(context, async () => {
    return {
      props: {
        ...(await serverSideTranslationsWithCommon(language)),
      },
    };
  });
}

export default NextErrorPage;
