/**
 * The Events-graphql-proxy offers a way to ignore some custom ignorable graphql errors.
 * The 'X-Ignored-Error-Code' header is used to list the errors wanted to be ignored.
 * */
export const ignoredErrorCodesHeader = {
  'X-Ignored-Error-Code': 'UNPOPULATED_MANDATORY_DATA',
};
