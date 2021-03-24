export default function cards(state = [], action) {
  switch (action.type) {
    case "FETCH_BOARD_SUCCESS": {
      const newLists = action.board.lists;
      const existingCardIds = {};
      const newState = [...state];

      newState.forEach((card, index) => {
        existingCardIds[card.id] = index;
      });

      newLists.forEach(list => {
        list.cards.forEach(newCard => {
          const existingIndex = existingCardIds[newCard.id];

          if (existingIndex) {
            newState[existingIndex] = newCard;
          } else {
            newState.push(newCard);
          }
        })
      });

      return newState;
    }
    default:
      return state;
  }
}
