# `no-unreachable-types`

✅ The `"extends": "plugin:@graphql-eslint/schema-recommended"` property in a configuration file
enables this rule.

💡 This rule provides
[suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

- Category: `Schema`
- Rule name: `@graphql-eslint/no-unreachable-types`
- Requires GraphQL Schema: `true`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-siblings-operations)

Requires all types to be reachable at some level by root level fields.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/no-unreachable-types: 'error'

type User {
  id: ID!
  name: String
}

type Query {
  me: String
}
```

### Correct

```graphql
# eslint @graphql-eslint/no-unreachable-types: 'error'

type User {
  id: ID!
  name: String
}

type Query {
  me: User
}
```

## Resources

- [Rule source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/src/rules/no-unreachable-types.ts)
- [Test source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/__tests__/no-unreachable-types.spec.ts)
