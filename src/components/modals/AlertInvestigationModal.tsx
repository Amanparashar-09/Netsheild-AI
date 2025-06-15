
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MapPin, 
  Shield, 
  Ban, 
  AlertTriangle, 
  Clock,
  Activity,
  Flag
} from 'lucide-react';
import { NetworkAlert } from '@/types/netshield';

interface AlertInvestigationModalProps {
  alert: NetworkAlert | null;
  isOpen: boolean;
  onClose: () => void;
  onBlockIP: (ip: string) => void;
}

export const AlertInvestigationModal = ({ 
  alert, 
  isOpen, 
  onClose, 
  onBlockIP 
}: AlertInvestigationModalProps) => {
  if (!alert) return null;

  const getThreatScore = (alert: NetworkAlert) => {
    let score = Math.floor(alert.confidence_score * 100);
    
    // Adjust score based on severity
    if (alert.severity === 'Critical') score = Math.max(score, 90);
    else if (alert.severity === 'High') score = Math.max(score, 70);
    else if (alert.severity === 'Medium') score = Math.max(score, 50);
    
    return Math.min(score, 100);
  };

  const getThreatBadge = (score: number) => {
    if (score >= 90) return { emoji: '🔥', text: 'Critical', color: 'bg-red-500' };
    if (score >= 70) return { emoji: '🔴', text: 'High', color: 'bg-orange-500' };
    if (score >= 50) return { emoji: '🟡', text: 'Medium', color: 'bg-yellow-500' };
    return { emoji: '🟢', text: 'Low Risk', color: 'bg-green-500' };
  };

  const getRecommendedAction = (alert: NetworkAlert) => {
    if (alert.severity === 'Critical') return 'BLOCK IMMEDIATELY';
    if (alert.severity === 'High') return 'BLOCK & MONITOR';
    if (alert.severity === 'Medium') return 'MONITOR CLOSELY';
    return 'LOG & CONTINUE';
  };

  const generateHexPayload = () => {
    // Simulate packet payload
    const bytes = [];
    for (let i = 0; i < 64; i++) {
      bytes.push(Math.floor(Math.random() * 256).toString(16).padStart(2, '0'));
    }
    return bytes.join(' ').toUpperCase();
  };

  const threatScore = getThreatScore(alert);
  const threatBadge = getThreatBadge(threatScore);
  const recommendedAction = getRecommendedAction(alert);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 text-xl">
            <AlertTriangle className="h-6 w-6 text-red-400" />
            <span>Alert Investigation</span>
            <Badge className={`${threatBadge.color} text-white`}>
              {threatBadge.emoji} {threatBadge.text}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh]">
          <div className="space-y-6">
            {/* Alert Overview */}
            <Card className="bg-gray-700 border-gray-600">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-blue-400" />
                  <span>Alert Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">Attack Type</div>
                    <div className="text-lg font-semibold text-white">{alert.attack_type}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Threat Score</div>
                    <div className="text-lg font-semibold text-white">{threatScore}/100</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Source IP</div>
                    <div className="text-lg font-semibold text-blue-400">{alert.source_ip}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Destination IP</div>
                    <div className="text-lg font-semibold text-green-400">{alert.dest_ip}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Confidence</div>
                    <div className="text-lg font-semibold text-white">{(alert.confidence_score * 100).toFixed(1)}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Timestamp</div>
                    <div className="text-lg font-semibold text-white">
                      {new Date(alert.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Model Confidence Graph */}
            <Card className="bg-gray-700 border-gray-600">
              <CardHeader>
                <CardTitle className="text-white">Model Confidence Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-red-400">{alert.attack_type}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full" 
                          style={{ width: `${alert.confidence_score * 100}%` }}
                        />
                      </div>
                      <span className="text-white">{(alert.confidence_score * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-400">Normal Traffic</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(1 - alert.confidence_score) * 100}%` }}
                        />
                      </div>
                      <span className="text-white">{((1 - alert.confidence_score) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Packet Payload */}
            <Card className="bg-gray-700 border-gray-600">
              <CardHeader>
                <CardTitle className="text-white">Raw Packet Payload (HEX)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm text-green-400 max-h-40 overflow-y-auto">
                  {generateHexPayload()}
                </div>
              </CardContent>
            </Card>

            {/* Geolocation Info */}
            <Card className="bg-gray-700 border-gray-600">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <span>Geolocation & Threat Intelligence</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">Estimated Location</div>
                    <div className="text-white">Unknown Region</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">ISP</div>
                    <div className="text-white">Unknown Provider</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Reputation Score</div>
                    <div className="text-red-400">High Risk</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Previous Reports</div>
                    <div className="text-orange-400">Multiple Reports</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Actions */}
            <Card className="bg-gray-700 border-gray-600">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-yellow-400" />
                  <span>Recommended Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-yellow-900/30 border border-yellow-600 rounded-lg">
                  <div className="text-yellow-400 font-semibold mb-2">
                    <Flag className="h-4 w-4 inline mr-2" />
                    {recommendedAction}
                  </div>
                  <div className="text-gray-300 text-sm">
                    Based on severity level and confidence score, immediate action is recommended.
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    onClick={() => onBlockIP(alert.source_ip)}
                    variant="destructive" 
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Ban className="h-4 w-4 mr-2" />
                    Block IP
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                    <Flag className="h-4 w-4 mr-2" />
                    Report to Threat Intel
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                    <Clock className="h-4 w-4 mr-2" />
                    Monitor Only
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
