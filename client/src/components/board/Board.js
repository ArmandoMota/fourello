import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoard } from "../../actions/BoardActions";
import List from "./List";
import NewList from "./NewList";

const Board = () => {
  const boardId = useParams().id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoard(boardId));
  }, [dispatch]);

  const board = useSelector((state) =>
    state.boards.find((board) => board.id === boardId)
  );

  const lists = useSelector((state) => {
    return state.lists.filter((list) => list.boardId === boardId);
  });

  // Filter for specific boardId
  const cards = useSelector((state) => state.cards);

  if (board) {
    console.log(board);
    console.log(lists);
    console.log(cards);
  } else {
    console.log("No board found!");
  }

  return (
    <main>
      <div id="list-container" className="list-container">
        <div id="existing-lists" className="existing-lists">
          {lists.map((list) => {
            return <List key={list.id} list={list} />;
          })}
        </div>

        <NewList />
      </div>
    </main>
  );
};

export default Board;
