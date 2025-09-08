
package View;

import Model.User;
import Utils.Inputter;
import Utils.Validate;
import java.util.ArrayList;
import java.util.Locale;
import java.util.ResourceBundle;

public class TPBankView {
    
    Inputter ip = new Inputter();
    Validate valid = new Validate();
    
    public String getWordLanguage(Locale language, String text) {
        ResourceBundle bundle = ResourceBundle.getBundle("language/" + language, language);
        String value = bundle.getString(text);
        return value;

    }

    public void logIn(ArrayList<User> dataUser, Locale language) {
        int countWrong = 0;
        String userName;
        do {
            userName = ip.inputString(getWordLanguage(language, "EnterUser"));

            if (!valid.checkUserName(userName)) {
                System.out.println(getWordLanguage(language, "NoticeWrongUser"));
            }
        } while (!valid.checkUserName(userName));
        String passWord;
        do {
            passWord = ip.inputString(getWordLanguage(language, "EnterPassword"));
            if (!valid.checkPassword(passWord)) {
                countWrong++;

                if (countWrong >= 3) {
                    capchar(language);
                    countWrong = 0;
                } else {
                    System.out.println(getWordLanguage(language, "NoticeWrongPass"));
                }
            }

        } while (!valid.checkPassword(passWord));
        dataUser.add(new User(userName, passWord));
        System.out.println(getWordLanguage(language, "NoticeSignIn"));
    }

    public void capchar(Locale language) {
        String captcha, input;

        do {
            captcha = valid.randomCaptcha();
            System.out.println(getWordLanguage(language, "CaptchaIncorrect") + ": " + captcha);
            input = ip.inputString(getWordLanguage(language, "EnterCap"));

            if (!input.equals(captcha)) {
                System.out.println(getWordLanguage(language, "CaptchaIncorrectNoctice"));
            }
        } while (!input.equals(captcha));
    }
    
    
}
