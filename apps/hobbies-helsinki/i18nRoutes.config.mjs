const i18nRoutes = {
  '/search': [
    { source: '/haku', locale: 'fi' },
    { source: '/sok', locale: 'sv' },
  ],
  '/courses/:eventId': [
    { source: '/kurssit/:eventId', locale: 'fi' },
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
};

export default i18nRoutes;
