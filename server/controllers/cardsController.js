const Card = require("../models/card");
const HttpError = require("../models/httpError");
const List = require("../models/list");

const getCard = (req, res, next) => {
  const cardId = req.params.id;

  Card.findById(cardId)
    .then((card) => {
      res.json(card);
    })
    .catch((err) => next(new HttpError("Card not found", 404)));
};

const createCard = (req, res, next) => {
  const listId = req.body.listId;
  const newCard = req.body.card;

  newCard.listId = listId;

  // Todo: also should generate a card action describing that the card was added to the given list.
  List.findById(listId).then((list) => {
    newCard.boardId = list.boardId;

    Card.create(newCard)
      .then((card) => {
        req.card = card;
        next();
      })
      .catch((err) =>
        next(new HttpError("Creating card failed, please try again", 500))
      );
  });
};

const addCardToList = async (req, res, next) => {
  const list = await List.findById(req.card.listId);
  const updatedCards = [...list.cards, req.card._id];
  List.findByIdAndUpdate(
    req.card.listId,
    { cards: updatedCards },
    { new: true }
  ).then(() => {
    next();
  });
};

const sendCard = (req, res, next) => {
  const card = req.card;
  res.json(card);
};

exports.getCard = getCard;
exports.createCard = createCard;
exports.addCardToList = addCardToList;
exports.sendCard = sendCard;
