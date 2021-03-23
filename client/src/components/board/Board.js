import React from 'react';
import { useParams } from "react-router-dom";

const Board = () => {
  const boardId = useParams().id;
  const allBoards = useSelector(state => state.boards);
  const boardData = allBoards.find(board => board["_id"] === boardId);

  if (boardData) {
    console.log(boardData);
  } else {
    console.log('No board found!');
  }
};

export default Board;