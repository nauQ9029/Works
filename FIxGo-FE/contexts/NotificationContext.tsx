import { API_BASE_URL } from '@/services/api';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import io from 'socket.io-client';
import { useMechanicStatus } from './MechanicStatusContext';
import { useUser } from './userContext';

interface NotificationContextType {
  socket: any;
  showMechanicFoundModal: boolean;
  mechanicName: string;
  bookingId: string;
  setShowMechanicFoundModal: (show: boolean) => void;
  // Mechanic notifications
  showMechanicNotification: (title: string, message: string, type?: 'info' | 'success' | 'warning' | 'error', onPress?: () => void) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  const { isOnline } = useMechanicStatus();
  const router = useRouter();
  const pathname = usePathname();
  const [socket, setSocket] = useState<any>(null);
  const [showMechanicFoundModal, setShowMechanicFoundModal] = useState(false);
  const [mechanicName, setMechanicName] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [countdown, setCountdown] = useState(5);
  const [countdownTimer, setCountdownTimer] = useState<number | null>(null);
  const [currentScreen, setCurrentScreen] = useState<string | null>(null);

  // Mechanic notification states
  const [showMechanicNotificationModal, setShowMechanicNotificationModal] = useState(false);
  const [mechanicNotificationTitle, setMechanicNotificationTitle] = useState('');
  const [mechanicNotificationMessage, setMechanicNotificationMessage] = useState('');
  const [mechanicNotificationType, setMechanicNotificationType] = useState<'info' | 'success' | 'warning' | 'error'>('info');
  const [mechanicNotificationAction, setMechanicNotificationAction] = useState<(() => void) | null>(null);

  // Track current screen to prevent conflicts
  useEffect(() => {
    setCurrentScreen(pathname);
  }, [pathname]);

  // Setup global socket connection
  useEffect(() => {
    if (!user?.id) return;

    const socketConnection = io(API_BASE_URL, { 
      transports: ['websocket'], 
      forceNew: true,
      timeout: 10000,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });


    socketConnection.on('connect', () => {
      console.log('✅ Global Socket connected:', socketConnection.id);
      // Register user ID with socket
      socketConnection.emit('register', user.id);
    });

    socketConnection.on('disconnect', () => {
      console.log('❌ Global Socket disconnected');
    });

    socketConnection.on('connect_error', (error) => {
      console.error('❌ Global Socket connection error:', error);
    });

    setSocket(socketConnection);

    return () => {
      if (socketConnection) {
        socketConnection.disconnect();
      }
    };
  }, [user?.id]);

  // Mechanic notification function
  const showMechanicNotification = (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info', onPress?: () => void) => {
    setMechanicNotificationTitle(title);
    setMechanicNotificationMessage(message);
    setMechanicNotificationType(type);
    setMechanicNotificationAction(onPress ? () => onPress : null);
    setShowMechanicNotificationModal(true);

    // Auto-hide after 5 seconds if no action is provided
    if (!onPress) {
      setTimeout(() => {
        setShowMechanicNotificationModal(false);
      }, 5000);
    }
  };

  // Setup socket event listeners separately from connection
  useEffect(() => {
    if (!socket) return;

    // Listen for mechanic acceptance from any screen
    const handleBookingUpdated = (data: any) => {
      console.log('📨 Global: Booking updated:', data);
      if (data.booking) {
        // Handle mechanic acceptance
        if (data.booking.status === 'đã nhận') {
          // Check current screen state to avoid conflicts
          const isOnChooseLocation = currentScreen?.includes('chooseLocation');

          if (!isOnChooseLocation) {
            // Use requestAnimationFrame to defer state updates
            requestAnimationFrame(() => {
              const mechName = data.booking.mechanicId?.name || 'A mechanic';
              setMechanicName(mechName);
              setBookingId(data.booking._id);
              setShowMechanicFoundModal(true);
              startCountdown(data.booking._id);
            });
          }
        }
        // Handle booking completion or cancellation
        else if (['hoàn thành', 'hủy'].includes(data.booking.status)) {
          console.log('📨 Global: Booking finished, navigating to feedback...');
          // Use requestAnimationFrame to defer navigation
          requestAnimationFrame(() => {
            router.push({
              pathname: "/customer/feedback/feedback",
              params: {
                bookingId: data.booking._id,
                status: data.booking.status,
                mechanicId: data.booking.mechanicId?._id || data.booking.mechanicId
              },
            });
          });
        }
      }
    };

    const handleBookingStatusUpdated = (data: any) => {
      console.log('📨 Global: Booking status updated:', data);
      if (data.booking) {
        // Handle mechanic acceptance
        if (data.booking.status === 'đã nhận') {
          // Check current screen state to avoid conflicts
          const isOnChooseLocation = currentScreen?.includes('chooseLocation');

          if (!isOnChooseLocation) {
            // Use requestAnimationFrame to defer state updates
            requestAnimationFrame(() => {
              const mechName = data.booking.mechanicId?.name || 'A mechanic';
              setMechanicName(mechName);
              setBookingId(data.booking._id);
              setShowMechanicFoundModal(true);
              startCountdown(data.booking._id);
            });
          }
        }
        // Handle booking completion or cancellation  
        else if (['hoàn thành', 'hủy'].includes(data.booking.status)) {
          console.log('📨 Global: Booking finished via status update, navigating to feedback...');
          // Use requestAnimationFrame to defer navigation
          requestAnimationFrame(() => {
            router.push({
              pathname: "/customer/feedback/feedback",
              params: {
                bookingId: data.booking._id,
                status: data.booking.status,
                mechanicId: data.booking.mechanicId?._id || data.booking.mechanicId
              },
            });
          });
        }
      }
    };

    // Handle new booking notifications for mechanics
    const handleNewBooking = (data: any) => {
      console.log('📨 Global: New booking for mechanic:', data);
      // Only show notification if mechanic is online and the booking is for this mechanic
      if (user?.role === 'mechanic' && data.mechanicId === user.id && isOnline) {
        const customerName = data.booking?.customerId?.name || 'Khách hàng';
        showMechanicNotification(
          'Đơn hàng mới!',
          `Có đơn hàng mới từ ${customerName}`,
          'info',
          () => {
            setShowMechanicNotificationModal(false);
            router.push('/mechanic/bookRepairList/bookRepairList');
          }
        );
      } else if (user?.role === 'mechanic' && data.mechanicId === user.id && !isOnline) {
        console.log('📨 Mechanic is offline, not showing new booking notification');
      }
    };

    // Handle booking assignments for mechanics
    const handleBookingAssigned = (data: any) => {
      console.log('📨 Global: Booking assigned:', data);
      // Only show notification if mechanic is online
      if (user?.role === 'mechanic' && data.booking?.mechanicId === user.id && isOnline) {
        showMechanicNotification(
          'Đã nhận đơn!',
          'Bạn đã nhận đơn hàng thành công',
          'success'
        );
      }
    };

    socket.on('your_booking_updated', handleBookingUpdated);
    socket.on('booking_status_updated', handleBookingStatusUpdated);
    socket.on('new_booking', handleNewBooking);
    socket.on('booking_assigned', handleBookingAssigned);

    return () => {
      socket.off('your_booking_updated', handleBookingUpdated);
      socket.off('booking_status_updated', handleBookingStatusUpdated);
      socket.off('new_booking', handleNewBooking);
      socket.off('booking_assigned', handleBookingAssigned);
    };
  }, [socket, currentScreen, router, user?.role, user?.id, isOnline]);

  // Start countdown and auto-redirect
  const startCountdown = (bookingIdParam: string) => {
    setCountdown(5);

    // Clear any existing timer
    if (countdownTimer) {
      clearInterval(countdownTimer);
    }

    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          setCountdownTimer(null);

          // Use requestAnimationFrame to defer navigation and state updates
          requestAnimationFrame(() => {
            setShowMechanicFoundModal(false);
            router.push({
              pathname: "/customer/trackingLocation/trackingLocation",
              params: { bookingId: bookingIdParam },
            });
          });

          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    setCountdownTimer(timer);
  };

  const handleGoToTracking = () => {
    // Clear countdown timer
    if (countdownTimer) {
      clearInterval(countdownTimer);
      setCountdownTimer(null);
    }

    // Use requestAnimationFrame to defer state updates and navigation
    requestAnimationFrame(() => {
      setShowMechanicFoundModal(false);
      router.push({
        pathname: "/customer/trackingLocation/trackingLocation",
        params: { bookingId },
      });
    });
  };

  const handleDismiss = () => {
    // Clear countdown timer
    if (countdownTimer) {
      clearInterval(countdownTimer);
      setCountdownTimer(null);
    }

    // Use requestAnimationFrame to defer state updates
    requestAnimationFrame(() => {
      setShowMechanicFoundModal(false);
    });
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (countdownTimer) {
        clearInterval(countdownTimer);
      }
    };
  }, [countdownTimer]);

  return (
    <NotificationContext.Provider
      value={{
        socket,
        showMechanicFoundModal,
        mechanicName,
        bookingId,
        setShowMechanicFoundModal,
        showMechanicNotification,
      }}
    >
      {children}

      {/* Global Mechanic Found Modal */}
      <Modal
        visible={showMechanicFoundModal}
        transparent
        animationType="fade"
        onRequestClose={handleDismiss}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.notificationModal}>
            <Ionicons name="checkmark-circle" size={60} color="#4CAF50" style={styles.successIcon} />
            <Text style={styles.successTitle}>Đã tìm thấy thợ!</Text>
            <Text style={styles.successText}>{mechanicName} đã chấp nhận yêu cầu của bạn</Text>

          </View>
        </View>
      </Modal>

      {/* Global Mechanic Notification Modal */}
      <Modal
        visible={showMechanicNotificationModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowMechanicNotificationModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.notificationModal, styles.mechanicNotificationModal]}>
            <Ionicons
              name={
                mechanicNotificationType === 'success' ? 'checkmark-circle' :
                  mechanicNotificationType === 'warning' ? 'warning' :
                    mechanicNotificationType === 'error' ? 'close-circle' :
                      'information-circle'
              }
              size={50}
              color={
                mechanicNotificationType === 'success' ? '#4CAF50' :
                  mechanicNotificationType === 'warning' ? '#FF9800' :
                    mechanicNotificationType === 'error' ? '#f44336' :
                      '#2196F3'
              }
              style={styles.successIcon}
            />
            <Text style={[styles.successTitle, {
              color: mechanicNotificationType === 'success' ? '#4CAF50' :
                mechanicNotificationType === 'warning' ? '#FF9800' :
                  mechanicNotificationType === 'error' ? '#f44336' :
                    '#2196F3'
            }]}>
              {mechanicNotificationTitle}
            </Text>
            <Text style={styles.successText}>{mechanicNotificationMessage}</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.dismissButton}
                onPress={() => setShowMechanicNotificationModal(false)}
              >
                <Text style={styles.dismissButtonText}>Đóng</Text>
              </TouchableOpacity>
              {mechanicNotificationAction && (
                <TouchableOpacity
                  style={styles.trackButton}
                  onPress={() => {
                    mechanicNotificationAction();
                  }}
                >
                  <Text style={styles.trackButtonText}>Xem</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </NotificationContext.Provider>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationModal: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 30,
    margin: 20,
    width: "85%",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  successIcon: {
    marginBottom: 15,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#4CAF50",
  },
  successText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 15,
  },
  countdownContainer: {
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  countdownText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    fontWeight: "600",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
  },
  dismissButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    alignItems: "center",
  },
  dismissButtonText: {
    color: "#666",
    fontWeight: "bold",
    fontSize: 16,
  },
  trackButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    alignItems: "center",
  },
  trackButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  mechanicNotificationModal: {
    maxHeight: '60%',
  },
});