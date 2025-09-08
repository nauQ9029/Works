import org.junit.Assert;
import org.junit.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvFileSource;

public class LoginTest {
    @ParameterizedTest
    @CsvFileSource(resources = "/account.csv", numLinesToSkip = 1)
    public void checkUserAccount(String username, String password, String expected) {
        boolean expec = Boolean.parseBoolean(expected);
        Assert.assertEquals(expec, UserAccount.checkLogin(username, password));
    }

    @ParameterizedTest
    @CsvFileSource(resources = "/acc.csv", numLinesToSkip = 1)
    public void checkIsLoginValid(String username, String password, String expected) {
        boolean expec = Boolean.parseBoolean(expected);
        Assert.assertEquals(expec, UserAccount.isLoginVaild(username, password));
    }
}
