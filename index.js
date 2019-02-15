const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const axios = require('axios');
const morgan = require('morgan');

const typeDefs = require('./schemas');

const githubApiClient = axios.create({
  baseURL: 'https://api.github.com/',
  timeout: 1000
});

// The resolvers
const resolvers = {
  Query: {
    user: (root, { username }) =>
      githubApiClient.get(`/users/${username}`).then(({ data }) => data)
  }
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Initialize the app
const app = express();

app.use(morgan('tiny'));

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});
