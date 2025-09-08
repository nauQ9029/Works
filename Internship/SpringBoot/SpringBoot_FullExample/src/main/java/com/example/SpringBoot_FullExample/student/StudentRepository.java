
/*
 * Purpose: 
 * - This interface will allow you to perform CRUD operations on the
 * students table without writing SQL queries.
 */
package com.example.SpringBoot_FullExample.student;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/* Specify 2 things: 
 * - T (Type) of the object for this repository to work with.
 * - ID for the type that we want (in model class).
 */
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
	
	// Transfer this to SQL: SELEC * FROM student WHERE email = ?
	@Query("SELECT s FROM Student s WHERE s.email = ?1")
	Optional<Student> findStudentByEmail(String email);
}