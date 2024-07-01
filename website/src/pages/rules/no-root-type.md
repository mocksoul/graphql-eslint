# `no-root-type`

💡 This rule provides
[suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

- Category: `Schema`
- Rule name: `@graphql-eslint/no-root-type`
- Requires GraphQL Schema: `true`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-siblings-operations)

Disallow using root types `mutation` and/or `subscription`.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/no-root-type: ['error', { disallow: ['mutation', 'subscription'] }]

type Mutation {
  createUser(input: CreateUserInput!): User!
}
```

### Correct

```graphql
# eslint @graphql-eslint/no-root-type: ['error', { disallow: ['mutation', 'subscription'] }]

type Query {
  users: [User!]!
}
```

## Config Schema

The schema defines the following properties:

### `disallow` (array, required)

The elements of the array can contain the following enum values:

- `mutation`
- `subscription`

Additional restrictions:

- Minimum items: `1`
- Unique items: `true`

## Resources

- [Rule source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/src/rules/no-root-type.ts)
- [Test source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/__tests__/no-root-type.spec.ts)
