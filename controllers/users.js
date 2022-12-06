const User = require('../models/user');
const {
  statusOk, notFound, badRequest, serverIsBad,
} = require('./errors');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(statusOk).json(users);
  } catch (e) {
    console.error(e);
    return res.status(serverIsBad).json({ message: 'Ошибка Сервера ' });
  }
};

const getUsersById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(notFound).json({ message: 'user not found' });
    }
    return res.status(statusOk).json(user);
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(badRequest).json({ message: 'некорректный id ' });
    }
    console.error(e);
    return res.status(serverIsBad).json({ message: 'Ошибка Сервера ' });
  }
};

const postUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    await User.create({ name, about, avatar });
    return res.status(201).json({ name, about, avatar });
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(badRequest).send({ message: 'Ошибка Валидации  ' });
    }
    console.error(e);
    return res.status(500).json({ message: 'Ошибка Сервера ' });
  }
};

// eslint-disable-next-line consistent-return
const updateProfile = async (req, res) => {
  try {
    const { name, about } = req.body;
    await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    ).then((user) => res.status(statusOk).json(user));
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(badRequest).send({ message: 'Ошибка Валидации  ' });
    }
    console.error(e);
    return res.status(serverIsBad).json({ message: 'Ошибка Сервера ' });
  }
};

// eslint-disable-next-line consistent-return
const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    await User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true }).then(
      (user) => res.status(statusOk).json(user),
    );
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(badRequest).send({ message: 'Ошибка Валидации  ' });
    }
    console.error(e);
    return res.status(serverIsBad).json({ message: 'Ошибка Сервера ' });
  }
};

module.exports = {
  getUsers,
  getUsersById,
  postUser,
  updateProfile,
  updateAvatar,
};
