if (process.env.NODE_ENV !== ' production') {
    require('dotenv').config()
}

// Import the required libraries
const express = require('express')
app = express()
const expressLayouts = require('express-ejs-layouts')


const indexRouter = require('./routes/index')

//Configure the Express Application
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

// This allows us to set the beginning and ending HTML (headers and footers) so we dont have to repeat it everytime
app.set ('layout', 'layouts/layout')
app.use(expressLayouts)

// Where our public files (stylesheets, js, images) will be stored
app.use(express.static('public'))

// Set up the connetion to MongoDB via Mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db=mongoose.connection
db.on('error', error => console.error(errro))
db.once('open', () => console.log('Connected to Mongoose'))


app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)

