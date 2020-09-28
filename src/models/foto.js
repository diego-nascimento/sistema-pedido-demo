const mongoose = require('mongoose');

const fotoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('foto', fotoSchema);
