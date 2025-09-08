/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import Connect.DBContext;

/**
 *
 * @author plmin
 */
public class TaskAssignmentDAO {

    private Connection getConnection() {
        DBContext dbContext = new DBContext();
        return dbContext.getConnection();
    }

    public void completeTask(int userId, int taskId) {
        String updateTaskSql = "UPDATE Tasks SET status = 'completed' WHERE task_id = ?";
        String updateAssignmentSql = "UPDATE TaskAssignments SET complete_date = GETDATE() WHERE user_id = ? AND task_id = ?";
        try (Connection conn = getConnection(); PreparedStatement taskStmt = conn.prepareStatement(updateTaskSql); PreparedStatement assignmentStmt = conn.prepareStatement(updateAssignmentSql)) {
            conn.setAutoCommit(false);

            taskStmt.setInt(1, taskId);
            taskStmt.executeUpdate();

            assignmentStmt.setInt(1, userId);
            assignmentStmt.setInt(2, taskId);
            assignmentStmt.executeUpdate();

            conn.commit();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
