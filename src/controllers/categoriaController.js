const Categoria = require('../models/categoria')
const Foto = require('../models/foto')
const Yup = require('yup')

module.exports = {
  async store(req, res){
    const {name, description, foto_id} = req.body;

    const schema = Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string().required(),
        foto_id: Yup.string().required()
    })

    if(!(await schema.isValid(req.body))){
        return res.status(400).json({error: 'validation fails'})
    }
      const categoria = await Categoria.create({
        nome: name,
        descricao: description,
        status: 1,
        foto_id
      })
     return  res.json(categoria)
  },


  async show(req, res){
    let categorias = await Categoria.find({status: 1}).populate('foto_id')
    

    return res.json(categorias)
  } 
}