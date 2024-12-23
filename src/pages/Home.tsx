import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-5xl font-bold text-gray-900">
            Welcome to JaggerPay
          </h1>
          <p className="text-xl text-gray-600">
            Streamline your business payments and financial operations with our comprehensive platform.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/login">
              <Button size="lg" className="bg-black hover:bg-black/90">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;