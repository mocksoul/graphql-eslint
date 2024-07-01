# `unique-operation-name`

✅ The `"extends": "plugin:@graphql-eslint/operations-recommended"` property in a configuration file
enables this rule.

- Category: `Operations`
- Rule name: `@graphql-eslint/unique-operation-name`
- Requires GraphQL Schema: `false`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `true`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-siblings-operations)

Enforce unique operation names across your project.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/unique-operation-name: 'error'

# foo.query.graphql
query user {
  user {
    id
  }
}

# bar.query.graphql
query user {
  me {
    id
  }
}
```

### Correct

```graphql
# eslint @graphql-eslint/unique-operation-name: 'error'

# foo.query.graphql
query user {
  user {
    id
  }
}

# bar.query.graphql
query me {
  me {
    id
  }
}
```

## Resources

- [Rule source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/src/rules/unique-operation-name.ts)
- [Test source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/__tests__/unique-operation-name.spec.ts)
