import React from "react";
import Message from "./Message";

function MessageList({ messages, currentUser, onMessageDelete, onUpdateMessage }) {
  return (
    <div className="border border-gray-200 p-2 h-3/4 overflow-y-scroll rounded-xl">
      <ul>
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            currentUser={currentUser}
            onMessageDelete={onMessageDelete}
            onUpdateMessage={onUpdateMessage}
          />
        ))}
      </ul>
    </div>
  );
}

export default MessageList;
