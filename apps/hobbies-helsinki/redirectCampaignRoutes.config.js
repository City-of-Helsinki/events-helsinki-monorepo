// Ignore prettier in order to preserve readability of the routes:
// prettier-ignore
const redirectRoutes = {
  // Finnish locale versions
  '/suomenmalli': '/fi/haku?text=harrastamisen+suomen+malli',
  // Swedish locale versions
  '/finlandsmodellen': '/sv/sok?text=harrastamisen+suomen+malli',
  // English locale versions
  '/thefinnishmodel': '/en/search?text=harrastamisen+suomen+malli',
};

module.exports = redirectRoutes;
