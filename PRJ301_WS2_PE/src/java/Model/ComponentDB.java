package Model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

package Model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class ComponentDB implements DatabaseInfo {

    public static Connection getConnect() {
        try {
            Class.forName(DRIVERNAME);
        } catch (ClassNotFoundException e) {
            System.out.println("Error loading driver: " + e);
        }
        try {
            Connection con = DriverManager.getConnection(DBURL, USERDB, PASSDB);
            return con;
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }
        return null;
    }

    public static List<Component> listAllComponents() {
        List<Component> components = new ArrayList<>();
        try (Connection c = getConnect()) {
            PreparedStatement statement = c.prepareStatement("SELECT * FROM DE180583");
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                String id = resultSet.getString("id");
                String product = resultSet.getString("product");
                String brand = resultSet.getString("brand");
                Component component = new Component(id, product, brand);
                components.add(component);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return components;
    }


    public static void main(String[] args) {
        List<Component> components = ComponentDB.listAllComponents();
        for (Component component : components) {
            System.out.println(component);
        }
    }
}