import fs from "fs";
import path from "path";
import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";

// Define types
interface Quote {
    id: string;
    text: string;
    author: string;
}

interface QueryArgs {
    id: string;
}

// Load quotes
const quotesPath = path.join(process.cwd(), "data", "quotes.json");
const quotes: Quote[] = JSON.parse(fs.readFileSync(quotesPath, "utf-8"));


// Typedefs
const typeDefs = `
    type Quote {
        id: ID!
        text: String!
        author: String!
    }

    type Query {
        quotes: [Quote!]!
        quote(id: ID!): Quote
        randomQuote: Quote!
    }
`

// Resolvers
const resolvers = {
    Query: {
        quotes: (): Quote[] => quotes,
        quote: (_: any, { id }: QueryArgs): Quote | undefined => quotes.find(quote => quote.id === id),
        randomQuote: (): Quote => quotes[Math.floor(Math.random() * quotes.length)]
    }
}

// Server startup
const server = new ApolloServer({ typeDefs, resolvers });
const handler = startServerAndCreateNextHandler(server);

export async function POST(req: NextRequest) {
  return handler(req);
}

export async function GET(req: NextRequest) {
  return handler(req);
}