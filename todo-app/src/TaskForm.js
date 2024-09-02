import React, { useState, useEffect } from 'react';

const TaskForm = ({ addTask, initialTask = {} }) => {
  const [title, setTitle] = useState(initialTask.title || '');
  const [description, setDescription] = useState(initialTask.description || '');
  const [priority, setPriority] = useState(initialTask.priority || 1);

  useEffect(() => {
    setTitle(initialTask.title || '');
    setDescription(initialTask.description || '');
    setPriority(initialTask.priority || 1);
  }, [initialTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') return; // Prevent adding empty tasks
    addTask({ title, description, priority });
    setTitle(''); // Clear input after adding
    setDescription('');
    setPriority(1); // Reset priority
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        rows="3"
      />
      <select value={priority} onChange={(e) => setPriority(Number(e.target.value))}>
        <option value={1}>Low Priority</option>
        <option value={2}>Medium Priority</option>
        <option value={3}>High Priority</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
