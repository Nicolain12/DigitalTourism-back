const { application } = require('express');
const db = require('../database/models');
const { update } = require('./usersApiController');
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
    },

    createFlights: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const newFlight = {
                image: req.file ? req.file.filename : 'logo2.jpg',
                airline: req.body.airline,
                departure: req.body.departure,
                reach: req.body.reach,
                description: req.body.description,
                departure_date: req.body.departure_date,
                reach_date: req.body.reach_date,
                departure_hour: req.body.departure_hour,
                reach_hour: req.body.reach_hour,
                cabin: req.body.cabin,
                price: req.body.price,
            }

            const addingFlight = await Flight.create(newFlight)

            response.data = addingFlight
            res.json(response)
        }
        catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }

    },

    createHotels: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const newHotel = {
                image: req.file ? req.file.filename : 'logo2.jpg',
                name: req.body.name,
                spot: req.body.spot,
                service: req.body.service,
                description: req.body.description,
                price: req.body.price
            }

            const addingHotel = await Hotel.create(newHotel)

            response.data = addingHotel
            res.json(response)
        }
        catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }

    },

    createPackages: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            // Both has description, price and image so it will has an initial (F or H) in order to reference each of them
            const newFlight = {
                image: req.file ? req.file.filename : 'logo2.jpg',
                airline: req.body.airline,
                departure: req.body.departure,
                reach: req.body.reach,
                description: req.body.descriptionF,
                departure_date: req.body.departure_date,
                reach_date: req.body.reach_date,
                departure_hour: req.body.departure_hour,
                reach_hour: req.body.reach_hour,
                cabin: req.body.cabin,
                price: req.body.priceF,
            }
            const newHotel = {
                image: req.file ? req.file.filename : 'logo2.jpg',
                name: req.body.name,
                spot: req.body.spot,
                service: req.body.service,
                description: req.body.descriptionH,
                price: req.body.priceH
            }
            const addingFlight = await Flight.create(newFlight)
            const addingHotel = await Hotel.create(newHotel)
            const flightP = addingFlight.dataValues
            const hotelP = addingHotel.dataValues
            const priceHotel = hotelP.price * (Math.floor(((new Date(flightP.reach_date) - new Date(flightP.departure_date)) / (1000 * 60 * 60 * 24))))
            const discountCalculator = (flightP.price + priceHotel) - (((flightP.price + priceHotel) * req.body.discount) / 100)
            const newPackage = {
                flight_id: flightP.id,
                hotel_id: hotelP.id,
                price: discountCalculator
            }
            const addingPackages = await Package.create(newPackage)
            response.data = {
                discountOf: req.body.discount,
                package: addingPackages
            }
            response.data.flight = flightP
            response.data.hotel = hotelP
            res.json(response)
        }
        catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }

    },

    updateFlights: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const newFlight = {
                image: req.file ? req.file.filename : 'logo2.jpg',
                airline: req.body.airline,
                departure: req.body.departure,
                reach: req.body.reach,
                description: req.body.description,
                departure_date: req.body.departure_date,
                reach_date: req.body.reach_date,
                departure_hour: req.body.departure_hour,
                reach_hour: req.body.reach_hour,
                cabin: req.body.cabin,
                price: req.body.price,
            }

            const edited = await Flight.update(newFlight, {where:{id: req.params.id}})
            response.data = newFlight
            res.json(response)
        }
        catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }

    },
}



