const User = require('../models/user');
const Yup = require('yup');

module.exports = {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }
    const { email } = req.body;
    const usuario = await User.findOne({ email: email });
    if (usuario) {
      return res.json({ message: 'Email ja cadastrado' });
    }
    const user = await User.create(req.body);
    return res.json(user);
  },
};
