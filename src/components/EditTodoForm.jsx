import React, { useState } from "react";
import styles from "./EditTodoForm.module.css";
import { useTasks } from "../contexts/TasksContext";
import { useNavigate } from "react-router-dom";

export const EditTodoForm = ({ task }) => {
  const [taskName, setTaskName] = useState(task.taskName);
  const { updateTask } = useTasks();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!taskName) return;

    const updatedTask = {
      id: task.id, 
      taskName: taskName,
      completed: task.completed, 
      isEditing: false, 
    };

    await updateTask(updatedTask); 
    navigate("/app", { replace: true }); 
  }

  return (
    <form onSubmit={handleSubmit} className={styles.todoform}>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className={styles.todoinput}
        placeholder="Update task"
      />
      <button type="submit" className={styles.todobtn}>
        Update Task
      </button>
    </form>
  );
};
