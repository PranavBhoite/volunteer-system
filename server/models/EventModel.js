const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  date: {
    type: String, 
    required: [true, 'Date is required']
  },
  time: {
    type: String, 
    required: true
  },
  location: {
    type: String,
    trim: true,
  },
  category: {
    type: String
  },
  volunteersNeeded: {
    type: Number,
    default: 0,
    required: [true, 'Number of Volunteers is required'],
  },
  volunteersRegistered : {
    type : Number,
    default : 0
  }
});

module.exports = mongoose.model('Event', eventSchema, 'events');
