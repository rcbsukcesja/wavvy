FROM quay.io/keycloak/keycloak:22.0.5 as builder

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

# Configure a database vendor
ENV KC_DB=postgres

# copy the custom database configuration
COPY ./keycloak-user-storage-provider/src/main/resources/application.properties /opt/keycloak/conf/application.properties

WORKDIR /opt/keycloak
# for demonstration purposes only, please make sure to use proper certificates in production instead
#RUN keytool -genkeypair -storepass password -storetype PKCS12 -keyalg RSA -keysize 2048 -dname "CN=server" -alias server -ext "SAN:c=DNS:localhost,IP:127.0.0.1" -keystore conf/server.keystore
RUN /opt/keycloak/bin/kc.sh build

FROM maven:3.8.5-openjdk-17 AS buildprovider
COPY ./keycloak-user-storage-provider/src /home/app/src
COPY ./keycloak-user-storage-provider/pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package -DskipTests

FROM quay.io/keycloak/keycloak:22.0.5
COPY --from=builder /opt/keycloak/ /opt/keycloak/

# copy wavvy realm configuration
COPY ./keycloak/wavvy-realm.json /opt/keycloak/data/import/wavvy-realm.json

# copy the custom theme
COPY ./keycloak/custom-registration/. /opt/keycloak/themes/custom/login/

# copy providers
COPY --from=buildprovider /home/app/target/keycloak-user-storage-provider.jar /opt/keycloak/providers/keycloak-user-storage-provider.jar
ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start-dev", "--import-realm"]