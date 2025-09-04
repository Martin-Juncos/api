const mongoose = require('mongoose');

const mongoUrl = 'mongodb+srv://profmcjuncos:goya2010@clustertest.ykwv7.mongodb.net/tienda'

mongoose.connect(mongoUrl)

module.exports = mongoose

