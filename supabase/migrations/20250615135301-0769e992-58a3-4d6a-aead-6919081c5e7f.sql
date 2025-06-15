
-- Create table for network alerts/intrusions
CREATE TABLE public.network_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  source_ip INET NOT NULL,
  dest_ip INET NOT NULL,
  attack_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('Low', 'Medium', 'High', 'Critical')),
  confidence_score DECIMAL(3,2) NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 1),
  packet_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for real-time traffic statistics
CREATE TABLE public.traffic_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  total_packets INTEGER NOT NULL DEFAULT 0,
  normal_packets INTEGER NOT NULL DEFAULT 0,
  malicious_packets INTEGER NOT NULL DEFAULT 0,
  bytes_transferred BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for blocked IPs
CREATE TABLE public.blocked_ips (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address INET NOT NULL UNIQUE,
  block_reason TEXT NOT NULL,
  blocked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  unblock_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for detection rules
CREATE TABLE public.detection_rules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rule_name TEXT NOT NULL UNIQUE,
  rule_pattern TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('Low', 'Medium', 'High', 'Critical')),
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE public.network_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.traffic_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_ips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.detection_rules ENABLE ROW LEVEL SECURITY;

-- Create policies for network_alerts (allow all operations for now - can be restricted later)
CREATE POLICY "Allow all operations on network_alerts" 
  ON public.network_alerts 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Create policies for traffic_stats
CREATE POLICY "Allow all operations on traffic_stats" 
  ON public.traffic_stats 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Create policies for blocked_ips
CREATE POLICY "Allow all operations on blocked_ips" 
  ON public.blocked_ips 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Create policies for detection_rules
CREATE POLICY "Allow all operations on detection_rules" 
  ON public.detection_rules 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.network_alerts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.traffic_stats;
ALTER PUBLICATION supabase_realtime ADD TABLE public.blocked_ips;

-- Set replica identity for realtime updates
ALTER TABLE public.network_alerts REPLICA IDENTITY FULL;
ALTER TABLE public.traffic_stats REPLICA IDENTITY FULL;
ALTER TABLE public.blocked_ips REPLICA IDENTITY FULL;

-- Insert some sample detection rules
INSERT INTO public.detection_rules (rule_name, rule_pattern, severity) VALUES
  ('High Traffic Volume', 'packets_per_second > 1000', 'High'),
  ('Suspicious Port Scan', 'unique_dest_ports > 100', 'Medium'),
  ('DoS Attack Pattern', 'same_source_requests > 500', 'Critical'),
  ('Unusual Protocol Usage', 'protocol NOT IN (tcp, udp, icmp)', 'Low');

-- Insert initial traffic stats entry
INSERT INTO public.traffic_stats (total_packets, normal_packets, malicious_packets, bytes_transferred) 
VALUES (0, 0, 0, 0);
