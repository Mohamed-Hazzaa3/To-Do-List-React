import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          Keep your tasks organized.
          <br />
          To-Do-list keeps track of your adventures.
        </h1>
        <h2>
          A list that helps you organize your tasks and ideas. Never forget your
          wonderful experiences, and Show your friends what you have achieved
        </h2>
        <Link to="/login" className="cta">
          Start tracking now
        </Link>
      </section>
    </main>
  );
}
