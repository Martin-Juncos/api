const {Router} = require('express')
const userRoutes = require('./userRoutes')
const authRoutes = require('./authRoutes')
const productRoutes = require('./productRoutes')

const mainRoutes = Router()

mainRoutes.use("/user",userRoutes)
mainRoutes.use("/product", productRoutes)
mainRoutes.use("/auth", authRoutes)

module.exports = mainRoutes