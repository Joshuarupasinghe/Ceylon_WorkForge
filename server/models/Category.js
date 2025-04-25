const mongoose = require('mongoose');
const { transformAuthInfo } = require('passport');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    subcategories: [{
        type: String,
        trim: true
    }],

    image: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);