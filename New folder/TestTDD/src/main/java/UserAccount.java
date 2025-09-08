public class UserAccount {
    private static final String patternUsername = "^([a-zA-Z0-9]([._]?[a-zA-Z0-9]+){2,15}|[a-zA-Z0-9._]+@gmail\\.com)$";
    private static final String patternPassword = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";

    public static boolean checkLogin(String username, String password) {
        boolean result = checkUsername(username) && checkPassword(password);
        return result;
    }

    public static boolean checkUsername(String username) {
        boolean result = username.matches(patternUsername);
        return result;
    }

    public static boolean checkPassword(String username) {
        boolean result = username.matches(patternPassword);
        return result;
    }

    public static boolean isLoginVaild(String username, String password) {
        if(username == null || username.isEmpty() || password == null || password.isEmpty()) {
            return false;
        } else return username.equals("admin") && password.equals("12345");
    }
}
// ^[a-zA-Z0-9]([._]?[a-zA-Z0-9]+){2,15}$
// + Chỉ chứa các chữ cái (a-z, A-Z), số (0-9), dấu gạch dưới (_), hoặc dấu chấm (.).
// + Bắt đầu và kết thúc bằng chữ cái hoặc số.
// + Độ dài từ 3 đến 16 ký tự.

// ^([a-zA-Z0-9]([._]?[a-zA-Z0-9]+){2,15}|[a-zA-Z0-9._]+@gmail\.com)$
// + Điều kiện ban đầu + có thể là gmail

// ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$
// Phải có ít nhất một chữ cái in hoa.
// Phải có ít nhất một chữ cái in thường.
// Phải có ít nhất một chữ số.
// Phải có ít nhất một ký tự đặc biệt (như @, #, $, %, !, v.v.).
// Độ dài tối thiểu là 8 ký tự.

// Cú pháp (?=...)
//   (?=...): Đây là một lookahead khẳng định rằng những gì nằm trong dấu ngoặc () phải tồn tại phía sau,
//  nhưng không tiêu thụ bất kỳ ký tự nào. Nó chỉ kiểm tra sự tồn tại của mẫu mà không di chuyển con trỏ kiểm tra trong chuỗi.
// Ví dụ: (?=.*[A-Z])
//    .*: Đây là ký tự đại diện cho bất kỳ chuỗi ký tự nào, kể cả chuỗi rỗng. Nó cho phép lookahead tìm kiếm trên toàn bộ chuỗi.
//    [A-Z]: Biểu thức này yêu cầu có ít nhất một chữ cái in hoa từ A đến Z.
// Tóm lại, (?=.*[A-Z]) có nghĩa là:
//     Tìm kiếm bất kỳ đâu trong chuỗi (kể cả phần đầu hoặc cuối chuỗi) và đảm bảo rằng có ít nhất một ký tự là chữ cái in hoa.
//     Nếu không có chữ cái in hoa, chuỗi sẽ không khớp với biểu thức regex.
