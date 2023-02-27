import { useRouter } from 'next/router';
import React from 'react';

/**
 * Due to translation problem: https://github.com/i18next/next-i18next/issues/1020
 * let's redirect always to the pages/error.tsx page.
 */
const NextErrorPage = () => {
  const router = useRouter();
  React.useEffect(() => {
    router.push('/error');
  }, [router]);
  return null;
};
export default NextErrorPage;
