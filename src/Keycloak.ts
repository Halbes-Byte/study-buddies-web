import { KeycloakClient } from '@react-keycloak/keycloak-ts';

const keycloak = new KeycloakClient({
    url: 'http://keycloak-server/auth',
    realm: 'studdy-buddies',
    clientId: 'studdy-buddies-web'
});

export default keycloak;