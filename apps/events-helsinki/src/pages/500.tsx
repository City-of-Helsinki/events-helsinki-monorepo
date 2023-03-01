import { useRouter } from 'next/router';
import React from 'react';

/**
 * Due to middleware bug: https://github.com/vercel/next.js/issues/38762
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
