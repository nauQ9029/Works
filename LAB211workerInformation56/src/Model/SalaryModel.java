package Model;

import java.util.Date;

public class SalaryModel {

    private String workId;
    private SalaryStatus status;
    private double amount;
    private Date dateSalary;

    public SalaryModel() {

    }

    public SalaryModel(String workId, SalaryStatus status, double amount, Date dateSalary) {
        this.workId = workId;
        this.status = status;
        this.amount = amount;
        this.dateSalary = dateSalary;
    }

    public String getWorkId() {
        return workId;
    }

    public void setWorkId(String workId) {
        this.workId = workId;
    }

    public SalaryStatus getStatus() {
        return status;
    }

    public void setStatus(SalaryStatus status) {
        this.status = status;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Date getDateSalary() {
        return dateSalary;
    }

    public void setDateSalary(Date dateSalary) {
        this.dateSalary = dateSalary;
    }

    // Method to determine status based on salary adjustment
    public String determineStatus() {
        return status == SalaryStatus.UP ? "UP" : "DOWN";
    }
}
