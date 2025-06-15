
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shield, Ban } from 'lucide-react';
import { NetworkAlert, BlockedIP } from '@/types/netshield';

interface TopThreatsProps {
  alerts: NetworkAlert[];
  blockedIPs: BlockedIP[];
}

export const TopThreats = ({ alerts, blockedIPs }: TopThreatsProps) => {
  // Count attack types
  const attackTypes = alerts.reduce((acc, alert) => {
    acc[alert.attack_type] = (acc[alert.attack_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topAttacks = Object.entries(attackTypes)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top Attack Types */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Shield className="h-5 w-5 text-orange-400" />
            <span>Top Attack Types</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-48">
            {topAttacks.length === 0 ? (
              <div className="text-gray-400 text-center py-8">
                No attacks detected
              </div>
            ) : (
              <div className="space-y-3">
                {topAttacks.map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between p-2 rounded bg-gray-700">
                    <div className="text-white text-sm">{type}</div>
                    <Badge variant="destructive">{count}</Badge>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Blocked IPs */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Ban className="h-5 w-5 text-red-400" />
            <span>Recently Blocked IPs</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-48">
            {blockedIPs.length === 0 ? (
              <div className="text-gray-400 text-center py-8">
                No blocked IPs
              </div>
            ) : (
              <div className="space-y-3">
                {blockedIPs.slice(0, 5).map((blockedIP) => (
                  <div key={blockedIP.id} className="p-2 rounded bg-gray-700">
                    <div className="text-white font-mono text-sm">{blockedIP.ip_address}</div>
                    <div className="text-xs text-gray-400 mt-1">{blockedIP.block_reason}</div>
                    <div className="text-xs text-gray-500">
                      Blocked: {new Date(blockedIP.blocked_at).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
