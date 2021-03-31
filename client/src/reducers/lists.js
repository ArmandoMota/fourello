import * as types from "../constants/ActionTypes";

export default function lists(state = [], action) {
  switch (action.type) {
    case types.FETCH_BOARD_SUCCESS: {
      const [...updatedState] = state;

      action.board.lists.forEach((list) => {
        const existingIndex = state.findIndex(
          (existingList) => existingList.id === list.id
        );
        const { cards, ...listWithoutCards } = list;

        if (existingIndex >= 0) {
          updatedState[existingIndex] = listWithoutCards;
        } else {
          updatedState.push(listWithoutCards);
        }
      });

      return updatedState;
    }
    case types.CREATE_LIST_SUCCESS: {
      const [...updatedState] = state;
      updatedState.push(action.list);
      return updatedState;
    }
    case types.UPDATE_LIST_SUCCESS: {
      return state.map((list) => {
        return list.id === action.list.id ? action.list : list;
      });
    }
    default:
      return state;
  }
}
