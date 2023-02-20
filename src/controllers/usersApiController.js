// const { fileLoader } = require('ejs');
// const { application } = require('express');
// const { Op } = require("sequelize");
const db = require('../database/models');
const bcrypt = require('bcryptjs');
const { on } = require('nodemon');
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
            const user = {
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
                const registedUser = await Users.create(user)
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
            let user = {
                email: req.body.email,
                password: req.body.password
            }
            console.log(user);//CL
            const userInDb = await Users.findAll({
                where: {
                    email: user.email
                }
            })
            const finded = userInDb[0].dataValues
            if (userInDb.length > 0) {
                let passwordCheck = bcrypt.compareSync(user.password, finded.password)
                if (passwordCheck) {
                    if(req.body.remember){
                        res.cookie('userEmailCookie', user.email);
                    }
                    delete finded.password
                    req.session.userLogged = finded
                    response.data = finded
                    return res.json(response)
                } else {
                    return new Error('Contraseña invalida')
                }
            } else {
                return new Error('Informacion invalida')
            }
        } catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
    },

    update: async (req, res) => {
        let response = {
            info: {
                status: 200
            }
        }
        try {
            let newData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                image: req.file ? req.file.filename : 'default.jpg',
                admin: req.body.admin
            }
            const edited = await Users.update(newData, {where:{id: req.params.id}})
            response.data = newData
            res.json(response)

        } catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }

    },
    
    delete: async (req, res) => {
        let response = {
            info: {
                status: 200
            }
        }
        try {
            const destroy = await Users.destroy({
                where: {
                  id: req.params.id
                }
              })
              response.data = destroy
              res.json(response)
  

        } catch (e) {
            response.info.status = 400
            response.info.msg = e.message
            res.json(response)
        }
        
    },

    
}

