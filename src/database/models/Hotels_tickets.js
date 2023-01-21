'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hotels_tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Conection with tickets db
      Hotels_tickets.belongsTo(models.Ticket, {
        as: "tickets",
        foreignKey: "ticket_id"
      })
      // Conection with hotel db
      Hotels_tickets.belongsTo(models.Hotel, {
        as: "hotels",
        foreignKey: "hotel_id"
      })
    }
  }
  Hotels_tickets.init({
    hotel_id: DataTypes.INTEGER,
    ticket_id: DataTypes.INTEGER,
    price: DataTypes.BIGINT
  }, {
    sequelize,
    tableName: 'hotels_tickets',
    modelName: 'Hotels_tickets',
  });
  return Hotels_tickets;
};