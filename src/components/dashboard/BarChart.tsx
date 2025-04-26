
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart as RechartBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '@/context/ThemeContext';

interface BarChartProps {
  title: string;
  description?: string;
  data: Array<{ timestamp: string; value: number }>;
  dataKey: string;
  loading?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({
  title,
  description,
  data,
  dataKey,
  loading = false,
}) => {
  const { theme } = useTheme();
  const [chartColor, setChartColor] = useState('#3b82f6');

  useEffect(() => {
    setChartColor(theme === 'dark' ? '#60a5fa' : '#3b82f6');
  }, [theme]);

  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="h-[300px] bg-muted/20"></CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartBarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis
              dataKey="timestamp"
              tick={{ fontSize: 12 }}
              tickFormatter={(tick) => tick.split(' ')[0]}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
                color: theme === 'dark' ? '#e5e7eb' : '#374151'
              }}
            />
            <Bar dataKey={dataKey} fill={chartColor} radius={[4, 4, 0, 0]} />
          </RechartBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BarChart;
