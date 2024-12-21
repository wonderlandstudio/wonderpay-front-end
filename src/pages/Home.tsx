import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <div className="text-center space-y-2 max-w-2xl -mt-20">
        <h1 className="text-6xl font-serif tracking-tight mb-6">WonderPay</h1>
        
        <div className="w-24 h-24 mx-auto mb-1">
          <img 
            src="/lovable-uploads/eda143a6-7f5d-4691-88f3-17b5af09550d.png" 
            alt="WonderPay Logo" 
            className="w-full"
          />
        </div>
        
        <p className="text-center text-gray-600 text-sm uppercase tracking-wide font-medium mb-6">
          BY WONDERLAND STUDIO
        </p>
        
        <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed font-light mb-16">
          WonderPay by Wonderland Studio is a private bill pay and payments automation platform to streamline AP & AR and offer working capital solutions for our clients, partners and colleagues in music, entertainment and luxury hospitality.
        </p>
        
        <div className="flex gap-6 justify-center">
          <Button 
            variant="default" 
            className="bg-black text-white hover:bg-black/90 px-12 py-6 text-base font-normal rounded-full"
            onClick={() => navigate('/login')}
          >
            Log In
          </Button>
          <Button 
            variant="default"
            className="bg-[#4285f4] hover:bg-[#4285f4]/90 text-white px-12 py-6 text-base font-normal rounded-full"
          >
            Inquire
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;