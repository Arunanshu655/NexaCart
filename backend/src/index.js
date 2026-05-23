// Main backend entry point placeholder
import express from "express";
import { ApolloServer } from "apollo-server-express";
import {Server} from 'socket.io';
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import schema from "./graphql/schema.js";
import jwt from "jsonwebtoken";

const port = process.env.PORT || 4000;
const app = express();
const httpServer = http.createServer(app)
const io = new Server(httpServer,{
  cors:{
    origin:"*"
  }
})


io.on("connection",(socket)=>{
  console.log("user connected : ", socket.id)

  socket.on("disconnect",()=>{
    console.log("disconnected user : ",socket.id)
  })
})

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
await mongoose.connect(process.env.MONGO_URI);

httpServer.listen(port, () => {
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
});