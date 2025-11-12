import React, { createContext, useContext, useState } from "react";

type FeedbackContextType = {
  visible: boolean;
  bookingId: string | null;
  mechanicId: string | null;
  showFeedback: (data: { bookingId: string; mechanicId: string }) => void;
  hideFeedback: () => void;
};

const FeedbackContext = createContext<FeedbackContextType>({
  visible: false,
  bookingId: null,
  mechanicId: null,
  showFeedback: () => {},
  hideFeedback: () => {},
});

export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [mechanicId, setMechanicId] = useState<string | null>(null);

  const showFeedback = ({ bookingId, mechanicId }: { bookingId: string; mechanicId: string }) => {
    setBookingId(bookingId);
    setMechanicId(mechanicId);
    setVisible(true);
  };

  const hideFeedback = () => {
    setBookingId(null);
    setMechanicId(null);
    setVisible(false);
  };

  return (
    <FeedbackContext.Provider value={{ visible, bookingId, mechanicId, showFeedback, hideFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => useContext(FeedbackContext);
