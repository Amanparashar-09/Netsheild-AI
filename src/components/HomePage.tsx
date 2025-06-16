
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
  Ban
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Detection",
      description: "Advanced machine learning algorithms detect network intrusions in real-time with 99%+ accuracy."
    },
    {
      icon: AlertTriangle,
      title: "Real-Time Alerts",
      description: "Instant notifications for critical threats with detailed analysis and recommended actions."
    },
    {
      icon: BarChart3,
      title: "Traffic Analytics",
      description: "Comprehensive traffic analysis with visual charts and detailed packet inspection."
    },
    {
      icon: Globe,
      title: "Geo-Location Tracking",
      description: "Track and visualize attack sources on an interactive global threat map."
    },
    {
      icon: Ban,
      title: "Auto-Blocking",
      description: "Automatic IP blocking for critical threats with manual override capabilities."
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Multi-channel alerts via email, SMS, and Discord for instant threat response."
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Shield className="h-16 w-16 text-blue-400 mr-4" />
              <h1 className="text-5xl font-bold text-white">
                NetShield <span className="text-blue-400">AI</span>
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Advanced Network Intrusion Detection System powered by cutting-edge AI technology. 
              Protect your infrastructure with real-time threat detection and automated response.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3 text-lg"
              >
                <Monitor className="mr-2 h-5 w-5" />
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Powerful Security Features</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Comprehensive network protection with advanced AI-driven capabilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-600 rounded-lg">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Advanced Threat Detection</h2>
              <p className="text-xl text-gray-300 mb-8">
                Our AI engine continuously learns and adapts to new threats, providing 
                unparalleled protection against sophisticated attacks.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {capabilities.map((capability, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded-lg">
                <div className="bg-gray-900 p-6 rounded-lg">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">Active Threats</span>
                      <Badge className="bg-red-500">Critical</Badge>
                    </div>
                    <div className="h-32 bg-gray-800 rounded flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-red-400">23</div>
                        <div className="text-sm text-gray-400">Blocked Today</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Secure Your Network?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of organizations protecting their infrastructure with NetShield AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                <Lock className="mr-2 h-5 w-5" />
                Start Protecting Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-blue-400 mr-2" />
            <span className="text-white font-bold text-xl">NetShield AI</span>
          </div>
          <p className="text-gray-400">
            © 2024 NetShield AI. Advanced Network Security Solutions.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
