const mongoose = require("mongoose");

// Function to generate random 7-digit ID
function generateId() {
    return Math.floor(1000000 + Math.random() * 9000000).toString();
}

// formet data and time
const date = new Date();
const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
const formattedDateTime = `${formattedDate} ${formattedTime}`;

// Product schema
const productSchema = new mongoose.Schema({
    productId: { type: String, default: generateId },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    quantityAvailable: { type: Number, default: 0 },
    images: [String],
    ratings: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },
    reviews: [
        {
            userId: { type: String, ref: 'User' },
            // name: String,
            rating: Number,
            comment: String
        }
    ],
    comments: [
        {
            commentId: String,
            userId: {  type: String, ref: 'User'  },
            // name: String,
            comment: String
        }
    ],
    createDate: { type: String, default: formattedDateTime}
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
