import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvFileSource;
import org.junit.jupiter.params.provider.ValueSource;

public class SampleTest {
    private Sample sam;

    @BeforeEach
    public void setup() {
        sam = new Sample();
    }

    @Test
    public void checkEven() {
        boolean result = sam.isEven(2);
        Assert.assertTrue("Check 2 is even", result);
    }

    @Test
    public void checkPositiveNumber() {
        boolean result = sam.checkPositiveNumber(-5);
        Assert.assertFalse("Check -5 is not positive number", result);
    }

    @ParameterizedTest
    @ValueSource(ints = {1, 3, 5, -15, Integer.MAX_VALUE})
    public void checkOdd(int number) {
        Assert.assertTrue(sam.isOdd(number));
    }

    @ParameterizedTest
    @CsvFileSource(resources = "/even.csv", numLinesToSkip = 1)
    public void checkEvenFromCsv(String input, String expected) {
        int num = Integer.parseInt(input);
        Assert.assertEquals(Boolean.parseBoolean(expected), sam.isEven(num));
    }
}

