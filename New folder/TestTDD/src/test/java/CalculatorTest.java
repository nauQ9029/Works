import org.junit.Assert;
import org.junit.Test;

public class CalculatorTest {
    @Test
    public void addTest() {
        int result = Calculator.add(1, 5);
        Assert.assertEquals(6, result);
    }

    @Test
    public void testEven() {
        boolean result = Calculator.isEvent(4);
        Assert.assertTrue(result);
    }
}