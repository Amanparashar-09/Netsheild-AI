
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle, Clock, MousePointer } from 'lucide-react';
import { NetworkAlert } from '@/types/netshield';

interface LiveAlertsPanelProps {
  alerts: NetworkAlert[];
  onAlertClick?: (alert: NetworkAlert) => void;
}

export const LiveAlertsPanel = ({ alerts, onAlertClick }: LiveAlertsPanelProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-500 text-white';
      case 'High': return 'bg-orange-500 text-white';
      case 'Medium': return 'bg-yellow-500 text-black';
      case 'Low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getThreatEmoji = (severity: string) => {
    switch (severity) {
      case 'Critical': return '🔥';
      case 'High': return '🔴';
      case 'Medium': return '🟡';
      case 'Low': return '🟢';
      default: return '⚪';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <span>Live Security Alerts</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          {alerts.length === 0 ? (
            <div className="text-gray-400 text-center py-8">
              No recent alerts
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg bg-gray-700 border border-gray-600 transition-all ${
                    onAlertClick 
                      ? 'hover:bg-gray-650 hover:border-blue-500 cursor-pointer transform hover:scale-[1.02]' 
                      : ''
                  }`}
                  onClick={() => onAlertClick?.(alert)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getThreatEmoji(alert.severity)}</span>
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <div className="flex items-center text-xs text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTime(alert.timestamp)}
                    </div>
                  </div>
                  
                  <div className="text-sm text-white font-medium mb-1">
                    {alert.attack_type}
                  </div>
                  
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>Source: {alert.source_ip}</div>
                    <div>Target: {alert.dest_ip}</div>
                    <div>Confidence: {(alert.confidence_score * 100).toFixed(1)}%</div>
                  </div>

                  {onAlertClick && (
                    <div className="flex items-center justify-end mt-2 text-xs text-blue-400">
                      <MousePointer className="h-3 w-3 mr-1" />
                      Click to investigate
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
