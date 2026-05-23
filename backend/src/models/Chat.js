import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({

  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  text: String

}, { timestamps: true });

const chatSchema = new mongoose.Schema({

  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  messages: [messageSchema]

}, { timestamps: true });

export default mongoose.model("Chat", chatSchema);