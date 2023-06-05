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
      Flight.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });

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
    image: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    airline:{
      type: DataTypes.STRING,
      allowNull: false
    },
    departure:{
      type: DataTypes.STRING,
      allowNull: false
    },
    reach:{
      type: DataTypes.STRING,
      allowNull: false
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false
    },
    departure_date:{
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    reach_date:{
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    departure_hour:{
      type: DataTypes.TIME,
      allowNull: false
    },
    reach_hour:{
      type: DataTypes.TIME,
      allowNull: false
    },
    cabin:{
      type: DataTypes.STRING,
      allowNull: false
    },
    price:{
      type: DataTypes.BIGINT,
      allowNull: false
    },
    user_id:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Flight',
    tableName: 'flights',
  });
  return Flight;
};