/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Common;

import java.text.ParseException;
import java.text.SimpleDateFormat;

/**
 *
 * @author plmin
 */
public class Validation {

    // Information must be valid date in the format dd-MM-yyyy.
    public boolean isValidDate(String date) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        dateFormat.setLenient(false);
        try {
            dateFormat.parse(date);
            return true;
        } catch (ParseException e) {
            return false;
        }
    }

    // Plan From must be less than Plan To and within 8 h-17 h 30 > 8.0, 8.5, 9.0, ⇔ 9.5 ...-> 17.5
    public boolean isValidTime(Double planFrom, double planTo) {
        return planFrom < planTo && planFrom >= 8.0 && planTo <= 17 / .5;
    }

    // Check the TaskTypeID must exist (1-4)
    public boolean isValidTaskTypeID(int taskTypeID) {
        return taskTypeID >= 1 && taskTypeID <= 4;
    }
}
