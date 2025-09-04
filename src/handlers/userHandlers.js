const {
  createUserController,
  getAllUsersController,
  getUserByNameController,
  getOneUserController,
  deleteUserController,
  updeateUserController,
} = require("../controllers/userControllers");

const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(4).required(),
  userName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  role: Joi.string().min(4).required(),
});

const getUsersHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const userByName = await getUserByNameController(name);
      res.send(userByName);
    } else {
      const allUsers = await getAllUsersController();
      res.status(200).send(allUsers);
    }
  } catch (error) {
    res.status(400).send({ error: "No hay usuarios" });
  }
};

const getUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const userById = await getOneUserController(id);
    res.status(200).send(userById);
  } catch (error) {
    res.status(400).send({ error: "No se encontro el usuario" });
  }
};

const createUserHandler = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
    } else {
      const { name, userName, email, password, role } = req.body;
      const newUser = await createUserController(name, userName, email, password, role);
      res.status(201).send(newUser);
    }
  } catch (error) {
    res.status(500).send({ error: "Faltan datos al usuario" });
  }
};

const putUserHandler = async (req, res) => {
  const { name, userName, email, password, role } = req.body;
  const { id } = req.params;
  const newUserData = await updeateUserController(id, name, userName, email, password, role);
  res.status(200).send(newUserData);
};

const deletUserHandler = async (req, res) => {
  const { id } = req.params;
  const deleteUser = await deleteUserController(id);
  res.status(200).send(deleteUser);
};

module.exports = {
  getUsersHandler,
  getUserByIdHandler,
  createUserHandler,
  putUserHandler,
  deletUserHandler,
};
