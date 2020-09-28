const Foto = require('../models/foto');
const Yup = require('yup');
const aws = require('aws-sdk');
const dadosacesso = require('../config/s3');
aws.config.update(dadosacesso);

const s3 = new aws.S3();

module.exports = {
  async store(req, res) {
    const schema = Yup.object().shape({
      location: Yup.string().required(),
    });

    if (!(await schema.isValid(req.file))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const url = req.file.location;

    foto = await Foto.create({
      url,
    });

    return res.json(foto);
  },

  async delete(req, res) {
    const schema = Yup.object().shape({
      _id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }
    const { _id } = req.body;
    const foto = await Foto.findById(_id);

    const dividindo = foto.url.split('/');

    const nome = dividindo[dividindo.length - 1];
    try {
      s3.deleteObject({
        Bucket: 'entrega-demo',
        Key: nome,
      }).promise();

      const response = await Foto.findByIdAndDelete(_id);
    } catch (error) {
      return res.status(500).json('Error ao deletar arquivos');
    }

    return res.json({
      message: 'ok',
    });
  },
};
