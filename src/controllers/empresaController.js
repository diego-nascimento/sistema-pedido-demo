const Empresa = require('../models/empresa');
const Foto = require('../models/foto');
const Yup = require('yup');

module.exports = {
  async store(req, res) {
    const { name, foto, telefone, whatsapp, facebook, instagram } = req.body;

    const schema = Yup.object().shape(
      {
        name: Yup.string().required(),
        foto: Yup.string().required(),
        telefone: Yup.string().required(),
        whatsapp: Yup.string().required(),
        facebook: Yup.string().required(),
        instagram: Yup.string().required(),
      },
      [],
    );

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }
    const empresa = await Empresa.create({
      nome: name,
      foto,
      telefone,
      whatsapp,
      facebook,
      instagram,
    });
    return res.json(empresa);
  },

  async show(req, res) {
    let empresa = await Empresa.findOne().populate('foto');

    return res.json(empresa);
  },
};
