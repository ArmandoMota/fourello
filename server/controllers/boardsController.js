const Board = require("../models/board");
const List = require("../models/list");
const Card = require("../models/card");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
const { default: Axios } = require("axios");

const getBoard = (req, res, next) => {
  Board.findById(req.params.id)
    .populate({
      path: "lists",
      populate: {
        path: "cards",
      },
    })
    .then((board) => {
      if (board === null) {
        res.status(404).end();
      } else {
        res.json({ board });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const getBoards = (req, res, next) => {
  Board.find({}, "title _id createdAt updatedAt").then((boards) => {
    res.json({
      boards,
    });
  });
};

const createBoard = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    Board.create(req.body)
      .then((board) => {
        console.log(board);
        Board.find(
          { _id: board._id },
          "title _id createdAt updatedAt"
        ).then((board) => res.json({ board }));
      })
      .catch((err) =>
        next(new HttpError("Creating board failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const findBoardLists = (req, res, next) => {
  Board.findById(req.list.boardId).then((board) => {
    const lists = [...board.lists, req.list._id];
    req.lists = lists;
    next();
  });
};

const updateBoardLists = (req, res, next) => {
  Board.findByIdAndUpdate(
    req.list.boardId,
    { lists: req.lists },
    { new: true }
  ).then((updatedBoard) => {
    next();
  });
};

const getList = (req, res, next) => {
  List.find(
    { _id: req.list._id },
    "title _id boardId createdAt updatedAt position"
  ).then((list) => res.json({ list }));
};

const createList = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    List.create(req.body)
      .then((list) => {
        req.list = list;
        next();
      })
      .catch((err) =>
        next(new HttpError("Creating list failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const updateList = (req, res, next) => {
  const id = req.params.id;
  List.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  ).then((list) => res.json(list));
};

exports.getBoards = getBoards;
exports.createBoard = createBoard;
exports.getBoard = getBoard;
exports.createList = createList;
exports.findBoardLists = findBoardLists;
exports.updateBoardLists = updateBoardLists;
exports.getList = getList;
exports.updateList = updateList;
