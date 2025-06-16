
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Shield, Home, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-gray-900 to-orange-900/20" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse" />
              <AlertTriangle className="h-24 w-24 text-red-400 relative z-10" />
            </div>
          </div>
          
          <h1 className="text-8xl font-bold text-white mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-white mb-4">Security Breach Detected</h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            The requested resource could not be found in our secure network. 
            Our AI systems have logged this attempt.
          </p>
          
          {/* Error details */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-5 w-5 text-blue-400" />
              <span className="text-white font-medium">NetShield AI Security Report</span>
            </div>
            <div className="text-left space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Requested Path:</span>
                <span className="text-red-400 font-mono">{location.pathname}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status Code:</span>
                <span className="text-red-400">404 - Not Found</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Threat Level:</span>
                <span className="text-green-400">Low</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <Link to="/">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 text-lg shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
            >
              <Home className="mr-2 h-5 w-5" />
              Return to Security Hub
            </Button>
          </Link>
          
          <div className="text-gray-400 text-sm">
            If you believe this is a system error, please contact our security team
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
