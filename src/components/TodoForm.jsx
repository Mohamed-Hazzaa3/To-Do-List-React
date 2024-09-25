import React, { useState } from "react";
import styles from "./TodoForm.module.css";
import { useTasks } from "../contexts/TasksContext";
import { v4 as uuidv4 } from "uuid";
export const TodoForm = ({ addTodo }) => {
  const { createTask } = useTasks();

  const [taskName, setTaskName] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    if (!taskName) return;

    const newTask = {
      id: uuidv4(), taskName:taskName, completed: false, isEditing: false
      
    };
    await createTask(newTask);
    
  }
  return (
    <form onSubmit={handleSubmit} className={styles.todoform}>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className={styles.todoinput}
        placeholder="What is the task today?"
      />
      <button type="submit" className={styles.todobtn}>
        Add Task
      </button>
    </form>
  );
};
