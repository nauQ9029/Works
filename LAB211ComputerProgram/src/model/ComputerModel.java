package model;

public class ComputerModel {
    private double num;
    private String operator;

    public ComputerModel(double num, String operator) {
        this.num = num;
        this.operator = operator;
    }

    public double getNum() {
        return num;
    }

    public void setNum(double num) {
        this.num = num;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }
}
