const User = require("../models/user");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: `произошла ошибка ${e}` });
  }
};

const getUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user === null) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json(user);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: `произошла ошибка ${e}` });
  }
};

const postUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    await User.create({ name, about, avatar });
    return res.status(201).json({ name, about, avatar });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: `произошла ошибка ${e}` });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, about } = req.body;
    await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true }
    ).then((user) => {
      return res.status(200).json(user);
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: `произошла ошибка ${e}` });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    await User.findByIdAndUpdate(req.user._id, { avatar }, { new: true }).then(
      (user) => {
        return res.status(200).json(user);
      }
    );
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: `произошла ошибка ${e}` });
  }
};

module.exports = {
  getUsers,
  getUsersById,
  postUser,
  updateProfile,
  updateAvatar,
};
