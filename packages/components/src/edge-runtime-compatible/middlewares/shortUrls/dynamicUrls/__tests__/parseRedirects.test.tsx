import { vi } from 'vitest';
import type { AppLanguage } from '../../../../types';
import { parseRedirects } from '../parseRedirects';
import type { Redirects } from '../types';

let consoleWarningSpy: any;

beforeEach(() => {
  consoleWarningSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('parseRedirects', () => {
  type TestInput = {
    encodedRedirects: string | null | undefined;
    language: AppLanguage;
    expectedOutput: Redirects;
    expectedWarnings: string[];
  };

  it.each<TestInput>([
    {
      encodedRedirects: null,
      language: 'fi',
      expectedOutput: {},
      expectedWarnings: [],
    },
    {
      encodedRedirects: undefined,
      language: 'fi',
      expectedOutput: {},
      expectedWarnings: [],
    },
    {
      encodedRedirects: 'null',
      language: 'fi',
      expectedOutput: {},
      expectedWarnings: [],
    },
    {
      encodedRedirects: '[]',
      language: 'fi',
      expectedOutput: {},
      expectedWarnings: [],
    },
    {
      encodedRedirects: '[{"/a": "/b"}]',
      language: 'fi',
      expectedOutput: { '/a': '/b', '/fi/a': '/b' },
      expectedWarnings: [],
    },
    {
      encodedRedirects:
        '[{"/a": "/b"},' +
        '{"": ""},' +
        '{"invalid-from-path": "/valid-to-path"},' +
        '{"/test": "https://example.org/other-site/", "/c": "/d"},' +
        '{"/valid-from-path": "invalid-to-path"},' +
        '{"invalid-from-path": "invalid-to-path"}]',
      language: 'fi',
      expectedOutput: { '/a': '/b', '/fi/a': '/b', '/c': '/d', '/fi/c': '/d' },
      expectedWarnings: [
        'Ignoring invalid fi redirect: invalid-from-path -> /valid-to-path',
        'Ignoring invalid fi redirect: /test -> https://example.org/other-site/',
        'Ignoring invalid fi redirect: /valid-from-path -> invalid-to-path',
        'Ignoring invalid fi redirect: invalid-from-path -> invalid-to-path',
      ],
    },
    {
      encodedRedirects: '[{"/a": "/b"}]',
      language: 'sv',
      expectedOutput: { '/a': '/b', '/sv/a': '/b' },
      expectedWarnings: [],
    },
    {
      encodedRedirects: '[{"/a": "/b"}]',
      language: 'en',
      expectedOutput: { '/a': '/b', '/en/a': '/b' },
      expectedWarnings: [],
    },
    {
      encodedRedirects:
        '[{"/wiki/ακ#Απ": "/中-cn/to_go/2020年?search=with+text&type=new#info"}]',
      language: 'en',
      expectedOutput: {
        '/en/wiki/ακ#Απ': '/中-cn/to_go/2020年?search=with+text&type=new#info',
        '/wiki/ακ#Απ': '/中-cn/to_go/2020年?search=with+text&type=new#info',
      },
      expectedWarnings: [],
    },
    {
      encodedRedirects: '[{"/a": "/b"}, {"/c": "/d"}]',
      language: 'fi',
      expectedOutput: {
        '/a': '/b',
        '/c': '/d',
        '/fi/a': '/b',
        '/fi/c': '/d',
      },
      expectedWarnings: [],
    },
    {
      encodedRedirects: '{"/a": "/b", "/c": "/d"}',
      language: 'en',
      expectedOutput: {
        '/a': '/b',
        '/c': '/d',
        '/en/a': '/b',
        '/en/c': '/d',
      },
      expectedWarnings: [],
    },
    {
      encodedRedirects: '[{"/a/b/c": "/d"}, {"/e/f/": "/g/h/"}]',
      language: 'sv',
      expectedOutput: {
        '/a/b/c': '/d',
        '/e/f/': '/g/h/',
        '/sv/a/b/c': '/d',
        '/sv/e/f/': '/g/h/',
      },
      expectedWarnings: [],
    },
  ])(
    'parseRedirects($encodedRedirects, "$language") == $expectedOutput with expected warnings',
    ({ encodedRedirects, language, expectedOutput, expectedWarnings }) => {
      expect(parseRedirects(encodedRedirects, language)).toStrictEqual(
        expectedOutput
      );
      for (const warning of expectedWarnings) {
        expect(consoleWarningSpy).toHaveBeenCalledWith(warning);
      }
      expect(consoleWarningSpy).toHaveBeenCalledTimes(expectedWarnings.length);
    }
  );
});
