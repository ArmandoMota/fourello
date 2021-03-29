const express = require("express");
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const { validateBoard, validateList } = require("../validators/validators");

router.get("/boards", boardsController.getBoards);
router.get("/boards/:id", boardsController.getBoard);
router.post("/boards", validateBoard, boardsController.createBoard);
// Add express validator check
router.post(
  "/lists",
  validateList,
  boardsController.createList,
  boardsController.findBoardLists,
  boardsController.updateBoardLists,
  boardsController.getList
);

module.exports = router;
