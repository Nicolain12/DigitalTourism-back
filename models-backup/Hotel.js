module.exports = (sequelize, dataTypes) => {
    let alias = 'Hotel';

    let cols = {
        id: {
            type: dataTypes.INTEGER ,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        spot: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        Service: {
            type: dataTypes.INTEGER ,
            allowNull: false
        },
        description: {
            type: dataTypes.STRING,
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

    const Hotel = sequelize.define(alias, cols, config);

    Hotel.associate = function (models) {
        // conection with ticket db
        Hotel.belongsToMany(models.Hotel, {
            as: 'hotels',
            through: 'hotels_tickets',
            foreignKey: 'ticket_id',
            otherKey: 'hotel_id',
        })
        //conection with package db
        Hotel.hasMany(models.Package, {
            as: "packages",
            foreignKey: "hotel_id"
        })
    }

    return Hotel
};