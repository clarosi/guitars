const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        maxLength: 100
    },
    description: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 1000
    },
    price: {
        type: Number,
        required: true,
        maxLength: 255
    },
    brand: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Brand'
    },
    wood: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Wood'
    },
    shipping: {
        type: Boolean,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    frets: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        maxLength: 100,
        default: 0
    },
    publish: {
        type: Boolean,
        required: true
    },
    images: {
        type: Array,
        default: []
    }
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;