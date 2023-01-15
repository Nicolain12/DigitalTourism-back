const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const Package = db.Package

const indexController = {
    index: async (req, res) =>{
        const packages = await Package.findAll({
            include: [{association: 'flys'}, {association: 'hotels'}]
        });
        res.send(packages)
    }
}

        
module.exports = indexController