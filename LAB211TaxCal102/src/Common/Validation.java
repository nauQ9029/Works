/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Common;

import java.util.List;

/**
 *
 * @author plmin
 */
public class Validation {
    public boolean validateInput(double totalIncome, int numChildren, List<Integer> childAge, List<Boolean> childStudyingStatus, int numSibling, List<Integer> parentAge) {
        // Validate total income, number of children, child ages, number of siblings, and parent ages
        if (totalIncome <= 0 || numChildren < 0 || numSibling < 0) {
            return false;
        }

        for (int age : childAge) {
            if (age <= 0) {
                return false;
            }
        }

        for (int age : parentAge) {
            if (age <= 0) {
                return false;
            }
        }

        return true;
    }
}
