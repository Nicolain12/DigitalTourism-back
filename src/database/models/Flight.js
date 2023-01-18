module.exports = (sequelize, dataTypes) => {
    let alias = 'Flight';

    let cols = {
        id: {
            type: dataTypes.INTEGER ,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        airline: {
            type: dataTypes.STRING,
            allowNull: false
        },
        
        departure: {
            type: dataTypes.STRING,
            allowNull: false
        },

        reach: {
            type: dataTypes.STRING,
            allowNull: false
        },

        description: {
            type: dataTypes.STRING,
            allowNull: false
        },

        departure_date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },

        return_date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },

        departure_hour: {
            type: dataTypes.TIME,
            allowNull: false
        },

        return_hour: {
            type: dataTypes.TIME,
            allowNull: false
        },

        cabin: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

        price: {
            type: dataTypes.BIGINT,
            allowNull: false
        },

        created_at:{ 
            type: dataTypes.DATE
        },

        updated_at:{ 
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

    const Flight = sequelize.define(alias, cols, config);

    Flight.associate = function (models) {
        //conection with ticket db
        Flight.belongsToMany(models.Ticket, {
            as: 'tickets',
            through: 'flights_tickets',
            foreignKey: 'flight_id',
            otherKey: 'ticket_id',
        })
        //conection with package db
        Flight.hasMany(models.Package, {
            as: "packages",
            foreignKey: "flight_id"
        })

    }

    return Flight
};