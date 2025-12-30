import type {
  PageType,
  ArticleType,
} from '@city-of-helsinki/react-helsinki-headless-cms';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useCanonicalUrl from './useCanonicalUrl';

type Props = {
  origin: string;
  page?: PageType | ArticleType;
};

function RouteMeta({ origin, page }: Props) {
  const { locale, asPath } = useRouter();
  let path = asPath.replace(/\/$/, '').split('?')[0];
  // remove locale from start
  if (path.startsWith(`/${locale}`)) {
    path = path.replace(`/${locale}`, '');
  }
  const locales = ['fi', 'sv', 'en'];
  const canonical = useCanonicalUrl(origin);

  return (
    <Head>
      <link rel="canonical" href={canonical} />
      {!page
        ? locales?.map((l) => (
            <link
              key={l}
              rel="alternate"
              hrefLang={l}
              href={`${origin}/${l}${path}`}
            />
          ))
        : page?.translations?.map((translation) => (
            <link
              key={translation?.language?.slug}
              rel="alternate"
              hrefLang={translation?.language?.slug || 'fi'}
              href={`${origin}${translation?.uri?.replace(/\/$/, '')}`}
            />
          ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${origin}/${locales[0]}${path ? path : ''}`}
      />
      <meta property="og:locale" content={locale} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:url" content={canonical} />
    </Head>
  );
}

export default RouteMeta;
