import React, { useState } from "react";
import apiClient from "../../lib/ApiClient";
import { fetchBoard } from "../../actions/BoardActions";
import { useDispatch } from "react-redux";

const NewList = ({ boardId }) => {
  const [listName, setListName] = useState("");
  const dispatch = useDispatch();

  const showNewListInput = (event) => {
    event.preventDefault();
    document.getElementById("new-list").classList.add("selected");
  };

  const hideNewListInput = () => {
    document.getElementById("new-list").classList.remove("selected");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (listName === "") {
      return;
    }

    const newList = {
      title: listName,
      boardId,
    };

    apiClient.createList(newList, (newListFromDb) => {
      dispatch(fetchBoard(boardId));
      setListName("");
      hideNewListInput();
    });
  };

  return (
    <div id="new-list" className="new-list">
      <span onClick={showNewListInput}>Add a list...</span>
      <input
        type="text"
        placeholder="Add a list..."
        onChange={(event) => setListName(event.target.value)}
        value={listName}
      />
      <div>
        <input
          type="submit"
          className="button"
          value="Save"
          onClick={handleSubmit}
        />
        <i className="x-icon icon" onClick={hideNewListInput}></i>
      </div>
    </div>
  );
};

export default NewList;
