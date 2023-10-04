import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import Todo from './Todo';
import { EditTodoForm } from './EditTodoForm';
import { Row, Col } from 'react-bootstrap';

// TodoWrapper component for managing tasks
export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all'); // Initialize filter state
  const [currentDate, setCurrentDate] = useState('');

  // Function to add a new task
  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  // Function to toggle task completion
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Function to delete a task
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Function to toggle task editing mode
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  // Function to edit a task
  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  // Filter tasks based on the current filter state
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') {
      return true; // Show all tasks
    } else if (filter === 'completed') {
      return todo.completed; // Show only completed tasks
    } else if (filter === 'active') {
      return !todo.completed; // Show only active tasks
    }
    return true;
  });

  // Function to clear completed tasks
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  useEffect(() => {
    // Get the current date and day when the component mounts
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(now.toLocaleDateString(undefined, options));
  }, []);

  return (
    <Row className='TodoWrapper'>
      <Col xs={12} md={6}>
        <h1>Get Things Done!</h1>
        <div className="date-heading">
          <h4>{currentDate}</h4>
        </div>
        <TodoForm addTodo={addTodo} />
        {/* Add filter buttons */}
        <div className="filter-buttons">
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('completed')}>Completed</button>
          <button onClick={() => setFilter('active')}>Active</button>
        </div>
        <button onClick={clearCompleted} className="clear-button">Clear Completed</button>
      </Col>
      <Col xs={12} md={6}>
        {filteredTodos.map((todo) =>
          todo.isEditing ? (
            <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
          ) : (
            <Todo
              task={todo}
              key={todo.id}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          )
        )}
      </Col>
    </Row>
  );
};
export default TodoWrapper