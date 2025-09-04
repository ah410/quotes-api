import fs from "fs";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";

// Create an Express app, using CORS and JSON middleware
const app = express();
app.use(cors());
app.use(express.json());

// Load quotes from JSON file
const quotesPath = new URL('./quotes.json', import.meta.url);
const quotes = JSON.parse(fs.readFileSync(quotesPath, 'utf-8'));

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
    resolvers
});
await server.start();

app.use('/graphql', expressMiddleware(server));

// Export the app for Vercel
export default app;