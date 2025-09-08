package com.example.SpringBoot_FullExample.student;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Transient;

@Entity
//This will create a table named 'student' in SQL Server
@Table
public class Student {

	// Auto-increment ID
	@Id
	@SequenceGenerator(name = "student_sequence", sequenceName = "student_sequence", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private String email;
	private LocalDate dob;

	/*
	 * This field will not be stored in the database (age changes over time,
	 * redundant data)
	 */
	@Transient
	private int age;

	// Default constructor
	public Student() {

	}

	// Constructor with parameters with id
	public Student(long id, String name, String email, LocalDate dob) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.dob = dob;
	}

	// Constructor with parameters without id
	public Student(String name, String email, LocalDate dob) {
		this.name = name;
		this.email = email;
		this.dob = dob;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public LocalDate getDob() {
		return dob;
	}

	public void setDob(LocalDate dob) {
		this.dob = dob;
	}

	/*
	 * Automatically compute the age based on dob -> dynamically calculates the age
	 * whenever it is accessed.
	 */
	public int getAge() {
		return LocalDate.now().getYear() - this.dob.getYear();
	}

	public void setAge(int age) {
		this.age = age;
	}

	@Override
	public String toString() {
		return "Student [id=" + id + ", name=" + name + ", email=" + email + ", dob=" + dob + ", age=" + age + "]";
	}
}
