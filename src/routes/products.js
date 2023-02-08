const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productsController')
const path = require('path');

router.get('/createFlight', productsController.createFlight)

router.get('/createHotel', productsController.createHotel)

router.get('/createPackage', productsController.createPackage)

router.get('/updateFlight', productsController.updateFlight)

router.get('/updateHotel', productsController.updateHotel)

router.get('/updatePackage', productsController.updatePackage)

router.get('/deleteConfirm', productsController.deleteConfirm)

module.exports = router