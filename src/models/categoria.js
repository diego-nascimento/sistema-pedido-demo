const mongoose = require('mongoose')

const categoriaSchema = new mongoose.Schema({
  nome: {
    type: String,
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


module.exports = mongoose.model('categoria', categoriaSchema)


