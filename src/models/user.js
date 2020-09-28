const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
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

userSchema.pre('save', async function (next) {
  this.password = await bcryptjs.hash(this.password, 8);
  next();
});

userSchema.methods.checkPassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

module.exports = mongoose.model('user', userSchema);
