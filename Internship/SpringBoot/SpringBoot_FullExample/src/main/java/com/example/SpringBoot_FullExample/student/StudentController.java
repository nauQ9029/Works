package com.example.SpringBoot_FullExample.student;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

//@RestController		// Return JSON or other raw data as the response
@Controller        // Rendering a view
@RequestMapping(path = "/api/v2/student")
public class StudentController {

	private final StudentService studentService;

	@Autowired
	public StudentController(StudentService studentService) {
		this.studentService = studentService;
	}

	@GetMapping
	public String getStudents(Model model) {
		List<Student> students = studentService.getStudents();
		model.addAttribute("students", students);	// Pass the 'students' list to the template
		return "students";	// This will render 'students.html' template
	}

	// Endpoint to add new students (returns no view, you can redirect after processing).
	@PostMapping
//	public String registerNewStudent(@RequestBody Student student) {
	public String registerNewStudent(@RequestParam String name, @RequestParam String email, LocalDate dob) {
		Student student = new Student(name, email, dob);
		studentService.addNewStudent(student);
		return "redirect:/api/v2/student";  // Redirect back to the students list
	}

	// Delete an exists student
	@DeleteMapping(path = "/delete")
	public String deleteStudent(@PathVariable("studentId") Long studentId) {
		studentService.deleteStudent(studentId);
		return "redirect:/api/v2/student";  // Redirect back to the students list after deleting
	}
	
	// Update an exists student
	@PutMapping(path = "update=/update")
	public String updateStudent(
			@PathVariable("studentId") Long studentId,
			@RequestParam(required = false) String name,
			@RequestParam(required = false) String email) {
		studentService.updateStudent(studentId, name, email);
		return "redirect:/api/v2/student";  // Redirect back to the students list after updating
	}
}