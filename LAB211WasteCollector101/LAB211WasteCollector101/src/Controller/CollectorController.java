/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Controller;

import Model.CollectorModel;
import View.CollectorView;

/**
 *
 * @author plmin
 */
public class CollectorController {

    private CollectorModel model;
    private CollectorView view;

    public CollectorController(CollectorModel model, CollectorView view) {
        this.model = model;
        this.view = view;
    }

    public void execute() {
        int[] wasteAmount = view.getInputWasteAmount();
        int totalCost = model.calCost(wasteAmount);
        view.displayCost(totalCost);
    }
}
