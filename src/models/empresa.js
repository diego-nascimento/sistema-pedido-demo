const mongoose = require('mongoose');

const empresaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },

  foto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'foto',
  },
  telefone: {
    type: String,
    required: true,
  },
  whatsapp: {
    type: String,
    required: true,
  },
  facebook: {
    type: String,
    required: true,
  },
  instagram: {
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

module.exports = mongoose.model('empresa', empresaSchema);
