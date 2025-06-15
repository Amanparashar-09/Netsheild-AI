
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
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    if (req.method === 'POST') {
      const { features, source_ip, dest_ip } = await req.json()
      
      console.log('Received packet features for classification:', { source_ip, dest_ip })
      
      // Simulate ML model prediction (replace with actual model)
      const prediction = simulateMLPrediction(features)
      
      console.log('ML Prediction:', prediction)
      
      // Store alert in database if malicious
      if (prediction.is_malicious) {
        const { data: alertData, error: alertError } = await supabase
          .from('network_alerts')
          .insert({
            source_ip,
            dest_ip,
            attack_type: prediction.attack_type,
            severity: prediction.severity,
            confidence_score: prediction.confidence,
            packet_data: features
          })
          .select()
          .single()
        
        if (alertError) {
          console.error('Error inserting alert:', alertError)
          throw alertError
        }

        console.log('Alert stored:', alertData)

        // Auto-block critical IPs
        if (prediction.severity === 'Critical') {
          console.log('Auto-blocking critical IP:', source_ip)
          
          const { error: blockError } = await supabase
            .from('blocked_ips')
            .insert({
              ip_address: source_ip,
              block_reason: `Auto-blocked: ${prediction.attack_type} (${prediction.confidence * 100}% confidence)`,
              is_active: true
            })
          
          if (blockError && !blockError.message.includes('duplicate')) {
            console.error('Error auto-blocking IP:', blockError)
          } else {
            console.log('IP auto-blocked successfully')
          }
        }
      }
      
      return new Response(
        JSON.stringify({ 
          prediction,
          alert_stored: prediction.is_malicious 
        }),
        { 
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders 
          } 
        }
      )
    }

    // Handle demo traffic generation
    if (req.method === 'GET' && new URL(req.url).searchParams.get('action') === 'generate_demo_traffic') {
      console.log('Generating demo traffic...')
      
      // Generate realistic traffic stats
      const currentTime = new Date().toISOString()
      const totalPackets = Math.floor(Math.random() * 1000) + 500
      const maliciousPackets = Math.floor(Math.random() * 50) + 5
      const normalPackets = totalPackets - maliciousPackets
      const bytesTransferred = totalPackets * (Math.floor(Math.random() * 1000) + 500)
      
      const { error: statsError } = await supabase
        .from('traffic_stats')
        .insert({
          timestamp: currentTime,
          total_packets: totalPackets,
          normal_packets: normalPackets,
          malicious_packets: maliciousPackets,
          bytes_transferred: bytesTransferred
        })
      
      if (statsError) {
        console.error('Error inserting traffic stats:', statsError)
      }

      // Generate some random alerts
      const attackTypes = ['DoS Attack', 'Port Scan', 'Brute Force', 'SQL Injection', 'DDoS', 'Malware', 'Botnet Communication']
      const severities = ['Low', 'Medium', 'High', 'Critical']
      
      for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
        const sourceIP = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
        const destIP = `192.168.1.${Math.floor(Math.random() * 254) + 1}`
        const attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)]
        const severity = severities[Math.floor(Math.random() * severities.length)]
        const confidence = Math.random() * 0.4 + 0.6 // 60-100% confidence
        
        const { error: alertError } = await supabase
          .from('network_alerts')
          .insert({
            source_ip: sourceIP,
            dest_ip: destIP,
            attack_type: attackType,
            severity: severity,
            confidence_score: confidence,
            timestamp: currentTime
          })
        
        if (alertError) {
          console.error('Error inserting demo alert:', alertError)
        }

        // Auto-block critical IPs in demo
        if (severity === 'Critical' && Math.random() > 0.5) {
          const { error: blockError } = await supabase
            .from('blocked_ips')
            .insert({
              ip_address: sourceIP,
              block_reason: `Auto-blocked: ${attackType} (Demo)`,
              is_active: true
            })
          
          if (blockError && !blockError.message.includes('duplicate')) {
            console.error('Error auto-blocking demo IP:', blockError)
          }
        }
      }
      
      return new Response(
        JSON.stringify({ success: true, message: 'Demo traffic generated' }),
        { 
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders 
          } 
        }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Invalid request' }),
      { 
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        } 
      }
    )

  } catch (error) {
    console.error('Error in ml-inference function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        } 
      }
    )
  }
})

function simulateMLPrediction(features: PacketFeatures) {
  // Simulate RandomForest model prediction based on NSL-KDD features
  const attackTypes = ['DoS', 'Probe', 'R2L', 'U2R', 'Normal']
  const attackTypeWeights = [0.3, 0.25, 0.2, 0.15, 0.1] // Higher chance of attacks
  
  // Use features to determine likelihood of attack
  let suspicionScore = 0
  
  // High traffic volume indicators
  if (features.src_bytes > 1000 || features.dst_bytes > 1000) suspicionScore += 0.3
  if (features.count > 100) suspicionScore += 0.2
  if (features.srv_count > 50) suspicionScore += 0.15
  
  // Error rate indicators
  if (features.serror_rate > 0.5) suspicionScore += 0.4
  if (features.rerror_rate > 0.5) suspicionScore += 0.3
  
  // Login failure indicators
  if (features.num_failed_logins > 3) suspicionScore += 0.5
  if (features.num_compromised > 0) suspicionScore += 0.6
  
  // Add some randomness
  suspicionScore += Math.random() * 0.3
  
  const isAttack = suspicionScore > 0.4
  
  if (!isAttack) {
    return {
      is_malicious: false,
      attack_type: 'Normal Traffic',
      severity: 'Low',
      confidence: Math.random() * 0.3 + 0.7
    }
  }
  
  // Determine attack type based on features
  let attackType = 'DoS Attack'
  if (features.count > 200 && features.same_srv_rate > 0.8) {
    attackType = 'DoS Attack'
  } else if (features.srv_count > 50 && features.diff_srv_rate > 0.5) {
    attackType = 'Port Scan'
  } else if (features.num_failed_logins > 0) {
    attackType = 'Brute Force'
  } else if (features.dst_host_count > 100) {
    attackType = 'DDoS'
  } else if (Math.random() > 0.7) {
    attackType = 'SQL Injection'
  }
  
  // Determine severity based on suspicion score
  let severity = 'Medium'
  if (suspicionScore > 0.8) severity = 'Critical'
  else if (suspicionScore > 0.6) severity = 'High'
  else if (suspicionScore < 0.5) severity = 'Low'
  
  const confidence = Math.min(suspicionScore + Math.random() * 0.2, 1.0)
  
  return {
    is_malicious: true,
    attack_type: attackType,
    severity,
    confidence
  }
}
