/*
 * Purpose: 
 * - Responsible for initializing the database with sample data 
 * when the application starts.
 */
package com.example.SpringBoot_FullExample.student;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StudentConfig {

	@Bean
	CommandLineRunner clr(StudentRepository repos) {
		return args -> {
			Student nauQ = new Student("nauQ", "example1@gmail.com", LocalDate.of(2004, Month.MARCH, 4));
			Student hniM = new Student("hniM", "example2@gmail.com", LocalDate.of(2004, Month.JULY, 11));
			Student Adol_Hither = new Student("Adol Hither", "example3@gmail.com", LocalDate.of(1889, Month.APRIL, 20));

			repos.saveAll(List.of(nauQ, hniM, Adol_Hither));
		};
	}
}
