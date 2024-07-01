import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const saveStateToLocalStorage = (state) => {
    localStorage.setItem("chatbotState", JSON.stringify(state));
  };

  const loadStateFromLocalStorage = () => {
    const state = localStorage.getItem("chatbotState");
    return state
      ? JSON.parse(state)
      : {
          isOpen: false,
          messages: [
            {
              type: "incoming",
              text: "Hi there 👋\nHow can I help you today?",
            },
          ],
        };
  };

  const initialState = loadStateFromLocalStorage();
  const [isOpen, setIsOpen] = useState(initialState.isOpen);
  const [messages, setMessages] = useState(initialState.messages);
  const [input, setInput] = useState("");
  const [awaitingEmail, setAwaitingEmail] = useState(false); // State to track if bot is awaiting email
  const chatboxRef = useRef(null);
  const chatInputRef = useRef(null);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    saveStateToLocalStorage({ isOpen, messages });
  }, [isOpen, messages]);

  const toggleChatbot = () => {
    document.body.classList.toggle("show-chatbot");
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
    chatInputRef.current.style.height = "auto";
    chatInputRef.current.style.height = `${Math.min(event.target.scrollHeight, 180)}px`;
  };

  const sendMessage = () => {
    const userMessage = input.trim();
    if (!userMessage) return;

    setMessages([...messages, { type: "outgoing", text: userMessage }]);
    setInput("");

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "incoming", text: "Thinking..." },
      ]);

      generateResponse(userMessage);
    }, 600);
  };

  // Manually create keyword-response pairs
  const keywordResponses = [
    { keywords: ["greetings", "salutations", "hello", "hi", "hey"], response: "Hello! How can I help you today?" },
    { keywords: ["buy", "sell",  "rent", "shortlet"], response: "To Buy, rent, sell,or shortlet an aprtment go to Buy Page and scroll through various houses " },
    { keywords: ["assistance", "aid", "help", "support"], response: "I'm here to help! What do you need assistance with?" },
    { keywords: ["signup", "register", "create", "account", "open"], response: "To create an account, go to the signup page and fill out the form with your details. Once you submit the form, you will receive a confirmation email." },
    { keywords: ["forgot", "reset", "password"], response: "To reset your password, click on the 'Forgot Password' link on the login page and follow the instructions." },
    { keywords: ["edit", "modify", "update", "profile"], response: "To update your profile information, go to the profile settings page and make the necessary changes." },
    { keywords: ["modify", "change", "email"], response: "To change your email address, go to the account settings page and update your email information." },
    { keywords: ["modify", "change", "password"], response: "To change your password, go to the account settings page and update your password." },
    { keywords: ["adjust", "manage", "notifications"], response: "To manage your notifications, go to the notification settings page and adjust your preferences." },
    { keywords: ["single", "multiple", "accounts"], response: "No, our policy does not allow multiple accounts per user." },
    { keywords: ["submit", "report", "bug"], response: "To report a bug, go to the support page and submit a bug report form." },
    { keywords: ["flag", "report", "inappropriate", "content"], response: "To report inappropriate content, click on the report button next to the content in question." },
    { keywords: ["give", "provide", "feedback"], response: "To provide feedback, go to the feedback page and fill out the feedback form." },
    { keywords: ["alert", "report", "security", "issue"], response: "To report a security issue, contact our security team at security@example.com." },
    { keywords: ["alert", "report", "copyright", "infringement"], response: "To report a copyright infringement, contact our legal team at legal@example.com." },
    { keywords: ["alert", "report", "billing", "issue"], response: "To report a billing issue, contact our billing support at billing@example.com." },
    { keywords: ["alert", "report", "violation", "terms"], response: "To report a violation of terms, use the report feature or contact our support team." },
    { keywords: ["alert", "report", "privacy", "concern"], response: "To report a privacy concern, contact our privacy team at privacy@example.com." },
    { keywords: ["alert", "report", "scam", "phishing"], response: "To report a scam or phishing attempt, forward the suspicious email to phishing@example.com." },
    { keywords: ["submit", "report", "error", "app"], response: "To report an error in the app, use the feedback feature or contact our support team." },
    { keywords: ["submit", "report", "broken", "feature"], response: "To report a broken feature, use the bug report form on the support page." },
  ];

  const generateResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    let response = null;

    console.log("User message:", userMessage); // Logging user message

    for (const pair of keywordResponses) {
      const matched = pair.keywords.some(keyword =>
        lowerCaseMessage.includes(keyword)
      );
      console.log("Checking keywords:", pair.keywords, "Matched:", matched); // Logging keyword checking
      if (matched) {
        response = pair.response;
        break;
      }
    }

    if (!response) {
      response = "Sorry, I couldn't find an answer to your question. Please send your email and leave a message, and someone will get back to you.";
      setAwaitingEmail(true); // Set flag to indicate bot is awaiting email
    }

    console.log("Response:", response);

    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      updatedMessages.pop(); // Remove "Thinking..." message
      updatedMessages.push({
        type: "incoming",
        text: response,
      });
      return updatedMessages;
    });
  };

  const checkForEmailInMessage = (userMessage) => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    if (emailRegex.test(userMessage)) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "incoming", text: "Email and message received. Thank you!" },
      ]);
      setAwaitingEmail(false); // Clear the flag as email has been received
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "incoming", text: "Please make sure to include your email in the message." },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
      e.preventDefault();
      if (awaitingEmail) {
        checkForEmailInMessage(input);
      } else {
        sendMessage();
      }
    }
  };

  const clearChat = () => {
    setMessages([
      {
        type: "incoming",
        text: "Hi there 👋\nHow can I help you today?",
      },
    ]);
  };

  return (
    <div>
      <button className="chatbot-toggler" onClick={toggleChatbot}>
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-outlined">close</span>
      </button>
      {isOpen && (
        <div className="chatbot">
          <header>
            <h2>Chatbot</h2>
            <span
              className="close-btn material-symbols-outlined"
              onClick={toggleChatbot}
            >
              close
            </span>
            <button onClick={clearChat} className="clear-btn">
              Clear Chat
            </button>
          </header>
          <ul className="chatbox" ref={chatboxRef}>
            {messages.map((message, index) => (
              <li key={index} className={`chat ${message.type}`}>
                {message.type === "incoming" && (
                  <span className="material-symbols-outlined">smart_toy</span>
                )}
                <p>{message.text}</p>
              </li>
            ))}
          </ul>
          <div className="chat-input">
            <textarea
              placeholder="Enter a message..."
              spellCheck="false"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              ref={chatInputRef}
              required
            />
            <span
              id="send-btn"
              className="material-symbols-rounded"
              onClick={sendMessage}
            >
              send
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
