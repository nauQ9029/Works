public class UserAccount {

    private String user;
    private String pass;

    public UserAccount(String pass) { }

    public UserAccount(String user, String pass) {
        this.user = user;
        this.pass = pass;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public boolean login(String user, String pass) {
        if (this.user == null || this.pass == null) {
            return false;
        } else {
            return this.user.equals("admin") && this.pass.equals("12345");
        }
    }
}
