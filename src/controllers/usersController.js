//validations
const { validationResult } = require('express-validator');
const { use } = require('../routes/users');

module.exports = {
    update: (req, res) => { res.render('./users/editUser.ejs') },

    delete: (req, res) => { res.render('./users/deleteConfirmUser.ejs') },
}

