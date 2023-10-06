import Head from 'next/head';

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
  openGraphType,
  twitterDescription,
  twitterTitle,
  ...seo
}: PageMetaProps) {
  const openGraphTitle = seo.openGraphTitle ?? title;
  const openGraphDescription =
    seo.openGraphDescription ?? description ?? undefined;

  return (
    <>
      <Head>
        {title && <title>{unescapeDash(title)}</title>}
        {description && <meta name="description" content={description} />}
        <meta property="og:title" content={openGraphTitle || ''} />
        {description && (
          <meta property="og:description" content={openGraphDescription} />
        )}
        {image && <meta property="og:image" content={image} />}
        {openGraphType && <meta property="og:type" content={openGraphType} />}
        {twitterTitle && <meta name="twitter:title" content={twitterTitle} />}
        {twitterDescription && (
          <meta name="twitter:description" content={twitterDescription} />
        )}
      </Head>
    </>
  );
}

export default PageMeta;
