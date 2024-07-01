# `require-nullable-result-in-root`

💡 This rule provides
[suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

- Category: `Schema`
- Rule name: `@graphql-eslint/require-nullable-result-in-root`
- Requires GraphQL Schema: `true`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-siblings-operations)

Require nullable fields in root types.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/require-nullable-result-in-root: 'error'

type Query {
  user: User!
}
```

### Correct

```graphql
# eslint @graphql-eslint/require-nullable-result-in-root: 'error'

type Query {
  foo: User
  baz: [User]!
  bar: [User!]!
}
```

## Resources

- [Rule source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/src/rules/require-nullable-result-in-root.ts)
- [Test source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/__tests__/require-nullable-result-in-root.spec.ts)
