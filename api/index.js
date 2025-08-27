// Followed documentation at https://www.apollographql.com/docs/apollo-server/getting-started/
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import fs from 'fs';

// Load quotes from JSON file
const quotes = JSON.parse(fs.readFileSync('quotes.json', 'utf-8'));

// GraphQL Schema
const typeDefs = `
    type Quote {
        id: ID!
        text: String!
        author: String!
    }

    type Query {
        quotes: [Quote!]!
        quote(id: ID!): Quote
        randomQuote: Quote
    }
`; // ! means non-nullable

// Define how to fetch the data
const resolvers = {
    Query: {
        quotes: () => quotes,
        quote: (_, { id }) => quotes.find(quote => quote.id === id),
        randomQuote: () => quotes[Math.floor(Math.random() * quotes.length)]
    }
};

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Export your server for Vercel

// Creates an Express app, makes ApolloServer instance available as middleware, and prepares the app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);