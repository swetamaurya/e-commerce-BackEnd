const { ref } = require("firebase/database");
const mongoose = require("mongoose");
const Product = require("./productModel");

// Function to generate random 7-digit ID
function generateId() {
  return Math.floor(1000000 + Math.random() * 9000000).toString();
}

// formet data and time
const date = new Date();
const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
const formattedDateTime = `${formattedDate} ${formattedTime}`;


const addressSchema = new mongoose.Schema({
    city: String,
    state: String,
    zipCode: String,
    country: String
}, { _id: false });

const productSchema = new mongoose.Schema({
    productId: { type: String, default: generateId },
    quantity: Number,
    price: Number
}, { _id: false });

const paymentSchema = new mongoose.Schema({
    paymentId: { type: String, default: generateId },
    amount: Number,
    paymentDate: { type: String, default: formattedDateTime },
    paymentMethod: String,
    status: String
}, { _id: false });

const wishlistSchema = new mongoose.Schema({
    wishlistId: { type: String, default: generateId },
    products: [productSchema]
}, { _id: false });

const orderSchema = new mongoose.Schema({
    orderId: { type: String, default: generateId },
    products: [productSchema],
    payments: [paymentSchema],
    orderDate: { type: String, default: formattedDateTime },
    status: String,
    shippingAddress: addressSchema
}, { _id: false });

const cartItemSchema = new mongoose.Schema({
    cartItemId: { type: String, default: generateId },
    productId: { type: String,ref: 'Product' },
    quantity: { type: Number, default: 1 }
}, { _id: false });

const userSchema = new mongoose.Schema({
    userId: { type: String, default: generateId },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile: { type: String, required: true },
    mobile: { type: String, required: true },
    address: addressSchema,
    wishlist: [wishlistSchema],
    orders: [orderSchema],
    cart: [cartItemSchema],
    createDate: { type: String, default: formattedDateTime }
});

const User = mongoose.model("User", userSchema)
module.exports = User