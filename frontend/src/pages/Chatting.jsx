// src/components/ChatBox.jsx
import { useState, useEffect } from "react";
import axios from "axios";

function ChatBox({ user1Id, user1Type, user2Id, user2Type }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // API base URL (hubi inuu la mid yahay backend-kaaga)
  const API = axios.create({
    baseURL: "http://localhost:5000/api/chat",
  });

  // Fetch conversation
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await API.get(
        `/conversation/${user1Id}/${user1Type}/${user2Id}/${user2Type}`
      );
      setMessages(res.data);
      setLoading(false);

      // marka uu user1 akhristo, calaamadee read
      await API.put(`/read/${user1Id}/${user1Type}/${user2Id}/${user2Type}`);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // Send message
  const handleSend = async () => {
    if (!input.trim()) return;
    try {
      const res = await API.post("/send", {
        senderId: user1Id,
        senderType: user1Type,
        receiverId: user2Id,
        receiverType: user2Type,
        message: input,
      });

      setMessages([...messages, res.data]);
      setInput("");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();
    // Optional: refresh every 5s si messages cusub loo arko
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chat-box" style={styles.chatBox}>
      <div style={styles.header}>
        <h3>Chat</h3>
        {loading && <span>Loading...</span>}
      </div>

      <div style={styles.messages}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf:
                msg.senderId._id === user1Id ? "flex-end" : "flex-start",
              backgroundColor:
                msg.senderId._id === user1Id ? "#DCF8C6" : "#FFF",
            }}
          >
            <strong>{msg.senderId.name}:</strong> {msg.message}
          </div>
        ))}
      </div>

      <div style={styles.inputBox}>
        <input
          type="text"
          placeholder="Write a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

// CSS styles (inline for simplicity)
const styles = {
  chatBox: {
    width: "400px",
    height: "500px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    padding: "10px",
    borderBottom: "1px solid #ccc",
    display: "flex",
    justifyContent: "space-between",
  },
  messages: {
    flex: 1,
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    gap: "5px",
  },
  message: {
    maxWidth: "70%",
    padding: "8px",
    borderRadius: "8px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  },
  inputBox: {
    display: "flex",
    borderTop: "1px solid #ccc",
    padding: "10px",
  },
  input: {
    flex: 1,
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    marginLeft: "10px",
    padding: "8px 12px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
  },
};

export default ChatBox;
