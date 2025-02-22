import { useState, useEffect } from "react";
import './todo.css';


function Todo() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitile] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDate, setNewDate] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [editTodoList, setEditTodoList] = useState("");
  const [editedItem, setEditedItem] = useState([]);

  const handleAddTodo = () => {
    let newTodoItem  = {
      title: newTitle,
      description: newDescription,
      date: newDate,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);

    localStorage.setItem("todoList", JSON.stringify(updatedTodoArr));
  };

  const deleteTodo = (index) => {
    let removeTodo = [...allTodos];
    removeTodo.splice(index, 1);

    localStorage.setItem("todoList", JSON.stringify(removeTodo));
    setTodos(removeTodo);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let completedOn = dd + "-" + mm + "-" + yyyy;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompleteArr = [...completedTodos];
    updatedCompleteArr.push(filteredItem);
    setCompletedTodos(updatedCompleteArr);
    deleteTodo(index);

    localStorage.setItem("completedTodos", JSON.stringify(updatedCompleteArr));
  };

  const deleteCompletedTodo = (index) => {
    let removeCompletedTodo = [...completedTodos];
    removeCompletedTodo.splice(index, 1);

    localStorage.setItem("completedTodos", JSON.stringify(removeCompletedTodo));
    setCompletedTodos(removeCompletedTodo);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todoList"));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));

    if (savedTodo) {
      setTodos(savedTodo);
    }

    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  const editTodo = (index) => {
    setEditTodoList(index);
    setEditedItem(allTodos[index]);
  };

  const updateTitle = (value) => {
    setEditedItem((prev) => {
      return { ...prev, title: value };
    });
  };

  const updateDescription = (value) => {
    setEditedItem((prev) => {
      return { ...prev, description: value };
    });
  };

  const updateEditedTodo = () => {
    let newTodo = [...allTodos];
    newTodo[editTodoList] = editedItem;
    setTodos(newTodo);
    setEditTodoList("");
  };

  const switchTheme = (e) => {
    if(e.target.checked) {
      document.querySelector('body').setAttribute('dark-theme', 'dark')
    } else {
      document.querySelector('body').setAttribute('dark-theme', 'light')
    }
  }

  

  return (
    <div className="Todo">
      <div className="page-header">
        <h1>Welcome Kairo!</h1>
        <div className="display">
          <h1>Kairo</h1>
          <label class="switch">
            <input type="checkbox" onChange={switchTheme}/>
            <span class="slider round"></span>
          </label>
        </div>
      </div>
      <h1>My To Do</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              placeholder="tasks title"
              value={newTitle}
              onChange={(e) => setNewTitile(e.target.value)}
            />
          </div>
          <div className="todo-input-item">
            <label>Decription</label>
            <input
              type="text"
              placeholder="Whats the task about"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          <div className="todo-input-item">
            <label>Date</label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              className="add-button"
              onClick={handleAddTodo}
            >
              Add
            </button>
          </div>
        </div>

        <div className="todo-decision-button">
          <button
            className={`secondary-button ${
              isCompleteScreen === false && "active"
            }`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondary-button ${
              isCompleteScreen === true && "active"
            }`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {isCompleteScreen === false &&
            allTodos.map((item, index) => {
              if (editTodoList === index) {
                return (
                  <div className="edit-container" key={index}>
                    <input
                      placeholder="update title"
                      onChange={(e) => updateTitle(e.target.value)}
                      value={editedItem.title}
                    />
                    <div className="update-description">
                      <textarea
                        placeholder="update description"
                        rows={4}
                        onChange={(e) => updateDescription(e.target.value)}
                        value={editedItem.description}
                      />
                      <h4
                        className="update"
                        onClick={updateEditedTodo}
                      >Update</h4>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="todo-list-item" key={index}>
                    <h3>{item.title}</h3>
                    <div className="description">
                      <div className="decsription-info">
                        <p className="description-text">{item.description}</p>
                        <p className="description-date">{item.date}</p>
                      </div>
                      <div className="icons">
                        <h4
                          className="edit"
                          onClick={() => editTodo(index)}
                        >edit</h4>
                        <h4
                          className="delete"
                          onClick={() => deleteTodo(index)}
                        >delete</h4>
                        <h4
                          class="done"
                          onClick={() => handleComplete(index)}
                        >done</h4>
                      </div>
                    </div>
                  </div>
                );
              }
            })}

          {isCompleteScreen === true &&
            completedTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <h3>{item.title}</h3>
                  <div className="description">
                    <div className="decsription-info">
                      <p className="description-text">{item.description}</p>
                      <p className="description-date">Created: {item.date}</p>
                      <p className="description-date">
                        Completed: {item.completedOn}
                      </p>
                    </div>
                    <div className="icons">
                      <h4
                        className="delete"
                        onClick={() => deleteCompletedTodo(index)}
                      >delete</h4>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Todo;
