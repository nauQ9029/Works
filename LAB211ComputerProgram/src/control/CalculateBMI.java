package control;

import model.BMI;
import view.ComputerView;

public class CalculateBMI {

    private BMI bmi;
    private ComputerView view;

    public CalculateBMI(ComputerView view) {
        this.bmi = new BMI(0, 0); // Initialize with default values
        this.view = view;
    }

    public void calculateBMI() {
        double height = view.inputHeightBMI();
        double weight = view.inputWeightBMI();

        bmi.setHeight(height);
        bmi.setWeight(weight);

        double bmiValue = weight / Math.pow(height / 100, 2);
        System.out.println("BMI: " + bmiValue);

        displayBMIStatus(bmiValue);
    }

    private void displayBMIStatus(double bmiValue) {
        if (bmiValue < 19) {
            System.out.println("Under-standard: BMI is less than 19");
        } else if (bmiValue >= 19 && bmiValue <= 25) {
            System.out.println("Standard: BMI is between 19-25");
        } else if (bmiValue > 25 && bmiValue <= 30) {
            System.out.println("Overweight: BMI is between 25-30");
        } else if (bmiValue > 30 && bmiValue <= 40) {
            System.out.println("Fat - should lose weight: BMI is between 30-40");
        } else {
            System.out.println("Very fat - should lose weight immediately: BMI is over 40");
        }
    }
}
