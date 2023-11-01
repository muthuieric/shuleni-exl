import React, { useEffect, useState } from "react";
import Search from "./Search";
import MessageList from "./MessageList";
import NewMessage from "./NewMessage";
import Sidebar from "../SideBar";

const testUser = { username: "Eric" };

function Chat() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/messages")
      .then((r) => r.json())
      .then((messages) => setMessages(messages));
  }, []);

  function handleAddMessage(newMessage) {
    setMessages([...messages, newMessage]);
  }

  function handleDeleteMessage(id) {
    const updatedMessages = messages.filter((message) => message.id !== id);
    setMessages(updatedMessages);
  }

  function handleUpdateMessage(updatedMessageObj) {
    const updatedMessages = messages.map((message) => {
      if (message.id === updatedMessageObj.id) {
        return updatedMessageObj;
      } else {
        return message;
      }
    });
    setMessages(updatedMessages);
  }

  const displayedMessages = messages.filter((message) =>
    message.body.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="w-full p-2 border-r border-gray-200">
        <h1 className="text-blue-600 text-2xl mb-2 font-bold text-center">Chat Room</h1>
          <Search search={search} onSearchChange={setSearch} />
          <MessageList
            messages={displayedMessages}
            currentUser={testUser}
            onMessageDelete={handleDeleteMessage}
            onUpdateMessage={handleUpdateMessage}
          />
          <NewMessage currentUser={testUser} onAddMessage={handleAddMessage} />
        </div>
      </div>
  );
}

export default Chat;
