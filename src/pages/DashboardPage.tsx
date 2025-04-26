'use client';

import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useWebSocket } from '@/context/WebSocketContext';
import Header from '@/components/Header';
import MetricCard from '@/components/dashboard/MetricCard';
import LineChart from '@/components/dashboard/LineChart';
import BarChart from '@/components/dashboard/BarChart';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import { Users, Clock, BarChart3, Activity } from 'lucide-react';

// 1. Define a proper type for chart data points
type ChartDataPoint = {
  timestamp: string;
  value: number;
};

// 2. Generate mock data for charts
const generateTimeSeriesData = (points: number, baseValue: number, variance: number): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const now = new Date();
  
  for (let i = points; i >= 0; i--) {
    const date = new Date(now);
    date.setHours(now.getHours() - i);
    
    const value = Math.max(0, baseValue + Math.random() * variance - variance / 2);
    
    data.push({
      timestamp: date.toLocaleTimeString(),
      value: Math.floor(value),
    });
  }
  
  return data;
};

const DashboardPage: React.FC = () => {
  const { authState } = useAuth();
  const { wsState } = useWebSocket();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [usersData, setUsersData] = useState<ChartDataPoint[]>([]);
  const [activityData, setActivityData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setUsersData(generateTimeSeriesData(12, 75, 40));
      setActivityData(generateTimeSeriesData(12, 150, 100));
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Force redirect if not authenticated
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-6">
        <div className="grid gap-6">
          {/* Metrics row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard 
              title="Active Users" 
              value={isLoading ? "-" : wsState.liveUserCount}
              icon={<Users />}
              trend={!isLoading ? {
                value: 12,
                direction: "up"
              } : undefined}
              description="from last hour"
              loading={isLoading}
            />
            
            <MetricCard 
              title="Session Duration" 
              value={isLoading ? "-" : "24m 13s"}
              icon={<Clock />}
              trend={!isLoading ? {
                value: -5,
                direction: "down"
              } : undefined}
              description="from last week"
              loading={isLoading}
            />
            
            <MetricCard 
              title="Conversion Rate" 
              value={isLoading ? "-" : "3.2%"}
              icon={<BarChart3 />}
              trend={!isLoading ? {
                value: 8,
                direction: "up"
              } : undefined}
              description="from last month"
              loading={isLoading}
            />
            
            <MetricCard 
              title="Bounce Rate" 
              value={isLoading ? "-" : "42%"}
              icon={<Activity />}
              trend={!isLoading ? {
                value: -3,
                direction: "down"
              } : undefined}
              description="from last month"
              loading={isLoading}
            />
          </div>
          
          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LineChart
              title="Active Users Over Time"
              description="Number of active users in the last 12 hours"
              data={usersData}
              dataKey="value"
              loading={isLoading}
            />
            <BarChart
              title="Activity Metrics"
              description="User activity in the last 12 hours"
              data={activityData}
              dataKey="value"
              loading={isLoading}
            />
          </div>
          
          {/* Activity feed */}
          <div className="grid grid-cols-1 gap-6">
            <ActivityFeed />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
