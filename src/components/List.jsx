import React, { useState } from 'react';
import "./List.css"
import trash from "../images/trash.png"
import check from "../images/checkbox.png"
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-list-container">
      Observaciones (rayaduras o aboyaduras)

      <div className="input-container mt-3">
        <input
          type="text"
          value={inputValue}
          name="Observaciones (rayaduras o aboyaduras)"
          onChange={handleInputChange}
          placeholder="Descripción..."
          className='form-control'
        />
        <button onClick={handleAddTodo}>+</button>
      </div>

      <ul className="todo-items" value="">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}> 
            <img src={check} alt=""style={{width: "7%", height: "7%"}} />
            <span style={{fontSize: "17px", marginLeft: "8px"}}>{todo.text}</span>
            <img src={trash} alt="" style={{width: "6%", height: "6%", cursor: "pointer", marginLeft: "auto"}}
            onClick={() => handleDeleteTodo(todo.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;