import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.Assert;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvFileSource;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class CalculatorTest {
//    @Test
//    public void addTest() {
////        Calculator c = new Calculator();
//        int kq = Calculator.add(1, 1);
//        Assert.assertEquals(2,kq);
//    }
    Calculator c;
    @BeforeEach
    public void setup() {
        c = new Calculator();
    }
    @Test
    public void checkEven() {
        boolean kq = c.isEven(6);
//        Assert.assertEquals("check 6 is even", true, kq);
        assertTrue(kq);
    }

    @Test
    public void checkPositiveNumber() {
        boolean kq = c.isEven(-11);
        Assert.assertEquals(false, kq);
    }

    @ParameterizedTest
    @ValueSource(ints = {2, 10, 4, 16, Integer.MAX_VALUE - 1}) // six numbers
    void isOdd_ShouldReturnTrueForOddNumbers(int number) {
//        assertTrue(c.isEven(number));                         // để hiển thị rõ kết quả
        boolean kq = c.isEven(number);
        Assert.assertEquals(true, kq);                  // xem kết quả thực tế
    }

    @ParameterizedTest
    @CsvFileSource(resources = "/even.csv", numLinesToSkip = 1)
    public void checkEvenFromCSVFile(String input, String expected) {
        int number = Integer.parseInt(input);                   // chuyển String sang int
        boolean actual = c.isEven(number);
        boolean ex = Boolean.parseBoolean(expected);
        Assert.assertEquals(ex, actual);
    }

//    tạo 1 lớp UserAccount bao gồm: user, pass
//    Test chức năng đăng nhập, lấy dữ liệu từ CSV: mỗi dòng trong file này là 1 test case
//    admin,  12345
//    admin,  null
//    null, 12345
//    null, null

//    can co 3 cot: user, pass, expected

    @ParameterizedTest
    @CsvFileSource(resources = "/login.csv", numLinesToSkip = 1)
    public void checkLogin(String user, String pass) {
        UserAccount a = new UserAccount("admin", "12345");

        boolean expectedResult = "admin".equals(user) && "12345".equals(pass);

        assertEquals(expectedResult, a.login(user, pass));
    }

}
