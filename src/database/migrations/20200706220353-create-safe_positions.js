'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('safe_positions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
       },
      vehicle_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'vehicles', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
       },
      lat:{
        type: Sequelize.STRING,
        allowNull: false,
       },
      lng:{
        type: Sequelize.STRING,
        allowNull: false,
       },
    	raio:{
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: '100',
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

      return queryInterface.dropTable('safe_positions');

  }
};
