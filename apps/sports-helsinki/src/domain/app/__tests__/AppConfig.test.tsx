import AppConfig from '../AppConfig';

let env: any;

beforeAll(() => {
  env = process.env;
});

afterAll(() => {
  process.env = env;
});

it.each([
  { origin: 'http://localhost:8080', expectedHostname: 'localhost' },
  { origin: 'https://a.example.org/', expectedHostname: 'a.example.org' },
  { origin: 'https://a.example.org', expectedHostname: 'a.example.org' },
  { origin: 'https://a.b.c:8080/1/2/3?a=1&b=2', expectedHostname: 'a.b.c' },
])('provides hostname from $origin', ({ origin, expectedHostname }) => {
  process.env.NEXT_PUBLIC_APP_ORIGIN = origin;
  expect(AppConfig.hostname).toStrictEqual(expectedHostname);
});

it.each([
  {
    field: 'origin',
    mockEnvValue: 'https://localhost',
    envName: 'NEXT_PUBLIC_APP_ORIGIN',
    expectToEqual: undefined,
  },
])(
  'provides required config $field',
  ({ field, mockEnvValue, envName, expectToEqual }) => {
    // When exists, provides it
    process.env[envName] = mockEnvValue;
    // @ts-ignore
    expect(AppConfig[field]).toStrictEqual(
      expectToEqual ?? process.env[envName]
    );

    // When it doesn't exists, errors
    delete process.env[envName];
    // @ts-ignore
    expect(() => AppConfig[field]).toThrow(
      `Environment variable with name ${envName} was not found`
    );
  }
);

it.each([
  {
    field: 'debug',
    envName: 'NEXT_PUBLIC_DEBUG',
    defaultValue: false,
  },
  {
    field: 'allowUnauthorizedRequests',
    envName: 'NEXT_PUBLIC_ALLOW_UNAUTHORIZED_REQUESTS',
    defaultValue: false,
  },
  {
    field: 'showSimilarEvents',
    envName: 'NEXT_PUBLIC_SHOW_SIMILAR_EVENTS',
    defaultValue: true,
  },
])('provides flag config $field', ({ field, envName, defaultValue }) => {
  // When undefined, returns false
  delete process.env[envName];
  // @ts-ignore
  expect(AppConfig[field]).toStrictEqual(defaultValue);

  // When 0, returns false
  process.env[envName] = '0';
  // @ts-ignore
  expect(AppConfig[field]).toStrictEqual(false);

  // When false, returns false
  process.env[envName] = 'false';
  // @ts-ignore
  expect(AppConfig[field]).toStrictEqual(false);

  // When 1, returns true
  process.env[envName] = '1';
  // @ts-ignore
  expect(AppConfig[field]).toStrictEqual(true);

  // When true, returns true
  process.env[envName] = 'true';
  // @ts-ignore
  expect(AppConfig[field]).toStrictEqual(true);
});

it.each([
  {
    field: 'defaultRevalidate',
    envName: 'NEXT_PUBLIC_DEFAULT_ISR_REVALIDATE_SECONDS',
    defaultValue: 60,
  },
])('provides number config $field', ({ field, envName, defaultValue }) => {
  // When exists, provides it
  process.env[envName] = '10';
  // @ts-ignore
  expect(AppConfig[field]).toStrictEqual(10);

  // When it doesn't exist
  delete process.env[envName];
  if (defaultValue) {
    // @ts-ignore
    expect(AppConfig[field]).toStrictEqual(defaultValue);
  } else {
    // @ts-ignore
    expect(AppConfig[field]).toBeUndefined();
  }

  // When it's of wrong type, it errors
  process.env[envName] = 'Some string';
  // @ts-ignore
  expect(() => AppConfig[field]).toThrow(
    `${envName} must be a value that can be parsed into a number`
  );
});

it('provides configuration for Matomo', () => {
  process.env.NEXT_PUBLIC_MATOMO_ENABLED = 'true';
  process.env.NEXT_PUBLIC_MATOMO_SITE_ID = 'abc-123';
  process.env.NEXT_PUBLIC_MATOMO_URL_BASE = '//webanalytics.digiaiiris.com/js/';
  process.env.NEXT_PUBLIC_MATOMO_SRC_URL = 'piwik.min.js';
  process.env.NEXT_PUBLIC_MATOMO_TRACKER_URL = 'tracker.php';

  expect(AppConfig.matomoConfiguration).toMatchInlineSnapshot(`
    {
      "disabled": false,
      "siteId": NaN,
      "srcUrl": "//webanalytics.digiaiiris.com/js/piwik.min.js",
      "trackerUrl": "//webanalytics.digiaiiris.com/js/tracker.php",
      "urlBase": "//webanalytics.digiaiiris.com/js/",
    }
  `);

  process.env.NEXT_PUBLIC_MATOMO_ENABLED = '1';
  expect(AppConfig.matomoConfiguration?.disabled).toStrictEqual(false);
});
