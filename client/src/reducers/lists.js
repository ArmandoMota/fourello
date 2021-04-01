const listWithoutCards = (list) => {
  const newList = {};
  newList.id = list.id;
  newList.title = list.title;
  newList.boardId = list.boardId;
  // newList.createdAt = list.createdAt;
  // newList.updatedAt = list.updatedAt;
  // newList.position = list.position;

  return newList;
};

export default function lists(state = [], action) {
  switch (action.type) {
    case "FETCH_BOARD_SUCCESS": {
      const newLists = action.board.lists;

      let newState = state.filter((list) => list.boardId !== action.board.id);

      return [...newState, ...newLists];
    }
    case "UPDATE_LIST_SUCCESS": {
      return state.map((list) => {
        if (list.id === action.list._id) {
          const { title, position } = action.list;
          return { ...list, title, position }; // Not sure this works
        } else {
          return list;
        }
      });
    }
    default:
      return state;
  }
}

// Are we storing all lists from all boards in lists state?
