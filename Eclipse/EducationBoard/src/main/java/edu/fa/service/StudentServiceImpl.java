package edu.fa.service;

import java.util.List;

import edu.fa.model.Student;
import edu.fa.repository.StudentRepository;
import edu.fa.repository.StudentRepositoryImpl;

public class StudentServiceImpl implements StudenrService {
	private StudentRepository studentRepository = new StudentRepositoryImpl();
	
	@Override
	public List<Student> getAllStudent() {
		return studentRepository.getAllStudent();		
	}
}
