import Keycloak from 'keycloak-js';

const keycloak = new (Keycloak as any)({
    url: 'http://localhost:7070',
    realm: 'study-buddies',
    clientId: 'sb-backend'
});

export default keycloak;
