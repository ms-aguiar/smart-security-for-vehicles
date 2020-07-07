const Vehicle = require("../models/Vehicle");
const Location = require("../models/Location");

module.exports = {

  async index(req, res) {
    const { vehicle_id } = req.params;

    const vehicle = await Vehicle.findByPk(vehicle_id, {
      include: { association: "locations" },
    });

    return res.json(vehicle);
  },

  async store(req, res) {
    const { vehicle_id } = req.params;
    const { lat, lng } = req.body;

    const vehicle = await Vehicle.findByPk(vehicle_id);

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    const location = await Location.create({
      lat: lat,
      lng: lng,
      vehicle_id: vehicle_id,
    });

    return res.json(location);
  },

  async current_location(req, res) {
    const { vehicle_id } = req.params;

    const location = await Location.findAll({
      limit: 1,
      attributes: ["lat", "lng"],
      where: {
        vehicle_id: vehicle_id,
      },
      order: [["id", "DESC"]],
    });

    console.log(location);

    return res.json(location[0]);
  },

};
