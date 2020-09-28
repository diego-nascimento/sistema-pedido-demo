const User = require('../models/user');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const Yup = require('yup');

module.exports = {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    if (!(await user.checkPassword(password))) {
      res.status(401).json({ error: 'password does not match' });
    }
    const id = user._id;
    const { name } = user.name;

    return res.json({
      user: {
        id,
        name,
        email,
        token: jwt.sign({ id: id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      },
    });
  },

  checkAuth(req, res) {
    return res.status(200).json();
  },
};
