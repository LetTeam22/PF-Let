const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('experience', {
    idExperience: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    imgExperience: {
      type: DataTypes.STRING,
      defaultValue: 'https://res.cloudinary.com/pflet/image/upload/v1661970867/Let/Experiences/bike.jpg'
    },
    textExperience: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'deleted'),
      allowNull: false,
      defaultValue: 'active'
    }
  }, {
    timestamps: false
  });
};