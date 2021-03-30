import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import { updateList } from "../../actions/BoardActions";

const List = ({ list }) => {
  const [ editing, setEditing ] = useState(false);
  const [ title, setTitle ] = useState(list.title);
  const dispatch = useDispatch();
  
  const editTitle = event => {
    setEditing(true);
  };
  
  const saveTitle = event => {
    if (event.key === "Enter" || event.key === undefined) {
      setEditing(false);
      dispatch(updateList({
        id: list.id,
        data: { title }
      }));
    }
  };
  
  const cards = useSelector((state) => {
    return state.cards.filter((card) => card.listId === list.id);
  });

  return (
    <div className="list-wrapper">
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            { editing ? 
              <input
                className="list-title"
                value={title}
                type="text"
                autoFocus
                onBlur={saveTitle}
                onKeyPress={saveTitle}
                onChange={event => { setTitle(event.target.value) }}
              /> :
              <p
                className="list-title"
                onClick={editTitle}>{title}
              </p> }
          </div>
          <div className="add-dropdown add-top">
            <div className="card"></div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div id="cards-container" data-id={`list-${list.id}-cards`}>
            {cards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
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
