package model;

public class HandleFile {
    
    private String ID, name, location;
    int salary;

    public HandleFile(String ID, String name, String location, int salary) {
        this.ID = ID;
        this.name = name;
        this.location = location;
        this.salary = salary;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getSalary() {
        return salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }
    

    @Override
    public String toString() {
        return ID + "\t" + name + "\t" + location + "\t\t" + salary + "\t";
    }
    
    
    
    
    
    
    
}
