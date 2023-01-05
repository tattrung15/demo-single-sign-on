const Keycloak = require("keycloak-connect");

const keycloakConfig = {
  "auth-server-url": "http://localhost:8080",
  realm: "demo-single-sign-on",
  resource: "second-app",
  "bearer-only": true,
  credentials: {
    secret: "6CKa6oZHQ83o0wX6z092gnwfWgwTuOvT",
  },
};

const keycloak = new Keycloak({}, keycloakConfig);

module.exports = {
  keycloak,
};
