
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Ban, Shield, Clock, AlertTriangle } from 'lucide-react';
import { BlockedIP } from '@/types/netshield';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface IPManagementProps {
  blockedIPs: BlockedIP[];
}

export const IPManagement = ({ blockedIPs }: IPManagementProps) => {
  const [autoBlockEnabled, setAutoBlockEnabled] = useState(true);
  const [processingIPs, setProcessingIPs] = useState<Set<string>>(new Set());

  const handleBlockIP = async (ip: string, reason: string = 'Manual block') => {
    setProcessingIPs(prev => new Set(prev).add(ip));
    
    try {
      const { error } = await supabase
        .from('blocked_ips')
        .insert({
          ip_address: ip,
          block_reason: reason,
          is_active: true
        });

      if (error) throw error;

      toast({
        title: "IP Blocked",
        description: `Successfully blocked ${ip}`,
      });
    } catch (error) {
      console.error('Error blocking IP:', error);
      toast({
        title: "Error",
        description: "Failed to block IP",
        variant: "destructive",
      });
    } finally {
      setProcessingIPs(prev => {
        const newSet = new Set(prev);
        newSet.delete(ip);
        return newSet;
      });
    }
  };

  const handleUnblockIP = async (id: string, ip: string) => {
    setProcessingIPs(prev => new Set(prev).add(ip));
    
    try {
      const { error } = await supabase
        .from('blocked_ips')
        .update({ 
          is_active: false,
          unblock_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "IP Unblocked",
        description: `Successfully unblocked ${ip}`,
      });
    } catch (error) {
      console.error('Error unblocking IP:', error);
      toast({
        title: "Error",
        description: "Failed to unblock IP",
        variant: "destructive",
      });
    } finally {
      setProcessingIPs(prev => {
        const newSet = new Set(prev);
        newSet.delete(ip);
        return newSet;
      });
    }
  };

  const getBlockDuration = (blockedAt: string) => {
    const blocked = new Date(blockedAt);
    const now = new Date();
    const diffMs = now.getTime() - blocked.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return `${diffMins}m ago`;
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Ban className="h-5 w-5 text-red-400" />
            <span>IP Management</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Auto-block Critical IPs</span>
            <Switch
              checked={autoBlockEnabled}
              onCheckedChange={setAutoBlockEnabled}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {blockedIPs.length === 0 ? (
            <div className="text-gray-400 text-center py-8">
              No blocked IPs
            </div>
          ) : (
            blockedIPs.slice(0, 10).map((blockedIP) => (
              <div
                key={blockedIP.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-700"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                    <Ban className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{blockedIP.ip_address}</div>
                    <div className="text-xs text-gray-400">{blockedIP.block_reason}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right text-xs text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{getBlockDuration(blockedIP.blocked_at)}</span>
                    </div>
                    <div className={blockedIP.is_active ? 'text-red-400' : 'text-green-400'}>
                      {blockedIP.is_active ? 'Active' : 'Unblocked'}
                    </div>
                  </div>
                  
                  {blockedIP.is_active ? (
                    <Button
                      onClick={() => handleUnblockIP(blockedIP.id, blockedIP.ip_address)}
                      disabled={processingIPs.has(blockedIP.ip_address)}
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-white hover:bg-gray-600"
                    >
                      <Shield className="h-3 w-3 mr-1" />
                      Unblock
                    </Button>
                  ) : (
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      Unblocked
                    </Badge>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {autoBlockEnabled && (
          <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-600 rounded-lg">
            <div className="flex items-center space-x-2 text-yellow-400 text-sm">
              <AlertTriangle className="h-4 w-4" />
              <span>Auto-blocking enabled for Critical severity alerts</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
