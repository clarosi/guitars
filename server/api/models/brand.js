const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 100
    }
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;