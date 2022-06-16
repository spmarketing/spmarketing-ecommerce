const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const connectMongo = require('connect-mongo')
require('dotenv').config()
const app = express()
// Localhost: mongodb://localhost:27017/ecommerce 
mongoose.connect(process.env.MONGO_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to database succesfully')
})

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: connectMongo.create({ mongoUrl: process.env.MONGO_URI })
  }));

app.use(express.Router())


app.set('view engine', 'ejs')

// routes

app.use(require('./routes/index'))
app.use(require('./routes/auth'))
app.use(require('./routes/create_item'))
app.use(require('./routes/item'))



const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server listening to port ${port}`)
})