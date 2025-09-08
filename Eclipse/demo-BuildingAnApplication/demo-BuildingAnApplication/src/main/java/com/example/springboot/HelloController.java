package com.example.springboot;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// Ready for use by Spring MVC to handle web requests.
@RestController
public class HelloController {

	// Invoke the index() method.
	@GetMapping("/")
	public String index() {
		return "Greetings from Spring Boot!";
	}
}
