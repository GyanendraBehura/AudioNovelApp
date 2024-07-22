// models/Audiobook.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user_name: String,
  review: String,
  rating: Number,
});

const audiobookSchema = new mongoose.Schema({
  id: Number,
  name: String,
  author: String,
  genres: [String],
  description: String,
  rating: Number,
  reviews: [reviewSchema],
  image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
});

const Audiobook = mongoose.model('Audiobook', audiobookSchema);

module.exports = Audiobook;
