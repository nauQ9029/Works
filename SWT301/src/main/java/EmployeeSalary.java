public class EmployeeSalary {

    public double calculateSalary(int yearsOfService, double basicSalary, double performanceRating) {
        if (yearsOfService < 0 ||  basicSalary <= 0 || performanceRating < 0 ||  performanceRating > 5){
            throw new IllegalArgumentException("Invalid input values");

        }

        double bonus = 0.0;
        double deduction = 0.0;

        if (yearsOfService > 10) {
            bonus = 0.10 * basicSalary;
        } else if (yearsOfService >= 5) {
            bonus = 0.05 * basicSalary;
        }
        if (performanceRating < 3) {
            deduction = 0.05 * basicSalary;

        }

        return basicSalary + bonus - deduction;
    }
}