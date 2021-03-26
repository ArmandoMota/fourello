import React from "react";
import { useSelector } from "react-redux";
import List from "./List";

const ExistingLists = ({ boardId }) => {
  const lists = useSelector((state) => {
    console.log(state);
    return state.lists.filter((list) => list.boardId === boardId);
  });

  return (
    <div id="existing-lists" className="existing-lists">
      {lists.map((list) => {
        return <List key={list.id} list={list} />;
      })}
    </div>
  );
};

export default ExistingLists;
