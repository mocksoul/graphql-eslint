# `require-deprecation-date`

💡 This rule provides
[suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

- Category: `Schema`
- Rule name: `@graphql-eslint/require-deprecation-date`
- Requires GraphQL Schema: `false`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-siblings-operations)

Require deletion date on `@deprecated` directive. Suggest removing deprecated things after
deprecated date.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/require-deprecation-date: 'error'

type User {
  firstname: String @deprecated
  firstName: String
}
```

### Incorrect

```graphql
# eslint @graphql-eslint/require-deprecation-date: 'error'

type User {
  firstname: String @deprecated(reason: "Use 'firstName' instead")
  firstName: String
}
```

### Correct

```graphql
# eslint @graphql-eslint/require-deprecation-date: 'error'

type User {
  firstname: String @deprecated(reason: "Use 'firstName' instead", deletionDate: "25/12/2022")
  firstName: String
}
```

## Config Schema

The schema defines the following properties:

### `argumentName` (string)

## Resources

- [Rule source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/src/rules/require-deprecation-date.ts)
- [Test source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/__tests__/require-deprecation-date.spec.ts)
