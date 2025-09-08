package edu.fa.repository;

import java.util.ArrayList;
import java.util.List;

import edu.fa.model.Student;

public class StudentRepositoryImpl implements StudentRepository {
	public List<Student> getAllStudent() {
		List<Student> studentList = new ArrayList<>();
		studentList.add(new Student("nauQ", "DN"));
		return studentList;
	}
}
