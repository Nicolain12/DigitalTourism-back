'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ****** Conection with users db ******
      Ticket.belongsTo(models.User, {
        as: "users",
        foreignKey: "user_id"
      })

      // ****** Conection with flys db ******
      // Ticket.belongsToMany(models.Flight, {
      //   as: 'flights',
      //   through: 'flights_tickets',
      //   foreignKey: 'ticket_id',
      //   otherKey: 'flight_id',
      // })

      Ticket.hasMany(models.Flights_tickets,{
        as: 'flights',
        foreignKey: 'ticket_id'
      })

      // ****** Conection with hotels db ******
      Ticket.belongsToMany(models.Hotel, {
        as: 'hotels',
        through: 'hotels_tickets',
        foreignKey: 'ticket_id',
        otherKey: 'Hotel_id',
      })

      // ****** Conection with packages db ******
      Ticket.belongsToMany(models.Package, {
        as: 'packages',
        through: 'packages_tickets',
        foreignKey: 'ticket_id',
        otherKey: 'Package_id',
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