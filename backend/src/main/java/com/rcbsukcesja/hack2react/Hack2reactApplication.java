package com.rcbsukcesja.hack2react;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = "com.rcbsukcesja.hack2react.repositories")
@SpringBootApplication
public class Hack2reactApplication {

	public static void main(String[] args) {
		SpringApplication.run(Hack2reactApplication.class, args);
	}

}
