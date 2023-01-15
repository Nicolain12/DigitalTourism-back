module.exports = (sequelize, dataTypes) => {
    let alias = 'Ticket';

    let cols = {
        id: {
            type: dataTypes.INTEGER ,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        user_id: {
            type: dataTypes.INTEGER ,
            allowNull: false
        },

        price: {
            type: dataTypes.BIGINT,
            allowNull: false
        },

        created_at: {
            type: dataTypes.DATE
        },

        updated_at: {
            type: dataTypes.DATE
        }
    };

    let config = {
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',

    }

    const Ticket = sequelize.define(alias, cols, config);

    
    Ticket.associate = function (models) {
        // Conection with users db
        Ticket.belongsTo(models.User, {
            as: "users",
            foreignKey: "user_id"
        })
        
        // Conection with flys db
        Ticket.belongsToMany(models.Fly, {
            as: 'flys',
            through: 'flys_tickets',
            foreignKey: 'ticket_id',
            otherKey: 'fly_id',
        })

        // Conection with hotels db
        Ticket.belongsToMany(models.Hotel, {
            as: 'hotels',
            through: 'hotels_tickets',
            foreignKey: 'ticket_id',
            otherKey: 'Hotel_id',
        })

        // Conection with packages db
        Ticket.belongsToMany(models.Package, {
            as: 'packages',
            through: 'packages_tickets',
            foreignKey: 'ticket_id',
            otherKey: 'Package_id',
        })

    }

    return Ticket
};

