import {
  getLanguageOrDefault,
  UnknownError,
  useResilientTranslation,
} from '@events-helsinki/components';
import type { GetStaticPropsContext } from 'next/types';
import React from 'react';
import getEventsStaticProps from '../domain/app/getEventsStaticProps';
import serverSideTranslationsWithCommon from '../domain/i18n/serverSideTranslationsWithCommon';

const NextErrorPage = () => {
  const { resilientT } = useResilientTranslation();
  return <UnknownError appName={resilientT('appEvents:appName')} />;
};

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

export default NextErrorPage;
