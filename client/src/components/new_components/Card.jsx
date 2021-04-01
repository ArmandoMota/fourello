import React from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Card = ({ card }) => {
  let history = useHistory();

  const {
    title,
    description,
    dueDate,
    labels
  } = card;
  
  function format(dueDate) {
    let date = new Date(dueDate);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    
    return `${month} ${day}`;
  }

  const handleShowCard = (e) => {
    history.push(`/cards/${card.id}`);
  }

  let hasDescription = "";

  if (description) {
    hasDescription = "description-icon";
  }

  return (
    <div className="card-background">
      <div className="card " onClick={handleShowCard}>
        <i className="edit-toggle edit-icon sm-icon"></i>
        <div className="card-info">
          {labels.map(label => {
            return <div className={`card-label ${label} colorblindable`} key={`${card.id}${label}`}></div>;
          })}
          <p>
            {title}
          </p>
        </div>
        <div className="card-icons">
          <i className="clock-icon sm-icon overdue-recent completed">
            {format(dueDate)}
          </i>
          <i className={`${hasDescription} sm-icon`}></i>
          <i className="comment-icon sm-icon"></i>
        </div>
      </div>
    </div>
  )
};

export default Card;