const express = require('express')
const  router = express.Router()
const productsController = require('../controllers/productsController')
const path = require('path');

router.get('/createFlight', productsController.createFlight)

router.get('/createHotel', productsController.createHotel)

router.get('/createPackage', productsController.createPackage)

router.get('/updateFlight/:id', productsController.updateFlight)

router.get('/updateHotel/:id', productsController.updateHotel)

router.get('/updatePackage/:id', productsController.updatePackage)

router.get('/deleteConfirm', productsController.deleteConfirm)

router.get('/detail/flight/:id', productsController.detailFlight)

router.get('/detail/hotel/:id', productsController.detailHotel)

router.get('/detail/package/:id', productsController.detailPackage)

module.exports = router