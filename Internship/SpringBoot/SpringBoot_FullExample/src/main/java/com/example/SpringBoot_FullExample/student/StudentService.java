package com.example.SpringBoot_FullExample.student;

//import java.time.LocalDate;
//import java.time.Month;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StudentService {

	private final StudentRepository sr;

	// Constructor to fetch students to the database.
	@Autowired
	public StudentService(StudentRepository sr) {
		this.sr = sr;
	}

	public List<Student> getStudents() {
//		return List.of(new Student(9029, "nauQ", "example@gmail.com", LocalDate.of(2004, Month.JANUARY, 4), 21));
		return sr.findAll();
	}

	// Method to save a student.
	public void addNewStudent(Student student) {
		Optional<Student> studentOptional = sr.findStudentByEmail(student.getEmail());
		// Neglect if detected an exists email
		if (studentOptional.isPresent()) {
			throw new IllegalStateException("Email already exists. Skipping register action.");
		}
		// If not, save data of the new student
		sr.save(student);
	}

	// Method to delete a student
	public void deleteStudent(Long studentId) {
		boolean exists = sr.existsById(studentId);
		if (!exists) {
			throw new IllegalStateException("Student with ID: " + studentId + " does not exists.");
		}
		sr.deleteById(studentId);
	}

	// Method to update a student
	@Transactional
	public void updateStudent(Long studentId, String name, String email) {
		Student s = sr.findById(studentId).orElseThrow(() -> new IllegalStateException("Student with ID " + studentId + " does not exists."));
		
		if (name != null && name.length() > 0 && !Objects.equals(s.getName(), name)) {
			s.setName(name);
		}
		
		if (email != null && email.length() > 0 && !Objects.equals(s.getEmail(), email)) {
			Optional<Student> studentOptional = sr.findStudentByEmail(email);
			
			if (studentOptional.isPresent()) {
				throw new IllegalStateException("Email already exists. Skipping delete action.");
			}
			s.setEmail(email);
		}
	}
}
