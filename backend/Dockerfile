FROM maven:3.8.5-openjdk-17 AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package -DskipTests=true

FROM openjdk:22-jdk-bullseye
COPY --from=build /home/app/target/wavvy-backend-0.0.1-SNAPSHOT.jar /usr/local/lib/backend.jar
RUN mkdir -p /usr/share/wavvy/images/logo
RUN mkdir -p /usr/share/wavvy/images/project
ENTRYPOINT ["java", "-jar", "/usr/local/lib/backend.jar"]
