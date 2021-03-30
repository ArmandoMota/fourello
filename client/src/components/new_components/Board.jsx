import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import List from "./List";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoard } from "../../actions/BoardActions";
import { createList } from "../../actions/ListActions";
import Axios from "axios";

const Board = () => {
  const boardId = useParams().id;
  const board = useSelector((state) =>
    state.boards.find((board) => board.id === boardId)
  );
  const lists = useSelector((state) => 
    state.lists.filter((list) => list.boardId === boardId)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoard(boardId));
  }, [dispatch]);

  if (!board) {
    return null;
  }

  const handleClick = (e) => {
    if (e.target.textContent === "Add a list...") {
      e.currentTarget.classList.add("selected");
    } else if (e.target.value === "Save") {
      e.currentTarget.classList.remove("selected");
      const newListName = e.currentTarget.querySelector("[type=\"text\"]").value;
      const listData = {
        boardId,
        list: { title: newListName },
      };

      dispatch(createList(listData));
    } else if (e.target.nodeName === "I") {
      e.currentTarget.classList.remove("selected");
      e.currentTarget.querySelector("[type=\"text\"]").value = "";
    }
    
    // console.log();
    // console.log(e.target.type);
    // console.log(e.target.element);
    // console.log(e.target);
    // console.log(e.currentTarget);
  };

  const handleSubmitList = (e) => {

  };

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
          <div id="existing-lists" className="existing-lists">
            {lists.map((list) => {
              return <List list={list} key={list.id} />;
            })}
          </div>
          <div id="new-list" className="new-list" onClick={handleClick}>
            <span>Add a list...</span>
            <input type="text" placeholder="Add a list..." />
            <div>
              <input type="submit" className="button" value="Save" />
              <i className="x-icon icon"></i>
            </div>
          </div>
        </div>
      </main>
      <div className="menu-sidebar">
        <div id="menu-main" className="main slide">
          <i className="back-icon icon"></i>
          <i className="x-icon icon"></i>
          <h1>Menu</h1>
          <div className="menu-contents">
            <div className="members">
              <div className="member-container">
                <div className="card-member ">VR</div>
              </div>
              <div className="member-container">
                <div className="card-member admin">TP</div>
              </div>
              <div className="member-container">
                <div className="card-member ">KW</div>
              </div>
            </div>
            <div className="add-members">
              <i className="add-icon sm-icon"></i>Add Members...
            </div>
            <hr />
            <ul className="menu-list">
              <li className="background-item">Change Background</li>
              <li className="filter-icon menu-icon">Filter Cards</li>
              <li className="power-icon menu-icon not-implemented">
                Power-Ups
              </li>
              <li className="stickers-icon menu-icon not-implemented">
                Stickers
              </li>
              <li className="more-icon menu-icon">More</li>
              <hr />
              <li className="activity-icon menu-icon not-implemented">
                Activity
              </li>
            </ul>
            <ul className="activity-list">
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> changed the
                  background of this board <small>yesterday at 4:53 PM</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> sent{" "}
                  <span className="link">
                    Use the + in the top menu to make your first board now.
                  </span>{" "}
                  to the board <small>4 hours ago</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> archived{" "}
                  <span className="link">
                    Use the + in the top menu to make your first board now.
                  </span>{" "}
                  <small>4 hours ago</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> changed the
                  background of this board <small>5 hours ago</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> changed the
                  background of this board <small>6 hours ago</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> changed the
                  background of this board <small>yesterday at 10:23 PM</small>
                </p>
              </li>
            </ul>
            <a className="all-activity not-implemented">View all activity...</a>
          </div>
        </div>
      </div>
      <div id="modal-container"></div>
      <div id="dropdown-container"></div>
    </>
  );
};

export default Board;
