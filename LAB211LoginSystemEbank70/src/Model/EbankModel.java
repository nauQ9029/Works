/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

import java.util.Locale;
import java.util.Random;
import java.util.ResourceBundle;
import java.util.regex.Pattern;

/**
 *
 * @author plmin
 */
public class EbankModel {

    private ResourceBundle languageBundle;
    private ResourceBundle resourceBundle;

    public EbankModel() {
        setLocale(Locale.getDefault()); // Set default locale
    }

    public void setLocale(Locale locale) {
        resourceBundle = ResourceBundle.getBundle("Messages", locale);
        languageBundle = ResourceBundle.getBundle("Messages", locale); // Load language bundle
    }

    public String getMessage(String key) {
        return resourceBundle.getString(key);
    }

    public String checkAccountNumber(String accountNumber) {
        String pattern = "\\d{10}";
        if (Pattern.matches(pattern, accountNumber)) {
            return languageBundle.getString("valid_account_number_message");
        } else {
            return languageBundle.getString("invalid_account_number_message");
        }
    }

    public String checkPassword(String password) {
        String pattern = "^(?=.*[0-9])(?=.*[a-zA-Z])(?=\\S+$).{8,}$";
        if (Pattern.matches(pattern, password)) {
            return languageBundle.getString("valid_password_message");
        } else {
            return languageBundle.getString("invalid_password_message");
        }
    }

    public String generateCaptcha() {
        int captchaLength = 5;
        String captchaChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder captcha = new StringBuilder();
        for (int i = 0; i < captchaLength; i++) {
            int index = (int) (Math.random() * captchaChars.length());
            captcha.append(captchaChars.charAt(index));
        }
        return captcha.toString();
    }

    public String checkCaptcha(String captchaInput, String captchaGenerated) {
        if (captchaInput.equals(captchaGenerated)) {
            return languageBundle.getString("valid_captcha_message");
        } else {
            return languageBundle.getString("invalid_captcha_message");
        }
    }
}