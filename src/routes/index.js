const express = require('express')
const router = express.Router()
const indexController = require('../controllers/indexController')

router.get('/', indexController.index)

router.get('/flights', indexController.flights)

router.get('/hotels', indexController.hotels)

router.get('/packages', indexController.packages)

router.get('/choose', indexController.choose)

router.get('/register', indexController.register)

router.get('/loggin', indexController.loggin)

router.get('/profile/:id', indexController.profile)

router.get('/cart', indexController.cart)

router.get('/createChoose', indexController.createChoose)

module.exports = router