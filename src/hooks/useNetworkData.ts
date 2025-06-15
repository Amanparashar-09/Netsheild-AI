
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { NetworkAlert, TrafficStats, BlockedIP } from '@/types/netshield';

export const useNetworkAlerts = () => {
  const queryClient = useQueryClient();

  const { data: alerts, isLoading, error } = useQuery({
    queryKey: ['network-alerts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('network_alerts')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(100);
      
      if (error) throw error;
      return data as NetworkAlert[];
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('network-alerts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'network_alerts'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['network-alerts'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return { alerts: alerts || [], isLoading, error };
};

export const useTrafficStats = () => {
  const queryClient = useQueryClient();

  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['traffic-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('traffic_stats')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data as TrafficStats[];
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('traffic-stats-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'traffic_stats'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['traffic-stats'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return { stats: stats || [], isLoading, error };
};

export const useBlockedIPs = () => {
  const queryClient = useQueryClient();

  const { data: blockedIPs, isLoading, error } = useQuery({
    queryKey: ['blocked-ips'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blocked_ips')
        .select('*')
        .eq('is_active', true)
        .order('blocked_at', { ascending: false });
      
      if (error) throw error;
      return data as BlockedIP[];
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('blocked-ips-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blocked_ips'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['blocked-ips'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return { blockedIPs: blockedIPs || [], isLoading, error };
};
