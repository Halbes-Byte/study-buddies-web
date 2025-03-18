import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: 'http://localhost:7070',
  realm: 'study-buddies',
  clientId: 'sb-backend'
});

export default keycloak;

