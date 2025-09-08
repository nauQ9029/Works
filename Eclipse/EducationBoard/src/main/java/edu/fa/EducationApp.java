package edu.fa;

import java.util.List;

import edu.fa.model.Student;
import edu.fa.service.StudenrService;
import edu.fa.service.StudentServiceImpl;

public class EducationApp {

	public static void main(String[] args) {
		StudenrService studentService = new StudentServiceImpl();
		List<Student> studentList = studentService.getAllStudent();
		System.out.println(studentList.size());
		Student student = studentList.get(0);
		System.out.println(student);
	}
}
