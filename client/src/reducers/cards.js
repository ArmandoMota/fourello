import * as types from "../constants/ActionTypes";

export default function lists(state = [], action) {
  switch (action.type) {
    case types.FETCH_BOARD_SUCCESS:
      const [...updatedState] = state;

      action.board.lists.forEach((list) => {
        list.cards.forEach((card) => {
          const existingIndex = state.findIndex(
            (existingCard) => existingCard.id === card.id
          );

          if (existingIndex >= 0) {
            updatedState[existingIndex] = card;
          } else {
            updatedState.push(card);
          }
        });
      });

      return updatedState;
    case types.CREATE_CARD_SUCCESS:
      return [...state, action.card];
    case types.FETCH_CARD_SUCCESS:
      const filteredCards = state.filter((card) => card.id !== action.card.id);
      filteredCards.push(action.card);
      return filteredCards;
    default:
      return state;
  }
}
