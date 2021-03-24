import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoard } from "../../actions/BoardActions";

const Board = () => {
  const boardId = useParams().id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoard(boardId));
  }, []);

  const ourBoard = useSelector((state) => state.boards.find(board => board.id === boardId));
  const lists = useSelector(state => state.lists);
  const cards = useSelector(state => state.cards);

  if (ourBoard) {
    console.log(ourBoard);
    console.log(lists);
    console.log(cards);
  } else {
    console.log("No board found!");
  }

  return (
    <div></div>
  )
};

export default Board;
