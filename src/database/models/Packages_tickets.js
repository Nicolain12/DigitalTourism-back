'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Packages_tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Conection with tickets db
      Packages_tickets.belongsTo(models.Ticket, {
        as: "tickets",
        foreignKey: "ticket_id"
      })
      // Conection with packages db
      Packages_tickets.belongsTo(models.Package, {
        as: "packages",
        foreignKey: "package_id"
      })
    }
  }
  Packages_tickets.init({
    package_id: DataTypes.INTEGER,
    ticket_id: DataTypes.INTEGER,
    price: DataTypes.BIGINT
  }, {
    sequelize,
    tableName: 'packages_tickets',
    modelName: 'Packages_tickets',
  });
  return Packages_tickets;
};