package com.rcbsukcesja.hack2react.storage.user.provider;

import com.rcbsukcesja.hack2react.storage.user.adapters.CustomUserAdapter;
import com.rcbsukcesja.hack2react.storage.user.entity.Organization;
import com.rcbsukcesja.hack2react.storage.user.enums.UserType;
import org.keycloak.events.Event;
import org.keycloak.events.EventListenerProvider;
import org.keycloak.events.EventType;
import org.keycloak.events.admin.AdminEvent;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.RoleModel;
import org.keycloak.models.UserModel;

public class UserAfterCreateProvider implements EventListenerProvider {

    private static final String CLIENT_ID = "wavvy-backend";
    private final KeycloakSession session;

    public UserAfterCreateProvider(KeycloakSession session) {
        this.session = session;
    }

    @Override
    public void onEvent(Event event) {
        if (event.getType() == EventType.REGISTER) {
            String userId = event.getUserId();
            UserModel user = session.users().getUserById(session.getContext().getRealm(), userId);
            String organizationType = user.getFirstAttribute("organization-type");

            if (organizationType != null) {
                RoleModel roleToAssign = getRoleToAssign(organizationType);

                if (roleToAssign != null) {
                    user.grantRole(roleToAssign);
                }

                if (organizationType.equals("COMPANY")) {
                    user.setSingleAttribute("user-type", UserType.BUSINESS.name());
                } else {
                    user.setSingleAttribute("user-type", UserType.NGO.name());
                }
            }
            String organizationName = user.getFirstAttribute("organization-name");

            CustomUserAdapter userAdapter = (CustomUserAdapter) user;
            Organization organization = userAdapter.getOrganization();
            organization.setName(organizationName);
            organization.setConfirmed(false);
            organization.setDisabled(false);

            userAdapter.setOrganization(organization);

        }
    }

    @Override
    public void onEvent(AdminEvent adminEvent, boolean includeRepresentation) {
    }

    @Override
    public void close() {
    }

    private RoleModel getRoleToAssign(String organizationType) {
        RoleModel roleToAssign;
        if ("COMPANY".equals(organizationType)) {
            roleToAssign = session.getContext().getRealm().getClientByClientId(CLIENT_ID).getRole("company");
        } else {
            roleToAssign = session.getContext().getRealm().getClientByClientId(CLIENT_ID).getRole("ngo");
        }
        return roleToAssign;
    }
}
