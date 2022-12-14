const cardsRouter = require('express').Router();
const {
  getCards, postCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', postCard);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.put('/:cardId/likes', putLike);
cardsRouter.delete('/:cardId/likes', deleteLike);

module.exports = cardsRouter;
