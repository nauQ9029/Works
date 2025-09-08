/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package DAO;

import Connect.DBContext;
import Model.Booking;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author plmin
 */
public class BookingDAO {

    private Connection connection;

    public BookingDAO() {
        DBContext dbContext = new DBContext();
        this.connection = dbContext.getConnection();
    }

    public List<Booking> getAllBookings() throws SQLException {
        List<Booking> bookings = new ArrayList<>();
        String sql = "SELECT * FROM Bookings";
        PreparedStatement statement = connection.prepareStatement(sql);
        ResultSet resultSet = statement.executeQuery();

        while (resultSet.next()) {
            Booking booking = new Booking();
            booking.setId(resultSet.getInt("id"));
            booking.setCustomerId(resultSet.getInt("customer_id"));
            booking.setRoomId(resultSet.getInt("room_id"));
            booking.setBookingDate(resultSet.getDate("booking_date"));
            booking.setStartTime(resultSet.getTime("start_time"));
            booking.setEndTime(resultSet.getTime("end_time"));
            booking.setPurpose(resultSet.getString("purpose"));
            bookings.add(booking);
        }

        return bookings;
    }

    public boolean isRoomAvailable(int roomId, Date bookingDate, Time startTime, Time endTime) throws SQLException {
        String sql = "SELECT COUNT(*) FROM Bookings "
                + "WHERE room_id = ? "
                + "AND booking_date = ? "
                + "AND ((start_time < ? AND end_time > ?) "
                + "OR (start_time >= ? AND start_time < ?) "
                + "OR (end_time > ? AND end_time <= ?))";

        PreparedStatement statement = connection.prepareStatement(sql);
        statement.setInt(1, roomId);
        statement.setDate(2, new java.sql.Date(bookingDate.getTime()));
        statement.setTime(3, endTime);
        statement.setTime(4, startTime);
        statement.setTime(5, startTime);
        statement.setTime(6, endTime);
        statement.setTime(7, startTime);
        statement.setTime(8, endTime);

        ResultSet resultSet = statement.executeQuery();
        resultSet.next();
        int count = resultSet.getInt(1);

        return count == 0;
    }

    public void bookRoom(Booking booking) throws SQLException {
        String sql = "INSERT INTO Bookings (customer_id, room_id, booking_date, start_time, end_time, purpose) "
                + "VALUES (?, ?, ?, ?, ?, ?)";

        PreparedStatement statement = connection.prepareStatement(sql);
        statement.setInt(1, booking.getCustomerId());
        statement.setInt(2, booking.getRoomId());
        statement.setDate(3, new java.sql.Date(booking.getBookingDate().getTime()));
        statement.setTime(4, booking.getStartTime());
        statement.setTime(5, booking.getEndTime());
        statement.setString(6, booking.getPurpose());

        statement.executeUpdate();
        statement.close();
    }

    public static void main(String[] args) {
        BookingDAO bookingDAO = new BookingDAO();

        try {
            List<Booking> bookings = bookingDAO.getAllBookings();

            System.out.println("All Bookings:");
            for (Booking booking : bookings) {
                System.out.println("Booking ID: " + booking.getId());
                System.out.println("Customer ID: " + booking.getCustomerId());
                System.out.println("Room ID: " + booking.getRoomId());
                System.out.println("Booking Date: " + booking.getBookingDate());
                System.out.println("Start Time: " + booking.getStartTime());
                System.out.println("End Time: " + booking.getEndTime());
                System.out.println("Purpose: " + booking.getPurpose());
                System.out.println("------------------------");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
