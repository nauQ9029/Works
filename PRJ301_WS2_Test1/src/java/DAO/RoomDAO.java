/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package DAO;

import Connect.DBContext;
import Model.Booking;
import Model.Room;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.Time;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author plmin
 */
public class RoomDAO {

    private Connection connection;

    public RoomDAO() {
        DBContext dbContext = new DBContext();
        this.connection = dbContext.getConnection();
    }

    public List<Room> getAllRooms() throws SQLException {
        List<Room> rooms = new ArrayList<>();
        String sql = "SELECT * FROM Rooms";
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery(sql);

        while (resultSet.next()) {
            Room room = new Room();
            room.setId(resultSet.getInt("id"));
            room.setRoomNumber(resultSet.getString("room_number"));
            room.setCapacity(resultSet.getInt("capacity"));
            room.setFloor(resultSet.getInt("floor"));
            rooms.add(room);
        }

        return rooms;
    }

    public boolean isRoomAvailable(int roomId, Date bookingDate, Time startTime, Time endTime) throws SQLException {
        String sql = "SELECT COUNT(*) FROM Bookings WHERE room_id = ? AND booking_date = ? AND (start_time < ? AND end_time > ?)";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setInt(1, roomId);
        preparedStatement.setDate(2, bookingDate);
        preparedStatement.setTime(3, endTime);
        preparedStatement.setTime(4, startTime);

        ResultSet resultSet = preparedStatement.executeQuery();
        resultSet.next();

        return resultSet.getInt(1) == 0;
    }

    public void bookRoom(Booking booking) throws SQLException {
        String sql = "INSERT INTO Bookings (room_id, booking_date, start_time, end_time, purpose, customer_id) VALUES (?, ?, ?, ?, ?, ?)";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setInt(1, booking.getRoomId());
        preparedStatement.setDate(2, booking.getBookingDate());
        preparedStatement.setTime(3, booking.getStartTime());
        preparedStatement.setTime(4, booking.getEndTime());
        preparedStatement.setString(5, booking.getPurpose());
        preparedStatement.setInt(6, booking.getCustomerId());
        preparedStatement.executeUpdate();
    }
}
