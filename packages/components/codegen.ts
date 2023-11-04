import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.FEDERATION_ROUTER_ENDPOINT,
  documents: ['../../packages/components/src/components/domain/**/*query.ts'],
  generates: {
    './src/components/domain/graphql/generated/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        withComponent: false,
        flattenSelectionSet: true,
        namingConvention: {
          enumValues: './pascalCaseWithUnderscoreBeforeLeadingDigit',
        },
      },
      hooks: {
        afterOneFileWrite: ['prettier --write'],
      },
    },
  },
};

export default config;
