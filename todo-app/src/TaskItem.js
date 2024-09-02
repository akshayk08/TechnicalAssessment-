import React, { useState } from 'react';
import TaskForm from './TaskForm';

const TaskItem = ({ task, updateTask, deleteTask, addSubtask, updateSubtask, deleteSubtask, toggleCompletion }) => {
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editingSubtask, setEditingSubtask] = useState(null);

  const handleUpdateTask = (updatedTask) => {
    updateTask(task.id, updatedTask);
    setIsEditingTask(false);
  };

  const handleAddSubtask = (subtask) => {
    addSubtask(task.id, subtask);
  };

  const handleUpdateSubtask = (subtaskId, updatedSubtask) => {
    updateSubtask(task.id, subtaskId, updatedSubtask);
    setEditingSubtask(null);
  };

  return (
    <div className="TaskItem">
      {isEditingTask ? (
        <TaskForm
          initialTask={task}
          addTask={handleUpdateTask}
        />
      ) : (
        <div>
          <h2 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</h2>
          <p>{task.description}</p>
          <button onClick={() => setIsEditingTask(true)}>Edit Task</button>
          <button onClick={() => deleteTask(task.id)}>Delete Task</button>
          <button onClick={() => toggleCompletion(task.id)}>
            Mark as {task.completed ? 'Uncompleted' : 'Completed'}
          </button>
          <button onClick={() => handleAddSubtask({ title: 'New Subtask', description: '' })}>
            Add Subtask
          </button>

          {task.subtasks.map(subtask => (
            <div key={subtask.id} style={{ padding: '5px', border: '1px solid #ddd', margin: '5px 0' }}>
              {editingSubtask === subtask.id ? (
                <TaskForm
                  initialTask={subtask}
                  addTask={(updatedSubtask) => handleUpdateSubtask(subtask.id, updatedSubtask)}
                />
              ) : (
                <div>
                  <h4 style={{ textDecoration: subtask.completed ? 'line-through' : 'none' }}>{subtask.title}</h4>
                  <button onClick={() => setEditingSubtask(subtask.id)}>Edit Subtask</button>
                  <button onClick={() => deleteSubtask(task.id, subtask.id)}>Delete Subtask</button>
                  <button onClick={() => toggleCompletion(subtask.id)}>
                    Mark as {subtask.completed ? 'Uncompleted' : 'Completed'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskItem;
