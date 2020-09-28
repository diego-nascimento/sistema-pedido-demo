const Produto = require('../models/produto')
const Foto = require('../models/foto')
const Yup = require('yup')

module.exports = {
  async store(req, res){
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      categoria_id: Yup.string().required(),
      foto_id: Yup.string().required(),
      price: Yup.number().required(),
  })

  if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'validation fails'})
  }
    const {name, description, price, categoria_id, foto_id} = req.body;
    const produto = await Produto.create({
      nome: name,
      descricao: description,
      status: 1,
      preco: price,
      categoria_id,
      foto_id
    })


    return res.json(produto)
  },



  async show(req, res){
    const schema = Yup.object().shape({
      categoria_id: Yup.string().required(),
    })
    if(!(await schema.isValid(req.query))){
        return res.status(400).json({error: 'validation fails'})
    }

    const {categoria_id} = req.query
    const produtos = await Produto.find({status: 1, categoria_id}).populate('foto_id')
    res.json(produtos)
  },



  async destroy(req, res){
    const schema = Yup.object().shape({
      produto_id: Yup.number().required(),
      
    })
    if(!(await schema.isValid(req.query))){
        return res.status(400).json({error: 'validation fails'})
    }
    const {produto_id} = req.query;
    let produto = await Produto.findOne(
      {
        where:{id: produto_id}
      }
    )
    if(!produto){
      return res.status(400).json({error: 'Produto não encontrado'})
    }
    if(produto.status === 0){
     await  produto.update({status: 1})
    }else{
     await produto.update({status: 0})
    }
    produto = await Produto.findOne(
      {
        where:{id: produto_id}
      }
    )
    return res.json(produto)

  } 
}