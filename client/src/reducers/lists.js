export default function lists(state = [], action) {
  switch (action.type) {
    case "FETCH_BOARD_SUCCESS": {
      const [ ...updatedState ] = state;

      action.board.lists.forEach(list => {
        const existingIndex = state.findIndex(existingList => existingList.id === list.id);
        const { cards, ...listWithoutCards } = list;

        if (existingIndex >= 0) {
          updatedState[existingIndex] = listWithoutCards;
        } else {
          updatedState.push(listWithoutCards);
        }
      });
      
      return updatedState;
    }
    default:
      return state;
  }
}
