import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://api-manaledger.vercel.app/graphql',
  documents: ['src/**/*.graphql', '!src/app/generated/**'],
  generates: {
    'src/app/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-apollo-angular',
      ],
      config: {
        addExplicitOverride: true,
        strictScalars: true,
        skipTypename: false,
        skipDocumentsValidation: true,
        scalars: {
          DateTime: 'string',
          JSON: 'any',
        },
      },
    },
    'src/app/generated/introspection.json': {
      plugins: ['introspection'],
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};

export default config;
