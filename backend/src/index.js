// Main backend entry point placeholder
import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import schema from "./graphql/schema.js";
import jwt from "jsonwebtoken";

const port = process.env.PORT || 4000;
const app = express();

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    // console.log("Received token:", token);
    try{
      
      const user = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("User:", user);
      return { user };

    }catch(err){
      console.log("Error occurred while verifying token:", err);
      return { user: null };
    }
  }
});

await server.start();
server.applyMiddleware({ app });
console.log("Connecting to MongoDB...");
mongoose.connect(process.env.MONGO_URI);

app.listen({ port }, () =>
console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
)