import React, { useState } from 'react';

// EditTodoForm component for editing a task
export const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(value, task.id); // Call the editTodo function from props
    setValue(''); // Clear the input field
  };

  return (
    <form className='TodoForm' onSubmit={handleSubmit}>
      <input
        type='text'
        className='todo-input'
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder='Change of Task?'
      />
      <button type='submit' className='todo-btn'>
        Update Task
      </button>
    </form>
  );
};

export default EditTodoForm;