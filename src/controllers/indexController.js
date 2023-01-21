const fs = require('fs');
const path = require('path');
// const db = require('../database/models');
// const { Op } = require("sequelize");
// const Package = db.Package

const indexController = {
    index: async (req, res) =>{
        res.render('index.ejs')
        }



    }


        
module.exports = indexController