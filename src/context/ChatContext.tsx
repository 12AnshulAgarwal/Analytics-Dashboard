
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Message, ChatState } from '@/types';
import { toast } from 'sonner';

interface ChatContextProps {
  chatState: ChatState;
  sendMessage: (content: string) => void;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

// Mock responses for the chatbot
const botResponses = [
  "How can I help you with the dashboard today?",
  "Need help understanding any of the metrics?",
  "I noticed you haven't interacted in a while. Do you need assistance?",
  "Is there anything specific you're looking for?",
  "Feel free to ask me any questions about the analytics.",
  "I'm here to help if you need any clarification on the data.",
];

const getRandomResponse = () => {
  return botResponses[Math.floor(Math.random() * botResponses.length)];
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  const [inactivityTimer, setInactivityTimer] = useState<number | null>(null);

  const sendMessage = (content: string) => {
    if (!content.trim()) return;
    
    // Reset inactivity timer
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: Date.now(),
    };
    
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
    }));
    
    // Simulate bot response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getRandomResponse(),
        sender: 'bot',
        timestamp: Date.now(),
      };
      
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        isLoading: false,
      }));
      
      // Set new inactivity timer
      startInactivityTimer();
    }, 1000);
  };
  
  const clearChat = () => {
    setChatState({
      messages: [],
      isLoading: false,
      error: null,
    });
    
    toast.info('Chat history cleared');
  };
  
  const startInactivityTimer = () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
    
    // Set a 30 second timer for inactivity
    const timer = window.setTimeout(() => {
      const inactivityMessage: Message = {
        id: Date.now().toString(),
        content: "I noticed you've been inactive. Is there anything I can help you with?",
        sender: 'bot',
        timestamp: Date.now(),
      };
      
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, inactivityMessage],
      }));
    }, 30000);
    
    setInactivityTimer(timer);
  };
  
  // Effect to load chat history from localStorage
  useEffect(() => {
    const savedChat = localStorage.getItem('chatHistory');
    if (savedChat) {
      try {
        const parsedChat = JSON.parse(savedChat);
        setChatState(prev => ({
          ...prev,
          messages: parsedChat.messages || [],
        }));
      } catch (error) {
        console.error('Failed to parse chat history:', error);
      }
    }
    
    // Start inactivity timer
    startInactivityTimer();
    
    return () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
    };
  }, []);
  
  // Save chat history to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify({
      messages: chatState.messages,
    }));
  }, [chatState.messages]);

  return (
    <ChatContext.Provider value={{ chatState, sendMessage, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
