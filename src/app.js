const express = require('express')
const path = require('path')
const app = express()

//routes requires
const indexRoutes = require('./routes/index.js')
const usersRoutes = require('./routes/users.js')
const usersApi = require('./routes/usersApi.js')
const productsRoutes = require('./routes/products.js')
const productsApi = require('./routes/productsApi.js')

//uses
app.use('/', indexRoutes)
app.use('/users', usersRoutes)
app.use('/api/users', usersApi)
app.use('/products', productsRoutes)
app.use('/api/products', productsApi)


// methodOverride
const methodOverride = require('method-override')
app.use(methodOverride ("_method"))

//public
const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))

app.use(express.urlencoded({extended:false}))

//Cookie
const cookieParser = require('cookie-parser')
app.use(cookieParser())

//ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views')) // Path "views"

//session
const session = require('express-session')
app.use(session({secret: 'Secret'}))


// const isInSession = require('./middlewares/isInSession')
// app.use(isInSession)


// port
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
    console.log('http://localhost:3000/')
})


