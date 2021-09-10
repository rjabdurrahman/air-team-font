import React from "react";

function Chat(props) {
  return (
    <div className="dashboard-content-container" data-simplebar>
      <div className="dashboard-content-inner" style={{ padding: "0" }}>
        <div className="messages-container margin-top-0">
          <div className="messages-container-inner">
            {/* Message Content */}
            <div className="message-content">
              <div className="messages-headline">
                <h4>Sindy Forest</h4>
              </div>
              {/* Message Content Inner */}
              <div className="message-content-inner">
                {/* Time Sign */}
                <div className="message-time-sign">
                  <span>28 June, 2018</span>
                </div>
                <div className="message-bubble me">
                  <div className="message-bubble-inner">
                    <div className="message-avatar">
                      <img src="/images/user-avatar-small-01.jpg" alt="" />
                    </div>
                    <div className="message-text">
                      <p>
                        Thanks for choosing my offer. I will start working on
                        your project tomorrow.
                      </p>
                    </div>
                  </div>
                  <div className="clearfix" />
                </div>
                <div className="message-bubble">
                  <div className="message-bubble-inner">
                    <div className="message-avatar">
                      <img src="/images/user-avatar-small-02.jpg" alt="" />
                    </div>
                    <div className="message-text">
                      <p>
                        Great. If you need any further clarification let me
                        know. 👍
                      </p>
                    </div>
                  </div>
                  <div className="clearfix" />
                </div>
                <div className="message-bubble me">
                  <div className="message-bubble-inner">
                    <div className="message-avatar">
                      <img src="/images/user-avatar-small-01.jpg" alt="" />
                    </div>
                    <div className="message-text">
                      <p>Ok, I will. 😉</p>
                    </div>
                  </div>
                  <div className="clearfix" />
                </div>
                {/* Time Sign */}
                <div className="message-time-sign">
                  <span>Yesterday</span>
                </div>
                <div className="message-bubble me">
                  <div className="message-bubble-inner">
                    <div className="message-avatar">
                      <img src="/images/user-avatar-small-01.jpg" alt="" />
                    </div>
                    <div className="message-text">
                      <p>
                        Hi Sindy, I just wanted to let you know that project is
                        finished and I'm waiting for your approval.
                      </p>
                    </div>
                  </div>
                  <div className="clearfix" />
                </div>
                <div className="message-bubble">
                  <div className="message-bubble-inner">
                    <div className="message-avatar">
                      <img src="/images/user-avatar-small-02.jpg" alt="" />
                    </div>
                    <div className="message-text">
                      <p>
                        Hi Tom! Hate to break it to you, but I'm actually on
                        vacation 🌴 until Sunday so I can't check it now. 😎
                      </p>
                    </div>
                  </div>
                  <div className="clearfix" />
                </div>
                <div className="message-bubble me">
                  <div className="message-bubble-inner">
                    <div className="message-avatar">
                      <img src="/images/user-avatar-small-01.jpg" alt="" />
                    </div>
                    <div className="message-text">
                      <p>
                        Ok, no problem. But don't forget about last payment. 🙂
                      </p>
                    </div>
                  </div>
                  <div className="clearfix" />
                </div>
                <div className="message-bubble">
                  <div className="message-bubble-inner">
                    <div className="message-avatar">
                      <img src="/images/user-avatar-small-02.jpg" alt="" />
                    </div>
                    <div className="message-text">
                      {/* Typing Indicator */}
                      <div className="typing-indicator">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>
                  <div className="clearfix" />
                </div>
              </div>
              {/* Message Content Inner / End */}
              {/* Reply Area */}
              <div className="message-reply">
                <textarea
                  cols={1}
                  rows={1}
                  placeholder="Your Message"
                  data-autoresize
                  defaultValue={""}
                />
                <button className="button ripple-effect">Send</button>
              </div>
            </div>
            {/* Message Content */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
