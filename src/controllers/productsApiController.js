const { application } = require('express');
const db = require('../database/models');
// const { Op } = require("sequelize");
const Flight = db.Flight
const Package = db.Package
const Hotel = db.Hotel
// const Flights_tickets = db.Flights_tickets
// const Packages_tickets = db.Packages_tickets
// const Hotels_tickets = db.Hotels_tickets


module.exports = {
    listPackages: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const package = await Package.findAll({
                include: [{ association: 'hotels' }, { association: 'flights' }]
            })
            response.info.total = package.length
            response.data = package
            res.json(response)
        }
        catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }

    },

    listFlights: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const package = await Flight.findAll()
            response.info.total = package.length
            response.data = package
            res.json(response)
        }
        catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    },

    listHotels: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const package = await Hotel.findAll()
            response.info.total = package.length
            response.data = package
            res.json(response)
        }
        catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    }

}



