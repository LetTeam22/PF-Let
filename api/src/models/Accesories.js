const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('accesories', {
        idAcc: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.DECIMAL,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'active'
        }
    }, {
        timestamps: false
    });
};