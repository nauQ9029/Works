
package Controller;

import Model.User;
import View.Menu;
import View.TPBankView;
import java.util.ArrayList;
import java.util.Locale;

public class BankManagement extends Menu{
    
    private ArrayList<User> dataUser;
    
    TPBankView tpv = new TPBankView();
    public BankManagement(){
        super("----Login program----", new String[]{"Vietnamese", "English", "Exit"});
        dataUser = new ArrayList<>();
    }

    @Override
    public void execute(int choice) {
        
        Locale vietnam = new Locale("MessageBundle_vn_ID");
        Locale english = new Locale("MessageBundle_en_US");
        switch(choice){
             case 1:
                tpv.logIn(dataUser, vietnam);
                break;
            case 2:
                tpv.logIn(dataUser, english);
                break;
            case 3:
                break;
            default:
                System.out.println("Wrong input!");
        }
    }
    
    public static void main(String[] args) {
     
        BankManagement bm = new BankManagement();
        bm.run();
    }
    
}
