
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface DashboardMetric {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface ActivityData {
  timestamp: string;
  value: number;
}

export interface UserData {
  timestamp: string;
  activeUsers: number;
}

export interface ConnectionStatus {
  status: 'connected' | 'disconnected' | 'connecting';
  lastUpdated: number;
}

export interface WebSocketState {
  connectionStatus: ConnectionStatus;
  liveUserCount: number;
  activityFeed: string[];
}
