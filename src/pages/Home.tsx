import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-[64px] font-bold text-black" style={{ fontFamily: 'Times New Roman, serif' }}>
          WonderPay
        </h1>
        
        <div className="w-24 h-24 mx-auto">
          <img 
            src="/lovable-uploads/2cfe764c-e03d-4bd4-9aec-40a3f9d1a7ae.png" 
            alt="WonderPay Logo" 
            className="w-full h-full object-contain"
          />
        </div>

        <p className="text-sm uppercase tracking-wider text-gray-600 font-medium mt-8">
          BY WONDERLAND STUDIO
        </p>

        <p className="text-gray-600 text-lg max-w-[800px] mx-auto leading-relaxed mt-6">
          WonderPay by Wonderland Studio is a private bill pay and payments automation platform to streamline AP & AR and offer working capital solutions for our clients, partners and colleagues in music, entertainment and luxury hospitality.
        </p>

        <div className="flex justify-center gap-6 pt-8">
          <Link to="/login">
            <Button 
              variant="default"
              className="bg-black hover:bg-black/90 text-white rounded-full px-10 py-6 text-base font-normal h-auto"
            >
              Log In
            </Button>
          </Link>
          <Link to="/login">
            <Button 
              variant="outline"
              className="bg-[#4285F4] hover:bg-[#4285F4]/90 text-white border-none rounded-full px-10 py-6 text-base font-normal h-auto"
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