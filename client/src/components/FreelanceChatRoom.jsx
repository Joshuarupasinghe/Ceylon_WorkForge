import React, { useState, useEffect, useRef } from 'react';

const ChatRoom = ({ client, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [client.messages]);

  // Handle window resize to ensure scroll works correctly
  useEffect(() => {
    const handleResize = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    const timeString = `${hours}:${minutes} ${ampm}`;

    const newMsg = {
      id: client.messages.length + 1,
      sender: 'You',
      text: newMessage,
      time: timeString
    };

    onSendMessage(client.id, newMsg);
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-700">
      {/* Header */}
      <div className="bg-gray-900 text-gray-300 p-4 rounded-t-2xl shadow-md">
        <h2 className="text-xl font-semibold">{client.name}</h2>
        <p className="text-sm text-gray-400">{client.project}</p>
      </div>

      {/* Messages Container - Fixed Height and Overflow */}
      <div 
        ref={messageContainerRef}
        className="flex-1 p-4 overflow-y-auto bg-gray-700"
        style={{ 
          height: "calc(100% - 140px)", 
          display: "flex", 
          flexDirection: "column" 
        }}
      >
        <div className="flex-1">
          {client.messages.map((message) => (
            <div key={message.id} className={`mb-4 flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2 rounded-2xl ${message.sender === 'You' ? 'bg-gray-600 text-gray-200' : 'bg-blue-500 text-white'}`}>
                <p>{message.text}</p>
                <span className="text-xs text-gray-400 block mt-1">{message.time}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 bg-gray-900 rounded-b-2xl">
        <div className="flex items-center">
          <textarea 
            className="flex-1 border rounded-full px-4 py-2 focus:ring-2 focus:ring-gray-500 resize-none bg-gray-700 text-gray-300" 
            placeholder="Type your message..." 
            rows="1" 
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            className="ml-2 p-2 bg-gray-600 text-gray-300 rounded-full hover:bg-gray-500" 
            onClick={handleSendMessage}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

const FreelanceChatRoom = () => {
  const [clients, setClients] = useState([
    { id: 1, name: 'Josuwa Perera', project: 'Photography Project', messages: [
        { id: 1, sender: 'Client', text: 'Hi!', time: '10:30 AM' },
        { id: 2, sender: 'You', text: 'Hello! How can I help you?', time: '10:32 AM' },
        { id: 3, sender: 'Client', text: 'I need some edits on my photos and to photoshop.', time: '10:35 AM' }
      ]
    },
    { id: 2, name: 'Sara B', project: 'E-commerce Store', messages: [
        { id: 1, sender: 'Client', text: 'Hello!', time: '11:00 AM' },
        { id: 2, sender: 'You', text: 'Hi! What do you need assistance with?', time: '11:02 AM' },
        { id: 3, sender: 'Client', text: 'I need help setting up my product listings.', time: '11:05 AM' }
      ]
    }
  ]);

  const [activeClientId, setActiveClientId] = useState(1);
  const activeClient = clients.find(client => client.id === activeClientId);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 p-6">
      {/* Client List Sidebar */}
      <div className="w-full md:w-1/4 bg-gray-800 p-4 rounded-2xl shadow-lg overflow-y-auto mb-4 md:mb-0 md:mr-4 md:h-auto">
        <h2 className="font-semibold text-xl mb-4 text-gray-300">Clients</h2>
        <div className="space-y-2">
          {clients.map(client => (
            <div 
              key={client.id} 
              onClick={() => setActiveClientId(client.id)} 
              className={`p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                client.id === activeClientId 
                  ? 'bg-gray-700 text-gray-300' 
                  : 'bg-gray-600 hover:bg-gray-500 text-gray-400'
              }`}
            >
              <h3 className="font-semibold text-lg">{client.name}</h3>
              <p className="text-sm text-gray-400">{client.project}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="w-full md:w-3/4 h-full">
        <ChatRoom 
          client={activeClient} 
          onSendMessage={(clientId, message) => {
            setClients(clients.map(client => 
              client.id === clientId 
                ? { ...client, messages: [...client.messages, message] } 
                : client
            ));
          }} 
        />
      </div>
    </div>
  );
};

export default FreelanceChatRoom;