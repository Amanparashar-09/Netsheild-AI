
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PacketFeatures {
  duration: number;
  protocol_type: string;
  service: string;
  flag: string;
  src_bytes: number;
  dst_bytes: number;
  land: number;
  wrong_fragment: number;
  urgent: number;
  hot: number;
  num_failed_logins: number;
  logged_in: number;
  num_compromised: number;
  root_shell: number;
  su_attempted: number;
  num_root: number;
  num_file_creations: number;
  num_shells: number;
  num_access_files: number;
  num_outbound_cmds: number;
  is_host_login: number;
  is_guest_login: number;
  count: number;
  srv_count: number;
  serror_rate: number;
  srv_serror_rate: number;
  rerror_rate: number;
  srv_rerror_rate: number;
  same_srv_rate: number;
  diff_srv_rate: number;
  srv_diff_host_rate: number;
  dst_host_count: number;
  dst_host_srv_count: number;
  dst_host_same_srv_rate: number;
  dst_host_diff_srv_rate: number;
  dst_host_same_src_port_rate: number;
  dst_host_srv_diff_host_rate: number;
  dst_host_serror_rate: number;
  dst_host_srv_serror_rate: number;
  dst_host_rerror_rate: number;
  dst_host_srv_rerror_rate: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const { packet_features, source_ip, dest_ip } = await req.json()

    // Simple rule-based classification for demonstration
    // In a real implementation, you would load your trained RandomForest model here
    const prediction = classifyPacket(packet_features)

    // Store the alert in the database if it's malicious
    if (prediction.is_malicious) {
      const { error } = await supabaseClient
        .from('network_alerts')
        .insert({
          source_ip,
          dest_ip,
          attack_type: prediction.attack_type,
          severity: prediction.severity,
          confidence_score: prediction.confidence,
          packet_data: packet_features
        })

      if (error) {
        console.error('Error inserting alert:', error)
      }

      // Update traffic statistics
      await updateTrafficStats(supabaseClient, false)
    } else {
      await updateTrafficStats(supabaseClient, true)
    }

    return new Response(
      JSON.stringify({
        is_malicious: prediction.is_malicious,
        attack_type: prediction.attack_type,
        confidence: prediction.confidence,
        severity: prediction.severity
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})

function classifyPacket(features: PacketFeatures) {
  // Simple rule-based classification (replace with actual ML model)
  let score = 0
  let attack_type = 'Normal'
  let severity = 'Low'

  // Check for DoS patterns
  if (features.count > 500 || features.src_bytes > 10000) {
    score += 0.3
    attack_type = 'DoS'
    severity = 'High'
  }

  // Check for probe patterns
  if (features.dst_host_count > 100 && features.same_srv_rate < 0.1) {
    score += 0.4
    attack_type = 'Probe'
    severity = 'Medium'
  }

  // Check for R2L patterns
  if (features.num_failed_logins > 3 || features.is_guest_login === 1) {
    score += 0.5
    attack_type = 'R2L'
    severity = 'Critical'
  }

  // Check for U2R patterns
  if (features.num_root > 0 || features.root_shell > 0) {
    score += 0.6
    attack_type = 'U2R'
    severity = 'Critical'
  }

  const is_malicious = score > 0.3

  return {
    is_malicious,
    attack_type: is_malicious ? attack_type : 'Normal',
    confidence: Math.min(score, 1.0),
    severity: is_malicious ? severity : 'Low'
  }
}

async function updateTrafficStats(supabaseClient: any, isNormal: boolean) {
  // Get the latest stats
  const { data: latestStats } = await supabaseClient
    .from('traffic_stats')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(1)
    .single()

  const newStats = {
    total_packets: (latestStats?.total_packets || 0) + 1,
    normal_packets: (latestStats?.normal_packets || 0) + (isNormal ? 1 : 0),
    malicious_packets: (latestStats?.malicious_packets || 0) + (isNormal ? 0 : 1),
    bytes_transferred: (latestStats?.bytes_transferred || 0) + 1500 // Average packet size
  }

  await supabaseClient
    .from('traffic_stats')
    .insert(newStats)
}
