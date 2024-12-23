import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-[64px] font-bold text-black" style={{ fontFamily: 'serif' }}>
          WonderPay
        </h1>
        
        <div className="w-20 h-20 mx-auto">
          <img 
            src="/lovable-uploads/d1f26096-cff5-444b-a0a8-e4e870ba651e.png" 
            alt="WonderPay Logo" 
            className="w-full h-full object-contain"
          />
        </div>

        <p className="text-sm uppercase tracking-wider text-gray-600 font-medium">
          BY WONDERLAND STUDIO
        </p>

        <p className="text-gray-600 text-lg max-w-[800px] mx-auto leading-relaxed">
          WonderPay by Wonderland Studio is a private bill pay and payments automation platform to streamline AP & AR and offer working capital solutions for our clients, partners and colleagues in music, entertainment and luxury hospitality.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <Link to="/login">
            <Button 
              variant="default"
              className="bg-black hover:bg-black/90 text-white rounded-full px-8 py-2 text-base font-normal"
            >
              Log In
            </Button>
          </Link>
          <Link to="/login">
            <Button 
              variant="outline"
              className="bg-[#4285F4] hover:bg-[#4285F4]/90 text-white border-none rounded-full px-8 py-2 text-base font-normal"
            >
              Inquire
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;