import { useEffect, useRef, useState } from "react";
import "./chat.scss";
import { getRoom, postMessage, getMessages } from "../../services/Client/AuthService/chats.service";
import socket from "../../socket/index.socket";
import { MessageOutlined } from "@ant-design/icons"

function ChatWidget() {
  const [roomId, setRoomId] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);
  const [Collapse, setCollapse] = useState(false);


  useEffect(() => {
    const fetchRoom = async () => {
      const res = await getRoom();
      if (res?.ok) {
        setRoomId(res.result.room_chat_id);
      }
    };
    fetchRoom();
  }, []);

  useEffect(() => {
    if (!roomId) return;

    if (socket.connected) {
      socket.emit("chat:join", { roomId });
    }

    const handleConnect = () => {
      socket.emit("chat:join", { roomId });
    };

    socket.on("connect", handleConnect);
    return () => socket.off("connect", handleConnect);
  }, [roomId]);

  useEffect(() => {
    if (!roomId) return;

    const fetchMessages = async () => {
      const res = await getMessages(roomId);
      if (res?.ok) {
        setMessages(res.result.messages);
      }
    };

    fetchMessages();
  }, [roomId]);


  useEffect(() => {
    const handleNewMessage = (message) => {
      setMessages(prev => [...prev, message]);
    };

    socket.on("chat:new-message", handleNewMessage);
    return () => socket.off("chat:new-message", handleNewMessage);
  }, []);



  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const sendMessage = async () => {
    if (!text.trim() || !roomId) return;
    const payload = {
      sender_role: "client",
      room_chat_id: roomId,
      content: text
    };
    await postMessage(payload);
    socket.emit("chat:send", {
      roomId,
      content: text
    });
    setText("");

  };


  return (
    <>
      <button className={`chat-float-btn`} onClick={() => setCollapse(true)}><MessageOutlined /></button>

      <div className={`chat-widget ${Collapse ? "open" : "closed"}`} >
        <div className="chat-widget-header">
          <span>Chat hỗ trợ</span>
          <button className="chat-widget-close" onClick={() => setCollapse(false)}>✕</button>
        </div>

        <div className="chat-widget-body">
          {messages.map((item, idx) => (
            <div
              key={idx}
              className={`chat-message ${item.sender_role === "client" ? "right" : "left"
                }`}
            >
              <div className="chat-message-bubble">
                {item.content}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="chat-widget-input">
          <label htmlFor="fileimg">📎</label>
          <input id="fileimg" type="file" />
          <input
            type="text"
            value={text}
            placeholder="Nhập tin nhắn..."
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
        </div>
      </div>
    </>
  );
}

export default ChatWidget;
