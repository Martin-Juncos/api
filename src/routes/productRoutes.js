const {Router} = require('express')
const { getproductsHandler, getproductByIdHandler, createproductHandler, putproductHandler, deletproductHandler } = require('../handlers/productHandlers')
const { deleteproductController } = require('../controllers/productControllers')
const productRoutes = Router()

productRoutes.get('/', getproductsHandler)
productRoutes.get('/:id', getproductByIdHandler)
productRoutes.post('/', createproductHandler)
productRoutes.put('/:id', putproductHandler)
productRoutes.delete('/:id', deletproductHandler)

module.exports = productRoutes