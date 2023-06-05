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
      Hotel.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
      // conection with ticket db
      Hotel.belongsToMany(models.Ticket, {
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
    image:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    spot: {
      type: DataTypes.STRING,
      allowNull: false
    },
    service: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    user_id:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Hotel',
    tablelName: 'hotels',
  });
  return Hotel;
};