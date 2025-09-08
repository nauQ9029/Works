/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

import DAO.RoomDAO;
import java.sql.Time;
import java.sql.Date;
import java.sql.SQLException;
import java.util.List;

/**
 *
 * @author plmin
 */
public class BookingBean {

    private RoomDAO roomDAO = new RoomDAO();

    public boolean bookRoom(int roomId, int customerId, Date bookingDate, Time startTime, Time endTime, String purpose) {
        try {
            if (roomDAO.isRoomAvailable(roomId, bookingDate, startTime, endTime)) {
                Booking booking = new Booking();
                booking.setRoomId(roomId);
                booking.setCustomerId(customerId);
                booking.setBookingDate(bookingDate);
                booking.setStartTime(startTime);
                booking.setEndTime(endTime);
                booking.setPurpose(purpose);
                roomDAO.bookRoom(booking);
                return true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public List<Room> isRoomAvailable() {
        try {
            return roomDAO.getAllRooms();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
