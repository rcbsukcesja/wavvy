package com.rcbsukcesja.hack2react.storage.user.provider;

import com.rcbsukcesja.hack2react.storage.user.adapters.CustomUserAdapter;
import com.rcbsukcesja.hack2react.storage.user.entity.CustomUserEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.jboss.logging.Logger;
import org.keycloak.component.ComponentModel;
import org.keycloak.connections.jpa.JpaConnectionProvider;
import org.keycloak.models.GroupModel;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.RealmModel;
import org.keycloak.models.RoleModel;
import org.keycloak.models.UserModel;
import org.keycloak.storage.StorageId;
import org.keycloak.storage.UserStorageProvider;
import org.keycloak.storage.user.UserLookupProvider;
import org.keycloak.storage.user.UserQueryProvider;
import org.keycloak.storage.user.UserRegistrationProvider;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Stream;

public class CustomUserStorageProvider implements
        UserStorageProvider,
        UserLookupProvider,
        UserQueryProvider,
        UserRegistrationProvider {
    private static final Logger logger = Logger.getLogger(CustomUserStorageProvider.class);

    protected EntityManager em;

    protected ComponentModel model;
    protected KeycloakSession session;

    CustomUserStorageProvider(KeycloakSession session, ComponentModel model) {
        this.session = session;
        this.model = model;
        em = session.getProvider(JpaConnectionProvider.class, "user-store").getEntityManager();
    }

    @Override
    public void preRemove(RealmModel realm) {
        UserStorageProvider.super.preRemove(realm);
    }

    @Override
    public void preRemove(RealmModel realm, GroupModel group) {
        UserStorageProvider.super.preRemove(realm, group);
    }

    @Override
    public void preRemove(RealmModel realm, RoleModel role) {
        UserStorageProvider.super.preRemove(realm, role);
    }

    @Override
    public UserModel getUserById(RealmModel realm, String id) {
        logger.info("getUserById: " + id);
        UUID persistenceId = UUID.fromString(StorageId.externalId(id));
        CustomUserEntity entity = em.find(CustomUserEntity.class, persistenceId);
        if (entity == null) {
            logger.info("Could not find user by id: " + id);
            return null;
        }
        return new CustomUserAdapter(session, realm, model, entity);
    }

    @Override
    public UserModel getUserByUsername(RealmModel realm, String username) {
        logger.info("getUserByUsername: " + username);
        TypedQuery<CustomUserEntity> query = em.createNamedQuery("getUserByUsername", CustomUserEntity.class);
        query.setParameter("username", username);
        List<CustomUserEntity> result = query.getResultList();
        if (result.isEmpty()) {
            logger.info("Could not find username: " + username);
            return null;
        }

        return new CustomUserAdapter(session, realm, model, result.get(0));
    }

    @Override
    public UserModel getUserByEmail(RealmModel realm, String email) {
        TypedQuery<CustomUserEntity> query = em.createNamedQuery("getUserByEmail", CustomUserEntity.class);
        query.setParameter("email", email);
        List<CustomUserEntity> result = query.getResultList();
        if (result.isEmpty()) return null;
        return new CustomUserAdapter(session, realm, model, result.get(0));
    }

    @Override
    public int getUsersCount(RealmModel realm) {
        Object count = em.createNamedQuery("getUserCount")
                .getSingleResult();
        return ((Number) count).intValue();
    }

    @Override
    public Stream<UserModel> searchForUserStream(RealmModel realm, Map<String, String> params, Integer firstResult, Integer maxResults) {
        TypedQuery<CustomUserEntity> query;

        String search = params.get(UserModel.SEARCH);
        if (search == null || search.trim().isEmpty()) {
            query = em.createNamedQuery("getAllUsers", CustomUserEntity.class);
        } else {
            query = em.createNamedQuery("searchForUser", CustomUserEntity.class);
            query.setParameter("search", "%" + search.toLowerCase() + "%");
        }

        if (firstResult != null) {
            query.setFirstResult(firstResult);
        }
        if (maxResults != null) {
            query.setMaxResults(maxResults);
        }
        return query.getResultStream().map(entity -> new CustomUserAdapter(session, realm, model, entity));
    }

    @Override
    public Stream<UserModel> searchForUserStream(RealmModel realm, Map<String, String> params) {
        TypedQuery<CustomUserEntity> query;

        String search = params.get(UserModel.SEARCH);
        if (search == null || search.trim().isEmpty()) {
            query = em.createNamedQuery("getAllUsers", CustomUserEntity.class);
        } else {
            query = em.createNamedQuery("searchForUser", CustomUserEntity.class);
            query.setParameter("search", "%" + search.toLowerCase() + "%");
        }
        return query.getResultStream().map(entity -> new CustomUserAdapter(session, realm, model, entity));
    }

    @Override
    public Stream<UserModel> getGroupMembersStream(RealmModel realmModel, GroupModel groupModel, Integer integer, Integer integer1) {
        return Stream.empty();
    }

    @Override
    public Stream<UserModel> searchForUserByUserAttributeStream(RealmModel realmModel, String s, String s1) {
        return Stream.empty();
    }

    @Override
    public UserModel addUser(RealmModel realm, String username) {
        CustomUserEntity entity = new CustomUserEntity();
        entity.setUsername(username);
        entity.setCreatedTimestamp(Instant.now().toEpochMilli());
        em.persist(entity);
        logger.info("added user: " + username);
        return new CustomUserAdapter(session, realm, model, entity);
    }

    @Override
    public boolean removeUser(RealmModel realm, UserModel user) {
        UUID persistenceId = UUID.fromString(StorageId.externalId(user.getId()));
        CustomUserEntity entity = em.find(CustomUserEntity.class, persistenceId);
        if (entity == null) return false;
        em.remove(entity);
        return true;
    }

    @Override
    public void close() {
        logger.info("Closing connection");
    }
}
