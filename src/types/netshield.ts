
export interface NetworkAlert {
  id: string;
  timestamp: string;
  source_ip: string;
  dest_ip: string;
  attack_type: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  confidence_score: number;
  packet_data?: any;
  created_at: string;
}

export interface TrafficStats {
  id: string;
  timestamp: string;
  total_packets: number;
  normal_packets: number;
  malicious_packets: number;
  bytes_transferred: number;
  created_at: string;
}

export interface BlockedIP {
  id: string;
  ip_address: string;
  block_reason: string;
  blocked_at: string;
  unblock_at?: string;
  is_active: boolean;
  created_at: string;
}

export interface DetectionRule {
  id: string;
  rule_name: string;
  rule_pattern: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  enabled: boolean;
  created_at: string;
  updated_at: string;
}
