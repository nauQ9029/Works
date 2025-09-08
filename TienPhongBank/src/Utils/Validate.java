
package Utils;

import java.util.Random;
import java.util.Scanner;

public class Validate {
    
    Scanner sc = new Scanner(System.in);
    public String checkInputString(String input){
        while(true){
            if(!input.isEmpty()){
                return input;
            } else {
                System.out.println("No empty");
                input = sc.nextLine();
            }
        }
    }
    
     public boolean checkUserName(String userName) {
        if (userName.matches("\\d{10}")) {
            return true; // It's a valid account number
        }
        return false; // It's not a valid account number
    }

 public static boolean checkPassword(String string) {
    // Kiểm tra độ dài của chuỗi
    if (string.length() < 8 || string.length() > 31) {
        return false;
    }

    // Sử dụng biểu thức chính quy để kiểm tra sự tồn tại của chữ số và chữ cái
    if (string.matches(".*\\d.*") && string.matches(".*[a-zA-Z].*")) {
        return true;
    }

    return false;
}

    public String randomCaptcha() {
        // Tạo một chuỗi các ký tự được phép xuất hiện trong captcha
        String characters = "abcdefghijklmnopqrstuvwxyz0123456789";
        int length = 6;

        // Tạo một chuỗi captcha ngẫu nhiên
        Random random = new Random();
        StringBuilder captcha = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            captcha.append(characters.charAt(index));
        }

        return captcha.toString();
    }
}
