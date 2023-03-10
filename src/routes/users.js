const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const path = require('path');



//VALIDATIONS
const { body } = require('express-validator')
const validationsRegister = [
    body('name')
        .notEmpty().withMessage('Debes introducir un nombre').bail()
        .isLength({ min: 2, max: 50 }).withMessage('Debes introducir un nombre valido'),

    body('surname')
        .notEmpty().withMessage('Debes introducir un apellido').bail()
        .isLength({ min: 2, max: 50 }).withMessage('Debes introducir un apellido valido'),

    body('email')
        .notEmpty().withMessage('Tienes que introducir un Email').bail()
        .isEmail().withMessage('Tienes que introducir un Email valido').bail()
        .isLength({ min: 5, max: 100 }).withMessage('Tienes que introducir un Email valido'),

    body('password')
        .notEmpty().withMessage('Debes introducir una contraseña'),
    body('userImg').custom((value, { req }) => {
        let file = req.file
        let allowedExtensions = ['.jpg', '.png', '.gif']

        if (!file) {
            throw new Error('Tienes que subir una imagen')
        } else {
            let fileExtension = path.extname(file.originalname)
            if (!allowedExtensions.includes(fileExtension)) {
                throw new Error(`Las imagenes permitidas son de los tipos ${allowedExtensions.join(', ')}`)
            }
        }
    })
]
const validationsLoggin = [
    body('email')
        .notEmpty().withMessage('Tienes que introducir un Email').bail()
        .isEmail().withMessage('Tienes que introducir un Email valido'),
    body('password')
        .notEmpty().withMessage('Debes introducir una contraseña'),
]

//MULTER
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = path.join(__dirname, '../../public/images/users')
        cb(null, folder)
    },
    filename: function (req, file, cb) {
        let imageName = 'user-' + Date.now() + path.extname(file.originalname)
        cb(null, imageName)
    }
})
const upload = multer({ storage: storage })



router.get('/update', usersController.update)

router.get('/delete', usersController.delete)


module.exports = router