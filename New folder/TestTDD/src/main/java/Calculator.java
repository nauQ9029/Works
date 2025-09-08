import java.util.logging.Logger;

public class Calculator {
    public static int add(int a, int b) {
        return a + b;
    }

    public static boolean isEvent(int a) {
        return a%2 == 0;
    }

    public static int performOperation(int number1, int number2, String operation) {
        Logger logger = Logger.getLogger(Calculator.class.getName());
        int result = 0;
        if (operation == null) {
            logger.warning("Error, operation cannot be null");
            return result;
        }
        switch (operation) {
            case "add":
                result = number1 + number2;
                logger.info("Add result: " + result);
                return result;
            case "sub":
                result = number1 - number2;
                logger.info("Subtract result: " + result);
                return result;
            case "multi":
                result = number1 * number2;
                logger.info("Multi result: " + result);
                return result;
            case "divide":
                if(number2 != 0) {
                    result = number1 * number2;
                    logger.info("Division result: " + result);
                }
                logger.info("Error: Division by zero is not allowed");
                return result;
            default:
                logger.warning("Error: unsupported operation");
                return result;
        }
    }
}
