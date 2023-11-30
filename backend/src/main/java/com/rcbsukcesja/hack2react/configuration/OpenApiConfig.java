package com.rcbsukcesja.hack2react.configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.OAuthFlow;
import io.swagger.v3.oas.annotations.security.OAuthFlows;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration
@SecurityScheme(
        type = SecuritySchemeType.OAUTH2,
        name = "OAuth2",
        flows = @OAuthFlows(
                password = @OAuthFlow(
                        tokenUrl = "${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token"
                )
        )
)
@OpenAPIDefinition(
        info = @Info(title = "Wavvy API", version = "v1"),
        security = @SecurityRequirement(name = "OAuth2")
)
public class OpenApiConfig {

}
