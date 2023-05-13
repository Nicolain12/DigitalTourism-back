const express = require('express')
const router = express.Router()
const usersAPI = require('../controllers/usersApiController')
const path = require('path');
const authorizationToken = require('../middlewares/authentication')
//MULTER
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = path.join(__dirname, '../../public/images/users')
        cb(null, folder)
    },
    filename: function (req, file, cb) {
        let imageName ='user-' +  Date.now() + path.extname(file.originalname)
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
router.put('/update/:id',authorizationToken, upload.single('fileEdit'), usersAPI.update)

// Delete user
router.delete('/delete/:id', usersAPI.delete)

//**************************
// Get User By Token
router.get('/token/byId', authorizationToken, usersAPI.getByToken)
//**************************

module.exports = router