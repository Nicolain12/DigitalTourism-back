const express = require('express')
const router = express.Router()
const productsAPI = require('../controllers/productsApiController')
const authorization = require('../middlewares/authentication')
const { log } = require('console')
const multer = require('multer');
const path = require('path');
const fs = require('fs');

//MULTER
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.token.finded.id;  
    const folder = path.join(__dirname, `../../public/images/flights/product_${userId}`);
    fs.mkdirSync(folder, { recursive: true }); 
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const imageName = 'products-' + Date.now() + path.extname(file.originalname);
    cb(null, imageName);
  }
});
const upload = multer({ storage: storage });
//flight
const storageFlight = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.token.finded.id;  
    const folder = path.join(__dirname, `../../public/images/flights/product_${userId}`);
    fs.mkdirSync(folder, { recursive: true }); 
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const imageName = 'products-' + Date.now() + path.extname(file.originalname);
    cb(null, imageName);
  }
});
const uploadFlight = multer({ storage: storageFlight });
//hotel
const storageHotel = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.token.finded.id; 
    const folder = path.join(__dirname, `../../public/images/hotels/product_${userId}`);
    fs.mkdirSync(folder, { recursive: true }); 
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const imageName = 'products-' + Date.now() + path.extname(file.originalname);
    cb(null, imageName);
  }
});
const uploadHotel = multer({ storage: storageHotel });

// Create flights
router.post('/create/flight', authorization, uploadFlight.array('productFile'), productsAPI.createFlights)

// Create hotels
router.post('/create/hotel', authorization, uploadHotel.array('productFile'), productsAPI.createHotels)

// Create packages
router.post('/create/package', authorization, upload.none(), productsAPI.createPackages)

// List of packages
router.get('/packages', productsAPI.listPackages)

// List of flights
router.get('/flights', productsAPI.listFlights)

// List of hotels
router.get('/hotels', productsAPI.listHotels)

// Find flight by pk
router.get('/flight/:id', authorization, productsAPI.flightByPk)

// Find hotel by pk
router.get('/hotel/:id', authorization, productsAPI.hotelByPk)

// Find package by pk
router.get('/package/:id', productsAPI.packageByPk)

// Update flights
router.put('/update/flight/:id', authorization, uploadFlight.array('productFile'), productsAPI.updateFlights)

// Update flights
router.put('/update/hotel/:id', authorization, uploadHotel.array('productFile'), productsAPI.updateHotels)

// Update packages
router.put('/update/package/:id', authorization, upload.none(), productsAPI.updatePackages)  

// Delete flights
router.delete('/delete/flight/:id', authorization, productsAPI.deleteFlight)

// Delete hotels
router.delete('/delete/hotel/:id', authorization, productsAPI.deleteHotel)

// Delete package
router.delete('/delete/package/:id', authorization, productsAPI.deletePackage)

module.exports = router