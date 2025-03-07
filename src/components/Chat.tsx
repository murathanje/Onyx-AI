'use client';

import { useState, useEffect } from 'react';
import { LuSendHorizontal, LuCommand, LuX } from "react-icons/lu";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { FiUser } from "react-icons/fi";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const chatElement = document.getElementById('chat-popup');
      if (chatElement && !chatElement.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {!isOpen && (
        <button onClick={toggleChat} className="fixed bottom-4 right-4 bg-neutral-900 text-white p-3 rounded-full shadow-lg hover:bg-neutral-800 transition duration-200 z-50 flex items-center justify-center border border-neutral-700">
          <HiOutlineChatBubbleLeftRight className="w-6 h-6 text-green-200" />
        </button>
      )}
      {isOpen && (
        <div 
          id='chat-popup' 
          className="fixed h-[80vh] max-h-[600px] bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden transition-all duration-300 z-50 shadow-xl"
          style={{ 
            bottom: '1rem', 
            right: '1rem', 
            width: 'min(95vw, 360px)',
            maxWidth: '100%'
          }}
        >
          {/* Header */}
          <div className="p-3 border-b border-neutral-800 bg-neutral-900 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <HiOutlineChatBubbleLeftRight className="w-5 h-5 text-green-200" />
              <div>
                <h2 className="text-white font-medium text-base">Onyx AI</h2>
              </div>
            </div>
            <button onClick={toggleChat} className="text-neutral-400 hover:text-white transition duration-200 p-1 rounded-full hover:bg-neutral-800">
              <LuX className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 h-[calc(100%-110px)]">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-3">
                  <div className="bg-neutral-800 p-3 rounded-full inline-block">
                    <LuCommand className="w-6 h-6 text-green-200" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1 text-sm">Chat with Onyx AI</p>
                    <p className="text-neutral-400 text-xs">Ask anything about MultiversX blockchain</p>
                  </div>
                </div>
              </div>
            )}  
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start space-x-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="min-w-6 w-6 h-6 rounded-full flex items-center justify-center bg-neutral-800 shrink-0">
                    <HiOutlineChatBubbleLeftRight className="w-3.5 h-3.5 text-green-200" />
                  </div>
                )}
                <div
                  className={`flex flex-col max-w-[75%] rounded-lg p-3 ${message.role === 'user' ? 'bg-green-200 text-neutral-900 ml-auto' : 'bg-neutral-800 text-white'} break-words`}
                >
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                  {message.timestamp && (
                    <div className="text-[10px] mt-1 text-neutral-500 text-right">
                      {message.timestamp}
                    </div>
                  )}
                </div>
                {message.role === 'user' && (
                  <div className="min-w-6 w-6 h-6 rounded-full flex items-center justify-center bg-neutral-800 shrink-0">
                    <FiUser className="w-3.5 h-3.5 text-green-200" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start space-x-2">
                <div className="min-w-6 w-6 h-6 rounded-full flex items-center justify-center bg-neutral-800 shrink-0">
                  <HiOutlineChatBubbleLeftRight className="w-3.5 h-3.5 text-green-200" />
                </div>
                <div className="bg-neutral-800 text-white rounded-lg p-3">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-200 rounded-full animate-pulse"></div>
                    <div className="w-1.5 h-1.5 bg-green-200 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-green-200 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="border-t border-neutral-800 p-3 bg-neutral-900 absolute bottom-0 left-0 right-0">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full px-3 py-2 bg-neutral-800 text-white rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-green-200/30 placeholder-neutral-500 text-sm"
                />
                <div className="absolute right-2 top-2 px-1 py-0.5 rounded text-neutral-500 text-[10px] hidden sm:block">
                  ⌘ + ↵
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="p-2 bg-green-200 text-neutral-900 rounded-lg hover:bg-green-300 focus:outline-none focus:ring-1 focus:ring-green-200/50 disabled:opacity-50 transition-all duration-200 flex items-center justify-center shrink-0"
              >
                <LuSendHorizontal className={`w-4 h-4 text-neutral-900 ${isLoading ? 'opacity-50' : ''}`} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 