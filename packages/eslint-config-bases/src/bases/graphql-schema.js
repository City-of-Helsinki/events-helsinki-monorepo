/**
 * Opinionated config base for projects using graphql schemas (*.graphql)
 * @see https://github.com/City-of-Helsinki/events-helsinki-monorepo/tree/main/packages/eslint-config-bases
 */
const graphqlSchemaPatterns = {
  files: ['*.graphql'],
};

export default [
  {
    files: graphqlSchemaPatterns.files,
    parser: '@graphql-eslint/eslint-plugin',
    plugins: ['@graphql-eslint'],
    rules: {
      '@graphql-eslint/known-type-names': 'error',
    },
  },
];
