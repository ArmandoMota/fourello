import React from "react";

import { Link } from "react-router-dom";

const BoardTile = (props) => {
  console.log(props);

  return (
    <li className="board-tile">
      <Link to={`/boards/${props.id}`}>
        <span className="board-title">{props.title}</span>
      </Link>
    </li>
  );
};

export default BoardTile;
