import { useEffect, useRef, useState } from "react";
import "./ChatCSKH.scss";
import socket from "../../../socket/index.socket";
import { getListRoom, postMessage } from "../../../services/Client/AuthService/chats.service";
import { getMessagesAdmin } from "../../../services/Admin/getMessage";
import { UploadOutlined, SendOutlined } from "@ant-design/icons"

function Chat() {
  const [roomId, setRoomId] = useState("")
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);
  const [listRoom, setListRoom] = useState([])
  const [clientActive, setClientActive] = useState(false)

  useEffect(() => {
    const fetchRoom = async () => {
      const res = await getListRoom();
      if (res?.ok) {
        setListRoom(res.result.listRoom)
      }
    }

    fetchRoom()
  }, [])


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
        const res = await getMessagesAdmin(roomId);
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
    if (!text.trim()) return;

    const payload = {
      sender_role: "admin",
      room_chat_id: roomId,
      content: text
    };
    console.log(payload)
    await postMessage(payload);
    socket.emit("chat:send", {
      roomId,
      content: text
    });

    setText("");
  };

  const handleClick = (e) => {
    setRoomId(e)
    setClientActive(true)
  }

  return (
  <div className="chat-cskh">
    {/* ===== LEFT: LIST ROOM ===== */}
    <div className="chat-cskh-left">
      <div className="chat-cskh-left-header">
        <h3>Messenger</h3>
        <input type="text" placeholder="Tìm kiếm..." />
      </div>

      <div className="chat-cskh-left-body">
        {listRoom.map(item => (
          <div
            key={item._id}
            onClick={() => handleClick(item._id)}
            className={`chat-cskh-left-body-item ${
              roomId === item._id ? "active" : ""
            }`}
          >
            <img
              className="avatar"
              src={
                item?.avatar ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
            />
            <div className="info">
              <span className="name">{item.fullname}</span>
              <span className="status"></span>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="chat-cskh-center">
      {roomId ? (
        <>
          <div className="chat-cskh-center-header">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              className="avatar"
            />
            <span className="username">Khách hàng</span>
          </div>

          <div className="chat-cskh-center-body">
            {messages.map((item, idx) => (
              <div
                key={idx}
                className={`chat-message ${
                  item.sender_role === "admin" ? "right" : "left"
                }`}
              >
                <div className="bubble">{item.content}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="chat-cskh-center-input">
            <label htmlFor="fileimg">
              <UploadOutlined />
            </label>
            <input id="fileimg" type="file" hidden />
            <input
              type="text"
              value={text}
              placeholder="Nhập tin nhắn..."
              onChange={e => setText(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>
              <SendOutlined />
            </button>
          </div>
        </>
      ) : (
        <div className="chat-empty">
          Chọn một cuộc trò chuyện để bắt đầu
        </div>
      )}
    </div>

    {/* ===== RIGHT: INFO ===== */}
    <div className="chat-cskh-right">
      <div className="chat-cskh-right-header">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          className="avatar"
        />
        <span className="username">Thông tin khách</span>
      </div>

      <div className="chat-cskh-right-body">
        <p>Thông tin khách hàng</p>
        <p>Trạng thái: Đang chat</p>
      </div>
    </div>
  </div>
);
}

export default Chat;
