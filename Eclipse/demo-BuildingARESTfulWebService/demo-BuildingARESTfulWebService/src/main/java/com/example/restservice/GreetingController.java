package com.example.restservice;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// - Marks this class as a RESTful controller, meaning it will handle HTTP requests
// and return data as JSON.
@RestController
public class GreetingController {

	// - Defines the message format ("Hello, %s!").
	private static final String template = "Hello, %s!";
	// - An AtomicLong variable that keeps track of the number of requests.
	private final AtomicLong counter = new AtomicLong();

	// - Ensures that HTTP GET requests to /greeting are mapped to the greeting()
	// method.
	@GetMapping("/greeting")

	/*
	 * - Binds the value of the query string param name into the name param of the
	 * greeting(). If it's absent in the request, the defaultValue is used.
	 * 
	 * - Create and returns a new Greeting object based on the next value from the
	 * counter and formats the given name by using the greeting template.
	 */
	public Greeting greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
		return new Greeting(counter.incrementAndGet(), String.format(template, name));
	}
}