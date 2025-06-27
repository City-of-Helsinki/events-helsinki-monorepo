const imageProxyUrl = process.env.NEXT_PUBLIC_IMAGE_PROXY_URL;

const getSecureImage = (imageUrl: string): string => {
  if (!imageProxyUrl) {
    return imageUrl;
  }
  try {
    if (imageUrl.startsWith('https://')) {
      return imageUrl;
    } else {
      const url = new URL(imageUrl);
      return [imageProxyUrl, url.href].join('');
    }
  } catch (_) {
    return '';
  }
};

export default getSecureImage;
