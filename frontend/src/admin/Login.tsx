import { useState } from "react";
import "./Login.scss";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(email, password);
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
      <input type="submit" name="Submit" value="Login" />
    </form>
  );
}
