import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useTasks } from "../contexts/TasksContext";

import styles from "./Todo.module.css";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function Todo({ task }) {
  const { deleteTask, editTask, toggleComplete } = useTasks();
  const { taskName } = task;
  return (
    <div className={styles.todo}>
      <p
        className={`${task.completed ? styles.completed : styles.incompleted}`}
        onClick={() => toggleComplete(task.id)}
      >
        {taskName}
      </p>
      <time className={styles.date}>({formatDate(new Date())})</time>
      <div>
        <FontAwesomeIcon
          className={styles.editicon}
          icon={faPenToSquare}
          onClick={() => editTask(task.id)}
        />
        <FontAwesomeIcon
          className={styles.deleteicon}
          icon={faTrash}
          onClick={() => deleteTask(task.id)}
        />
      </div>
    </div>
  );
}
export default Todo;
