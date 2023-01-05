import * as Keycloak from "keycloak-js";

const keycloak = new Keycloak.default({
  realm: "demo-single-sign-on",
  clientId: "second-app",
  url: "http://localhost:8080",
});

export const initKeycloak = () => {
  keycloak
    .init({
      onLoad: "check-sso",
      silentCheckSsoRedirectUri:
        window.location.origin + "/silent-check-sso.html",
    })
    .then((isAuthenticated) => {
      if (isAuthenticated) {
        const { token } = keycloak;
        localStorage.setItem("access_token", token);

        setInterval(() => {
          keycloak
            .updateToken(70)
            .then((isRefreshed) => {
              if (isRefreshed) {
                const { token } = keycloak;
                localStorage.setItem("access_token", token);
              }
            })
            .catch(() => {
              console.log("Failed to refresh token");
            });
        }, 30000);
      }
    })
    .catch(() => {
      console.log("Authenticated Failed");
    });
};

export const loginKeycloak = () => {
  keycloak.login();
};

export const logoutKeycloak = () => {
  localStorage.removeItem("access_token");
  keycloak.logout();
};
