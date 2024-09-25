import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/">
      {" "}
      <div className={styles.logo}>
      <img className={styles.img} src="/icon.png" alt="WorldWise logo"  />
      <p className={styles.p}>To-Do-List</p>
      </div>
    </Link>
  );
}

export default Logo;
