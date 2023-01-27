// const { fileLoader } = require('ejs');
// const { application } = require('express');
// const { Op } = require("sequelize");
const db = require('../database/models');
const bcrypt = require('bcryptjs')
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
        let response = {
            info: {
                status: 200
            }
        }
        try {
            let user = {
                firstName: req.body.firstName,
                lastName: req.body.secondName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                image: req.file ? req.file.filename : 'default.jpg',
                admin: req.body.admin
            }
            const isInDb = await Users.findAll({
                where: {
                    email: user.email
                }
            })


            if (isInDb.length > 0) {
                return new Error('The user is already on the database')
            } else {
                const registedUser = await Users.create({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                    image: user.image ? user.image : 'default.jpg',
                    admin: user.admin
                })
                console.log(registedUser);
                response.data = registedUser
                res.json(response)
            }

        } catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    },

    loggin: async (req, res) => {
        let response = {
            info: {
                status: 200
            }
        }
        try {
            let newData = {
                firstName: req.body.firstName,
                lastName: req.body.secondName,
                email: req.body.email,
                image: req.file ? req.file.filename : 'default.jpg',
                admin: req.body.admin
            }

            response.data = registedUser
            res.json(response)

        } catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    }
}

