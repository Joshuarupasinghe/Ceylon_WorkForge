const mongoose = require('mongoose');

const SubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Subcategory', SubcategorySchema);
