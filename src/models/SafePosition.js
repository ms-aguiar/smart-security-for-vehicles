const { Model, DataTypes } = require('sequelize');

class SafePosition extends Model {
    static init(sequelize){
        super.init({
            vehicle_id: DataTypes.INTEGER,
            raio: DataTypes.FLOAT,
            lat: DataTypes.STRING,
            lng: DataTypes.STRING,
        },{
            sequelize,
        })
    }

    static associate(models) {
      this.belongsTo(models.Vehicle, { foreignKey: 'vehicle_id', as: 'owner'});
    }
}

module.exports = SafePosition;
