const User = require("../models/User");
const authConfig = require("../config/auth");

const jwt = require("jsonwebtoken");

module.exports = {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "User not found!" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Password does not match!" });
    }

    const { id, name, credits } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        credits,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  },
};
