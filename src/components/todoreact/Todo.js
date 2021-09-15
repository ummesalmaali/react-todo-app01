import React, { useEffect, useState } from "react";
import "./style.css";

// get the data from the local storage
const getLocalData = () => {
  const lists = localStorage.getItem("myTodoList");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

function Todo() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  //adding task to the input using addItem functions
  const addItem = () => {
    if (!inputData) {
      alert("Please enter a task");
    } else {
      const newInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, newInputData]);
      setInputData("");
    }
  };

  //editing task functions
  const editItem = (id) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === id;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(id);
    setToggleButton(true);
  };

  //how to delete items section
  const deleteItem = (id) => {
    const updatedItem = items.filter((curElem) => {
      return curElem.id !== id;
    });
    setItems(updatedItem);
  };
  const removeAll = () => {
    setItems([]);
  };
  //adding to local storage
  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="images/todo.png" alt="toDo" />
            <figcaption>Add Your Task Here ✌️</figcaption>
            <div className="addItems">
              <input
                type="text"
                placeholder="✍️ Add Task "
                className="form-control"
                value={inputData}
                onChange={(e) => {
                  setInputData(e.target.value);
                }}
              />
              {toggleButton ? (
                <i className="far fa-edit add-btn" onClick={addItem}></i>
              ) : (
                <i className="fa fa-plus add-btn" onClick={addItem}></i>
              )}
            </div>

            {/* show our items */}

            <div className="showItems">
              {items.map((curEle, index) => {
                return (
                  <div className="eachItem" key={curEle.id}>
                    <h3>{curEle.name}</h3>
                    <div className="todo-btn">
                      <i
                        className="far fa-edit add-btn"
                        onclick={() => editItem(curEle.id)}
                      ></i>
                      <i
                        className="far fa-trash-alt add-btn"
                        onClick={() => deleteItem(curEle.id)}
                      ></i>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* remove all items */}
            {items.length > 0 && (
              <div className="showItems">
                <button
                  className="btn effect04"
                  data-sm-link-text="Remove All"
                  onClick={removeAll}
                >
                  <span>Check List</span>
                </button>
              </div>
            )}
          </figure>
        </div>
      </div>
    </>
  );
}

export default Todo;
