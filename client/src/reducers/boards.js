export default function boards(state = [], action) {
  switch (action.type) {
    case "FETCH_BOARDS_SUCCESS": {
      return action.boards;
    }
    case "CREATE_BOARD_SUCCESS": {
      const newBoard = action.board;
      return state.concat(newBoard);
    }
    case "FETCH_BOARD_SUCCESS": {
      const board = {};
      board.title = action.board.title;
      board.id = action.board.id;
      // board.createdAt = action.board.createdAt;
      // board.updatedAt = action.board.updatedAt;

      const hasMatchingBoard = !!state.find(
        (existingBoard) => board.id === existingBoard.id
      );

      if (hasMatchingBoard) {
        return state.map((existingBoard) => {
          return existingBoard.id === board.id ? board : existingBoard;
        });
      } else {
        return state.concat(board);
      }
    }
    default:
      return state;
  }
}
