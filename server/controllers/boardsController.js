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

const createList = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    List.create(req.body)
      .then((list) => {
        Board.findById(list.boardId).then((board) => {
          const lists = [...board.lists, list._id];

          Board.findByIdAndUpdate(list.boardId, { lists }, { new: true }).then(
            (updatedBoard) => {
              console.log(updatedBoard);
            }
          );
        });

        List.find(
          { _id: list._id },
          "title _id boardId createdAt updatedAt position"
        ).then((list) => res.json({ list }));
      })
      .catch((err) =>
        next(new HttpError("Creating list failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

exports.getBoards = getBoards;
exports.createBoard = createBoard;
exports.getBoard = getBoard;
exports.createList = createList;
