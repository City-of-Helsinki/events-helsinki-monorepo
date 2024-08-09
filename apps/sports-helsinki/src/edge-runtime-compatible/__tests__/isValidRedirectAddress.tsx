import { isValidRedirectAddress } from '../isValidRedirectAddress';

describe('isValidRedirectAddress returns true', () => {
  it.each([
    '/',
    '/questions/198606/can-i-use-commas-in-a-url',
    '/fi/search?searchType=Venue&text=test+a+text+search&venueOrderBy=wheelchair',
    '/wiki/File:Artistic_swimming_women%27s_team_medal_ceremony_at_Tokyo_2020.jpg',
    '/wiki/2020年夏季奧林匹克運動會團體韻律泳比賽',
    '/wiki/Καλλιτεχνική_κολύμβηση_στους_Θερινούς_Ολυμπιακούς_Αγώνες_2020_–_Ομαδικό_γυναικών#Αποτελέσματα',
    '/auth/realms/helsinki-tunnistus/protocol/openid-connect/auth?client_id=kukkuu-ui&redirect_uri=' +
      'https%3A%2F%2Fkummilapset.hel.fi%2Fcallback&response_type=code&scope=openid+profile+email&state=' +
      '5df5f78691853f7ef4f5db2d02fb0e20&code_challenge=ZbOcQqOA-lLNB93o_OnaCJo7QcINCfx-cfVbMrZwDFD&' +
      'code_challenge_method=S256&response_mode=query',
    '/fi/أطفال-الثقافة/',
  ])('%s', (pathname) => {
    expect(isValidRedirectAddress(pathname)).toBe(true);
  });
});

describe('isValidRedirectAddress returns false', () => {
  it.each([
    '',
    ' ',
    ' /',
    '/ ',
    ' / ',
    '\n/',
    '//',
    '/`',
    'https://example.org/',
    'https://liikunta.hel.fi/search',
  ])('%s', (pathname) => {
    expect(isValidRedirectAddress(pathname)).toBe(false);
  });
});
