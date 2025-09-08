/*
 * Pusposr: A simple full-stack integration test.
 */

package com.example.springboot;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;

//Starts with a random port, allowing full application testings.
//The actual port is configured automatically in the base URL for the TestRestTemplate
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class HelloControllerITest {
	// Injects a TestRestTemplate instance to perform HTTP requests against the
	// running server.
	@Autowired
	private TestRestTemplate template;

	@Test
	public void getHello() throws Exception {	
		// Send an HTTP GET request to /
		// Captures the response as ResponseEntity<String>
		ResponseEntity<String> response = template.getForEntity("/", String.class);

		// Asserts that the response body matches the expected values.
		assertThat(response.getBody()).isEqualTo("Greetings from Spring Boot!");
	}
}
