const listWithoutCards = list => {
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
      const existingIds = {};
      const newState = [...state];

      newState.forEach((list, index) => {
        existingIds[list.id] = index;
      });

      newLists.forEach(list => {
        const existingIndex = existingIds[list.id];

        if (existingIndex) {
          newState[existingIndex] = listWithoutCards(list);
        } else {
          newState.push(listWithoutCards(list));
        }
      });

      return newState;
    }
    default:
      return state;
  }
}

// Are we storing all lists from all boards in lists state?
