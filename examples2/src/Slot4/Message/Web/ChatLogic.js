import React, { useState, useEffect } from "react";

export class ChatLogic {
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

  listMessages(order = "asc") {
    const sorted = this.messages.slice().sort((a, b) => {
      return order === "desc"
        ? new Date(b.timestamp) - new Date(a.timestamp)
        : new Date(a.timestamp) - new Date(b.timestamp);
    });
    return sorted;
  }

  addParticipant(userId) {
    if (this.participants.has(userId)) return false;
    this.participants.add(userId);
    return true;
  }

  removeParticipant(userId, archiveMessages = true) {
    if (!this.participants.has(userId)) return false;
    this.participants.delete(userId);

    if (!archiveMessages) {
      this.messages = this.messages.filter((m) => m.senderId !== userId);
    }
    return true;
  }

  timeAgo(timestamp) {
    const now = new Date();
    const then = new Date(timestamp);
    const diff = Math.floor((now - then) / 1000); // diff in seconds

    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;

    // For older dates, return formatted date (e.g. "9/4/2024")
    return then.toLocaleDateString();
  }
}

// The React UI component for ChatRoom
export function ChatRoomUI({ chat }) {
  // Local state
  const [messages, setMessages] = useState(chat.listMessages("asc"));
  const [messageInput, setMessageInput] = useState("");
  const [selectedSender, setSelectedSender] = useState(
    [...chat.participants][0] || ""
  );

  const [filterSender, setFilterSender] = useState("");
  const [filterKeyword, setFilterKeyword] = useState("");
  const [filterStartTime, setFilterStartTime] = useState("");
  const [filterEndTime, setFilterEndTime] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [newParticipant, setNewParticipant] = useState("");

  // Editing state
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editText, setEditText] = useState("");

  // Update messages display based on filters and sort order
  useEffect(() => {
    let filtered = chat.messages;

    if (filterSender) {
      filtered = filtered.filter((m) => m.senderId === filterSender);
    }
    if (filterKeyword) {
      filtered = filtered.filter((m) =>
        m.text.toLowerCase().includes(filterKeyword.toLowerCase())
      );
    }
    if (filterStartTime) {
      const start = new Date(filterStartTime);
      filtered = filtered.filter((m) => new Date(m.timestamp) >= start);
    }
    if (filterEndTime) {
      const end = new Date(filterEndTime);
      filtered = filtered.filter((m) => new Date(m.timestamp) <= end);
    }

    // Filter out soft deleted messages
    filtered = filtered.filter((m) => !m.deleted);

    // Sort
    filtered = filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.timestamp) - new Date(b.timestamp);
      } else {
        return new Date(b.timestamp) - new Date(a.timestamp);
      }
    });

    setMessages(filtered);
  }, [
    chat.messages,
    filterSender,
    filterKeyword,
    filterStartTime,
    filterEndTime,
    sortOrder,
  ]);

  // Send a new message
  const sendMessage = () => {
    if (!messageInput.trim()) return;
    try {
      chat.sendMessage(messageInput, selectedSender);
      setMessageInput("");
      refreshMessages();
    } catch (err) {
      alert(err.message);
    }
  };

  // Refresh messages list
  const refreshMessages = () => {
    setMessages(chat.listMessages(sortOrder));
  };

  // Add a participant
  const handleAddParticipant = () => {
    if (!newParticipant.trim()) return;
    const success = chat.addParticipant(newParticipant.trim());
    if (!success) {
      alert("Participant already exists.");
    } else {
      setNewParticipant("");
      refreshMessages();
      if (!selectedSender) setSelectedSender(newParticipant.trim());
    }
  };

  // Remove a participant
  const handleRemoveParticipant = (userId) => {
    if (
      window.confirm(
        `Remove participant ${userId}? Messages will be kept by default.`
      )
    ) {
      chat.removeParticipant(userId, true); // keep messages by default
      refreshMessages();
      // If removed user was selected sender, update sender
      if (selectedSender === userId) {
        const participants = [...chat.participants];
        setSelectedSender(participants[0] || "");
      }
    }
  };

  // Start editing a message
  const startEditing = (message) => {
    if (message.senderId !== selectedSender) {
      alert("You can only edit your own messages.");
      return;
    }
    setEditingMessageId(message.id);
    setEditText(message.text);
  };

  // Save edited message
  const saveEdit = () => {
    try {
      chat.editMessage(editingMessageId, selectedSender, editText);
      setEditingMessageId(null);
      setEditText("");
      refreshMessages();
    } catch (err) {
      alert(err.message);
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingMessageId(null);
    setEditText("");
  };

  // Delete message (soft delete)
  const deleteMessage = (messageId) => {
    if (window.confirm("Delete this message?")) {
      chat.deleteMessage(messageId, true); // soft delete
      refreshMessages();
    }
  };

  // Format timestamp using chat.timeAgo()
  const formatTimestamp = (timestamp) => chat.timeAgo(timestamp);

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>Chat Room: {chat.name}</h2>

      {/* Participants */}
      <div style={{ marginBottom: 20 }}>
        <h4>Participants</h4>
        {[...chat.participants].map((p) => (
          <span
            key={p}
            style={{
              display: "inline-block",
              padding: "5px 10px",
              border: "1px solid #aaa",
              borderRadius: 15,
              marginRight: 10,
              marginBottom: 10,
              backgroundColor: p === selectedSender ? "#cef" : "#eee",
            }}
          >
            {p}{" "}
            <button
              onClick={() => handleRemoveParticipant(p)}
              style={{ marginLeft: 8, cursor: "pointer" }}
              title="Remove participant"
            >
              &times;
            </button>
          </span>
        ))}

        <div style={{ marginTop: 10 }}>
          <input
            type="text"
            placeholder="Add participant userId"
            value={newParticipant}
            onChange={(e) => setNewParticipant(e.target.value)}
            style={{ padding: 6 }}
          />
          <button onClick={handleAddParticipant} style={{ marginLeft: 8 }}>
            Add Participant
          </button>
        </div>
      </div>

      {/* Filters */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: 10,
          marginBottom: 20,
          borderRadius: 5,
          backgroundColor: "#f9f9f9",
        }}
      >
        <h4>Filter Messages</h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <select
            value={filterSender}
            onChange={(e) => setFilterSender(e.target.value)}
            style={{ padding: 6, minWidth: 150 }}
          >
            <option value="">All Senders</option>
            {[...chat.participants].map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Keyword"
            value={filterKeyword}
            onChange={(e) => setFilterKeyword(e.target.value)}
            style={{ padding: 6, minWidth: 150 }}
          />

          <label>
            From:{" "}
            <input
              type="date"
              value={filterStartTime}
              onChange={(e) => setFilterStartTime(e.target.value)}
            />
          </label>

          <label>
            To:{" "}
            <input
              type="date"
              value={filterEndTime}
              onChange={(e) => setFilterEndTime(e.target.value)}
            />
          </label>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{ padding: 6, minWidth: 150 }}
          >
            <option value="asc">Sort: Oldest First</option>
            <option value="desc">Sort: Newest First</option>
          </select>
        </div>
      </div>

      {/* Messages list */}
      <div
        id="messages"
        style={{
          border: "1px solid #ccc",
          height: 350,
          overflowY: "auto",
          padding: 10,
          borderRadius: 5,
          backgroundColor: "#fff",
          marginBottom: 20,
        }}
      >
        {messages.length === 0 && <div>No messages found.</div>}
        {messages.map((message) => (
          <div key={message.id} className="message">
            {/* If this message is being edited */}
            {editingMessageId === message.id ? (
              <div>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={saveEdit}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <span>
                  <strong>{message.senderId}:</strong> {message.text}
                </span>
                {message.senderId === selectedSender && (
                  <>
                    <button onClick={() => startEditing(message)}>Edit</button>
                    <button onClick={() => deleteMessage(message.id)}>
                      Delete
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Send message */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        style={{ display: "flex", gap: 8 }}
      >
        <select
          value={selectedSender}
          onChange={(e) => setSelectedSender(e.target.value)}
          style={{ padding: 6, minWidth: 120 }}
        >
          {[...chat.participants].map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Type a message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          style={{ flex: 1, padding: 6 }}
        />

        <button type="submit">Send</button>
      </form>
    </div>
  );
}
