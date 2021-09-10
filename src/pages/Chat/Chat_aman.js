import React, { useEffect, useState, useContext } from "react";
import io from "socket.io-client";
import moment from "moment";
import ScrollToBottom from "react-scroll-to-bottom";
import { Container, Row, Col, Button, ProgressBar } from "react-bootstrap";

import { UserContext } from "../../_hooks/UserContext";

import date from "date-and-time";

var socket = io(process.env.REACT_APP_API_BASE_URL, {
  transports: ["websocket"]
});

const chatHistory = (messages, user) => {
  // console.log("messages", messages);
  // console.log("user", user);
  return Object.entries(messages.messages).map((msg, i) => {
    var msg = msg[1];
    const mDate = date.format(new Date(msg.createdAt), "YYYY/MM/DD HH:mm A");
    // console.log("msg", msg, user);
    // console.log("msg.sender.id", msg.sender.id, user.id, msg.message);
    return (
      <>
        {(msg.sender.id && user.id && msg.sender.id == user.id) ||
        msg.sender == user.id ? (
          <div class="outgoing_msg" key={i}>
            <div class="sent_msg">
              <p>
                {msg.message}
                <span class="time_date"> {mDate} </span>
              </p>
            </div>
          </div>
        ) : (
          <div class="incoming_msg" key={i}>
            {msg.sender.profile ? (
              <div
                class="incoming_msg_img"
                style={{
                  background: `url(${process.env.REACT_APP_API_BASE_URL}/${msg.sender.profile.profile_image.path})`,
                  backgroundSize: "cover !important"
                }}
              ></div>
            ) : (
              <div class="incoming_msg_img"></div>
            )}

            <div class="received_msg">
              <div class="received_withd_msg">
                <p>
                  {msg.message}
                  <span class="time_date"> {mDate} </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </>
    );

    // return <p key={i}>{msg.message}</p>;
  });
};

const Chat = ({ project, curr_messages, loader }) => {
  const logged_user = useContext(UserContext);

  const [user] = useState(logged_user.user);
  // console.log("project", project);

  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState(curr_messages);

  const submitChatMessage = () => {
    socket.emit("SendMessage", {
      message: chatMessage,
      sender_id: user.id,
      room_id: messages.id,
      project: project._id
    });
    setChatMessage("");
  };

  // useEffect(() => {
  //   socket.on("message", message => {
  //     setMessages(messages => [...messages, message]);
  //   });

  // }, []);

  useEffect(() => {
    socket.emit("GetRoomMsg", messages.id);
  }, [user]);

  // useEffect(() => {
  //   socket.on("ReceiveMessage", message => {
  //     console.log("message", message);
  //     setMessages(message);
  //   });
  // }, []);

  useEffect(() => {
    socket.on("ReceiveMessage", message => {
      console.log("message", message);
      setMessages(message);
    });
  }, []);

  // console.log("messages.length", Object.entries(messages).length);
  return (
    <div
      className="dashboard-content-container col-lg-8 dashboard-new-block"
      data-simplebar
    >
      <div class="mesgs">
        <div className="top-dashboard">
          <Row>
            <Col lg={6} xs={12}>
              <div className=" fun-fact-heading active-block">
                <div className="fun-fact-head">
                  <span>Proposal 1</span>
                  <br></br>
                  <small>Meet the especially</small>
                </div>
              </div>
            </Col>
            <Col lg={3} xs={12}>
              <div className=" fun-fact-heading block2">
                <div className="fun-fact-head">
                  <span>Proposal 2</span>
                  <br></br>
                  <small></small>
                </div>
              </div>
            </Col>
            <Col lg={3} xs={12}>
              <div className=" fun-fact-heading block2">
                <div className="fun-fact-head">
                  <span>Proposal 3</span>
                  <br></br>
                  <small></small>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div class="msg_history">
          <div class="msg_history1">
            <Container>
              <Row>
                <div className="chat-date">
                  <small>15 september</small>
                  <br></br>
                </div>
                <div className="chat-date">
                  <small>Chat Initiated</small>
                </div>
              </Row>
            </Container>

            {Object.entries(messages).length ? (
              // <ScrollToBottom className="message-content-inner">// </ScrollToBottom>
              chatHistory(messages, user)
            ) : (
              <p>Start Messaging</p>
            )}
          </div>
        </div>
        <div class="type_msg">
          <div class="input_msg_write">
            <input
              value={chatMessage}
              onChange={e => setChatMessage(e.target.value)}
              onKeyPress={event =>
                event.key === "Enter" ? submitChatMessage() : null
              }
              type="text"
              class="write_msg"
              placeholder="Type a message"
            />
            <button class="msg_send_btn" type="button">
              <i class="icon-feather-upload"></i>
              <i class="icon-feather-mic"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
