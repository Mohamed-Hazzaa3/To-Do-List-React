import { replace, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("mohamed@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }
  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  return (
    <main className={styles.login}>
      <PageNav />
      <div className={styles.container}>
        <h1 className={styles.title}>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <input
              className={styles.input}
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <span className={styles.span}></span>
            <label htmlFor="email" className={styles.label}>Email address</label>
          </div>

          <div className={styles.row}>
            <input
              className={styles.input}
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <span className={styles.span}></span>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
          </div>

          <div>
            <Button type="primary1">Login</Button>
          </div>
        </form>
      </div>
    </main>
  );
}
