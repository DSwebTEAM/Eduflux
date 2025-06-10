import React, { useState } from 'react';
import { X, Send, Bot, User } from 'lucide-react';

interface ChatbotProps {
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function Chatbot({ onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI learning assistant. I can help you with NCERT Class 12 topics in Physics, Chemistry, and Mathematics. What would you like to learn about?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('electric') || input.includes('charge')) {
      return 'Electric charge is a fundamental property of matter. There are two types: positive and negative. Like charges repel, unlike charges attract. The elementary charge is 1.6 × 10⁻¹⁹ C. Would you like to know more about Coulomb\'s law or electric fields?';
    } else if (input.includes('crystal') || input.includes('solid')) {
      return 'Solids can be classified as crystalline (regular arrangement) or amorphous (irregular arrangement). Crystalline solids include ionic, molecular, covalent network, and metallic solids. Each has distinct properties based on bonding. What specific aspect would you like to explore?';
    } else if (input.includes('relation') || input.includes('function')) {
      return 'Relations are subsets of Cartesian products. Key types include reflexive, symmetric, transitive, and equivalence relations. Functions are special relations where each input maps to exactly one output. Would you like examples or more details about any specific type?';
    } else if (input.includes('help') || input.includes('what')) {
      return 'I can help you with:\n• Physics concepts (electricity, magnetism, optics, etc.)\n• Chemistry topics (solid state, solutions, thermodynamics, etc.)\n• Mathematics (relations, functions, calculus, etc.)\n• Solving problems and understanding formulas\n• Explaining key concepts and providing examples\n\nWhat specific topic would you like to explore?';
    } else {
      return 'That\'s an interesting question! While I\'d love to help with that specific topic, I\'m currently focused on NCERT Class 12 Physics, Chemistry, and Mathematics. Could you ask me something about these subjects? For example, you could ask about electric charges, chemical bonding, or mathematical functions.';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md h-96 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Bot className="h-6 w-6 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">AI Assistant</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' ? 'bg-indigo-600' : 'bg-gray-200'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-gray-600" />
                  )}
                </div>
                <div className={`p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me about NCERT topics..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}