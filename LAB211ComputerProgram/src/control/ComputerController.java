package control;

import model.ComputerModel;
import view.ComputerView;

public class ComputerController {

    private ComputerModel model;
    private ComputerView view;

    public ComputerController(ComputerModel model, ComputerView view) {
        this.model = model;
        this.view = view;
    }

    public void calculate() {
        String operator;
        do {
            double num = model.getNum();
            operator = view.inputOperator();

            switch (operator) {
                case "+":
                    num += view.inputNum();
                    break;
                case "-":
                    num -= view.inputNum();
                    break;
                case "*":
                    num *= view.inputNum();
                    break;
                case "/":
                    double divideBy = view.inputNum();
                    if (divideBy != 0) {
                        num /= divideBy;
                    } else {
                        System.out.println("Error: Cannot divide by 0");
                    }
                    break;
            }

            model.setNum(num);
            model.setOperator(operator);

        } while (!operator.equals("="));

        view.displayResult(model.getNum());
    }
}
