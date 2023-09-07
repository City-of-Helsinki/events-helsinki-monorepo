import { CustomIgnorableGraphQLErrorEnum } from './enums';
export const X_REQUEST_ID = 'X-Request-ID';
// Use this header name to add GraphQL error codes that should not throw the error when it occures
export const X_IGNORED_ERROR_CODE = 'x-ignored-error-code';
export const ignorableGraphqlErrorCodes = Object.values<string>(
  CustomIgnorableGraphQLErrorEnum
);
