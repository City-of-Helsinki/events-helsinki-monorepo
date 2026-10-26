export default function getIsValidUrl(possibleUrl: string) {
  try {
    const url = new URL(possibleUrl);

    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    // Invalid URL input is expected to fail validation.
    return false;
  }
}
