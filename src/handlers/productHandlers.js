const {
  createproductController,
  getAllproductsController,
  getproductByNameController,
  getOneproductController,
  deleteproductController,
  updeateproductController,
} = require("../controllers/productControllers");

const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().min(4).required(),
  description: Joi.string().required(),
  price: Joi.string().required(),
});

const getproductsHandler = (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const productByName = getproductByNameController(name);
      res.send(productByName);
    } else {
      const allproducts = getAllproductsController();
      res.send(allproducts);
    }
  } catch (error) {
    res.status(400).send({ error: "No hay productos" });
  }
};

const getproductByIdHandler = (req, res) => {
  try {
    const { id } = req.params;
    const productById = getOneproductController(id);
    res.send(productById);
  } catch (error) {
    res.status(400).send({ error: "No se encontro el proucto" });
  }
};

const createproductHandler = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
    } else {
      const { name, description, price } = req.body;
      const newproduct = await createproductController(name, description, price);
      res.status(201).send(newproduct);
    }
  } catch (error) {
    res.status(500).send({ error: "Faltan datos del producto" });
  }
};

const putproductHandler = (req, res) => {
  const { name, description, price } = req.body;
  const { id } = req.params;
  const newproductData = updeateproductController(id, name, description, price);
  res.send(newproductData);
};

const deletproductHandler = (req, res) => {
  const { id } = req.params;
  const deletedProduct = deleteproductController(id);
  res.send(deletedProduct);
};

module.exports = {
  getproductsHandler,
  getproductByIdHandler,
  createproductHandler,
  putproductHandler,
  deletproductHandler,
};
