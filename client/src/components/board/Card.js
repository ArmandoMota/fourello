import React from "react";
import { Link } from 'react-router-dom';

const Card = ({ card }) => {
  return (
    <Link to={`/cards/${card.id}`}>
      <div className="card-background" >
        <div className="card ">
          <i className="edit-toggle edit-icon sm-icon"></i>
          <div className="card-info">
            <p>{card.title}</p>
          </div>
          <div className="card-icons">
            <i className="clock-icon sm-icon overdue-recent completed">Aug 4</i>
            <i className="description-icon sm-icon"></i>
            <i className="comment-icon sm-icon"></i>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;

// Srdjan Coric9:46 AM
// 1. In CardView component in useEffect you need to fetch the card with that id (id you get from url)
// 2. In Board you need to check whether the url matches `/boards` 
// 2.1 if it does, your boardId is from the utl
// 2.2. if it is not, you need to grab the card from the state with that id (from url) and grab boardId from that card
// Srdjan Coric9:47 AM
// in Board useEffect if (boardId) dispatch fetchBoard(boardId)
// Srdjan Coric9:51 AM
// in if/else you can't use useSelector
// useSelector to get all cards outside of if else
