const mongoose = require('mongoose');

const shopSchema= new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  reviews: {
    type: String,
  },
  postingLink: {
    type: String,
  },
  status: {
    type: String,
    enum: ['offersDelivery', 'ordered', 'localDeliverOnly',],
  }
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  shops: [shopSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
