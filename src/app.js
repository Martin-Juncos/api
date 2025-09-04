const express = require('express')
const cors = require('cors');
const mainRoutes = require('./routes/mainRoutes')

const app = express()

app.use(express.json())

app.use(cors());

app.use(mainRoutes)

module.exports = app