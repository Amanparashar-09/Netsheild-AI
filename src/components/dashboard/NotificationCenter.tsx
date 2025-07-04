
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Bell, Mail, MessageSquare, Smartphone, Settings } from 'lucide-react';
import { NetworkAlert } from '@/types/netshield';
import { toast } from '@/hooks/use-toast';

interface NotificationCenterProps {
  alerts: NetworkAlert[];
}

interface NotificationSettings {
  email: boolean;
  sms: boolean;
  discord: boolean;
  criticalOnly: boolean;
  threshold: number;
}

export const NotificationCenter = ({ alerts }: NotificationCenterProps) => {
  const [settings, setSettings] = useState<NotificationSettings>({
    email: true,
    sms: false,
    discord: false,
    criticalOnly: true,
    threshold: 10
  });

  const [recentNotifications, setRecentNotifications] = useState<string[]>([]);
  const [processedAlerts, setProcessedAlerts] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Monitor for critical alerts - avoid duplicate processing
    const criticalAlerts = alerts.filter(alert => 
      alert.severity === 'Critical' && !processedAlerts.has(alert.id)
    );
    
    if (criticalAlerts.length > 0 && settings.criticalOnly) {
      criticalAlerts.forEach(alert => {
        triggerNotification(alert);
        setProcessedAlerts(prev => new Set(prev).add(alert.id));
        setRecentNotifications(prev => [
          `Critical alert: ${alert.attack_type}`,
          ...prev.slice(0, 4)
        ]);
      });
    }

    // Check threshold - only for recent alerts (last minute)
    const recentAlerts = alerts.filter(alert => {
      const alertTime = new Date(alert.timestamp);
      const oneMinuteAgo = new Date(Date.now() - 60000);
      return alertTime > oneMinuteAgo;
    });

    if (recentAlerts.length >= settings.threshold && recentAlerts.length > 0) {
      // Only show threshold warning once per minute
      const lastThresholdWarning = localStorage.getItem('lastThresholdWarning');
      const now = Date.now();
      
      if (!lastThresholdWarning || now - parseInt(lastThresholdWarning) > 60000) {
        toast({
          title: "High Alert Volume",
          description: `${recentAlerts.length} alerts in the last minute`,
          variant: "destructive",
        });
        localStorage.setItem('lastThresholdWarning', now.toString());
      }
    }
  }, [alerts, settings, processedAlerts]);

  const triggerNotification = (alert: NetworkAlert) => {
    // Browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('NetShield Alert', {
        body: `${alert.attack_type} detected from ${alert.source_ip}`,
        icon: '/favicon.ico'
      });
    }

    // Toast notification - only for critical
    if (alert.severity === 'Critical') {
      toast({
        title: "Critical Security Alert",
        description: `${alert.attack_type} from ${alert.source_ip}`,
        variant: "destructive",
      });
    }

    // Simulate external notifications
    if (settings.email) {
      console.log(`Email notification sent for alert: ${alert.id}`);
    }
    if (settings.sms) {
      console.log(`SMS notification sent for alert: ${alert.id}`);
    }
    if (settings.discord) {
      console.log(`Discord notification sent for alert: ${alert.id}`);
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        toast({
          title: "Notifications Enabled",
          description: "You'll receive browser notifications for critical alerts",
        });
      }
    }
  };

  const updateSetting = (key: keyof NotificationSettings, value: boolean | number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Bell className="h-5 w-5 text-blue-400" />
          <span>Notification Center</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Notification Settings */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-400" />
              <span className="text-white">Email Alerts</span>
            </div>
            <Switch
              checked={settings.email}
              onCheckedChange={(checked) => updateSetting('email', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Smartphone className="h-4 w-4 text-gray-400" />
              <span className="text-white">SMS Alerts</span>
            </div>
            <Switch
              checked={settings.sms}
              onCheckedChange={(checked) => updateSetting('sms', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-gray-400" />
              <span className="text-white">Discord Webhook</span>
            </div>
            <Switch
              checked={settings.discord}
              onCheckedChange={(checked) => updateSetting('discord', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white">Critical Alerts Only</span>
            <Switch
              checked={settings.criticalOnly}
              onCheckedChange={(checked) => updateSetting('criticalOnly', checked)}
            />
          </div>
        </div>

        <div className="border-t border-gray-600 pt-4">
          <Button
            onClick={requestNotificationPermission}
            variant="outline"
            className="w-full border-gray-600 text-white hover:bg-gray-700"
          >
            <Bell className="h-4 w-4 mr-2" />
            Enable Browser Notifications
          </Button>
        </div>

        {/* Recent Notifications */}
        <div className="border-t border-gray-600 pt-4">
          <h4 className="text-white font-medium mb-3">Recent Notifications</h4>
          <div className="space-y-2">
            {recentNotifications.length === 0 ? (
              <div className="text-gray-400 text-sm">No recent notifications</div>
            ) : (
              recentNotifications.map((notification, index) => (
                <div key={`${notification}-${index}`} className="p-2 bg-gray-700 rounded text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-white">{notification}</span>
                    <Badge variant="outline" className="text-red-400 border-red-400">
                      Critical
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date().toLocaleTimeString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
