const Comment = require("../models/comment");
const Card = require("../models/card");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createComment = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { cardId, comment } = req.body;
    Comment.create({ cardId, ...comment })
      .then((newComment) => {
        req.comment = newComment;
        next();
      })
      .catch((err) => {
        next(new HttpError("Creating comment failed, please try again", 500));
      });
  } else {
    return next(new HttpError("The comment text field is empty.", 404));
  }
};

const addCommentToCard = async (req, res, next) => {
  const card = await Card.findById(req.comment.cardId);
  const updatedComments = [...card.comments, req.comment._id];

  Card.findByIdAndUpdate(
    req.comment.cardId,
    { comments: updatedComments },
    { new: true }
  ).then(() => next());
};

const sendComment = (req, res, next) => {
  res.json({ comment: req.comment });
};

exports.createComment = createComment;
exports.addCommentToCard = addCommentToCard;
exports.sendComment = sendComment;
