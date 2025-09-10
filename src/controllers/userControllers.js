const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createUserController = async (name, userName, email, password, role) => {
  const id = users.length + 1;
  const hashedPass = await bcrypt.hash(password, 10);
  const newUser = { id, name, userName, email, password: hashedPass, role };
  if (!name || !userName || !email || !password || !role) throw new Error();
  users.push(newUser);
  return newUser;
};

const getAllUsersController = async () => {
  const allUsers = await User.find({});
  if (!allUsers.length) throw new Error();
  return allUsers;
};

const getUserByNameController = async (name) => {
  const userByName = await User.find({ name });
  if (!userByName.length) throw new Error();
  return userByName;
};

const getOneUserController = async (id) => {
  const userById = await User.findById(id);
  if (!userById) throw new Error();
  return userById;
};

const deleteUserController = async (id) => {
  const deleteUser = await User.findByIdAndDelete(id);
  return deleteUser;
};

const updeateUserController = async (
  id,
  name,
  userName,
  email,
  password,
  role
) => {
  const newUserData = { name, userName, email, password, role };

  const user = await User.findByIdAndUpdate(id, newUserData, { new: true });

  return user;
};

module.exports = {
  createUserController,
  getAllUsersController,
  getUserByNameController,
  getOneUserController,
  deleteUserController,
  updeateUserController,
};
