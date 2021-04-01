import React from "react";
import { useHistory } from "react-router-dom";

const Card = ({ card }) => {
  let history = useHistory();
  const { title, description, labels, dueDate, commentsCount } = card;

  function formatDate(dueDate) {
    let date = new Date(dueDate);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    return `${month} ${day}`;
  }

  const handleShowCard = (e) => {
    history.push(`/cards/${card.id}`);
  };

  const renderLabels = () => {
    if (labels.length > 0) {
      return (
        <>
          {labels.map((label) => {
            return (
              <div
                className={`card-label ${label} colorblindable`}
                key={`${card.id}${label}`}
              ></div>
            );
          })}
        </>
      );
    }
  };

  const renderDueDate = () => {
    if (dueDate) {
      return (
        <i className="clock-icon sm-icon overdue-recent completed">
          {formatDate(dueDate)}
        </i>
      );
    }
  };

  const renderDescriptionIcon = () => {
    if (description) {
      return <i className="description-icon sm-icon"></i>;
    }
  };

  const renderCommentsIcon = () => {
    if (commentsCount > 0) {
      return <i className="comment-icon sm-icon"></i>;
    }
  };

  return (
    <div className="card-background">
      <div className="card " onClick={handleShowCard}>
        <i className="edit-toggle edit-icon sm-icon"></i>
        <div className="card-info">
          {renderLabels()}
          <p>{title}</p>
        </div>
        <div className="card-icons">
          {renderDueDate()}
          {renderDescriptionIcon()}
          {renderCommentsIcon()}
        </div>
      </div>
    </div>
  );
};

export default Card;
