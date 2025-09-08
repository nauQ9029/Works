package control;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.Scanner;
import model.Worker;
import view.WorkerView;

public class WorkerControl {

    ArrayList<Worker> workerList = new ArrayList<>();
    Scanner sc = new Scanner(System.in);

    public void loadData() {
        try {
            BufferedReader br = new BufferedReader(new FileReader("worker.txt"));
            String line;
            while ((line = br.readLine()) != null) {
                String[] space = line.split("   ");
                if (space.length == 5) {
                    workerList.add(new Worker(space[0], space[1], Integer.parseInt(space[2]), Integer.parseInt(space[3]), space[4]));
                }
            }
            br.close();
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    public void display() {
        System.out.println("ID     Name    Age    Salary        Status    Worker Location    year of birth");
        for (Worker worker : workerList) {
            System.out.println(worker.toString());
            WorkerView view = new WorkerView();
            view.getStatus();
        }
    }

    public void saveWorker(ArrayList<Worker> ar) {
        try {
            BufferedWriter bw = new BufferedWriter(new FileWriter("worker.txt"));
            for (Worker worker : ar)
                bw.write(worker.toString() + "\n");
            bw.close();
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    public void addWorker() {
        System.out.println("Input your ID: ");
        String ID = sc.next();
        System.out.println("Input your name: ");
        String name = sc.next();
        int age;
        do {
            System.out.println("Input your age (must be in range 18 to 50): ");
            age = sc.nextInt();
        } while (age < 18 || age > 50);

        int salary;
        do {
            System.out.println("Input salary (must be greater than or equal to 0): ");
            salary = sc.nextInt();
        } while (salary < 0);

        System.out.println("Input your work location: ");
        String workLocation = sc.next();
        workerList.add(new Worker(ID, name, age, salary, workLocation));
        saveWorker(workerList);
    }

    public void increaseSalary(String ID) {
    for (Worker worker : workerList) {
        if (worker.getID().equals(ID)) {
            int increase;
            do {
                System.out.println("Enter Salary (must be > 0): ");
                increase = sc.nextInt();
            } while (increase <= 0);

            worker.setSalary(increase);
            worker.setStatus("UP"); // Đánh dấu là đã tăng lương
            saveWorker(workerList);
            return;
        }
    }
    System.out.println("ID not found!");
}


    public void decreaseSalary(String ID) {
    for (Worker worker : workerList) {
        if (worker.getID().equals(ID)) {
            int decrease;
            do {
                System.out.println("Enter Salary (must be > 0): ");
                decrease = sc.nextInt();
            } while (decrease <= 0);

            worker.setSalary(decrease);
            worker.setStatus("DOWN"); // Đánh dấu là đã giảm lương
            saveWorker(workerList);
            return;
        }
    }
    System.out.println("ID not found!");
}

}

