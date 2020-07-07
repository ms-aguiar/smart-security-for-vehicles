const Vehicle = require("../models/Vehicle");
const Location = require("../models/Location");
const User = require("../models/User");
const SafePosition = require("../models/SafePosition");

const { Op } = require('sequelize');

module.exports = {

  async vehicleLastLocation(req, res) {
    const { user_id } = req.params;

    const user_data = await User.findByPk(user_id, {
      include: [
        {
          model: Vehicle,
          as: "vehicles",
          include: [
            {
              model: Location,
              as: "locations",
              attributes: ["lat", "lng"],
              limit: 1,
              order: [["id", "DESC"]],
            }
          ],
        },
      ],
    });

    return res.json(user_data.vehicles);
  },

  async allInsuranceStatus(req, res) {
    const all_insurance_stats = await User.findAll({
      include: [
        {
          model: Vehicle,
          as: "vehicles",
          where: {
            [Op.or]: [
              {status_seguro: 1},
              {smart_safe: 1}
            ],
          },
          order: [["id", "DESC"]],
          include: [
            {
              model: Location,
              as: "locations",
              attributes: ["lat", "lng"],
              limit: 1,
              order: [["id", "DESC"]],
            },
            {
              model: SafePosition,
              as: "safe_positions",
              attributes: ["raio", "lat", "lng"],
              order: [["id", "DESC"]],
            }
          ]
        },
      ],
    });

    return res.json(all_insurance_stats);
  },

  async updateCredits(req, res) {

    const { user_id } = req.params;
    const { credits } = req.body;
    console.log(credits)
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.json({ error: "User not found" });
    }

    const user_updated = User.update(

      {
        credits: credits,
      },
      {
        where: { id: user_id },
      }
    );

    return res.json("Creditos atualizados!");

  }

};
