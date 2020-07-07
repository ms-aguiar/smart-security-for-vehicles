const User = require("../models/User");
const Vehicle = require("../models/Vehicle");

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: { association: "vehicles" },
    });

    return res.json(user);
  },

  async store(req, res) {
    const { user_id } = req.params;
    const {
      marca,
      modelo,
      ano,
      placa,
      preco_por_minuto,
      status_seguro,
      smart_safe
    } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ error: "User is not found" });
    }

    const vehicle = await Vehicle.create({
      user_id,
      marca,
      modelo,
      ano,
      placa,
      preco_por_minuto,
      status_seguro,
      smart_safe
    });

    return res.json(vehicle);
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

    const vehicle = await Vehicle.findByPk(vehicle_id);

    if (!vehicle) {
      return res.status(400).json({ error: "Vehicle is not found!!" });
    }

    Vehicle.destroy({ where: { id: vehicle_id } });

    return res.json("Veículo deletado com sucesso!")
  },
};
