import React, { useState } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { updateList } from "../../actions/ListActions";

const List = ({ list }) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleText, setTitleText] = useState(list.title);
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

  return (
    <div className="list-wrapper">
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
          <div className="add-dropdown add-bottom">
            <div className="card">
              <div className="card-info"></div>
              <textarea name="add-card"></textarea>
              <div className="members"></div>
            </div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div className="add-card-toggle" data-position="bottom">
            Add a card...
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
