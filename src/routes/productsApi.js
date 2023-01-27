const express = require('express')
const router = express.Router()
const productsAPI = require('../controllers/productsApiController')
const path = require('path');

//MULTER
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = path.join(__dirname, '../../public/images/products')
        cb(null, folder)
    },
    filename: function (req, file, cb) {
        let imageName ='products-' +  Date.now() + path.extname(file.originalname)
        cb(null, imageName)
    }
})
const upload = multer({ storage: storage })

// List of packages
router.get('/packages', productsAPI.listPackages)

// List of flights
router.get('/flights', productsAPI.listFlights)

// List of hotels
router.get('/hotels', productsAPI.listHotels)




module.exports = router