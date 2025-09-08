/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Pattern;

/**
 *
 * @author plmin
 */
public class Format {

    private String phone;
    private String mail;
    private String date;

    public Format() {

    }

    public Format(String phone, String mail, String date) {
        this.phone = phone;
        this.mail = mail;
        this.date = date;
    }

    public String checkPhone(String phone) {
        if (!Pattern.matches("\\d{10}", phone)) {                               // Checking the input phone must be 10 digits
            return "Phone number must be 10 digits";
        } else {
            if (Pattern.matches("[a-z]", phone)) {                             // Checking the input phone is contain alphabetic character
                return "Phone number must be number";
            }
        }
        return "";                                                              // Return empty String if no issue with the checking state
    }

    public String checkMail(String mail) {
        // characters + @ + chracters + . + TLD atleast 2 characters (.com)
        if (!Pattern.matches("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", mail)) {
            return "Email must be correct format";
        }
        return "";                                                              // Return empty String if no issue with the check (no error)
    }

    public String checkDate(String date) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        dateFormat.setLenient(false);                                           // Enforce strict date parsing by setLenient(false)

        try {
            Date parsedDate = dateFormat.parse(date);
            if (!date.equals(dateFormat.format(parsedDate))) {                   // Checking the input date and the formatted date
                return "Date to correct format(dd/MM/yyyy)";
            }
            return "";                                                          // Return empty String if no issue with the check (no error)
        } catch (ParseException e) {
            return "Date to correct format(dd/MM/yyyy)";
        }
    }
}
