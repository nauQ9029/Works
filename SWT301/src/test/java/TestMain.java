import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class TestMain {

//    @Test
//    public void testThrowException() {
//
//    }
//
//    @Test
//    public void testExpectedResult() {
//
//    }
//
//    @Test
//    public void tesUnExpectedResult() {
//
//    }

    // Test for invalid input values
    // Test Exception

    @Test
    public void TestException1() {
        EmployeeSalary e = new EmployeeSalary();
        Assertions.assertThrows(IllegalArgumentException.class, () -> {
            e.calculateSalary(-1, 1000, 5);
        });
    }

    @Test
    public void TestException2() {
        EmployeeSalary e = new EmployeeSalary();
        Assertions.assertThrows(IllegalArgumentException.class, () -> {
            e.calculateSalary(5, 0, 5);
        });
    }

    @Test
    public void TestException3() {
        EmployeeSalary e = new EmployeeSalary();
        Assertions.assertThrows(IllegalArgumentException.class, () -> {
            e.calculateSalary(5, -1, 5);
        });
    }

    @Test
    public void TestException4() {
        EmployeeSalary e = new EmployeeSalary();
        Assertions.assertThrows(IllegalArgumentException.class, () -> {
            e.calculateSalary(5, 1000, 6);
        });
    }

    @Test
    public void TestException5() {
        EmployeeSalary e = new EmployeeSalary();
        Assertions.assertThrows(IllegalArgumentException.class, () -> {
            e.calculateSalary(5, 1000, -1);
        });
    }

    // Test hop le
    // Year of Service (YOS) > 10
    @Test
    public void TestYOSGreaterThan10ANDPGreaterThan5() {
        EmployeeSalary e = new EmployeeSalary();
        Assertions.assertEquals(1100, e.calculateSalary(11, 1000, 5));
    }

    // Year of Service (YOS) from 10-5
    @Test
    public void TestYOSSmallerThan10ANDPGreaterThan5() {
        EmployeeSalary e = new EmployeeSalary();
        Assertions.assertEquals(1050, e.calculateSalary(10, 1000, 5));
    }

    @Test
    public void TestYOSSmallerThan10ANDPEqualsTo5() {
        EmployeeSalary e = new EmployeeSalary();
        Assertions.assertEquals(1050, e.calculateSalary(5, 1000, 5));
    }

    // PerformanceRating (PR) < 3
    @Test
    public void TestPRSmallerThan3() {
        EmployeeSalary e = new EmployeeSalary();
        Assertions.assertEquals(1000, e.calculateSalary(5, 1000, 2));
    }

    // PerformanceRating (PR) >= 3
    @Test
    public void TestPRGreaterThan3() {
        EmployeeSalary e = new EmployeeSalary();
        Assertions.assertEquals(1050, e.calculateSalary(5, 1000, 4));
    }

    @Test
    public void TestPREqualsTo3() {
        EmployeeSalary e = new EmployeeSalary();
        Assertions.assertEquals(1050, e.calculateSalary(5, 1000, 3));
    }
}
