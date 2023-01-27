const { application } = require('express');
const db = require('../database/models');
// const { Op } = require("sequelize");
const Users = db.User

module.exports = {
    list: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const users = await Users.findAll()
            response.info.total = users.length
            response.data = users
            res.json(response)
        }
        catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }

    },

    detail: async (req, res) => {
        let response = {
            info: {
                status: 200,
            }
        }
        try {
            const users = await Users.findByPk(req.params.id)
            response.data = users
            res.json(response)
        }
        catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    },

    register: async (req, res) => {
    }
}

