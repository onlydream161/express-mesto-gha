const Card = require('../models/card');
const {
  statusOk, notFound, badRequest, serverIsBad,
} = require('./errors');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(statusOk).json(cards);
  } catch (e) {
    console.error(e);
    return res.status(serverIsBad).json({ message: 'Ошибка Сервера ' });
  }
};

// eslint-disable-next-line consistent-return
const postCard = async (req, res) => {
  try {
    const { name, link } = req.body;

    await Card.create({ name, link, owner: req.user._id })
      .then((card) => res.status(201).json({ card }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(badRequest).send({ message: 'Ошибка Валидации  ' });
        }
      });
  } catch (e) {
    console.error(e);
    return res.status(serverIsBad).json({ message: 'Ошибка Сервера ' });
  }
};
const deleteCard = async (req, res) => {
  try {
    await Card.findByIdAndDelete({ _id: req.params.cardId }).orFail(() => {
      throw new Error('NotFound');
    });
    return res.status(statusOk).json({ message: 'card delete' });
  } catch (err) {
    if (err.message === 'NotFound') {
      return res.status(notFound).json({ message: 'Not Found ' });
    }
    if (err.name === 'CastError') {
      return res.status(badRequest).json({ message: 'некорректный id ' });
    }
    return res.status(serverIsBad).json({ message: 'Ошибка Сервера ' });
  }
};
// eslint-disable-next-line consistent-return
const putLike = async (req, res) => {
  try {
    await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).then((card) => {
      if (!card) {
        return res.status(notFound).json({ message: 'Not Found ' });
      }
      return res.status(statusOk).json(card);
    });
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(badRequest).json({ message: 'некорректный id ' });
    }
    console.error(e);
    return res.status(serverIsBad).json({ message: 'Ошибка Сервера ' });
  }
};

// eslint-disable-next-line consistent-return
const deleteLike = async (req, res) => {
  try {
    await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).then((card) => {
      if (!card) {
        return res.status(notFound).json({ message: 'Not Found ' });
      }
      return res.status(statusOk).json(card);
    });
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(badRequest).json({ message: 'некорректный id ' });
    }
    console.error(e);
    return res.status(serverIsBad).json({ message: 'Ошибка Сервера ' });
  }
};
module.exports = {
  getCards, postCard, deleteCard, putLike, deleteLike,
};
