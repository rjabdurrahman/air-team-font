import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import moment from "moment";
// import ChatHistory from "./ChatHistory";
import ScrollToBottom from "react-scroll-to-bottom";

var socket = io(process.env.REACT_APP_API_BASE_URL, {
  transports: ["websocket"]
});

const ROOT_CSS = {
  height: 600,
  width: 400
};

const chatHistory = messages => {
  return messages[0].map((msg, i) => {
    // console.log("messages", msg);
    return <p key={i}>{msg.message}</p>;
  });
};

function Messages(props) {
  //   console.log("props.user", props.user);
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("ReceiveMessage", message => {
      // console.log("messageFromBackEnd", message);
      setMessages(messages => [...messages, message]);
    });
  }, []);

  const submitChatMessage = () => {
    let msg = chatMessage;
    let userId = props.user._id;
    let userName = props.user.name;
    let userImage = "";
    let nowTime = moment();
    let type = "Image";
    socket.emit("SendMessage", {
      message: msg,
      userId,
      userName,
      userImage,
      nowTime,
      type
    });
    setChatMessage("");
  };

  // useEffect(() => {
  //   socket.on("message", message => {
  //     setMessages(messages => [...messages, message]);
  //   });

  // }, []);

  useEffect(() => {
    if (props.user) {
      var user_id = props.user._id;
      // console.log("GetMsgRoom");
      socket.emit("GetMsgRoom", { user_id });
    }
  }, [props.user]);

  return (
    <div>
      {/* {messages.length ? (
        <ChatHistory messages={messages} name={"Raj"} />
      ) : (
        <p>No message...</p>
      )} */}

      {messages.length ? (
        <ScrollToBottom className="message-content-inner">
          {chatHistory(messages)}
        </ScrollToBottom>
      ) : (
        <p>Start Messaging</p>
      )}

      <input
        value={chatMessage}
        onChange={e => setChatMessage(e.target.value)}
        onKeyPress={event =>
          event.key === "Enter" ? submitChatMessage() : null
        }
      />
      <button class="button ripple-effect" onClick={submitChatMessage}>
        Send
      </button>
    </div>
  );
}

export default Messages;
