import { IMAGE_PROXY_SERVER } from '../constants';

/**
 * Returns a secure image URL, using an image proxy if necessary.
 * @param imageUrl The original image URL.
 * @param imageProxyUrl The image proxy URL. Default `IMAGE_PROXY_SERVER = process.env.NEXT_PUBLIC_IMAGE_PROXY_URL`
 * @returns A secure image URL or an empty string if the URL is invalid.
 * @deprecated getSecureImage(imageUrl: string) uses an image proxy that we most probably would like to get rid of.
 */
const getSecureImage = (
  imageUrl: string | null | undefined,
  imageProxyUrl: string | undefined = IMAGE_PROXY_SERVER
): string => {
  if (!imageUrl) {
    return '';
  }

  // Handle protocol-relative URLs by prepending 'https:'.
  if (imageUrl.startsWith('//')) {
    return `https:${imageUrl}`;
  }

  // If the image is already secure (HTTPS), return it directly.
  if (imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  // If an image proxy URL is not configured, we cannot handle insecure URLs.
  if (!imageProxyUrl) {
    // eslint-disable-next-line no-console
    console.warn(
      `Image proxy is not configured. Unable to secure URL: ${imageUrl}`
    );
    return '';
  }

  try {
    const url = new URL(imageUrl);
    // If the original URL is already a secure protocol (e.g., HTTPS),
    // there's no need to proxy it. This check is redundant after the initial check,
    // but is kept here for defensive programming.
    if (url.protocol === 'https:') {
      return imageUrl;
    } else if (url.protocol === 'http:') {
      // For insecure protocols (e.g., HTTP), prepend the proxy URL.
      return `${imageProxyUrl}${url.href}`;
    }
    // If protocol is something else, e.g. ftp, an empry string should be returned.
    return '';
  } catch (error) {
    // Catch any errors if the URL is malformed.
    // eslint-disable-next-line no-console
    console.error(`Invalid URL provided: ${imageUrl}`, error);
    return '';
  }
};

export default getSecureImage;
