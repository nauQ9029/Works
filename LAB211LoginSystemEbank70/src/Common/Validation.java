/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Common;

import java.util.regex.Pattern;

/**
 *
 * @author plmin
 */
public class Validation {

    public boolean isValidAccountNumber(String accountNumber) {
        String pattern = "\\d{10}";
        return Pattern.matches(pattern, accountNumber);
    }

    public boolean isValidPassword(String password) {
        String pattern = "^(?=.*[0-9])(?=.*[a-zA-Z])(?=\\S+$).{8,}$";
        return Pattern.matches(pattern, password);
    }
}
