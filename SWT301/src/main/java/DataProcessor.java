import java.io.BufferedWriter;
import java.io.IOException;

public class DataProcessor {
    private int dataCount = 0;                  // Logic 3: dataCount == 0 will be always be called in initializeProcess()
                                                // Logic 3: Field 'dataCount' may be 'final'
    private boolean isProcessing;   // Field can be converted to a local variable
    private BufferedWriter writer;

    public void initializeProcess() {   // Rename this method name to match the regular expression '^[a-z][a-zA-Z0-9]*$'.
        isProcessing = true;                            // Logic 1
        if (dataCount == 0 || isProcessing == false) {  // Logic 1: Remove this expression which always evaluates to "false"
            System.out.println("No data to process.");
        }
    }

    public void writeData(String data) {
        if (data != null || data.isEmpty()) {               // Logic 2: checking data can only be null OR empty, no AND
                                                            // Logic 2: Method invocation 'isEmpty' will produce 'NullPointerException'
            return;
        } try {
            writer.write(data);  // Argument 'data' might be null
            dataCount++;
        } catch (IOException e) {
            System.out.println("Error writing data: " + e.getMessage());
        }
    }

    public void closeWriter() {
        try {
            writer.close();
        } catch (IOException e) {
            System.out.println("Error closing data: " + e.getMessage());
        }
    }

    public void processAllData() {
        initializeProcess();                    // Rename this method name to match the regular expression '^[a-z][a-zA-Z0-9]*$'.
        if (dataCount > 100) {
            System.out.println("Processing too much data.");
            return;                             // 'return' is unnecessary as the last statement in a 'void' method - Remove this redundant jump
        }
    }

    public void shutdown()  {
        writer = null;
    }
}
