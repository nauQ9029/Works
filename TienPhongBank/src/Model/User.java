
package Model;

public class User {
    private String accountNumber;
    private String password;
    

    public User() {
    }

    public User(String accountNumber, String password) {
        this.accountNumber = accountNumber;
        this.password = password;
        
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    
    
}
