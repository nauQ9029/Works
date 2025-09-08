
package Utils;

import java.util.Scanner;

public class Inputter {
    
    Validate v = new Validate();
    public String inputString(String msg) {
        do {
            try {
                System.out.println(msg);
                String input = new Scanner(System.in).nextLine();
                return v.checkInputString(input);
            } catch (IllegalArgumentException e) {
                System.err.println(e.getMessage());
            }
        } while (true);
    }
    
     private String getInput(String promt) {
        Scanner sc = new Scanner(System.in);
        System.out.println(promt);
        return sc.nextLine();
    }

    
    
}
