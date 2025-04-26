
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import { useAuth } from '@/context/AuthContext';
import { useWebSocket } from '@/context/WebSocketContext';
import { Shield, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const { authState, logout } = useAuth();
  const { wsState } = useWebSocket();
  const { user, isAuthenticated } = authState;
  
  return (
    <header className="border-b sticky top-0 z-30 bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <img src="favicon.ico" alt="favicon" className='h-5 w-5' />
          <Link to="/" className="text-xl font-bold">Analytics Dashboard</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated && (
            <div className="flex items-center space-x-1 mr-4">
              {wsState.connectionStatus.status === 'connected' && (
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2"></div>
                  <span className="text-sm text-muted-foreground">{wsState.liveUserCount} online</span>
                </div>
              )}
              {wsState.connectionStatus.status === 'connecting' && (
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse mr-2"></div>
                  <span className="text-sm text-muted-foreground">Connecting...</span>
                </div>
              )}
              {wsState.connectionStatus.status === 'disconnected' && (
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm text-muted-foreground">Offline</span>
                </div>
              )}
            </div>
          )}
          
          <ThemeToggle />
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Welcome, {user?.name}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout}
                className="flex items-center gap-1"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
