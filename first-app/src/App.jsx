import { useState } from "react";
import "./App.css";
import { loginKeycloak, logoutKeycloak } from "./keycloak";

function App() {
  const [hello, setHello] = useState("");
  const [departments, setDepartments] = useState("");

  const handleLogin = () => {
    loginKeycloak();
  };

  const handleGetHello = () => {
    fetch("http://localhost:8082/hello")
      .then((res) => res.text())
      .then((data) => {
        setHello(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGetDepartments = () => {
    fetch("http://localhost:8082/departments", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDepartments(JSON.stringify(data));
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
          <button onClick={handleGetDepartments}>Get Departments</button>
        </div>
        <div>{departments && `Response Get Departments: ${departments}`}</div>
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
    </div>
  );
}

export default App;
