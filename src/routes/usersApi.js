const express = require('express')
const router = express.Router()
const usersAPI = require('../controllers/usersApiController')
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

// List of users
router.get('/', usersAPI.list)

// User detail
router.get('/:id', usersAPI.detail)

// Register user
router.post('/register', usersAPI.register)

// Loggin user
router.post('/loggin', usersAPI.loggin)

// Update user
router.put('/update/:id', usersAPI.update)

module.exports = router