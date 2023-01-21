'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flights_tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Conection with tickets db
      Flights_tickets.belongsTo(models.Ticket, {
        as: "tickets",
        foreignKey: "ticket_id"
      })
      // Conection with flights db
      Flights_tickets.belongsTo(models.Flight, {
        as: "flights",
        foreignKey: "flight_id"
      })
    }
  }
  Flights_tickets.init({
    flight_id: DataTypes.INTEGER,
    ticket_id: DataTypes.INTEGER,
    price: DataTypes.BIGINT
  }, {
    sequelize,
    tableName: 'flights_tickets',
    modelName: 'Flights_tickets',
  });
  return Flights_tickets;
};