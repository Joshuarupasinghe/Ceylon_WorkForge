import { Card } from "../../components/ui/card";
import { useState } from "react";

export function Messages() {
  const [conversations] = useState([
    {
      id: 1,
      name: "Jane Smith",
      lastMessage: "Hi, I've completed the design drafts...",
      time: "10:30 AM",
      unread: true,
    },
    // ... other conversations
  ]);

  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageText, setMessageText] = useState("");
  const [messages] = useState([
    { id: 1, sender: "them", text: "Hi there! I've just finished...", time: "10:15 AM" },
    // ... other messages
  ]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim() === "") return;
    setMessageText("");
  };

  return (
    <Card className="h-[calc(100vh-12rem)]">
      <div className="h-full flex flex-col md:flex-row">
        {/* Conversations List */}
        <div className="w-full md:w-1/3 border-r">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Messages</h2>
          </div>
          <ul className="divide-y">
            {conversations.map((conversation) => (
              <li
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`p-4 cursor-pointer ${
                  selectedConversation.id === conversation.id ? "bg-gray-50 dark:bg-gray-800" : ""
                }`}
              >
                {/* Conversation item implementation */}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h3 className="font-medium">{selectedConversation.name}</h3>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-md rounded-lg p-3 ${
                  message.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-700"
                }`}>
                  <p>{message.text}</p>
                  <p className="text-xs mt-1">{message.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <form onSubmit={sendMessage} className="flex space-x-2">
              <input
                type="text"
                className="flex-1 border rounded-lg px-4 py-2"
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </Card>
  );
}