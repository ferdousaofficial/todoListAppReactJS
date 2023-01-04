import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

// get the ls data back
const getLocalData = function () {
  const lists = localStorage.getItem("lists");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

export default function Todo() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");

  // function for adding items
  const addItems = function () {
    if (!inputData) {
      alert("⚠️ Please enter your todo");
    } else {
      const newInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };

      setItems([...items, newInputData]);
      setInputData("");
    }
  };

  // function for deleting items
  const deleteItem = function (itemIndex) {
    const updateItems = items.filter((element) => {
      return element.id !== itemIndex;
    });
    setItems(updateItems);
  };

  // Edit item
  const editItem = function (itemIndex) {
    const itemTodoEdited = items.filter((element) => {
      return element.id === itemIndex;
    });

    setIsEditItem(itemIndex);
    setInputData(itemTodoEdited);
  };

  // function for remove all items
  const removeAllItems = function () {
    setItems([]);
  };

  // Store all items in Local Storage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./logo.png" alt="logo" />
            <figcaption>Add your list ✌️</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add items"
              className="form-control"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            <PlusIcon className="add-btn" onClick={addItems} />
          </div>
          {/* Show all items */}
          <div className="showItems">
            {items.map((element) => {
              return (
                <div className="eachItem" key={element.id}>
                  <h3>{element.name}</h3>
                  <div className="todo-btn">
                    <TrashIcon
                      className="trash"
                      onClick={() => deleteItem(element.id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Remove all button */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAllItems}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
