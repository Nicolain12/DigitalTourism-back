const { updatePackages } = require("./productsApiController")

module.exports = {
    // Create product
    createFlight: (req, res) => { res.render('./products/upload/submitFlight.ejs') },

    createHotel: (req, res) => { res.render('./products/upload/submitHotel.ejs') },

    createPackage: (req, res) => { res.render('./products/upload/submitPackage.ejs') },

    // Update product
    updateFlight: (req, res) => { res.render('./products/update/updateFlight.ejs') },

    updateHotel: (req, res) => { res.render('./products/update/updateHotel.ejs') },

    updatePackage: (req, res) => { res.render('./products/update/updatePackage.ejs') },

    // Delete product
    deleteConfirm: (req, res) => { res.render('./products/deleteConfirm.ejs') }
}