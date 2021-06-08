import { useState } from "react";
import Login from "./Login";
import Table from "./Table";
import "./Admin.scss";

export default function Admin() {
  const [login, setLogin] = useState<boolean>(false);

  return (
    <div className="Admin">
      <Login login={login} setLogin={setLogin} />
      {login ? <Table /> : null}
    </div>
  );
}
