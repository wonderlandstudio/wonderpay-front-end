import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <div className="text-center space-y-8 max-w-2xl">
        <h1 className="text-6xl font-serif tracking-tight mb-6">WonderPay</h1>
        
        <div className="w-24 h-24 mx-auto">
          <img 
            src="/lovable-uploads/eda143a6-7f5d-4691-88f3-17b5af09550d.png" 
            alt="WonderPay Logo" 
            className="w-full"
          />
        </div>
        
        <p className="text-center text-gray-600 text-sm uppercase tracking-wide font-medium">
          BY WONDERLAND STUDIO
        </p>
        
        <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed font-light">
          WonderPay by Wonderland Studio is a private bill pay and payments automation platform to streamline AP & AR and offer working capital solutions for our clients, partners and colleagues in music, entertainment and luxury hospitality.
        </p>
        
        <div className="flex gap-4 justify-center mt-8">
          <Button 
            variant="default" 
            className="bg-black text-white hover:bg-black/90 px-8 py-6 text-base font-normal rounded-lg"
            onClick={() => navigate('/login')}
          >
            Log In
          </Button>
          <Button 
            variant="default"
            className="bg-[#4285f4] hover:bg-[#4285f4]/90 text-white px-8 py-6 text-base font-normal rounded-lg"
          >
            Inquire
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;