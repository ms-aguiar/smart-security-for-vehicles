'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('vehicles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
       },
       user_id:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
       },
      marca:{
        type: Sequelize.STRING,
        allowNull: false,
       },
      modelo:{
        type: Sequelize.STRING,
        allowNull: false,
       },
      ano:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      placa:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      preco_por_minuto:{
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      status_seguro:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      smart_safe:{
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
     },
    })
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.dropTable('vehicles');

  }
};
