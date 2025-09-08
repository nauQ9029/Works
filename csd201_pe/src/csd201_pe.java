/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author plmin
 */
class Task implements Comparable<Task> {

    private int ID;
    private String descrip;
    private int priority;

    public Task(int ID, String descrip, int priority) {
        this.ID = ID;
        this.descrip = descrip;
        this.priority = priority;
    }

    public int getID() {
        return ID;
    }

    public String getDescrip() {
        return descrip;
    }

    public int getPriority() {
        return priority;
    }

    @Override
    public int compareTo(Task other) {
        return Integer.compare(this.priority, other.priority);
    }

    @Override
    public String toString() {
        return "Task ID: " + ID + " | Description: " + descrip + " | Priority: " + priority;
    }
}

//

class MaxHeap {

    public void insert(Task element) {

    }

    public Task remove() {

        return null;
    }

}

public class csd201_pe {

    public static void main(String[] args) {
        Task[] tasks = {
            new Task(1, "Security patch for vulnerability", 100),
            new Task(2, "Add login feature", 80),
            new Task(3, "Update documentation", 40),
            new Task(4, "Fix email notification bug", 90),
            new Task(5, "Refactor user management module", 70),
            new Task(6, "Implement data caching", 85),
            new Task(7, "Optimize database queries", 75),
            new Task(8, "Write unit tests for new features", 60),
            new Task(9, "Upgrade third-party libraries", 50),
            new Task(10, "Review and merge pull requests", 55)
        };

        csd201_pe csd = new csd201_pe();

        System.out.println("Tasks before sort:");
        csd.printTasks(tasks);

        csd.mergeSort(tasks, 0, tasks.length - 1);

        System.out.println("\nTasks after sorted  based on priroity of the tasks:");
        csd.printTasks(tasks);
    }

    /*
    - MergeSort makes partitioning as simple as possible and concentrates on merging sorted halves of an array into one sorted array
    - QuickSort has similar complexity time to MergeSort O(nlogn) but if the pivot choosen is bad, the complexity time of QuickSort can be up to O(n^2)
     */
    public void mergeSort(Task[] arr, int left, int right) {
        if (left < right) {
            int mid = (left + right) / 2;
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }

    public void merge(Task[] arr, int left, int mid, int right) {
        Task[] temp = new Task[arr.length];
        int i = left;
        int j = mid + 1;
        int k = left;

        while (i <= mid && j <= right) {
            if (arr[i].compareTo(arr[j]) <= 0) {
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
            }
        }

        while (i <= mid) {
            temp[k++] = arr[i++];
        }

        while (j <= right) {
            temp[k++] = arr[j++];
        }

        for (int l = left; l <= right; l++) {
            arr[l] = temp[l];
        }
    }

    public void printTasks(Task[] tasks) {
        for (Task task : tasks) {
            System.out.println(task);
        }
    }
}
