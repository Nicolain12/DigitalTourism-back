const express = require('express')
const path = require('path')
const cors = require('cors');
const app = express()

//routes requires
const usersApi = require('./routes/usersApi.js')
const productsApi = require('./routes/productsApi.js')

app.use(express.json())


// methodOverride
const methodOverride = require('method-override')
app.use(methodOverride("_method"))
//public
const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))

app.use(express.urlencoded({ extended: true }))

//cors
app.use(cors());

//Cookie
const cookieParser = require('cookie-parser')
app.use(cookieParser())

//session
const session = require('express-session')
app.use(session({ secret: 'Secret' }))


// const isInSession = require('./middlewares/isInSession')
// app.use(isInSession)


// port
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
    console.log('http://localhost:3001')
})

//uses
app.use('/api/users', usersApi)
app.use('/api/products', productsApi)

