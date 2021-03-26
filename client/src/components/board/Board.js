import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoard } from "../../actions/BoardActions";
import List from "./List";
import NewList from "./NewList";
import ExistingList from "./existingLists";

const Board = () => {
  const boardId = useParams().id;
  console.log(boardId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoard(boardId));
  }, [dispatch, boardId]);

  const board = useSelector((state) =>
    state.boards.find((board) => board.id === boardId)
  );

  const lists = useSelector((state) => {
    console.log(state);
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

  if (!board) {
    return null;
  }

  return (
    <>
      <header>
        <ul>
          <li id="title">{board.title}</li>
          <li className="star-icon icon"></li>
          <li className="private private-icon icon">Private</li>
        </ul>
        <div className="menu">
          <i className="more-icon sm-icon"></i>Show Menu
        </div>
        <div className="subscribed">
          <i className="sub-icon sm-icon"></i>Subscribed
        </div>
      </header>
      <main>
        <div id="list-container" className="list-container">
          <ExistingList boardId={boardId} />

          <NewList />
        </div>
      </main>
    </>
  );
};

export default Board;
