const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  budget: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  deadline: { 
    type: Date 
  }, 
  status: {
    type: String,
    enum: ['Planning','In Progress','On Hold','Completed','Cancelled'],
    default: 'Planning'
  },
  progress: { 
    type: Number, 
    min: 0, 
    max: 100, 
    default: 0 
  },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category',   
    required: true 
  },
  subcategory: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Subcategory',
    required: true 
  },
  image: { 
    type: String, 
    default: '' 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  assignedTo: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  

  type: {
    type: String,
    enum: ['offer','request'],
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', ServiceSchema);
