const express = require("express");
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const cardsController = require("../controllers/cardsController");
const commentsController = require("../controllers/commentsController");
const {
  validateBoard,
  validateList,
  validateComment,
} = require("../validators/validators");

router.get("/boards", boardsController.getBoards);
router.post("/boards", validateBoard, boardsController.createBoard);
router.get("/boards/:id", boardsController.getBoard);

router.put("/lists/:id", listsController.updateList);
router.post(
  "/lists",
  validateList,
  listsController.createList,
  listsController.addListToBoard,
  listsController.sendList
);

router.get("/cards/:id", cardsController.getCard);
router.post(
  "/cards",
  cardsController.createCard,
  cardsController.addCardToList,
  cardsController.sendCard
);

router.post(
  "/comments",
  validateComment,
  commentsController.createComment,
  commentsController.addCommentToCard,
  commentsController.sendComment
);

module.exports = router;
