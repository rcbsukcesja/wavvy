package com.rcbsukcesja.hack2react.storage.user.provider;

import org.jboss.logging.Logger;
import org.keycloak.Config;
import org.keycloak.events.EventListenerProvider;
import org.keycloak.events.EventListenerProviderFactory;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.KeycloakSessionFactory;

public class UserAfterCreateProviderFactory implements EventListenerProviderFactory {
    public static final String PROVIDER_ID = "user-after-create-listener";

    private static final Logger logger = Logger.getLogger(UserAfterCreateProviderFactory.class);

    @Override
    public EventListenerProvider create(KeycloakSession keycloakSession) {
        return new UserAfterCreateProvider(keycloakSession);
    }

    @Override
    public void init(Config.Scope scope) {

    }

    @Override
    public void postInit(KeycloakSessionFactory keycloakSessionFactory) {

    }

    @Override
    public String getId() {
        return PROVIDER_ID;
    }

    @Override
    public void close() {
        logger.info("<<<<<< Closing factory");
    }
}
