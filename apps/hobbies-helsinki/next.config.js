const packageJson = require('./package.json');
const i18nRoutes = require('./i18nRoutes.config');
const { i18n } = require('./next-i18next.config');
const nextBaseConfig = require('../../next.base.config');

module.exports = nextBaseConfig({ packageJson, i18nRoutes, i18n });
