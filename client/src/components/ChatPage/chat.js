import React, { useState } from 'react';
import Sidebar from '../SideBar';

const Chat = () => {
  const [messages, setMessages] = useState([]); // State to store messages
  const [inputMessage, setInputMessage] = useState(''); // State to store the input message

  // Function to handle sending a message
  const sendMessage = () => {
    if (inputMessage) {
      setMessages([...messages, inputMessage]);
      setInputMessage('');
    }
  };

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="w-full p-2 border-r border-gray-200">
        {/* Chat messages */}
        <div className="text-blue-600 text-2xl mb-2 font-bold text-center">Chat Room</div>
        <div className="border border-gray-200 p-2 h-3/4 overflow-y-scroll rounded-xl">
          {messages.map((message, index) => (
            <div
              key={index}
              className="border border-gray-300 p-2 mb-2 rounded-lg w-fit"
            >
              {message}
            </div>
          ))}
        </div>
        {/* Message input and Send button */}
        <div className="mt-4 flex">
          <input
            type="text"
            className="border border-solid p-2 w-4/5 rounded-xl border-gray-300 focus:outline-none focus:border-solid focus:border-blue-600"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white w-1/5 ml-2 rounded-xl"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
