const {products} = require("../db/dataBase");

const createproductController = async (name, description, price) => {
  const id = products.length + 1;

  const newproduct = {id, name, description, price };
  if (!name || !description || !price ) throw new Error();
  products.push(newproduct);
  return newproduct;
};

const getAllproductsController = () => {
  if (!products.length) throw new Error();
  return products;
};

const getproductByNameController = (name) => {
  const productByName = products.filter((product) => product.name === name);
  if (!productByName.length) throw new Error();
  return productByName;
};

const getOneproductController = (id) => {
  const productById = products.find((product) => product.id === Number(id));
  if (!productById) throw new Error();
  return productById;
};

const deleteproductController = (id) => {
  const index = products.findIndex((product) => product.id === Number(id));
  let deleteproduct = null;
  if (index !== -1) {
    [deleteproduct] = products.splice(index, 1);
  }
  return deleteproduct;
};

const updeateproductController = (id, name, description, price) => {
  const newproductData = { name, description, price };
  const product = products.find((product) => product.id === Number(id));
  if (product) {
    Object.assign(product, newproductData);
  }
  return product;
};

module.exports = {
  createproductController,
  getAllproductsController,
  getproductByNameController,
  getOneproductController,
  deleteproductController,
  updeateproductController,
};
