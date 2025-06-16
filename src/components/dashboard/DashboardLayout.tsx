
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Shield, LogOut, User, Settings, Activity } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { NetShieldDashboard } from '@/components/NetShieldDashboard';

const DashboardLayout = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      setUser(session.user);
      setLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          navigate('/auth');
        } else {
          setUser(session.user);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of NetShield AI",
      });
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-gray-900 to-purple-900/20" />
        
        {/* Loading animation */}
        <div className="relative z-10 flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
            <Shield className="h-16 w-16 text-blue-400 animate-pulse relative z-10" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Loading NetShield AI</h2>
            <div className="flex items-center space-x-2 text-gray-400">
              <Activity className="h-4 w-4 animate-pulse" />
              <span>Initializing security systems...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-gray-900 to-purple-900/10" />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-gray-800/80 backdrop-blur-md border-b border-gray-700/50 px-6 py-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg animate-pulse" />
                <Shield className="h-10 w-10 text-blue-400 relative z-10" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  NetShield <span className="text-blue-400">AI</span>
                </h1>
                <div className="hidden sm:block">
                  <span className="text-sm text-gray-400">Security Operations Center</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Status indicator */}
              <div className="hidden md:flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm font-medium">System Active</span>
              </div>
              
              <div className="hidden sm:block text-right">
                <div className="text-sm text-white font-medium">{user?.email}</div>
                <div className="text-xs text-gray-400">Security Analyst</div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-12 w-12 rounded-full bg-gray-700/50 hover:bg-gray-700 border border-gray-600/50">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold">
                        {user?.email?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-800/95 backdrop-blur-sm border-gray-700/50 shadow-2xl" align="end">
                  <DropdownMenuItem className="text-white hover:bg-gray-700/50 transition-colors">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-gray-700/50 transition-colors">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className="text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          <NetShieldDashboard />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
