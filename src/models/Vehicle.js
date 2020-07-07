const { Model, DataTypes } = require('sequelize');

class Vehicle extends Model {
    static init(sequelize){
        super.init({
            user_id: DataTypes.INTEGER,
            marca: DataTypes.STRING,
            modelo: DataTypes.STRING,
            ano: DataTypes.STRING,
            placa: DataTypes.STRING,
            preco_por_minuto: DataTypes.FLOAT,
            status_seguro: DataTypes.BOOLEAN,
            smart_safe: DataTypes.BOOLEAN,
        },{
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner'});
        this.hasMany(models.Location, { foreignKey: 'vehicle_id', as: 'locations'});
        this.hasMany(models.SafePosition, { foreignKey: 'vehicle_id', as: 'safe_positions'});
    }
}

module.exports = Vehicle;
