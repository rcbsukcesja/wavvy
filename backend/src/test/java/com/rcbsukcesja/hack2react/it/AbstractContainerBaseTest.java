package com.rcbsukcesja.hack2react.it;

import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.testcontainers.containers.DockerComposeContainer;
import org.testcontainers.containers.wait.strategy.Wait;

import java.io.File;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@ActiveProfiles("test")
abstract class AbstractContainerBaseTest extends BasicOperations {

    private static final int DB_PORT = 5432;
    private static final String DB_SERVICE_NAME = "db";
    private static final String DB_NAME = "wavvy";
    private static final String DB_USERNAME = "postgres";
    private static final String DB_PASSWORD = "postgres";

    public static DockerComposeContainer<?> environment =
            new DockerComposeContainer(new File("src/test/resources/compose-test.yaml"))
                    .withExposedService(DB_SERVICE_NAME, DB_PORT, Wait.forListeningPort());

    static {
        environment.start();
    }

    @DynamicPropertySource
    static void registerProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url",
                () -> String.format("jdbc:postgresql://%s:%d/%s", environment.getServiceHost(DB_SERVICE_NAME, DB_PORT),
                        environment.getServicePort(DB_SERVICE_NAME, DB_PORT), DB_NAME));
        registry.add("spring.datasource.username", () -> DB_USERNAME);
        registry.add("spring.datasource.password", () -> DB_PASSWORD);
    }
}
