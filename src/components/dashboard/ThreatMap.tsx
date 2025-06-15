
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe } from 'lucide-react';
import { NetworkAlert } from '@/types/netshield';

interface ThreatMapProps {
  alerts: NetworkAlert[];
}

export const ThreatMap = ({ alerts }: ThreatMapProps) => {
  // Group alerts by source IP for geographic representation
  const ipCounts = alerts.reduce((acc, alert) => {
    acc[alert.source_ip] = (acc[alert.source_ip] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topSources = Object.entries(ipCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Globe className="h-5 w-5 text-blue-400" />
          <span>Global Threat Sources</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topSources.length === 0 ? (
            <div className="text-gray-400 text-center py-8">
              No threat sources detected
            </div>
          ) : (
            topSources.map(([ip, count], index) => (
              <div key={ip} className="flex items-center justify-between p-3 rounded-lg bg-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-white font-medium">{ip}</div>
                    <div className="text-xs text-gray-400">Source IP</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-red-400 font-bold">{count}</div>
                  <div className="text-xs text-gray-400">attacks</div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
