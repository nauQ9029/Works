/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

import java.util.List;

/**
 *
 * @author plmin
 */
public class Tax {
    
    private double totalIncome;
    private int numChildren;
    private List<Integer> childAge;
    private List<Boolean> childStudyingStatus;
    private int numSibling;
    private List<Integer> parentAge;

    public Tax(double totalIncome, int numChildren, List<Integer> childAge, List<Boolean> childStudyingStatus, int numSibling, List<Integer> parentAge) {
        this.totalIncome = totalIncome;
        this.numChildren = numChildren;
        this.childAge = childAge;
        this.childStudyingStatus = childStudyingStatus;
        this.numSibling = numSibling;
        this.parentAge = parentAge;
    }
    
    public double calTax() {
        double deduction = calDeduction();
        double taxableIncome = totalIncome - deduction;
        return calTaxAmount(taxableIncome);
    }
    
   
    private double calDeduction() {
        // Deduction for self
        double totalDeduction = Math.min(totalIncome, 11000000);
        
        int childDeduction = 0;
        for(int age : childAge) {
            if (age <= 18) {
                childDeduction += Math.min(4400000, age > 18 ? 0 : 6000000);
            }
        }
        totalDeduction += Math.min(childDeduction, 2 * 4400000);                // Deduction for supporting children
        
        //Deduction for supporting parents
        if (!parentAge.isEmpty()) {
            int eligibleParentCount  = 0;
            double parentDeduction = 0;
            for(int age : parentAge) {
                if (age > 60 || (age > 55 && age <= 60)) {
                    eligibleParentCount++;
                }
            }
            if (eligibleParentCount > 0) {
                parentDeduction = Math.min(4400000 * eligibleParentCount, totalIncome - 4000000);
                totalDeduction += parentDeduction / parentAge.size();
            }
        }
        return totalDeduction;
    }
    
    private double calTaxAmount(double taxableIncome) {
        if (taxableIncome <= 2000000) {
            return 0;
        } else if (taxableIncome <= 4000000) {
            return (taxableIncome - 2000000) * 0.05;
        } else if (taxableIncome <= 6000000) {
            return 100000 * 0.05 + (taxableIncome - 4000000) * 0.06;
        } else if (taxableIncome <= 10000000) {
            return 100000 * 0.05 + 200000 * 0.06 + (taxableIncome - 6000000) * 0.1;
        } else {
            return 100000 * 0.05 + 200000 * 0.06 + 400000 * 0.1 + (taxableIncome - 10000000) * 0.2;
        }
    }
}
