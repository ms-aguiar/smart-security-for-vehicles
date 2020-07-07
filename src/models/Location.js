const { Model, DataTypes } = require('sequelize');

class Location extends Model {
    static init(sequelize){
        super.init({
            vehicle_id: DataTypes.INTEGER,
            lat: DataTypes.STRING,
            lng: DataTypes.STRING,
        },{
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Vehicle, { foreignKey: 'vehicle_id', as: 'owner'});
    }
}

module.exports = Location;
