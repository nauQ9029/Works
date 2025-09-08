package model;

public class Worker {
    private String ID, name, workLocation, status;
    private int age, salary;

    public Worker(String ID, String name, int age, int salary, String workLocation) {
        this.ID = ID;
        this.name = name;
        this.age = age;
        this.salary = salary;
        this.workLocation = workLocation;
    }

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getSalary() {
        return salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }


    public String getWorkLocation() {
        return workLocation;
    }

    public void setWorkLocation(String workLocation) {
        this.workLocation = workLocation;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    


    @Override
    public String toString() {
        return ID + "      " + name + "      " + age + "      " + salary + "       " + "      " + status + "           " + workLocation + "             " + (2024-age);
    }
    
}
