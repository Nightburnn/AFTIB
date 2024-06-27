import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const saveStateToLocalStorage = (state) => {
    localStorage.setItem('chatbotState', JSON.stringify(state));
  };

  const loadStateFromLocalStorage = () => {
    const state = localStorage.getItem('chatbotState');
    return state ? JSON.parse(state) : { isOpen: false, messages: [{ type: 'incoming', text: 'Hi there 👋\nHow can I help you today?' }] };
  };

  const initialState = loadStateFromLocalStorage();
  const [isOpen, setIsOpen] = useState(initialState.isOpen);
  const [messages, setMessages] = useState(initialState.messages);
  const [input, setInput] = useState('');
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
    document.body.classList.toggle('show-chatbot');
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
    chatInputRef.current.style.height = 'auto';
    chatInputRef.current.style.height = `${Math.min(event.target.scrollHeight, 180)}px`; 
  };

  const sendMessage = () => {
    const userMessage = input.trim();
    if (!userMessage) return;

    setMessages([...messages, { type: 'outgoing', text: userMessage }]);
    setInput('');

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'incoming', text: 'Thinking...' }
      ]);

      generateResponse(userMessage);
    }, 600);
  };

  const generateResponse = (userMessage) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_URL}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }]
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages.pop(); 
          updatedMessages.push({ type: 'incoming', text: data.choices[0].message.content.trim() });
          return updatedMessages;
        });
      } else {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages.pop();
          updatedMessages.push({ type: 'incoming', text: 'Oops! I couldn\'t generate a response. Please try again.' });
          return updatedMessages;
        });
      }
    })
    .catch(() => {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages.pop(); 
        updatedMessages.push({ type: 'incoming', text: 'Oops! Something went wrong. Please try again.' });
        return updatedMessages;
      });
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 800) {
      e.preventDefault();
      sendMessage();
    }
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
            <span className="close-btn material-symbols-outlined" onClick={toggleChatbot}>close</span>
          </header>
          <ul className="chatbox" ref={chatboxRef}>
            {messages.map((message, index) => (
              <li key={index} className={`chat ${message.type}`}>
                {message.type === 'incoming' && <span className="material-symbols-outlined">smart_toy</span>}
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
            <span id="send-btn" className="material-symbols-rounded" onClick={sendMessage}>send</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
