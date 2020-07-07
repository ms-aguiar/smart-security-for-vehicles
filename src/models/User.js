const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.VIRTUAL,
            password_hash: DataTypes.STRING,
            cpf: DataTypes.STRING,
            credits: DataTypes.FLOAT
        },{
            sequelize
        })

        this.addHook('beforeSave', async (user) => {
            if(user.password){
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        })

        return this;
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }

    static associate(models) {
        this.hasMany(models.Vehicle, { foreignKey: 'user_id', as: 'vehicles'});
    }
}

module.exports = User;