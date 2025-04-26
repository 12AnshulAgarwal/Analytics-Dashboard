
import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { WebSocketState } from '@/types';
import { toast } from 'sonner';

interface WebSocketContextProps {
  wsState: WebSocketState;
  sendMessage: (message: string) => void;
}

const WebSocketContext = createContext<WebSocketContextProps | undefined>(undefined);

// Mock WebSocket data for simulation
const generateRandomUserCount = () => Math.floor(Math.random() * 100) + 10;
const generateRandomActivity = () => {
  const activities = [
    'User logged in',
    'Report generated',
    'Dashboard viewed',
    'Settings updated',
    'Profile edited',
    'Data exported',
    'New comment added',
    'Item deleted',
  ];
  return activities[Math.floor(Math.random() * activities.length)];
};

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wsState, setWsState] = useState<WebSocketState>({
    connectionStatus: { status: 'disconnected', lastUpdated: Date.now() },
    liveUserCount: 0,
    activityFeed: [],
  });
  
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);
  const mockIntervalRef = useRef<number | null>(null);

  const connect = useCallback(() => {
    try {
      // In a real application, we would connect to an actual WebSocket server
      // For this demo, we'll simulate the connection
      setWsState(prev => ({
        ...prev,
        connectionStatus: { status: 'connecting', lastUpdated: Date.now() }
      }));

      // Simulate successful connection after a delay
      setTimeout(() => {
        setWsState(prev => ({
          ...prev,
          connectionStatus: { status: 'connected', lastUpdated: Date.now() },
          liveUserCount: generateRandomUserCount()
        }));

        // Start mock updates when connected
        if (!mockIntervalRef.current) {
          mockIntervalRef.current = window.setInterval(() => {
            setWsState(prev => {
              const newActivity = generateRandomActivity();
              const timestamp = new Date().toLocaleTimeString();
              return {
                ...prev,
                liveUserCount: generateRandomUserCount(),
                activityFeed: [...prev.activityFeed, `${timestamp} - ${newActivity}`].slice(-20)
              };
            });
          }, 3000);
        }
      }, 1500);
    } catch (error) {
      console.error('WebSocket connection error:', error);
      handleDisconnect();
    }
    
    return () => {
      if (mockIntervalRef.current) {
        clearInterval(mockIntervalRef.current);
        mockIntervalRef.current = null;
      }
    };
  }, []);

  const handleDisconnect = useCallback(() => {
    setWsState(prev => ({
      ...prev,
      connectionStatus: { status: 'disconnected', lastUpdated: Date.now() }
    }));

    if (mockIntervalRef.current) {
      clearInterval(mockIntervalRef.current);
      mockIntervalRef.current = null;
    }

    // Attempt to reconnect
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    reconnectTimeoutRef.current = window.setTimeout(() => {
      toast.info('Attempting to reconnect...');
      connect();
    }, 5000);
  }, [connect]);

  const sendMessage = (message: string) => {
    if (wsState.connectionStatus.status !== 'connected') {
      toast.error('Cannot send message: not connected');
      return;
    }
    
    // In a real app, we would send the message to the WebSocket server
    console.log('Sending message:', message);
    
    // Simulate receiving a response
    setTimeout(() => {
      setWsState(prev => {
        const timestamp = new Date().toLocaleTimeString();
        return {
          ...prev,
          activityFeed: [...prev.activityFeed, `${timestamp} - Message sent: ${message.substring(0, 20)}...`].slice(-20)
        };
      });
    }, 500);
  };

  useEffect(() => {
    connect();
    
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (mockIntervalRef.current) {
        clearInterval(mockIntervalRef.current);
      }
    };
  }, [connect]);

  return (
    <WebSocketContext.Provider value={{ wsState, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
