import { useState } from "react";
import "./App.css";
import { loginKeycloak, logoutKeycloak } from "./keycloak";

function App() {
  const [hello, setHello] = useState("");
  const [users, setUsers] = useState("");

  const handleLogin = () => {
    loginKeycloak();
  };

  const handleGetHello = () => {
    fetch("http://localhost:8083/hello")
      .then((res) => res.text())
      .then((data) => {
        setHello(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGetUsers = () => {
    fetch("http://localhost:8083/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    logoutKeycloak();
  };

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ marginBottom: "14px" }}>
          <button onClick={handleLogin}>Login</button>
        </div>
        <div style={{ marginBottom: "14px" }}>
          <button onClick={handleGetHello}>Get Hello</button>
        </div>
        <div>{hello && `Response Get Hello: ${hello}`}</div>
        <div style={{ marginBottom: "14px" }}>
          <button onClick={handleGetUsers}>Get Users</button>
        </div>
        <div>{users && `Response Get Users: ${users}`}</div>
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
    </div>
  );
}

export default App;
