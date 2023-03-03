const i18nRoutesCurrentVersion = {
  '/search': [
    { source: '/haku', locale: 'fi' },
    { source: '/sok', locale: 'sv' },
  ],
  '/events/:eventId': [
    { source: '/tapahtumat/:eventId', locale: 'fi' },
    { source: '/kurser/:eventId', locale: 'sv' },
  ],
  '/articles': [
    { source: '/artikkelit', locale: 'fi' },
    { source: '/artiklar', locale: 'sv' },
  ],
  '/articles/:slug*': [
    { source: '/artikkelit/:slug*', locale: 'fi' },
    { source: '/artiklar/:slug*', locale: 'sv' },
  ],
  '/pages/:slug*': [
    { source: '/sivut/:slug*', locale: 'fi' },
    { source: '/sidor/:slug*', locale: 'sv' },
  ],
  '/accessibility': [
    { source: '/saavutetavuusseloste', locale: 'fi' },
    { source: '/tillgäntglighetsutlåtande', locale: 'sv' },
  ],
  '/about': [
    { source: '/tietoa', locale: 'fi' },
    { source: '/kunskap', locale: 'sv' },
  ],
};

const i18nRoutesPreviousVersions = {
  '/fi': [{ source: '/home', locale: 'fi' }],
  '/sv': [{ source: '/home', locale: 'sv' }],
  '/en': [{ source: '/home', locale: 'en' }],
  '/fi/haku': [{ source: '/events', locale: 'fi' }],
  '/sv/sok': [{ source: '/events', locale: 'sv' }],
  '/en/search': [{ source: '/events', locale: 'en' }],
};

const i18nRoutes = Object.assign(
  {},
  i18nRoutesPreviousVersions,
  i18nRoutesCurrentVersion
);

module.exports = i18nRoutes;
