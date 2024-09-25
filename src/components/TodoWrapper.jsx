import Todo from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import styles from "./TodoWrapper.module.css";
import { useTasks } from "../contexts/TasksContext";
import Spinner from "./Spinner";
import Button from "./Button";

export const TodoWrapper = () => {
  const { tasks, isLoading,clearTasks } = useTasks();
  async function handleClick(e) {
    e.preventDefault();
    await clearTasks();
  }
  if (isLoading) return <Spinner />;

  return (
    <div className={styles.TodoWrapper}>
      <h1>Get Things Done !</h1>
      <TodoForm />
      {/* display todos */}
      {tasks.map((task) =>
        task.isEditing ? (
          <EditTodoForm key={task.id} task={task} id={task.id} />
        ) : (
          <Todo key={task.id} task={task} />
        )
      )}
       {tasks.length > 0 && ( 
        <Button type="primary" onClick={handleClick}>
          Clear All
        </Button>
      )}
    </div>
  );
};
