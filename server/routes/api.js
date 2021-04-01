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

router.put("/lists/:id", boardsController.updateList);
router.patch("/lists/:id", boardsController.updateList);

router.post(
  "/cards",
  boardsController.createCard,
  boardsController.findListCards,
  boardsController.updateListCards,
  boardsController.getCard
);

router.get(
  "/cards/:id",
  boardsController.getCard
);

module.exports = router;
