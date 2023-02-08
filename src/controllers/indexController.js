module.exports = {
    index: (req, res) => { res.render('index.ejs') },

    flights: (req, res) => { res.render('./products/list/flights.ejs') },

    hotels: (req, res) => { res.render('./products/list/hotels.ejs') },

    packages: (req, res) => { res.render('./products/list/packages.ejs') },

    choose: (req, res) => { res.render('./users/choose.ejs') },

    register: (req, res) => { res.render('./users/register.ejs') },

    loggin: (req, res) => { res.render('./users/loggin.ejs') },

    profile: (req, res) => { res.render('./users/profile.ejs') },

    cart: (req, res) => { res.render('./products/productCart.ejs') },

    createChoose: (req, res) => { res.render('./products/createChoose.ejs') }

}