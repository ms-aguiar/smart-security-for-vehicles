const User = require("../models/User");
const Vehicle = require("../models/Vehicle");
const Location = require("../models/Location");

module.exports = {

  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  },

  async store(req, res) {
    const UserExist = await User.findOne({ where: { email: req.body.email } });

    if (UserExist) {
      return res.status(401).json({ error: "User already exists!" });
    }

    const { id, name, cpf, email, password_hash } = await User.create(req.body);

    return res.json({
      id,
      name,
      cpf,
      email,
      password_hash,
    });
  },

  async update(req, res) {
    const { id } = req.params;

    const { name, email, credits } = req.body;

    const user = await User.findByPk(id);

    console.log(req.body);

    if (!user) {
      return res.json({ error: "User not found" });
    }

    const user_updated = User.update(
      {
        name: name,
        email: email,
        credits: credits,
      },
      {
        where: { id: id },
      }
    );

    return res.json(user_updated);
  },

  async delete(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    const user_deleted = await User.destroy({ where: { id: id } });

    if (!user) {
      return res.json({ error: "User not found" });
    }

    return res.json(user_deleted);
  },
};
