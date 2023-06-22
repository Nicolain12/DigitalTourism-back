const { application } = require('express')
const { EmptyResultError } = require('sequelize')
const db = require('../database/models')
const { update } = require('./usersApiController')
const fs = require('fs');
const { type } = require('os');
const Flight = db.Flight
const Package = db.Package
const Hotel = db.Hotel



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
                image: req.files.map((file) => file.filename),
                airline: req.body.airline,
                departure: req.body.departure,
                reach: req.body.reach,
                description: req.body.description,
                departure_date: req.body.departureDate,
                reach_date: req.body.reachDate,
                departure_hour: req.body.departureHour,
                reach_hour: req.body.reachHour,
                cabin: req.body.cabin,
                price: req.body.price,
                user_id: req.token.finded.id
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
                image: req.files.map((file) => file.filename),
                name: req.body.name,
                spot: req.body.spot,
                service: req.body.service,
                description: req.body.description,
                price: req.body.price,
                user_id: req.token.finded.id
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
            const flightPrice = parseFloat(req.body.priceF)
            const departureDate = new Date(req.body.departureDate)
            const reachDate = new Date(req.body.reachDate)
            const hotelPrice = parseFloat(req.body.priceH)
            const discountPercentage = parseFloat(req.body.discount)

            if (
                isNaN(flightPrice) ||
                isNaN(hotelPrice) ||
                isNaN(discountPercentage) ||
                !departureDate ||
                !reachDate
            ) {
                return new Error('Invalid input data')
            }

            const millisecondsPerDay = 24 * 60 * 60 * 1000
            const numberOfDays = Math.floor((reachDate - departureDate) / millisecondsPerDay)
            const priceHotel = hotelPrice * numberOfDays
            const totalPrice = flightPrice + priceHotel
            const discountAmount = (totalPrice * discountPercentage) / 100
            const discountedPrice = totalPrice - discountAmount

            const newPackage = {
                flight_id: req.body.flight_id,
                hotel_id: req.body.hotel_id,
                price: discountedPrice,
                discount: req.body.discount,
                user_id: req.token.finded.id
            }
            const addingPackages = await Package.create(newPackage)
            response.data = {
                package: addingPackages,
                flight_id: req.body.flight_id,
                hotel_id: req.body.hotel_id
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
                response.info.packId = isPack.id
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
                response.info.packId = isPack.id
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
                const oldImgs = req.body.oldImages
                const rmvImgs = req.body.removeImages
                const newFlight = {
                    airline: req.body.airline,
                    departure: req.body.departure,
                    reach: req.body.reach,
                    description: req.body.description,
                    departure_date: req.body.departureDate,
                    reach_date: req.body.reachDate,
                    departure_hour: req.body.departureHour,
                    reach_hour: req.body.reachHour,
                    cabin: req.body.cabin,
                    price: req.body.price,
                }
                if (oldImgs) {
                    const newFlightImg = []
                    if (typeof oldImgs === 'object') {
                        oldImgs.forEach(element => {
                            newFlightImg.push(element)
                        });
                        if (req.files) {
                            req.files.forEach(file => {
                                newFlightImg.push(file.filename)
                            });
                        }
                        newFlight.image = newFlightImg
                    }
                    if (typeof oldImgs === 'string') {
                        newFlightImg.push(oldImgs)
                        if (req.files) {
                            req.files.forEach(file => {
                                newFlightImg.push(file.filename)
                            });
                        }
                        newFlight.image = newFlightImg
                    }
                } else {
                    newFlight.image = req.files.map((file) => file.filename)
                }
                if (rmvImgs) {
                    if (typeof rmvImgs === 'object') {
                        rmvImgs.forEach(element => {
                            fs.unlink(`public/images/flights/product_${req.token.finded.id}/${element}`, (err) => {
                                if (err) {
                                    console.error(err);
                                }
                            });
                        });
                    }
                    if (typeof rmvImgs === 'string') {
                        fs.unlink(`public/images/flights/product_${req.token.finded.id}/${rmvImgs}`, (err) => {
                            if (err) {
                                console.error(err);
                            }
                        });
                    }
                }
                const edited = await Flight.update(newFlight, { where: { id: req.params.id } })
                response.data = newFlight
                console.log(newFlight);
                res.json(response)
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
                const oldImgs = req.body.oldImages
                const rmvImgs = req.body.removeImages
                const newHotelInfo = {
                    name: req.body.name,
                    spot: req.body.spot,
                    service: req.body.service,
                    description: req.body.description,
                    price: req.body.price
                }
                if (oldImgs) {
                    const newHotelImg = []
                    if (typeof oldImgs === 'object') {
                        oldImgs.forEach(element => {
                            newHotelImg.push(element)
                        });
                        if (req.files) {
                            req.files.forEach(file => {
                                newHotelImg.push(file.filename)
                            });
                        }
                        newHotelInfo.image = newHotelImg
                    }
                    if (typeof oldImgs === 'string') {
                        newHotelImg.push(oldImgs)
                        if (req.files) {
                            req.files.forEach(file => {
                                newHotelImg.push(file.filename)
                            });
                        }
                        newHotelInfo.image = newHotelImg
                    }
                } else {
                    newHotelInfo.image = req.files.map((file) => file.filename)
                }
                if (rmvImgs) {
                    if (typeof rmvImgs === 'object') {
                        rmvImgs.forEach(element => {
                            fs.unlink(`public/images/hotels/product_${req.token.finded.id}/${element}`, (err) => {
                                if (err) {
                                    console.error(err);
                                }
                            });
                        });
                    }
                    if (typeof rmvImgs === 'string') {
                        fs.unlink(`public/images/hotels/product_${req.token.finded.id}/${rmvImgs}`, (err) => {
                            if (err) {
                                console.error(err);
                            }
                        });
                    }
                }
                const edited = await Hotel.update(newHotelInfo, { where: { id: req.params.id } })
                response.data = newHotelInfo
                res.json(response)
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
            const flightPrice = parseFloat(req.body.priceF)
            const departureDate = new Date(req.body.departureDate)
            const reachDate = new Date(req.body.reachDate)
            const hotelPrice = parseFloat(req.body.priceH)
            const discountPercentage = parseFloat(req.body.discount)

            if (isNaN(flightPrice) || isNaN(hotelPrice) || isNaN(discountPercentage) || !departureDate || !reachDate) {
                return new Error('Invalid input data')
            }
           
            const packageToEdit = await Package.findByPk(req.params.id)
            const pack = packageToEdit.dataValues
            if (pack) {
                const millisecondsPerDay = 24 * 60 * 60 * 1000
            const numberOfDays = Math.floor((reachDate - departureDate) / millisecondsPerDay)
            const priceHotel = hotelPrice * numberOfDays
            const totalPrice = flightPrice + priceHotel
            const discountAmount = (totalPrice * discountPercentage) / 100
            const discountedPrice = totalPrice - discountAmount

            const newPack = {
                flight_id: req.body.flight_id,
                hotel_id: req.body.hotel_id,
                price: discountedPrice,
                discount: req.body.discount,
                user_id: req.token.finded.id
            }
                const updatePack = await Package.update(newPack, { where: { id: req.params.id } })
                response.data = {
                    package: newPack,
                    flight: req.body.flight_id,
                    hotel: req.body.hotel_id
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
                    const deleteFlight = await Flight.destroy({ where: { id: pack.dataValues.flight_id } })
                    const deleteHotel = await Hotel.destroy({ where: { id: pack.dataValues.hotel_id } })
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




