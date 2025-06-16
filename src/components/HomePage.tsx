
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Brain, 
  AlertTriangle, 
  BarChart3, 
  Globe, 
  Lock,
  Zap,
  CheckCircle,
  ArrowRight,
  Monitor,
  Bell,
  Ban,
  Users,
  TrendingUp,
  Eye,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Detection",
      description: "Advanced machine learning algorithms detect network intrusions in real-time with 99%+ accuracy.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: AlertTriangle,
      title: "Real-Time Alerts",
      description: "Instant notifications for critical threats with detailed analysis and recommended actions.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: BarChart3,
      title: "Traffic Analytics",
      description: "Comprehensive traffic analysis with visual charts and detailed packet inspection.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Globe,
      title: "Geo-Location Tracking",
      description: "Track and visualize attack sources on an interactive global threat map.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Ban,
      title: "Auto-Blocking",
      description: "Automatic IP blocking for critical threats with manual override capabilities.",
      gradient: "from-red-500 to-rose-500"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Multi-channel alerts via email, SMS, and Discord for instant threat response.",
      gradient: "from-indigo-500 to-blue-500"
    }
  ];

  const capabilities = [
    "DDoS Attack Detection",
    "Port Scanning Detection", 
    "Brute Force Protection",
    "Malware Traffic Analysis",
    "Anomaly Detection",
    "Threat Intelligence Integration"
  ];

  const stats = [
    { label: "Threats Blocked", value: "2.3M+", icon: Shield },
    { label: "Networks Protected", value: "10K+", icon: Users },
    { label: "Detection Accuracy", value: "99.7%", icon: Eye },
    { label: "Response Time", value: "<1ms", icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-gray-900 to-purple-900/20" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="flex items-center justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
                  <Shield className="h-20 w-20 text-blue-400 mr-4 relative z-10 animate-float" />
                </div>
                <h1 className="text-6xl font-bold text-white ml-4">
                  NetShield <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">AI</span>
                </h1>
              </div>
              <p className="text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                Advanced Network Intrusion Detection System powered by cutting-edge AI technology. 
                Protect your infrastructure with <span className="text-blue-400 font-semibold">real-time threat detection</span> and automated response.
              </p>
              
              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg mb-3 group-hover:bg-blue-500/30 transition-colors">
                      <stat.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/auth">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-4 text-lg border-0 shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-blue-400/50 text-blue-400 hover:bg-blue-400/10 hover:border-blue-400 px-10 py-4 text-lg backdrop-blur-sm bg-gray-900/50"
                >
                  <Monitor className="mr-2 h-5 w-5" />
                  View Demo
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Features Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold text-white mb-6">Powerful Security Features</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive network protection with advanced AI-driven capabilities
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="bg-gray-800/50 border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group backdrop-blur-sm hover:bg-gray-800/70">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 bg-gradient-to-r ${feature.gradient} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="h-7 w-7 text-white" />
                      </div>
                      <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-800/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-5xl font-bold text-white mb-8">Advanced Threat Detection</h2>
                <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                  Our AI engine continuously learns and adapts to new threats, providing 
                  unparalleled protection against sophisticated attacks.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {capabilities.map((capability, index) => (
                    <div key={index} className="flex items-center space-x-4 group">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-green-400 group-hover:text-green-300 transition-colors" />
                      </div>
                      <span className="text-gray-300 text-lg group-hover:text-white transition-colors">{capability}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl" />
                <div className="relative bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold text-lg">Threat Level</span>
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/50">Critical</Badge>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Active Threats</span>
                        <span className="text-3xl font-bold text-red-400">23</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Blocked Today</span>
                        <span className="text-2xl font-bold text-green-400">1,247</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Detection Rate</span>
                        <span className="text-2xl font-bold text-blue-400">99.7%</span>
                      </div>
                    </div>
                    <div className="pt-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <Activity className="h-4 w-4" />
                        <span>Real-time monitoring active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-white mb-8">Ready to Secure Your Network?</h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Join thousands of organizations protecting their infrastructure with NetShield AI
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-4 text-lg shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300">
                  <Lock className="mr-2 h-5 w-5" />
                  Start Protecting Now
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900/80 backdrop-blur-sm py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Shield className="h-10 w-10 text-blue-400 mr-3" />
              <span className="text-white font-bold text-2xl">NetShield AI</span>
            </div>
            <p className="text-gray-400 text-lg">
              © 2024 NetShield AI. Advanced Network Security Solutions.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
