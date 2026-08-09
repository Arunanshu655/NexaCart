// resolvers/index.js
import mongoose from "mongoose";
import User from "../../models/User.js";
import Product from "../../models/Product.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Cart from "../../models/Cart.js";
import Order from "../../models/Order.js";
import Review from "../../models/Review.js";
import Chat from "../../models/Chat.js";

export default {
  Query: {
    //1
    test: () => "Hello, GraphQL!",
    //2
    products: async () => await Product.find(),
    //3
    product: async (_, { id }) =>{
      try {
        // console.log(typeof(id))

        const objectId = new mongoose.Types.ObjectId(id);
        // console.log(typeof(objectId))
        return await Product.findById(objectId);
      } catch (err) {
        // console.log(err)
        throw new Error("Invalid product ID format");
      }
    }, 
    //4
    cart: async (_, __, { user }) => {

      if (!user) throw new Error("Unauthorized");

        const userCart =  await Cart.findOne({ user: user.id })
        .populate("items.product").populate("user");
      
      // if(!userCart.data.cart) return {"message":"No items in your Cart"}
      return userCart;
    },
    //5
    orders: async (_, __, { user }) => {
      if(!user) throw new Error("Unauthorized");
      
      return await Order.find({ user: user.id })
        .populate("items.product").populate("user");
    },
    //6
    reviews: async (_, { productId }) => {

      return await Review.find({
        product: productId
      })
      .populate("user")
      .populate("product");
    },
    //7
    myChats: async (_, __, { user }) => {

      if (!user) {
        throw new Error("Unauthorized");
      }

      return await Chat.find({
        users: user.id
      })
      .populate("users", "name email")
      .populate("messages.sender", "name");
    },
    //8
    chat: async (_, { chatId }, { user }) => {

      if (!user) {
        throw new Error("Unauthorized");
      }

      const chat = await Chat.findById(chatId)
        .populate("users", "name email")
        .populate("messages.sender", "name");

      if (!chat) {
        throw new Error("Chat not found");
      }

      return chat;
    },
    me: async(_,__,context) => {
      // console.log("context" + " [ " + context+" ]")
      if(!context.user) throw new Error("Unauthorized")

        return await User.findById(context.user.id) 
    } 
  },

  Mutation: {
    //1
    register: async (_, { name, email, password, role }) => {
      const hash = await bcrypt.hash(password, 10);
      return await User.create({ name, email, password: hash, role: role || 'buyer' });
    },
    //2
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
          throw new Error("User not found");
      }
      const valid = await bcrypt.compare(password, user.password);

      if (!valid) throw new Error("Password mismatch with user");

      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    },
    //3
    addProduct: async (_, { name, price, description, seller},{user}) => {
      if (!user) throw new Error("Unauthorized");
      
      const dbUser = await User.findById(user.id);

      if(!dbUser) throw new Error("User not found");
      if (dbUser.role !== "seller") throw new Error("Only sellers can add products");
      return await Product.create({ name, price, description, seller });
    },

    // CART MUTATIONS****************************

    //add product to cart******************************************
    //4
    addToCart: async (_, { productId, quantity }, { user }) => {

      if (!user) throw new Error("Unauthorized");

      let cart = await Cart.findOne({ user: user.id });

      // create cart if doesn't exist
      if (!cart) {
        cart = await Cart.create({
          user: user.id,
          items: []
        });
      }

      // check existing product
      const existingItem = cart.items.find(
        item => item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({
          product: productId,
          quantity
        });
      }

      await cart.save();

      return await cart.populate("items.product");
    },
    //remove product from cart******************************************

    //5
    removeFromCart: async (_, { productId }, { user }) => {
      if (!user) throw new Error("Unauthorized");
      const cart = await Cart.findOne({ user: user.id });

      if (!cart) throw new Error("Cart not found"); 
      cart.items = cart.items.filter(
        item => item.product.toString() !== productId
      );
      await cart.save();
      return await cart.populate("items.product");
    },
    //update cart quantity******************************************

    //6
    updateCartQuantity: async (_, { productId, quantity }, { user }) => {
      if (!user) throw new Error("Unauthorized");
      const cart = await Cart.findOne({ user: user.id });

      if (!cart) throw new Error("Cart not found");

      const item = cart.items.find(
        i => i.product.toString() === productId
      );

      if (!item) throw new Error("Item not found in cart");
      
      if (quantity <= 0) {
        throw new Error("Quantity must be greater than 0");
      }


      item.quantity = quantity;
      await cart.save();
      return await cart.populate("items.product");
    },
    //creates order*********************************************

    //7
    createOrder: async (_, __, { user }) => {

  if (!user) throw new Error("Unauthorized");

  const cart = await Cart.findOne({ user: user.id })
    .populate("items.product");

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  let total = 0;

  const orderItems = cart.items.map(item => {

    total += item.product.price * item.quantity;

    return {
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price
    };
  });

  
  // clear cart after order
  
  const order = await Order.create({
    user: user.id,
    items: orderItems,
    totalPrice: total
  })
  // .populate("items.product").populate("user");
  
  cart.items = [];
  await cart.save();
},
    //cancel order*********************************************

    //8
    cancelOrder: async(_,{orderId}, {user}) =>{
      if(!user) throw new Error("unauthorized")

      const order = await Order.findById(orderId)

      console.log("order : " + order)
      if(order.status === 'delivered') throw new Error("order is placed")
        

      // console.log(order.user+" "+ user.id)
      if(order.user.toString() === user.id){
        order.status = "cancelled";

        await order.save();

        return (await order.populate("items.product")).populate("user");
      }else{
        throw new Error("This is not your order")
      }
    },

    //9
    addReview: async (_, { productId, rating, comment }, { user }) => {

      if (!user) {
        throw new Error("Unauthorized");
      }

      // validate rating
      if (rating < 1 || rating > 5) {
        throw new Error("Rating must be between 1 and 5");
      }

      // check product exists
      const product = await Product.findById(productId);

      if (!product) {
        throw new Error("Product not found");
      }

      // optional: prevent duplicate review
      const existingReview = await Review.findOne({
        user: user.id,
        product: productId
      });

      if (existingReview) {
        throw new Error("You already reviewed this product");
      }

      const review = await Review.create({
        user: user.id,
        product: productId,
        rating,
        comment
      });

      return await review.populate("user product");
    },

    //10
    createChat: async (_, { userId }, { user }) => {

      if (!user) {
        throw new Error("Unauthorized");
      }

      // prevent self-chat
      if (user.id === userId) {
        throw new Error("Cannot chat with yourself");
      }

      // check existing chat
      let existingChat = await Chat.findOne({
        users: {
          $all: [user.id, userId]
        }
      })
      .populate("users");

      if (existingChat) {
        return existingChat;
      }

      const chat = await Chat.create({
        users: [user.id, userId],
        messages: []
      });

      return await chat.populate("users");
    },

    //11
    sendMessage: async (_, { chatId, text }, { user }) => {

      if (!user) {
        throw new Error("Unauthorized");
      }

      const chat = await Chat.findById(chatId);

      if (!chat) {
        throw new Error("Chat not found");
      }

      // verify user belongs to chat
      const isMember = chat.users.some(
        u => u.toString() === user.id
      );

      if (!isMember) {
        throw new Error("Not part of this chat");
      }

      chat.messages.push({
        sender: user.id,
        text
      });

      await chat.save();

      return await chat.populate([
        {
          path: "users",
          select: "name email"
        },
        {
          path: "messages.sender",
          select: "name"
        }
      ]);
    }
  },
  Product: {
      reviews: async (parent) => {

      return await Review.find({
        product: parent.id
      })
      .populate("user", "name");
    }
  }

};