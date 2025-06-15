
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrafficStats } from '@/types/netshield';

interface TrafficChartProps {
  stats: TrafficStats[];
}

export const TrafficChart = ({ stats }: TrafficChartProps) => {
  const chartData = stats
    .slice(0, 20)
    .reverse()
    .map(stat => ({
      time: new Date(stat.timestamp).toLocaleTimeString(),
      normal: stat.normal_packets,
      malicious: stat.malicious_packets,
      total: stat.total_packets
    }));

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Network Traffic Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="time" 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '6px',
                  color: '#F3F4F6'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="normal" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Normal Traffic"
              />
              <Line 
                type="monotone" 
                dataKey="malicious" 
                stroke="#EF4444" 
                strokeWidth={2}
                name="Malicious Traffic"
              />
              <Line 
                type="monotone" 
                dataKey="total" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Total Traffic"
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
