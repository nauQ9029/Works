/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Controller;

import Common.Validation;
import Model.Task;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

/**
 *
 * @author plmin
 */
public class CCRMController {

    private List<Task> tasks;
    private Validation validation;

    public CCRMController() {
        tasks = new ArrayList<>();
        validation = new Validation();
    }

    public int addTask(String requirementName, int taskTypeID, Date date, Double planFrom, Double planTo, String assignee, String reviewer)
            throws IllegalArgumentException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        String dateStr = dateFormat.format(date);
        if (!validation.isValidTaskTypeID(taskTypeID)) {
            throw new IllegalArgumentException("Invalid Task Type!");
        }
        if (!validation.isValidDate(dateStr)) {
            throw new IllegalArgumentException("Invalid date!");
        }
        if (!validation.isValidTime(planFrom, planTo)) {
            throw new IllegalArgumentException("Invalid Plant From/To Time!");
        }

        int id = tasks.isEmpty() ? 1 : tasks.get(tasks.size() - 1).getId() + 1;

        Task task = new Task(id, Task.TaskType.CODE.getId(), requirementName, date, planFrom, planTo, assignee, reviewer); 
        tasks.add(task);
        return id;
    }

    public void deleteTask(String id) throws IllegalArgumentException {
        Task taskToDelete = null;                                               // Check if the task exists
        for (Task task : tasks) {
            if (String.valueOf(task.getId()).equals(id)) {
                taskToDelete = task;
                break;
            }
        }
        if (taskToDelete == null) {
            throw new IllegalArgumentException("Task with ID " + id + " not found");
        }

        tasks.remove(taskToDelete);
    }

    // Sort the data list ascending
    public List<Task> getDataTasks() {
        Collections.sort(tasks, (t1, t2) -> t1.getId() - t2.getId());
        return tasks;
    }
}
