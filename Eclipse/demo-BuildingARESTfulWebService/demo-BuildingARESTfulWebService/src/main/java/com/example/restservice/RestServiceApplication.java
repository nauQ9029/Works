package com.example.restservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
/*
 * The annotation @SpringBootApplication is a shortcut for three essential
 * Spring Boot annotations:
 * 
 * - @Configuration: Marks this class as a configuration source.
 * 
 * - @EnableAutoConfiguration: Automatically configures Spring based on
 * dependencies (e.g., sets up Spring MVC).
 * 
 * - @ComponentScan: Scans for components (@RestController, @Service, etc.)
 * within the package.
 */
public class RestServiceApplication {

	public static void main(String[] args) {
		// Launch the application.
		SpringApplication.run(RestServiceApplication.class, args);
	}
}