const path = require('path')

const registerController = {
    index: (req, res) =>{
        res.render('register')
    }
}

module.exports=registerController