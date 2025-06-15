
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Square, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const DemoControls = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const { toast } = useToast();

  const generateRandomIP = () => {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  };

  const attackTypes = ['DoS', 'Probe', 'R2L', 'U2R', 'Normal'];
  const severities = ['Low', 'Medium', 'High', 'Critical'];

  const generateAlert = async () => {
    const attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)];
    const isMalicious = attackType !== 'Normal';
    
    if (isMalicious) {
      await supabase.from('network_alerts').insert({
        source_ip: generateRandomIP(),
        dest_ip: generateRandomIP(),
        attack_type: attackType,
        severity: severities[Math.floor(Math.random() * severities.length)],
        confidence_score: Math.random()
      });
    }

    // Update traffic stats
    const { data: latestStats } = await supabase
      .from('traffic_stats')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(1)
      .maybeSingle();

    await supabase.from('traffic_stats').insert({
      total_packets: (latestStats?.total_packets || 0) + Math.floor(Math.random() * 100) + 1,
      normal_packets: (latestStats?.normal_packets || 0) + (isMalicious ? 0 : Math.floor(Math.random() * 50) + 1),
      malicious_packets: (latestStats?.malicious_packets || 0) + (isMalicious ? Math.floor(Math.random() * 10) + 1 : 0),
      bytes_transferred: (latestStats?.bytes_transferred || 0) + Math.floor(Math.random() * 10000) + 1000
    });
  };

  const startSimulation = () => {
    setIsSimulating(true);
    const interval = setInterval(generateAlert, 2000);
    
    setTimeout(() => {
      clearInterval(interval);
      setIsSimulating(false);
      toast({
        title: "Simulation Complete",
        description: "Network traffic simulation has ended.",
      });
    }, 30000);

    toast({
      title: "Simulation Started",
      description: "Generating simulated network traffic and threats...",
    });
  };

  const generateSampleAttack = async () => {
    await supabase.from('network_alerts').insert({
      source_ip: '192.168.1.100',
      dest_ip: '10.0.0.1',
      attack_type: 'DoS',
      severity: 'Critical',
      confidence_score: 0.95
    });

    await supabase.from('blocked_ips').insert({
      ip_address: '192.168.1.100',
      block_reason: 'Detected DoS attack pattern',
      is_active: true
    });

    toast({
      title: "Sample Attack Generated",
      description: "A critical DoS attack has been simulated and blocked.",
    });
  };

  return (
    <Card className="bg-gray-800 border-gray-700 mb-6">
      <CardHeader>
        <CardTitle className="text-white">Demo Controls</CardTitle>
      </CardHeader>
      <CardContent className="flex space-x-4">
        <Button
          onClick={startSimulation}
          disabled={isSimulating}
          className="flex items-center space-x-2"
          variant={isSimulating ? "secondary" : "default"}
        >
          {isSimulating ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          <span>{isSimulating ? 'Simulating...' : 'Start Traffic Simulation'}</span>
        </Button>
        
        <Button
          onClick={generateSampleAttack}
          variant="destructive"
          className="flex items-center space-x-2"
        >
          <Zap className="h-4 w-4" />
          <span>Generate Sample Attack</span>
        </Button>
      </CardContent>
    </Card>
  );
};
