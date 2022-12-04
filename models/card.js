const mongoose = require('mongoose');

const cardShema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    minLength:2,
    maxLength:30
  },
 link:{
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt:{
    type: Date,
    default: Date.now
  }
})

const card = mongoose.model('card',cardShema);
module.exports = card