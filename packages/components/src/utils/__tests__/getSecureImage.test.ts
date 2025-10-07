import getSecureImage from '../getSecureImage';

const IMAGE_PROXY_SERVER = 'https://secure.proxy.com/';

describe('getSecureImage', () => {
  // Test cases when the image proxy is active
  describe('when image proxy URL is configured', () => {
    const testCasesWithProxy = [
      {
        description: 'an http URL',
        url: 'http://images.hel.fi/af-123.jpg',
        expected: 'https://secure.proxy.com/http://images.hel.fi/af-123.jpg',
      },
      {
        description: 'an https URL',
        url: 'https://images.hel.fi/af-456.jpg',
        expected: 'https://images.hel.fi/af-456.jpg',
      },
      {
        description: 'a protocol-relative URL',
        url: '//images.hel.fi/af-789.jpg',
        expected: 'https://images.hel.fi/af-789.jpg',
      },
      {
        description: 'an empty string',
        url: '',
        expected: '',
      },
      {
        description: 'null',
        url: null,
        expected: '',
      },
      {
        description: 'undefined',
        url: undefined,
        expected: '',
      },
      {
        description: 'an invalid URL',
        url: 'ftp://file.server/my-file.zip',
        expected: '',
      },
    ];

    it.each(testCasesWithProxy)(
      'should return the proxied URL for $description',
      async ({ url, expected }) => {
        expect(getSecureImage(url, IMAGE_PROXY_SERVER)).toStrictEqual(expected);
      }
    );
  });

  // Test cases when the image proxy is not active
  describe('when image proxy URL is NOT configured', () => {
    const testCasesWithoutProxy = [
      {
        description: 'an http URL',
        url: 'http://images.hel.fi/af-123.jpg',
        expectedResult: '',
        expectedConsoleWarnings: [
          'Image proxy is not configured. Unable to secure URL: http://images.hel.fi/af-123.jpg',
        ],
      },
      {
        description: 'an https URL',
        url: 'https://images.hel.fi/af-456.jpg',
        expectedResult: 'https://images.hel.fi/af-456.jpg',
        expectedConsoleWarnings: [],
      },
      {
        description: 'a protocol-relative URL',
        url: '//images.hel.fi/af-789.jpg',
        expectedResult: 'https://images.hel.fi/af-789.jpg',
        expectedConsoleWarnings: [],
      },
    ];

    it.each(testCasesWithoutProxy)(
      'should handle URLs gracefully for $description',
      async ({ url, expectedResult, expectedConsoleWarnings }) => {
        const consoleWarnSpy = vi
          .spyOn(console, 'warn')
          .mockImplementation(() => {});

        expect(getSecureImage(url, undefined)).toStrictEqual(expectedResult);

        for (const [i, consoleWarning] of expectedConsoleWarnings.entries()) {
          expect(consoleWarnSpy).toHaveBeenNthCalledWith(i + 1, consoleWarning);
        }
        expect(consoleWarnSpy).toHaveBeenCalledTimes(
          expectedConsoleWarnings.length
        );
      }
    );
  });
});
