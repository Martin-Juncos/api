const { registerController, loginController } = require("../controllers/authController");
const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(4).required(),
  userName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  role: Joi.string().min(4).required(),
});

const registerHandler = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
    } else {
      const { name, userName, email, password, role } = req.body;
      const newUser = await registerController(name, userName, email, password, role);
      res.status(201).send(newUser);
    }
  } catch (error) {
    if (error.message === 'Usuario ya registrado') {
        res.status(500).send({ error: "Usuario ya registrado" });
    }
    res.status(500).send({ error: "Faltan datos al usuario" });
  }
};

const loginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userLogin = await loginController(email, password)
        res.status(200).send(userLogin)
        
    } catch (error) {
        res.status(401).send({error: error.message});
    }
}

module.exports = {
    registerHandler,
    loginHandler
}