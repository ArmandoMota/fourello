const Board = require("../models/board");
const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createList = (req, res, next) => {
  const errors = validationResult(req);
  const { boardId, list } = req.body;

  if (errors.isEmpty()) {
    const newList = {
      title: list.title,
      boardId,
      position: list.position,
    };
    List.create(newList)
      .then((list) => {
        req.list = list;
        next();
      })
      .catch((err) =>
        next(new HttpError("Creating list failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The list input field is empty.", 404));
  }
};

const addListToBoard = (req, res, next) => {
  const list = req.list;
  const boardId = req.list.boardId;

  Board.findByIdAndUpdate(boardId, {
    $addToSet: { lists: list._id },
  }).then(() => {
    next();
  });
};

const sendList = (req, res, next) => {
  const list = req.list;
  res.json({ list });
};

const updateList = (req, res, next) => {
  const listId = req.params.id;
  const options = {};
  if (req.body.title) {
    options["title"] = req.body.title;
  }

  if (req.body.position) {
    options["position"] = req.body.position;
  }

  List.findByIdAndUpdate(listId, options, { new: true }).then((list) =>
    res.json({ list })
  );
};

exports.createList = createList;
exports.addListToBoard = addListToBoard;
exports.sendList = sendList;
exports.updateList = updateList;
