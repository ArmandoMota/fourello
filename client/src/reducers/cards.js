import * as types from "../constants/ActionTypes";

export default function cards(state = [], action) {
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
      const existingCardIndex = state.findIndex(
        (card) => card.id === action.card.id
      );

      if (existingCardIndex === -1) {
        return [...state, action.card];
      } else {
        const newState = [...state];
        newState[existingCardIndex] = action.card;
        return newState;
      }
    case types.UPDATE_CARD_SUCCESS:
      console.log(action.card);
      return state.map((card) => {
        if (card.id !== action.card.id) {
          return card;
        }

        const comments = card.comments;

        return { ...action.card, comments };
      });
    default:
      return state;
  }
}
