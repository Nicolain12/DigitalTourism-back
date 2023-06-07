'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Package extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Package.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
      //conection with ticket db
      Package.belongsToMany(models.Ticket, {
        as: 'tickets',
        through: 'packages_tickets',
        foreignKey: 'package_id',
        otherKey: 'ticket_id',
    })


      //conection with hotel db
      Package.belongsTo(models.Hotel, {
        as: "hotels",
        foreignKey: "hotel_id"
      })

      //conection with fly db

      Package.belongsTo(models.Flight, {
        as: "flights",
        foreignKey: "flight_id"
      })
    }
  }
  Package.init({
    flight_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hotel_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    discount: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Package',
    tableName: 'packages',
  });
  return Package;
};