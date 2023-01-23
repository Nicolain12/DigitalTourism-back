'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ****** conection with ticket db ******
      // Flight.belongsToMany(models.Ticket, {
      //   as: 'tickets',
      //   through: 'flights_tickets',
      //   foreignKey: 'flight_id',
      //   otherKey: 'ticket_id',
      // })

      Flight.hasMany(models.Flights_tickets,{
        as: 'tickets',
        foreignKey: 'flight_id'
      })

      // ****** conection with package db ******
      Flight.hasMany(models.Package, {
        as: "packages",
        foreignKey: "flight_id"
      })
    }
  }
  Flight.init({
    image: DataTypes.STRING,
    airline: DataTypes.STRING,
    departure: DataTypes.STRING,
    reach: DataTypes.STRING,
    description: DataTypes.STRING,
    departure_date: DataTypes.DATEONLY,
    reach_date: DataTypes.DATEONLY,
    departure_hour: DataTypes.TIME,
    reach_hour: DataTypes.TIME,
    cabin: DataTypes.STRING,
    price: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Flight',
    tableName: 'flights',
  });
  return Flight;
};