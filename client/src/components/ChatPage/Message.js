import React, { useState } from "react";
import EditMessage from "./EditMessage";

function Message({ message, currentUser, onMessageDelete, onUpdateMessage }) {
  const [isEditing, setIsEditing] = useState(false);

  const { id, username, body, created_at: createdAt } = message;

  const timestamp = new Date(createdAt).toLocaleTimeString();

  const isCurrentUser = currentUser.username === username;

  function handleDeleteClick() {
    fetch(`/messages/${id}`, {
      method: "DELETE",
    });

    onMessageDelete(id);
  }

  function handleUpdateMessage(updatedMessage) {
    setIsEditing(false);
    onUpdateMessage(updatedMessage);
  }

  return (
    <li className="p-2 mb-2">
   <div className="text-center">    
  {isCurrentUser && (
    <div className="text-black ">
      <span className="mr-2 font-semibold">{username}</span>
      {timestamp}
    </div>
  )}
</div>

      <div className="text-center mb-2">
            <button
              className="text-blue-600 hover:text-blue-700 mr-2"
              onClick={() => setIsEditing((isEditing) => !isEditing)}
            >
              ✏️ 
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={handleDeleteClick}
            >
              🗑
            </button>
          </div>
          
      {isEditing ? (
        <EditMessage id={id} body={body} onUpdateMessage={handleUpdateMessage} />
      ) : (
        <p className="border border-gray-300 p-2 mb-2 rounded-lg w-fit">{body}</p>
      )}
    </li>
  );
}

export default Message;
