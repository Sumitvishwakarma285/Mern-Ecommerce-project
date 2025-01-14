const mongoose= require("mongoose");
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Product Name"]
    },
    description: {
        type: String,
        required: [true, "Please Enter Description"]
    },
    price: {
        type: Number,
        required: [true, "Please Enter Product Price"],
        maxlength: [8, "Price can not exceed 8 characters"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    category: {
        type: String,
        required: [true, "Please Enter Product Category"]
    },
    stock: {
        type: Number,
        required: [true, "Please Enter Product Stock"],
        max: [9999, "Stock can not exceed four characters"],
        default: 1
    },
    numofReviews: {
        type: Number,
        default: 1
    },
    reviews: [{
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = new mongoose.model("Product", productSchema);
