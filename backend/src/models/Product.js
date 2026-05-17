// Product model placeholder
import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: { type: Number, default: 0 },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  category: String,
  rating: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);