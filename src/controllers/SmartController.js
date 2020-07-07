const Vehicle = require("../models/Vehicle");
const Location = require("../models/Location");
const User = require("../models/User");
const SafePosition = require("../models/SafePosition");

module.exports = {

  async index(req, res) {
    const { vehicle_id } = req.params;

    const vehicle = await Vehicle.findByPk(vehicle_id, {
      include: { association: "safe_positions" },
    });

    return res.json(vehicle);
  },

  async store(req, res) {

    const { vehicle_id } = req.params;
    const {
      raio,
      lat,
      lng,
    } = req.body;

    const vehicle = await Vehicle.findByPk(vehicle_id);

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle is not found" });
    }

    const smart_position = await SafePosition.create({
      raio,
      lat,
      lng,
      vehicle_id,
    });

    return res.json(smart_position);

  },

  async update(req, res) {
    const { status_seguro, smart_safe } = req.body;
    const { vehicle_id } = req.params;

    const vehicle = await Vehicle.findByPk(vehicle_id);

    if (!vehicle) {
      return res.status(401).json({ error: "Vehicle is not found!" });
    }

    await Vehicle.update({
      status_seguro: status_seguro,
      smart_safe: smart_safe
    },
    {
      where: {id:vehicle_id}
    });

    return res.json("Status do seguro atualizado com sucesso!")

  },

  async delete(req, res) {
    const { vehicle_id } = req.params;
    const { position_id } = req.body;

    const vehicle = await Vehicle.findByPk(vehicle_id);
    const position = await SafePosition.findByPk(position_id);

    if (!vehicle) {
      return res.status(400).json({ error: "Vehicle is not found!!" });
    }

    if (!position){
      return res.status(400).json({ error: "Position is not found!!" });
    }

    SmartSafety.destroy({ where: { id: position_id } });

    return res.json("Posição deletada com sucesso!")
  },

};
