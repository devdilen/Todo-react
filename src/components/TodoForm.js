import React, { useState } from 'react';

// TodoForm component for adding new tasks
export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(value); // Call the addTodo function from props
    setValue(''); // Clear the input field
  };

  return (
    <form className='TodoForm' onSubmit={handleSubmit}>
      <input
        type='text'
        className='todo-input'
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder='What is the task today?'
      />
      <button type='submit' className='todo-btn'>
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;