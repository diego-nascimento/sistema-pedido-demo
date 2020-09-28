const mongoose = require('mongoose')

const produtoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  preco: {
      type: Number,
      required: true
  },
  descricao: {
      type: String,
      required: true
  },
  status: {
      type: Number,
      required: true,
      default: 1
  },
  categoria_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'categoria'
    },
  foto_id: {
      type: mongoose.Schema.Types.ObjectId, ref: 'foto'
  },
  created_at: {
    type: Date,
    default: Date.now()
},
updated_at: {
    type: Date,
    default: Date.now()
}
})


module.exports = mongoose.model('produto', produtoSchema)















