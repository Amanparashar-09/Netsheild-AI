
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrafficStats } from '@/types/netshield';

interface NetworkOverviewProps {
  stats?: TrafficStats;
}

export const NetworkOverview = ({ stats }: NetworkOverviewProps) => {
  if (!stats) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Network Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-400">Loading network statistics...</div>
        </CardContent>
      </Card>
    );
  }

  const maliciousPercentage = stats.total_packets > 0 
    ? (stats.malicious_packets / stats.total_packets) * 100 
    : 0;

  const normalPercentage = stats.total_packets > 0 
    ? (stats.normal_packets / stats.total_packets) * 100 
    : 0;

  const getThreatLevel = () => {
    if (maliciousPercentage > 10) return { level: 'CRITICAL', color: 'text-red-400' };
    if (maliciousPercentage > 5) return { level: 'HIGH', color: 'text-orange-400' };
    if (maliciousPercentage > 1) return { level: 'MEDIUM', color: 'text-yellow-400' };
    return { level: 'LOW', color: 'text-green-400' };
  };

  const threatLevel = getThreatLevel();

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Network Status Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-400 mb-1">Threat Level</div>
            <div className={`text-xl font-bold ${threatLevel.color}`}>
              {threatLevel.level}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-1">Data Processed</div>
            <div className="text-xl font-bold text-white">
              {(stats.bytes_transferred / (1024 * 1024)).toFixed(2)} MB
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Normal Traffic</span>
              <span className="text-green-400">{normalPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={normalPercentage} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Malicious Traffic</span>
              <span className="text-red-400">{maliciousPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={maliciousPercentage} className="h-2 bg-gray-700" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
          <div className="text-center">
            <div className="text-lg font-bold text-white">{stats.total_packets}</div>
            <div className="text-xs text-gray-400">Total Packets</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">{stats.normal_packets}</div>
            <div className="text-xs text-gray-400">Normal</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-red-400">{stats.malicious_packets}</div>
            <div className="text-xs text-gray-400">Malicious</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
