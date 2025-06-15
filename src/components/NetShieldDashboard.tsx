import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, Activity, Ban } from 'lucide-react';
import { useNetworkAlerts, useTrafficStats, useBlockedIPs } from '@/hooks/useNetworkData';
import { NetworkOverview } from './dashboard/NetworkOverview';
import { LiveAlertsPanel } from './dashboard/LiveAlertsPanel';
import { TrafficChart } from './dashboard/TrafficChart';
import { ThreatMap } from './dashboard/ThreatMap';
import { TopThreats } from './dashboard/TopThreats';
import { DemoControls } from './DemoControls';

export const NetShieldDashboard = () => {
  const { alerts, isLoading: alertsLoading } = useNetworkAlerts();
  const { stats, isLoading: statsLoading } = useTrafficStats();
  const { blockedIPs, isLoading: blockedLoading } = useBlockedIPs();

  const latestStats = stats[0];
  const criticalAlerts = alerts.filter(alert => alert.severity === 'Critical').length;
  const totalThreatsBlocked = blockedIPs.length;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-blue-400" />
            <h1 className="text-3xl font-bold">NetShield AI</h1>
            <Badge variant="outline" className="text-green-400 border-green-400">
              ACTIVE
            </Badge>
          </div>
          <div className="text-sm text-gray-400">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Demo Controls */}
        <DemoControls />

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Packets</CardTitle>
              <Activity className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {statsLoading ? '...' : latestStats?.total_packets?.toLocaleString() || '0'}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Critical Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">
                {alertsLoading ? '...' : criticalAlerts}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Malicious Traffic</CardTitle>
              <Ban className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-400">
                {statsLoading ? '...' : latestStats?.malicious_packets?.toLocaleString() || '0'}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Blocked IPs</CardTitle>
              <Shield className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                {blockedLoading ? '...' : totalThreatsBlocked}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <NetworkOverview stats={latestStats} />
            <TrafficChart stats={stats} />
            <ThreatMap alerts={alerts} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <LiveAlertsPanel alerts={alerts.slice(0, 10)} />
            <TopThreats alerts={alerts} blockedIPs={blockedIPs} />
          </div>
        </div>
      </div>
    </div>
  );
};
