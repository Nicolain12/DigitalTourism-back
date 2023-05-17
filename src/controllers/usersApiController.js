const fs = require('fs');
const db = require('../database/models');
const bcrypt = require('bcryptjs');
const { on } = require('nodemon');
const jwt = require('jsonwebtoken')
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
                firstName: req.body.name,
                lastName: req.body.surname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                image: req.file ? req.file.filename : 'default.jpg',
                admin: req.body.admin,
                age: req.body.age
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
                delete registedUser.password
                jwt.sign({ registedUser }, 'secretkey', { expiresIn: '1d' }, (err, token) => {
                    if (err) {
                        console.error(err);
                        return response.sendStatus(500);
                    }
                    response.info.token = token;
                    res.json(response)
                }
                );
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
            const userInDb = await Users.findAll({
                where: {
                    email: user.email
                }
            })
            const finded = userInDb[0].dataValues
            if (finded) {
                let passwordCheck = bcrypt.compareSync(user.password, finded.password)
                if (passwordCheck) {
                    if (req.body.remember) {
                        delete finded.password
                        jwt.sign({ finded }, 'secretkey', { expiresIn: '30d' }, (err, token) => {
                            if (err) {
                                console.error(err);
                                return response.sendStatus(500);
                            }
                            response.info.permanentToken = token;
                            response.data = finded
                            return res.json(response)
                        }
                        );
                    } else {

                        delete finded.password
                        jwt.sign({ finded }, 'secretkey', { expiresIn: '1d' }, (err, token) => {
                            if (err) {
                                console.error(err);
                                return response.sendStatus(500);
                            }
                            response.info.token = token;
                            response.data = finded
                            return res.json(response)
                        }
                        );
                    }
                } else {
                    response.info.status = 400
                    response.info.msg = 'Invalid password'
                    res.json(response)
                }
            } else {
                response.info.status = 400
                response.info.msg = 'Invalid information'
                res.json(response)
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
            console.log('req.file:');
            console.log(req.file);
            let newData = {
                firstName: req.body.name,
                lastName: req.body.surname,
                email: req.body.email,
                image: req.file ? req.file.filename : 'default.jpg',
            }
            const previousUser = await Users.findByPk(req.params.id)
            const previousImage = previousUser.dataValues.image
            if(previousImage != 'default.jpg'){
                    fs.unlink( `public/images/users/${previousImage}`, (err) => {
                        if (err) {
                          console.error(err);
                        } 
                      });
            }
            await Users.update(newData, { where: { id: req.params.id } })
            const user = await Users.findByPk(req.params.id)
            response.data = user
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

    getByToken: (req, res) => {
        let response = {
            info: {
                status: 200
            }
        }
        if (req.token) {
            response.data = req.token.finded
            return res.json(response)
        } else {
            response.info.status = 400
            response.info.msg = 'User not found'
            return res.json(response)
        }

    }
}
