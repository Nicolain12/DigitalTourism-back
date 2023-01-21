'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // conection with ticket db
      Hotel.belongsToMany(models.Hotel, {
        as: 'hotels',
        through: 'hotels_tickets',
        foreignKey: 'ticket_id',
        otherKey: 'hotel_id',
      })
      //conection with package db
      Hotel.hasMany(models.Package, {
        as: "packages",
        foreignKey: "hotel_id"
      })
    }
  }
  Hotel.init({
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    spot: DataTypes.STRING,
    service: DataTypes.INTEGER,
    description: DataTypes.STRING,
    price: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Hotel',
    tablelName: 'hotels',
  });
  return Hotel;
};