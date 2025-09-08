/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Controller;

import Model.Format;
import View.FormatView;

/**
 *
 * @author plmin
 */
public class FormatController {

    private Format formatModel;
    private FormatView formatView;

    public FormatController(Format formatModel, FormatView formatView) {
        this.formatModel = formatModel;
        this.formatView = formatView;
    }

    public void execute() {
        String phone, mail, date;
        formatView.menu();
        
        while (true) {
            phone = formatView.getPhoneInput();
            String phoneError = formatModel.checkPhone(phone);
            if (phoneError.isEmpty()) {
                break;                                                          // Exit loop if phone number format is correct
            } else {
                formatView.displayMessage(phoneError);
            }
        }

        while (true) {
            mail = formatView.getMailInput();
            String emailError = formatModel.checkMail(mail);
            if (emailError.isEmpty()) {
                break;
            } else {
                formatView.displayMessage(emailError);
            }
        }

        while (true) {
            date = formatView.getDateInput();
            String dateError = formatModel.checkDate(date);
            if (dateError.isEmpty()) {
                break;
            } else {
                formatView.displayMessage(dateError);
            }
        }
        formatView.closeScanner();
    }
}
