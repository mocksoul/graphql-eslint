# `alphabetize`

🔧 The `--fix` option on the
[command line](https://eslint.org/docs/user-guide/command-line-interface#--fix) can automatically
fix some of the problems reported by this rule.

- Category: `Schema & Operations`
- Rule name: `@graphql-eslint/alphabetize`
- Requires GraphQL Schema: `false`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false`
  [ℹ️](/docs/getting-started#extended-linting-rules-with-siblings-operations)

Enforce arrange in alphabetical order for type fields, enum values, input object fields, operation
selections and more.

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/alphabetize: ['error', { fields: ['ObjectTypeDefinition'] }]

type User {
  password: String
  firstName: String! # should be before "password"
  age: Int # should be before "firstName"
  lastName: String!
}
```

### Correct

```graphql
# eslint @graphql-eslint/alphabetize: ['error', { fields: ['ObjectTypeDefinition'] }]

type User {
  age: Int
  firstName: String!
  lastName: String!
  password: String
}
```

### Incorrect

```graphql
# eslint @graphql-eslint/alphabetize: ['error', { values: true }]

enum Role {
  SUPER_ADMIN
  ADMIN # should be before "SUPER_ADMIN"
  USER
  GOD # should be before "USER"
}
```

### Correct

```graphql
# eslint @graphql-eslint/alphabetize: ['error', { values: true }]

enum Role {
  ADMIN
  GOD
  SUPER_ADMIN
  USER
}
```

### Incorrect

```graphql
# eslint @graphql-eslint/alphabetize: ['error', { selections: ['OperationDefinition'] }]

query {
  me {
    firstName
    lastName
    email # should be before "lastName"
  }
}
```

### Correct

```graphql
# eslint @graphql-eslint/alphabetize: ['error', { selections: ['OperationDefinition'] }]

query {
  me {
    email
    firstName
    lastName
  }
}
```

## Config Schema

The schema defines the following properties:

### `fields` (array)

Fields of `type`, `interface`, and `input`.

The elements of the array can contain the following enum values:

- `ObjectTypeDefinition`
- `InterfaceTypeDefinition`
- `InputObjectTypeDefinition`

Additional restrictions:

- Minimum items: `1`
- Unique items: `true`

### `values` (boolean)

Values of `enum`.

### `selections` (array)

Selections of `fragment` and operations `query`, `mutation` and `subscription`.

The elements of the array can contain the following enum values:

- `OperationDefinition`
- `FragmentDefinition`

Additional restrictions:

- Minimum items: `1`
- Unique items: `true`

### `variables` (boolean)

Variables of operations `query`, `mutation` and `subscription`.

### `arguments` (array)

Arguments of fields and directives.

The elements of the array can contain the following enum values:

- `FieldDefinition`
- `Field`
- `DirectiveDefinition`
- `Directive`

Additional restrictions:

- Minimum items: `1`
- Unique items: `true`

### `definitions` (boolean)

Definitions – `type`, `interface`, `enum`, `scalar`, `input`, `union` and `directive`.

### `groups` (array)

Custom order group. Example: `['id', '*', 'createdAt', 'updatedAt']` where `*` says for everything
else.

The object is an array with all elements of the type `string`.

Additional restrictions:

- Minimum items: `2`
- Unique items: `true`

## Resources

- [Rule source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/src/rules/alphabetize.ts)
- [Test source](https://github.com/B2o5T/graphql-eslint/tree/master/packages/plugin/__tests__/alphabetize.spec.ts)
