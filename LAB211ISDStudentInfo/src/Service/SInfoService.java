/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Service;

import Model.Student;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

/**
 *
 * @author plmin
 */
public class SInfoService {

    public List<Student> sortStudent(List<Student> students) {
        Collections.sort(students, new StudentComparator());                    // Sort allStudent list
        return students;
    }

    // Comparision method used for sorting
    private class StudentComparator implements Comparator<Student> {            

        @Override
        public int compare(Student s1, Student s2) {
            return s1.getName().compareTo(s2.getName());
        }
    }
}
