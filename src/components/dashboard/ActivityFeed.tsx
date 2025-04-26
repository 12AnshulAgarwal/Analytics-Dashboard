
import { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useWebSocket } from '@/context/WebSocketContext';

const ActivityFeed = () => {
  const { wsState } = useWebSocket();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new activities arrive
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [wsState.activityFeed]);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle>Activity Feed</CardTitle>
        <CardDescription>
          Real-time user activity on the platform
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px] p-4" ref={scrollAreaRef}>
          {wsState.connectionStatus.status !== 'connected' ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-sm text-muted-foreground">
                {wsState.connectionStatus.status === 'connecting'
                  ? 'Connecting to server...'
                  : 'Disconnected from server'}
              </p>
            </div>
          ) : wsState.activityFeed.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-sm text-muted-foreground">No activity yet</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {wsState.activityFeed.map((activity, index) => (
                <li
                  key={index}
                  className="text-sm p-2 border-b border-border last:border-0"
                >
                  {activity}
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
