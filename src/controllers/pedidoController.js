const Yup = require('yup')
const Mail = require('../lib/mail')
const Produto = require('../models/produto')
module.exports = {
    async store(req, res){
        
        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            email: Yup.string().email().required(),
            telefone: Yup.string().required(),
            rua: Yup.string().required(),
            numero: Yup.string().required(),
            bairro: Yup.string().required(),
            cidade: Yup.string().required(),
            meio_pagamento: Yup.string().required(),
            observacao: Yup.string().required(),
            produtos: Yup.array().required(),
            
          })
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'validation fails'})
        }
        let pedido = req.body;
        const {produtos} = req.body;

        if(produtos.length && produtos.length < 1){
           return res.status(400).json({error: 'Lista de Produtos Vazia'})
       }

        let preco_total = 0

        
        for(var i = 0; i < produtos.length; i++){
            const produto = await Produto.findById(produtos[i]._id)
            preco_total =  preco_total + (produto.preco * produtos[i].quantidade)
        }
        pedido = {...pedido, preco_total}
        
       
        Mail.sendMail({
            to: pedido.nome + "<"+ pedido.email+">",
            subject: "Novo Pedido registrado",
            template: 'novopedido',
            context: {
                pedido: pedido
            }
        })

        return res.status(200).json(pedido)
    }
}
