import NProgress from 'nprogress';
import { useEffect } from 'react';
import useRouterFromConfig from '../../hooks/useRouterFromConfig';
import type { Logger } from './types';

function TopProgressBar(logger: Logger) {
  const router = useRouterFromConfig();

  const handleStart = (url: string) => {
    logger?.debug && logger.debug(`Started navigation to page: ${url}`);
    NProgress.start();
  };

  const handleComplete = (url: string) => {
    logger?.debug && logger.debug(`Completed navigation to page: ${url}`);
    NProgress.done();
  };

  const handleError = (error: Error) => {
    logger?.error && logger?.error(`Failed navigation: ${error}`);
    NProgress.done();
  };

  useEffect(() => {
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleError);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleError);
    };
  });

  return null;
}

export default TopProgressBar;
