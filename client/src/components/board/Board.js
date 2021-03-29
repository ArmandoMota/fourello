import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoard } from "../../actions/BoardActions";
import List from "./List";
import NewList from "./NewList";
import ExistingList from "./ExistingLists";

const Board = () => {
  const boardId = useParams().id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoard(boardId));
  }, [dispatch, boardId]);

  const board = useSelector((state) =>
    state.boards.find((board) => board.id === boardId)
  );

  const lists = useSelector((state) => {
    return state.lists.filter((list) => list.boardId === boardId);
  });

  // Filter for specific boardId
  const cards = useSelector((state) => state.cards);

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

          <NewList boardId={boardId} />
        </div>
      </main>
    </>
  );
};

export default Board;
