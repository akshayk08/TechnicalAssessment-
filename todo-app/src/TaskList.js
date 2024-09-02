import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, updateTask, deleteTask, addSubtask, updateSubtask, deleteSubtask, toggleCompletion }) => {
  return (
    <div>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          updateTask={updateTask}
          deleteTask={deleteTask}
          addSubtask={addSubtask}
          updateSubtask={updateSubtask}
          deleteSubtask={deleteSubtask}
          toggleCompletion={toggleCompletion}
        />
      ))}
    </div>
  );
};

export default TaskList;
