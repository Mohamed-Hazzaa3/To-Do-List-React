
import { TodoWrapper } from "../components/TodoWrapper";
import styles from "./AppLayout.module.css";
import User from "../components/User"


function AppLayout() {
  return (
    <div className={styles.app}>
      <TodoWrapper />
      <User/>
    </div>
  );
}

export default AppLayout;
