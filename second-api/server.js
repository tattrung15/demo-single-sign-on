const express = require("express");
const cors = require("cors");
const { keycloak } = require("./configs/keycloak");

const app = express();

app.use(cors());
app.use(keycloak.middleware());

app.get("/hello", (req, res) => {
  res.send("Hello");
});

app.get("/users", keycloak.protect(), (req, res) => {
  const users = [
    { id: 1, name: "Abc" },
    { id: 2, name: "Xyz" },
  ];
  res.status(200).json(users);
});

const PORT = 8083;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
