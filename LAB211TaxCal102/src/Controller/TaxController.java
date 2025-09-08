/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Controller;

import Common.Validation;
import Model.Tax;
import View.TaxView;
import java.util.List;

/**
 *
 * @author plmin
 */
public class TaxController {

    private TaxView view;
    private Validation validation;

    public TaxController(TaxView view) {
        this.view = view;
        this.validation = new Validation();
    }

    public void calTax(double totalIncome, int numChildren, List<Integer> childAge, List<Boolean> childStudyingStatus, int numSibling, List<Integer> parentAge) {
        if (validation.validateInput(totalIncome, numChildren, childAge, childStudyingStatus, numSibling, parentAge)) {
            Tax model = new Tax(totalIncome, numChildren, childAge, childStudyingStatus, numSibling, parentAge);
            double taxAmount = model.calTax();
            view.display(taxAmount);
        } else {
            System.out.println("Invalid input.");
        }
    }

    public void execute() {
        view.getInputAndCal();
    }
}
