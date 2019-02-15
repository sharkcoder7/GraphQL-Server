# github-gql
GraphQL server for Github API

### Overview
Basic GraphQL server which wraps the Github Users API endpoint.  Created a `User` schema and a corresponding `Query` schema
to fetch a user's Github user data with the provided `username` in the query.

### Development

1. Run `npm run watch` to bring up GraphQL server at `http://localhost:3000`
2. Navigate to `http://localhost:3000/graphiql` to play around with server using GraphQL IDE
3. Enter the following query to fetch Github userdata with username you provided
4. Look at the `User.js` schema to see what other fields are supported and add them in query to see additional user data

```javascript
query {
  user(username:"yourusername") {
    id
  }
}
```
