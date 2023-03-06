const redirectRoutes = {
  '/fi': [{ source: '/home', locale: 'fi' }],
  '/sv': [{ source: '/home', locale: 'sv' }],
  '/en': [{ source: '/home', locale: 'en' }],
  '/fi/haku': [{ source: '/events', locale: 'fi' }],
  '/sv/sok': [{ source: '/events', locale: 'sv' }],
  '/en/search': [{ source: '/events', locale: 'en' }],
};

module.exports = redirectRoutes;
