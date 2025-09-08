/*
 * Purpose: Unit test that mocks the servlet request and response through your endpoint.
 */

package com.example.springboot;

import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

// loads the full application context, allowing integration testing.
@SpringBootTest
// auto configure MockMvc, which allows simulating HTTP requests.
@AutoConfigureMockMvc
public class HelloControllerTest {

	@Autowired
	// inject a MockMvc instance for sending requests and verifying responses.
	private MockMvc mvc;

	@Test
	public void getHello() throws Exception {
		/*
		 * Send an HTTP GET request to the root URL ("/").
		 * 
		 * Expects: Status 200 (OK) ->andExcept(status().isOk())
		 * 
		 * Response body "Greetings from Spring Boot!" ->
		 * andExpect(content().string(equalsTo("Greetings from Spring Boot!")));
		 */
		// If the controller handling / returns the text greetings, the test passes,
		// otherwise fails (issue in the controller)
		mvc.perform(MockMvcRequestBuilders.get("/").accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andExpect(content().string(equalTo("Greetings from Spring Boot!")));
	}
}
