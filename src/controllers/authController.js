const User = require('../models/User')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (name, userName, email, password, role) => {

  const hashedPass = await bcrypt.hash(password, 10);

  const newUser = User({ name, userName, email, password: hashedPass, role });

  await newUser.save()

  return newUser;
};

const loginController = async (email, password) => {
  const user = await User.findOne({email});
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  const passMatch = await bcrypt.compare(password, user.password);
  if (!passMatch) {
    throw new Error("Contraseña incorrecta");
  }

  const token = jwt.sign({ id: user.id, role: user.role }, "mySecretKey", {
    expiresIn: "1h",
  });

  const { password: _, ...userWithoutPassword } = user;

  return {
    message: "Inicio de sesion exitoso",
    token,
    user: userWithoutPassword,
  };
};

module.exports = {
  registerController,
  loginController,
};
