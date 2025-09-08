/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Controller;

import Model.Child;
import Model.Income;
import Model.Parent;
import Model.Person;

/**
 *
 * @author lethienacqt
 */
public class TaxCalculator {
    public static double calculateTaxableIncome(Person person) {
        double totalIncome = 0;
        double deductionForChildren = 0;
        double deductionForParents = 0;
        
        // Calculate total income
        for (Income income : person.getIncomes()) {
            totalIncome += income.getAmount();
        }
        
        // Calculate deduction for children
        for (Child child : person.getChildren()) {
            if (child.getAge() < 18 || (child.getAge() >= 18 && child.isStudying() && child.getAge() <= 22)) {
                deductionForChildren += (child.getAge() < 18 ? 4400000 : 6000000);
            }
        }
        
        // Calculate deduction for parents
        for (Parent parent : person.getParents()) {
            if (parent.getAge() >= 60) {
                deductionForParents += 4400000;
            }
        }
        
        double taxableIncome = totalIncome - 11000000 - deductionForChildren - deductionForParents;
        return taxableIncome > 0 ? taxableIncome : 0;
    }
    
    public static double calculateTax(double taxableIncome) {
        double tax;
        if (taxableIncome <= 4000000) {
            tax = taxableIncome * 0.05;
        } else if (taxableIncome <= 6000000) {
            tax = 200000 + (taxableIncome - 4000000) * 0.1;
        } else if (taxableIncome <= 10000000) {
            tax = 400000 + (taxableIncome - 6000000) * 0.15;
        } else {
            tax = 1000000 + (taxableIncome - 10000000) * 0.2;
        }
        return tax;
    }
}