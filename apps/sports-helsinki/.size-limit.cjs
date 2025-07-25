// Just a basic example for size limit with simple file preset
// @link https://github.com/ai/size-limit

let manifest;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
  manifest = require('./.next/build-manifest.json');
} catch (e) {
  throw new Error(
    'Cannot find a NextJs build folder, did you forget to build ?',
    e
  );
}
const pages = manifest.pages;

const limitCfg = {
  defaultSize: '95kb',
  pages: {
    '/': '120kb',
    '/_app': '750kb', // NOTE: this is much!
    '/home': '105kb',
    '/articles': '100kb',
    '/courses/[eventId]': '150kb',
    '/search': '180kb',
    '/search/map': '150kb',
    '/venues/[venueId]': '250kb',
  },
};
const getPageLimits = () => {
  let pageLimits = [];
  for (const [uri, paths] of Object.entries(pages)) {
    pageLimits.push({
      name: `Page '${uri}'`,
      limit: limitCfg.pages?.[uri] ?? limitCfg.defaultSize,
      path: paths.map((p) => `.next/${p}`),
    });
  }
  return pageLimits;
};

// eslint-disable-next-line no-undef
module.exports = [
  ...getPageLimits(),
  {
    name: 'CSS',
    path: ['.next/static/css/**/*.css'],
    limit: '40 kB', // NOTE: this is much, should be around 10 kb
  },
];
