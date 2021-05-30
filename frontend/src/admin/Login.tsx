import { useState } from "react";
import "./Login.scss";

export default function Login(props: { login: boolean; setLogin: any }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  async function handleLogin() {
    const status = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    setEmail("");
    setPassword("");

    switch (status.status) {
      case 200:
        setError("");
        return true;
      case 401:
        setError("Authentifizierung fehlgeschlagen!");
        return false;
      default:
        setError("Irgendwas ist kaputt, bitte kontaktiere den Administrator!");
        return false;
    }
  }

  function updateLogin() {
    fetch("/api/login", {
      method: "GET",
    })
      .then((response) => response.status)
      .then((status) => {
        switch (status) {
          case 200:
            props.setLogin(true);
            break;
          case 401:
            props.setLogin(false);
            break;
          default:
            props.setLogin(false);
            break;
        }
      });
  }

  function handleLogout() {
    fetch("/api/login", {
      method: "DELETE",
    }).then(() => updateLogin());
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = await handleLogin();
    if (result) {
      updateLogin();
    }
  }

  if (props.login) {
    return (
      <div>
        <input type="button" value="Logout" onClick={handleLogout} />
        <h1>Logged in :)</h1>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="Login">
      <input
        type="email"
        placeholder="E-Mail"
        value={email}
        onChange={(mail) => {
          setEmail(mail.target.value);
        }}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(password) => {
          setPassword(password.target.value);
        }}
        required
      />
      {error === "" ? null : <div>{error}</div>}
      <input type="submit" name="Submit" value="Login" />
    </form>
  );
}
