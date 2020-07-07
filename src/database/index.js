const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../models/User");
const Vehicle = require("../models/Vehicle");
const Location = require("../models/Location");
const SafePosition = require('../models/SafePosition');

const connection = new Sequelize(dbConfig);

connection
  .authenticate()
  .then(function () {
    console.log("Conectado ao db " + dbConfig.database + " com sucesso");
  })
  .catch(function (erro) {
    console.log("Erro ao conectar no db, erro : " + erro);
  });

User.init(connection);
Vehicle.init(connection);
Location.init(connection);
SafePosition.init(connection);

User.associate(connection.models);
Vehicle.associate(connection.models);
Location.associate(connection.models);
SafePosition.associate(connection.models);

module.exports = connection;
