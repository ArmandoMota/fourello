import React, { useState } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { updateList } from "../../actions/ListActions";
import { createCard } from "../../actions/CardActions";

const List = ({ list, selectedListId, setSelectedListId }) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleText, setTitleText] = useState(list.title);
  const [newCardTitle, setNewCardTitle] = useState("");

  const cards = useSelector((state) =>
    state.cards.filter((card) => card.listId === list.id)
  );
  const dispatch = useDispatch();

  const handleStartEditTitle = (e) => {
    setEditingTitle(!editingTitle);
  };

  const handleSaveNewTitle = (e) => {
    const updates = { title: titleText };
    setEditingTitle(!editingTitle);
    dispatch(updateList(list.id, updates));
  };

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      handleSaveNewTitle();
    }
  };

  const handleShowNewCardForm = () => {
    setSelectedListId(list.id);
  };

  const handleHideNewCardForm = () => {
    setSelectedListId("");
    setNewCardTitle("");
  };

  const handleAddCard = (e) => {
    e.preventDefault();

    const newCard = {
      listId: list.id,
      card: {
        title: newCardTitle,
      },
    };

    dispatch(
      createCard(newCard, (newCardFromDb) => {
        handleHideNewCardForm();
      })
    );
  };

  return (
    <div
      className={`list-wrapper ${
        selectedListId === list.id ? "add-dropdown-active" : ""
      }`}
    >
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            {editingTitle ? (
              <input
                type="text"
                className="list-title"
                autoFocus
                value={titleText}
                onBlur={handleSaveNewTitle}
                onKeyPress={handleKeypress}
                onChange={(e) => setTitleText(e.target.value)}
              />
            ) : (
              <p className="list-title" onClick={handleStartEditTitle}>
                {titleText}
              </p>
            )}
          </div>
          <div className="add-dropdown add-top">
            <div className="card"></div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div id="cards-container" data-id="list-1-cards">
            {cards.map((card) => {
              return <Card card={card} key={card.id} />;
            })}
          </div>
          <div
            className={`add-dropdown add-bottom ${
              selectedListId === list.id ? "active-card" : ""
            }`}
          >
            <div className="card">
              <div className="card-info"></div>
              <textarea
                name="add-card"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
              ></textarea>
              <div className="members"></div>
            </div>
            <a className="button" onClick={handleAddCard}>
              Add
            </a>
            <i className="x-icon icon" onClick={handleHideNewCardForm}></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div
            className="add-card-toggle"
            data-position="bottom"
            onClick={handleShowNewCardForm}
          >
            Add a card...
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
