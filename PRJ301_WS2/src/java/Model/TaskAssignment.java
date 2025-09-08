/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

import java.util.Date;

/**
 *
 * @author plmin
 */
public class TaskAssignment {

    private int assignmentId;
    private int taskId;
    private int userId;
    private Date assignedDate;
    private Date completeDate;

    public TaskAssignment() {
    }

    public TaskAssignment(int assignmentId, int taskId, int userId, Date assignedDate, Date completeDate) {
        this.assignmentId = assignmentId;
        this.taskId = taskId;
        this.userId = userId;
        this.assignedDate = assignedDate;
        this.completeDate = completeDate;
    }

    public int getAssignmentId() {
        return assignmentId;
    }

    public void setAssignmentId(int assignmentId) {
        this.assignmentId = assignmentId;
    }

    public int getTaskId() {
        return taskId;
    }

    public void setTaskId(int taskId) {
        this.taskId = taskId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Date getAssignedDate() {
        return assignedDate;
    }

    public void setAssignedDate(Date assignedDate) {
        this.assignedDate = assignedDate;
    }

    public Date getCompleteDate() {
        return completeDate;
    }

    public void setCompleteDate(Date completeDate) {
        this.completeDate = completeDate;
    }

    @Override
    public String toString() {
        return "TaskAssignment{" + "assignmentId=" + assignmentId + ", taskId=" + taskId + ", userId=" + userId + ", assignedDate=" + assignedDate + ", completeDate=" + completeDate + '}';
    }
}
