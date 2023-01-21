'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       // Conection with users db
       Ticket.belongsTo(models.User, {
        as: "users",
        foreignKey: "user_id"
    })


      // Conection with flys db
      Ticket.hasMany(models.Flights_tickets, {
        as: 'flights',
        foreignKey: 'flight_id',
    })

    // Conection with hotels db
    Ticket.hasMany(models.Hotels_tickets, {
        as: 'hotels',
        foreignKey: 'hotel_id',
    })

    // Conection with packages db
    Ticket.hasMany(models.Packages_tickets, {
        as: 'packages',
        foreignKey: 'package_id',
    })



    }
  }
  Ticket.init({
    user_id: DataTypes.INTEGER,
    price: DataTypes.BIGINT
  }, {
    sequelize,
    tableName: 'tickets',
    modelName: 'Ticket',
  });
  return Ticket;
};