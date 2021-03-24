const Board = require("../models/board");
const List = require('../models/list')
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getBoards = (req, res, next) => {
  Board.find({}, "title _id createdAt updatedAt")
    .then(boards => {
      res.json({
        boards,
      })
    })
};

const createBoard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Board.create(req.body)
      .then((board) => {
        Board.find({ _id: board._id }, "title _id createdAt updatedAt").then(board => res.json({ board }))
      })
      .catch(err =>
        next(new HttpError("Creating board failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const getBoard = (req, res) => {
  Board.findById(req.params.id).populate("lists")
  .then(board => {
    console.log(board)
    console.log(req.params.id)
    res.json({
      board,
    })
  }).catch(err => console.log(err))
}


exports.getBoards = getBoards;
exports.createBoard = createBoard;
exports.getBoard = getBoard;
