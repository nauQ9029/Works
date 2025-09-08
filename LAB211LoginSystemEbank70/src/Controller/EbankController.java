/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Controller;

import Common.Validation;
import Model.EbankModel;
import View.EbankView;
import java.util.Locale;
import java.util.Scanner;

/**
 *
 * @author plmin
 */
public class EbankController {

    private EbankView view;
    private EbankModel model;
    private Scanner scanner;

    public EbankController(EbankView view, EbankModel model, Scanner scanner) {
        this.view = view;
        this.model = model;
        this.scanner = scanner;
    }

    public void execute() {
        int choice;
        do {
            view.languageChoice();
            choice = getUserOption();
            processInput(choice);
        } while (choice != 0);
    }

    private int getUserOption() {
        return scanner.nextInt();
    }

    public void processInput(int choice) {
        switch (choice) {
            case 1:
                model.setLocale(new Locale("vi", "VI")); // Set locale to Vietnamese
                System.out.println(model.getMessage("language_selected"));
                VNEbank();
                break;
            case 2:
                model.setLocale(Locale.ENGLISH); // Set locale to English
                System.out.println(model.getMessage("language_selected"));
                ENEbank();
                break;
            case 3:
                System.exit(0);
                break;
            default:
                System.out.println(model.getMessage("invalid_choice"));
        }
    }

    private void VNEbank() {
        String accountNo = view.getInput("So tai khoan: ");
        checkAccountNumber(accountNo);

        String password = view.getInput("Mat khau: ");
        checkPassword(password);

        String captcha = model.generateCaptcha();
        view.displayMessage("Captcha: " + captcha);
        String captchaInput = view.getInput("Nhap 1 ky tu captcha: ");
        checkCaptcha(captchaInput, captcha);

    }

    private void ENEbank() {
        String accountNo = view.getInput("Account number: ");
        checkAccountNumber(accountNo);
        
        String password = view.getInput("Password: ");
        checkPassword(password);
        
        String captcha = model.generateCaptcha();
        view.displayMessage("Captcha: " +captcha);
        String captchaInput = view.getInput("Enter 1 character from captcha: ");
        checkCaptcha(captchaInput, captcha);
    }

    private void checkAccountNumber(String accountNumber) {
        String message = model.checkAccountNumber(accountNumber);
        view.displayMessage(message);
    }

    private void checkPassword(String password) {
        String message = model.checkPassword(password);
        view.displayMessage(message);
    }

    private void checkCaptcha(String captchaInput, String generatedCaptcha) {
        if (captchaInput.length() == 1 && generatedCaptcha.contains(captchaInput)) {
            view.displayMessage("Captcha input is valid.");
        } else {
            view.displayMessage("Captcha input is invalid.");
        }
    }
}
