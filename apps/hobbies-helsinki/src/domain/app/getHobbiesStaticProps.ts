import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  getGlobalCMSData,
  getLanguageOrDefault,
} from '@events-helsinki/components';
import type { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { staticGenerationLogger } from '../../logger';
import initializeHobbiesApolloClient from '../clients/hobbiesApolloClient';
import AppConfig from './AppConfig';

type HobbiesContext = {
  apolloClient: ApolloClient<NormalizedCacheObject>;
};

export type HobbiesGlobalPageProps<P = Record<string, unknown>> = {
  initialApolloState: NormalizedCacheObject;
} & Promise<GetStaticPropsResult<P>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function getHobbiesStaticProps<P = Record<string, any>>(
  context: GetStaticPropsContext,
  tryToGetPageProps: (
    hobbiesContext: HobbiesContext
  ) => Promise<GetStaticPropsResult<P>>
) {
  try {
    const language = getLanguageOrDefault(context.locale);
    const apolloClient = initializeHobbiesApolloClient();
    const globalCmsData = await getGlobalCMSData({
      client: apolloClient,
      context,
    });
    const result = await tryToGetPageProps({
      apolloClient: apolloClient,
    });
    const props =
      'props' in result
        ? {
            initialApolloState: apolloClient.cache.extract(),
            locale: language,
            ...globalCmsData,
            ...result.props,
          }
        : undefined;

    return {
      // Apply revalidate, allow it to be overwritten
      revalidate: AppConfig.defaultRevalidate,
      ...result,
      props,
    };
  } catch (e: unknown) {
    // Generic error handling
    staticGenerationLogger.error(
      `Error while generating a page (with locale "${context.locale}"):`,
      e
    );
    // Throw an error, because otherwise the NextJS generates a page that is always somehow broken:
    // The biggest issue here is with the translations: https://github.com/i18next/next-i18next/issues/1020.
    // The i18next instance is not ready to process translations when nextjs tries to render the error page.
    // When an error is thrown, the page regeneration is abandoned on errors,
    // so the last successful generation will stay in use in action!
    throw e;
  }
}
