import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from "@/integrations/supabase/client";
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/dashboard');
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-6">
          <h1 
            className="text-5xl font-bold text-[#1A1F2C]"
            style={{ fontFamily: 'Times New Roman, serif' }}
          >
            WonderPay
          </h1>
          
          <div className="w-20 h-20 mx-auto transform hover:scale-105 transition-transform duration-300">
            <img 
              src="/lovable-uploads/2cfe764c-e03d-4bd4-9aec-40a3f9d1a7ae.png" 
              alt="WonderPay Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#1A1F2C',
                  brandAccent: '#403E43',
                }
              }
            },
            className: {
              container: 'w-full',
              button: 'w-full px-4 py-2 rounded-full',
              input: 'rounded-lg bg-white/50 backdrop-blur-sm',
            }
          }}
          providers={[]}
          redirectTo={window.location.origin}
        />

        <div className="flex items-center justify-center space-x-2">
          <p className="text-sm text-gray-600">
            Powered by Wonderland Studio
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;