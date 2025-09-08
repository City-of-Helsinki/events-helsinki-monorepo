import Head from 'next/head';
import useCanonicalUrl from './useCanonicalUrl';

function replaceAll(str: string, find: string, replace: string) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function unescapeDash(str?: string): string {
  if (!str) {
    return str ?? '';
  }

  return replaceAll(str, '&#x2d;', '-');
}

export type PageMetaProps = {
  // Title of page, required for accessibility: pages should have unique titles
  // so that screen reader users are able to determine when the current page is
  // changed.
  title?: string | null;
  description?: string | null;
  image?: string | null;
  openGraphDescription?: string | null;
  openGraphTitle?: string | null;
  openGraphType?: string | null;
  twitterDescription?: string | null;
  twitterTitle?: string | null;
};

function PageMeta({
  title,
  description,
  image,
  openGraphType = 'website',
  twitterDescription,
  twitterTitle,
  ...seo
}: PageMetaProps) {
  const canonical = useCanonicalUrl();
  const openGraphTitle = seo.openGraphTitle ?? title;
  const openGraphDescription =
    seo.openGraphDescription ?? description ?? undefined;
  const xTitle = twitterTitle ?? title ?? undefined;
  const xDescription = twitterDescription ?? description ?? undefined;
  return (
    <>
      <Head>
        {title && <title>{unescapeDash(title)}</title>}
        {description && (
          <meta name="description" content={unescapeDash(description)} />
        )}
        <meta property="og:title" content={openGraphTitle || ''} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        {description && (
          <meta property="og:description" content={openGraphDescription} />
        )}
        {image && (
          <>
            <meta property="og:image" content={image} />
            <meta name="twitter:image" content={image} />
          </>
        )}
        {openGraphType && <meta property="og:type" content={openGraphType} />}
        {xTitle && <meta name="twitter:title" content={xTitle} />}
        {xDescription && (
          <meta name="twitter:description" content={xDescription} />
        )}
      </Head>
    </>
  );
}

export default PageMeta;
