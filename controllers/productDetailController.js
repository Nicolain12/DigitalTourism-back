const path = require('path')

const productDetailController = {
    index: (req, res) =>{
        res.render('./products/productDetail')
    }
}

module.exports=productDetailController