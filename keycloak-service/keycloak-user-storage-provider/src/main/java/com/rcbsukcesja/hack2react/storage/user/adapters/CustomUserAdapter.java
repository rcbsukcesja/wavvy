package com.rcbsukcesja.hack2react.storage.user.adapters;

import com.rcbsukcesja.hack2react.storage.user.entity.Company;
import com.rcbsukcesja.hack2react.storage.user.entity.CustomUserEntity;
import com.rcbsukcesja.hack2react.storage.user.entity.Organization;
import com.rcbsukcesja.hack2react.storage.user.entity.OrganizationNGO;
import com.rcbsukcesja.hack2react.storage.user.enums.LegalStatus;
import com.rcbsukcesja.hack2react.storage.user.enums.UserType;
import org.keycloak.common.util.MultivaluedHashMap;
import org.keycloak.component.ComponentModel;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.RealmModel;
import org.keycloak.models.UserModel;
import org.keycloak.storage.StorageId;
import org.keycloak.storage.adapter.AbstractUserAdapterFederatedStorage;

import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

public class CustomUserAdapter extends AbstractUserAdapterFederatedStorage {

    public final static String USER_TYPE = "user-type";
    public final static String ORGANIZATION_TYPE = "organization-type";
    private final CustomUserEntity entity;
    protected String keycloakId;

    public CustomUserAdapter(KeycloakSession session, RealmModel realm, ComponentModel model, CustomUserEntity entity) {
        super(session, realm, model);
        this.entity = entity;
        keycloakId = StorageId.keycloakId(model, entity.getId().toString());
    }

    @Override
    public String getUsername() {
        return entity.getUsername();
    }

    @Override
    public void setUsername(String username) {
        entity.setUsername(username);
    }

    @Override
    public String getFirstName() {
        return entity.getFirstName();
    }

    @Override
    public void setFirstName(String firstName) {
        entity.setFirstName(firstName);
    }

    @Override
    public String getLastName() {
        return entity.getLastName();
    }

    @Override
    public void setLastName(String lastName) {
        entity.setLastName(lastName);
    }

    @Override
    public void setEmail(String email) {
        entity.setEmail(email);
    }

    @Override
    public String getEmail() {
        return entity.getEmail();
    }

    @Override
    public String getId() {
        return keycloakId;
    }

    @Override
    public boolean isEnabled() {
        return entity.isEnabled();
    }

    @Override
    public void setEnabled(boolean enabled) {
        entity.setEnabled(enabled);
    }

    @Override
    public Long getCreatedTimestamp() {
        return entity.getCreatedTimestamp();
    }

    @Override
    public void setCreatedTimestamp(Long timestamp) {
        entity.setCreatedTimestamp(timestamp);
    }

    @Override
    public boolean isEmailVerified() {
        return entity.isEmailVerified();
    }

    @Override
    public void setEmailVerified(boolean verified) {
        entity.setEmailVerified(verified);
    }

    public String getUserType() {
        return entity.getUserType().name();
    }

    public void setUserType(String userType) {
        entity.setUserType(UserType.getByName(userType));
    }

    public void setOrganization(Organization organization) {
        entity.setOrganization(organization);
    }

    public Organization getOrganization() {
        return entity.getOrganization();
    }

    @Override
    public void setSingleAttribute(String name, String value) {
        switch (name) {
            case UserModel.FIRST_NAME -> entity.setFirstName(value);
            case UserModel.LAST_NAME -> entity.setLastName(value);
            case UserModel.EMAIL -> entity.setEmail(value);
            case UserModel.ENABLED -> entity.setEnabled(Boolean.parseBoolean(value));
            case UserModel.EMAIL_VERIFIED -> entity.setEmailVerified(Boolean.parseBoolean(value));
            case USER_TYPE -> entity.setUserType(UserType.getByName(value));
            case ORGANIZATION_TYPE -> {
                if (value.equals("COMPANY")) {
                    entity.setOrganization(Company.builder().owner(entity).build());
                } else {
                    entity.setOrganization(OrganizationNGO.builder().owner(entity).legalStatus(LegalStatus.valueOf(value)).build());
                }
                super.setSingleAttribute(name, value);
            }
            default -> super.setSingleAttribute(name, value);
        }
    }

    @Override
    public void setAttribute(String name, List<String> values) {
        switch (name) {
            case UserModel.FIRST_NAME -> entity.setFirstName(values.get(0));
            case UserModel.LAST_NAME -> entity.setLastName(values.get(0));
            case UserModel.EMAIL -> entity.setEmail(values.get(0));
            case UserModel.ENABLED -> entity.setEnabled(Boolean.parseBoolean(values.get(0)));
            case UserModel.EMAIL_VERIFIED -> entity.setEmailVerified(Boolean.parseBoolean(values.get(0)));
            case USER_TYPE -> entity.setUserType(UserType.getByName(values.get(0)));
            case ORGANIZATION_TYPE -> {
                if (values.get(0).equals("COMPANY")) {
                    entity.setOrganization(Company.builder().owner(entity).build());
                } else {
                    entity.setOrganization(OrganizationNGO.builder().owner(entity).legalStatus(LegalStatus.valueOf(values.get(0))).build());
                }
                super.setAttribute(name, values);
            }
            default -> super.setAttribute(name, values);
        }
    }

    @Override
    public String getFirstAttribute(String name) {
        return super.getFirstAttribute(name);
    }

    @Override
    public Map<String, List<String>> getAttributes() {
        Map<String, List<String>> attrs = super.getAttributes();
        MultivaluedHashMap<String, String> all = new MultivaluedHashMap<>();
        all.putAll(attrs);
        return all;
    }

    @Override
    public Stream<String> getAttributeStream(String name) {
        return super.getAttributeStream(name);
    }

    @Override
    public void removeAttribute(String name) {
        super.removeAttribute(name);
    }

}