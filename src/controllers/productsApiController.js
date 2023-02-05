const { application } = require('express');
const { EmptyResultError } = require('sequelize');
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
    //CREATE
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
            const priceHotel = addingHotel.dataValues.price * (Math.floor(((new Date(addingFlight.dataValues.reach_date) - new Date(addingFlight.dataValues.departure_date)) / (1000 * 60 * 60 * 24))))
            const discountCalculator = (addingFlight.dataValues.price + priceHotel) - (((addingFlight.dataValues.price + priceHotel) * req.body.discount) / 100)
            const newPackage = {
                flight_id: addingFlight.dataValues.id,
                hotel_id: addingHotel.dataValues.id,
                price: discountCalculator,
                discount: req.body.discount
            }
            const addingPackages = await Package.create(newPackage)
            response.data = {
                package: addingPackages,
                flight: addingFlight,
                hotel: addingHotel
            }
            res.json(response)
        }
        catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }

    },

    //READ
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

    //READBYPK
    flightByPk: async (req, res) => {
        let response = {
            info: {
                status: 200
            }
        }
        try {
            const packages = await Package.findAll()
            isPack = packages.find(element => element.dataValues.flight_id == req.params.id)
            if (isPack) {
                const finded = await Flight.findByPk(req.params.id)
                response.info.isOnSale = `http://localhost:3000/api/products/package/${isPack.id}`
                response.data = finded
                res.json(response)
            } else {
                const finded = await Flight.findByPk(req.params.id)
                response.data = finded
                res.json(response)
            }
        } catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    },
    hotelByPk: async (req, res) => {
        let response = {
            info: {
                status: 200
            }
        }
        try {
            const packages = await Package.findAll()
            isPack = packages.find(element => element.dataValues.hotel_id == req.params.id)
            if (isPack) {
                const finded = await Hotel.findByPk(req.params.id)
                response.info.isOnSale = `http://localhost:3000/api/products/package/${isPack.id}`
                response.data = finded
                res.json(response)
            } else {
                const finded = await Hotel.findByPk(req.params.id)
                response.data = finded
                res.json(response)
            }
        } catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    },
    packageByPk: async (req, res) => {
        let response = {
            info: {
                status: 200
            }
        }
        try {
            const package = await Package.findByPk(req.params.id)
            if (package) {
                const flight = await Flight.findByPk(package.flight_id)
                const hotel = await Hotel.findByPk(package.hotel_id)
                response.data = {
                    package: package,
                    flight: flight,
                    hotel: hotel
                }
                res.json(response)

            } else { new Error('Package not found') }
        } catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    },

    //UPDATE
    updateFlights: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const isPackage = await Package.findAll()
            const isIn = isPackage.find(element => element.dataValues.flight_id == req.params.id)
            if (!isIn) {
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

                const edited = await Flight.update(newFlight, { where: { id: req.params.id } })
                response.data = newFlight
                res.json(response)
            } else {
                response.info.msg = `In order to update this flight you must do it in the package ---> http://localhost:3000/api/products/update/package/${isIn.dataValues.id}`
                res.json(response)
            }
        }
        catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    },

    updateHotels: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const isPackage = await Package.findAll()
            const isIn = isPackage.find(element => element.dataValues.hotel_id == req.params.id)
            if (!isIn) {
                const newHotelInfo = {
                    image: req.file ? req.file.filename : 'logo2.jpg',
                    name: req.body.name,
                    spot: req.body.spot,
                    service: req.body.service,
                    description: req.body.description,
                    price: req.body.price
                }
                const edited = await Hotel.update(newHotelInfo, { where: { id: req.params.id } })
                response.data = newHotelInfo
                res.json(response)
            } else {
                response.info.msg = `In order to update this hotel you must do it in the package ---> http://localhost:3000/api/products/update/package/${isIn.dataValues.id}`
                res.json(response)
            }
        }
        catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }

    },

    updatePackages: async (req, res) => {
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
            const packageToEdit = await Package.findByPk(req.params.id)
            const pack = packageToEdit.dataValues
            if (pack) {
                const updatePackageFlight = await Flight.update(newFlight, { where: { id: pack.flight_id } })
                const updatePackageHotel = await Hotel.update(newHotel, { where: { id: pack.hotel_id } })
                const priceHotel = newHotel.price * (Math.floor(((new Date(newFlight.reach_date) - new Date(newFlight.departure_date)) / (1000 * 60 * 60 * 24))))
                const discountCalculator = (newFlight.price + priceHotel) - (((newFlight.price + priceHotel) * req.body.discount) / 100)
                const newPack = {
                    flight_id: newFlight.id,
                    hotel_id: newHotel.id,
                    price: discountCalculator,
                    discount: req.body.discount
                }
                const updatePack = await Package.update(newPack, { where: { id: req.params.id } })
                response.data = {
                    package: newPack,
                    flight: newFlight,
                    hotel: newHotel
                }
                res.json(response)

            }
            else {
                new Error('Package not found')

            }
        }
        catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }

    },

    //DELETE
    deleteFlight: async (req, res) => {
        let response = {
            info: {
                status: 200
            }
        }
        try {
            const packages = await Package.findAll()
            const isIn = packages.find(element => element.dataValues.flight_id == req.params.id)
            if (!isIn) {
                const flight = await Flight.findByPk(req.params.id)
                const resData = flight.dataValues
                if (resData) {
                    const destroy = await Flight.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                    response.data = resData
                    res.json(response)
                } else {
                    new Error('Flight not found')
                }
            } else {
                new Error("You can delete a package's flight")
            }
        } catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    },

    deleteHotel: async (req, res) => {
        let response = {
            info: {
                status: 200
            }
        }
        try {
            const packages = await Package.findAll()
            const isIn = packages.find(element => element.dataValues.hotel_id == req.params.id)
            if (!isIn) {
                const hotel = await Hotel.findByPk(req.params.id)
                const resData = hotel.dataValues
                if (resData) {
                    const destroy = await Hotel.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                    response.data = resData
                    res.json(response)
                } else {
                    new Error('Hotel not found')
                }
            } else {
                new Error("You can delete a package's hotel")
            }
        } catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    },

    deletePackage: async (req, res) => {
        let response = {
            info: {
                status: 200
            }
        }
        try {
            const pack = await Package.findByPk(req.params.id)
            if (pack) {
                const flight = await Flight.findByPk(pack.dataValues.flight_id)
                const hotel = await Hotel.findByPk(pack.dataValues.hotel_id)
                if (flight && hotel) {
                    const deleteFlight = await Flight.destroy({where:{id: pack.dataValues.flight_id}})
                    const deleteHotel = await Hotel.destroy({where:{id: pack.dataValues.hotel_id}})
                    response.data = {
                        package: pack,
                        flight: flight,
                        hotel: hotel  
                    }
                    res.json(response)
                }
            }

        } catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    },

}




