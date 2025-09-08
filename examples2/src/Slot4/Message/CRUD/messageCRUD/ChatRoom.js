class ChatRoom {
  constructor(room) {
    this.id = room.id;
    this.name = room.name;
    this.participants = new Set(room.participants);
    this.messages = room.messages || [];
  }

  generateMessageId() {
    return "message" + (this.messages.length + 1);
  }

  getCurrentTimestamp() {
    return new Date().toLocaleString("en-GB", {
      hour12: true,
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  sendMessage(text, senderId) {
    if (!this.participants.has(senderId)) {
      throw new Error("Sender is not a participant");
    }
    const newMessage = {
      id: this.generateMessageId(),
      text,
      senderId,
      timestamp: this.getCurrentTimestamp(),
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  listMessages(order = "asc", filter = {}) {
    let filtered = this.messages;

    if (filter.senderId) {
      filtered = filtered.filter((m) => m.senderId === filter.senderId);
    }
    if (filter.keyword) {
      filtered = filtered.filter((m) =>
        m.text.toLowerCase().includes(filter.keyword.toLowerCase())
      );
    }

    if (order === "desc") {
      return filtered
        .slice()
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
    return filtered
      .slice()
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }

  addParticipant(userId) {
    if (this.participants.has(userId)) {
      return false;
    }
    this.participants.add(userId);
    return true;
  }

  removeParticipant(userId, archiveMessages = true) {
    if (!this.participants.has(userId)) {
      return false;
    }
    this.participants.delete(userId);

    if (!archiveMessages) {
      this.messages = this.messages.filter((m) => m.senderId !== userId);
    }
    return true;
  }

  editMessage(messageId, senderId, newText) {
    const message = this.messages.find((m) => m.id === messageId);
    if (!message) throw new Error("Message not found");
    if (message.senderId !== senderId)
      throw new Error("Not allowed to edit this message");

    message.text = newText;
    return message;
  }

  deleteMessage(messageId) {
    const index = this.messages.findIndex((m) => m.id === messageId);
    if (index === -1) return false;
    this.messages.splice(index, 1);
    return true;
  }

  filterMessages({ senderId, keyword, startTime, endTime }) {
    return this.messages.filter((m) => {
      const time = new Date(m.timestamp);
      if (senderId && m.senderId !== senderId) return false;
      if (keyword && !m.text.toLowerCase().includes(keyword.toLowerCase()))
        return false;
      if (startTime && time < new Date(startTime)) return false;
      if (endTime && time > new Date(endTime)) return false;
      return true;
    });
  }

  timeAgo(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const seconds = Math.floor((now - time) / 1000);

    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} days ago`;
    return time.toLocaleDateString();
  }
}

export default ChatRoom;
