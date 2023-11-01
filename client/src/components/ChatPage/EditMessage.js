import React, { useState } from "react";

function EditMessage({ id, body, onUpdateMessage }) {
  const [messageBody, setMessageBody] = useState(body);

  function handleFormSubmit(e) {
    e.preventDefault();

    fetch(`/messages/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: messageBody,
      }),
    })
      .then((r) => r.json())
      .then((updatedMessage) => onUpdateMessage(updatedMessage));
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="body"
        autoComplete="oFF"
        value={messageBody}
        onChange={(e) => setMessageBody(e.target.value)}
        className="bg-white text-black rounded-xl p-2 border border-solid focus:outline-none border-gray-300 focus:border-solid "
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-2 ml-2"
      >
        Save
      </button>
    </form>
  );
}

export default EditMessage;
