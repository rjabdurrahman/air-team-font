import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import { Link, useParams } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { DateTimeAgo } from "../../utils/DateTimeAgo";
import io from "socket.io-client";
import ReactEmoji from "react-emoji";

var socket = io(process.env.REACT_APP_API_BASE_URL, {
  transports: ["websocket"]
});

const chatRoomsList = (chat_rooms, current) => {
  console.log("current", current);
  return chat_rooms.map((chatRoom, index) => {
    // console.log("chatRoom", chatRoom);
    return (
      <li
        key={index}
        className={chatRoom._id === current ? "active-message" : ""}
      >
        <Link
          to={`/creator-dash/messages?room=${chatRoom._id}`}
          style={{ textDecoration: "none" }}
        >
          <div className="message-avatar">
            {chatRoom.creator.profile ? (
              <img
                src={`${process.env.REACT_APP_API_BASE_URL}/${chatRoom.creator.profile.profile_image.path}`}
                alt=""
              />
            ) : (
              <></>
            )}
          </div>
          <div className="message-by">
            <div className="message-by-headline">
              <h5>{chatRoom.creator.name}</h5>
              <span>{DateTimeAgo(chatRoom.updatedAt)}</span>
            </div>
            <p>{chatRoom.project.project_title}</p>
          </div>
        </Link>
      </li>
    );
  });
};

const chatHistory = (messages, user) => {
  return Object.entries(messages.messages).map((msg, i) => {
    var msg = msg[1];
    return (
      <>
        {(msg.sender.id && user.id && msg.sender.id == user.id) ||
        msg.sender == user.id ? (
          <div className="message-bubble me">
            <div className="message-bubble-inner">
              <div className="message-avatar">
                {msg.sender.profile ? (
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}/${msg.sender.profile.profile_image.path}`}
                    alt={`${msg.sender.name}`}
                  />
                ) : (
                  <img
                    src="/images/user-avatar-placeholder.png"
                    alt={`${msg.sender.name}`}
                  />
                )}
              </div>
              <div className="message-text">
                <p>
                  {ReactEmoji.emojify(msg.message)}
                  <small style={{ marginLeft: "10px" }}>
                    {DateTimeAgo(msg.createdAt)}
                  </small>
                </p>
              </div>
            </div>
            <div className="clearfix" />
          </div>
        ) : (
          <div className="message-bubble">
            <div className="message-bubble-inner">
              <div className="message-avatar">
                {msg.sender.profile ? (
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}/${msg.sender.profile.profile_image.path}`}
                    alt={`${msg.sender.name}`}
                  />
                ) : (
                  <img
                    src="/images/user-avatar-placeholder.png"
                    alt={`${msg.sender.name}`}
                  />
                )}
              </div>
              <div className="message-text">
                <p>
                  {ReactEmoji.emojify(msg.message)}
                  <small style={{ marginLeft: "10px" }}>
                    {DateTimeAgo(msg.createdAt)}
                  </small>
                </p>
              </div>
            </div>
            <div className="clearfix" />
          </div>
        )}
      </>
    );
  });
};

function Messages(props) {
  const messageRef = useRef();

  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const [currentChats, setCurrentChats] = useState([]);
  const [chatMessage, setChatMessage] = useState("");
  const [user] = useState(props.user);

  const params = new URLSearchParams(window.location.search);
  let room = params.get("room");

  useEffect(() => {
    // alert();
    if (room != undefined && room != null) socket.emit("GetRoomMsg", room);
  }, [room]);

  useEffect(() => {
    if (user) {
      if (room != undefined && room != null) {
        socket.on("ReceiveMessage", message => {
          if (room == message._id) setCurrentChats(message);
        });
      }
    }

    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end"
      });
    }
  });

  useEffect(() => {
    setLoader(true);
    // console.log("user from", user);
    if (user == undefined) {
      NotificationManager.error("Invalid request, Please try again");
      // alert("Invalid request, Please try again");
      window.location.href = "/creator-dash";
    }
    axios
      .get(process.env.REACT_APP_API_BASE_URL + `/messages/lists/${user._id}`)
      .then(res => {
        if (res.data.status) {
          setChatRooms(res.data.result);
          setLoader(false);
        }
      })
      .catch(error => {
        setLoader(false);
        if (error.response != "undefined" && error.response) {
          if (error.response.status == 404) {
            NotificationManager.error(
              "Page not found, Please try again",
              "Error !!!"
            );
          } else if (error.response.data.errors.message.length) {
            NotificationManager.error(
              error.response.data.errors.message,
              error.response.data.errors.title
            );
          }
        }
      });
  }, [user]);

  const submitChatMessage = () => {
    var payload = {
      message: chatMessage,
      sender_id: user.id,
      room_id: room,
      project: currentChats.project._id
    };
    // console.log("payload", payload);
    socket.emit("SendMessage", payload);
    setChatMessage("");
  };

  return (
    <>
      <LoadingOverlay active={loader} spinner text="Loading...">
        <style>
          {
            "\
          .dashboard-content-inner { padding: 10px !important;}\
          "
          }
        </style>
        {/* Dashboard Content
	================================================== */}
        <div className="dashboard-content-container" data-simplebar>
          <div
            className="dashboard-content-inner"
            style={{ padding: "0px !important" }}
          >
            {/* Dashboard Headline */}

            <div className="messages-container margin-top-0">
              <div className="messages-container-inner">
                {/* Messages */}
                {chatRooms.length > 0 ? (
                  <>
                    <div className="messages-inbox">
                      <ul>{chatRoomsList(chatRooms, room)}</ul>
                    </div>
                    {/* Messages / End */}
                    {/* Message Content */}
                    <div className="message-content">
                      {/* Message Content Inner */}

                      {Object.entries(currentChats).length ? (
                        <>
                          <div className="messages-headline">
                            <h4>Sindy Forest</h4>
                          </div>
                          <div
                            className="message-content-inner"
                            style={{ height: "450px" }}
                          >
                            <div ref={messageRef}>
                              {chatHistory(currentChats, user)}
                            </div>
                          </div>
                          <div className="message-reply">
                            <input
                              style={{ boxShadow: "none" }}
                              placeholder="Your Message"
                              data-autoresize
                              defaultValue={""}
                              value={chatMessage}
                              onChange={e => setChatMessage(e.target.value)}
                              onKeyPress={event =>
                                event.key === "Enter"
                                  ? submitChatMessage()
                                  : null
                              }
                            />
                            <button className="button ripple-effect">
                              Send
                            </button>
                          </div>
                        </>
                      ) : (
                        <div
                          className="message-content-inner"
                          style={{ height: "100vh", maxHeight: "600px" }}
                        >
                          <div
                            className="notification notice no-shadow"
                            style={{ padding: "20%", textAlign: "center" }}
                          >
                            <i
                              className="icon-line-awesome-exclamation-circle"
                              style={{ fontSize: "120px" }}
                            ></i>
                            <p>Select Message...</p>
                          </div>
                        </div>
                      )}

                      {/* Message Content Inner / End */}
                      {/* Reply Area */}
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="message-content-inner"
                      style={{ height: "100vh", maxHeight: "500px" }}
                    >
                      <div
                        className="notification error no-shadow"
                        style={{
                          padding: "20%",
                          textAlign: "center",
                          height: "420px"
                        }}
                      >
                        <i
                          className="icon-line-awesome-exclamation-circle"
                          style={{ fontSize: "120px" }}
                        ></i>
                        <p>You have not received any message yet.</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* Messages Container / End */}
            {/* Footer */}

            {/* Footer / End */}
          </div>
        </div>
        {/* Dashboard Content / End */}
      </LoadingOverlay>
    </>
  );
}

export default Messages;
