import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-4xl font-bold text-center mb-12">
          Sign In
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-gray-600 text-lg">
              Email
            </label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@example.com"
              className="w-full h-12 text-lg border-gray-200"
              required 
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-black hover:bg-black/90 text-white py-6 text-lg"
          >
            Continue
          </Button>
        </form>

        <Button 
          variant="outline"
          className="w-full bg-gray-50 hover:bg-gray-100 border-gray-200 py-6 text-lg"
        >
          Sign in with passkey
        </Button>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">or sign in with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline"
            className="bg-gray-50 hover:bg-gray-100 border-gray-200 py-6 text-lg"
          >
            Apple
          </Button>
          <Button 
            variant="outline"
            className="bg-gray-50 hover:bg-gray-100 border-gray-200 py-6 text-lg"
          >
            Google
          </Button>
        </div>

        <div className="flex items-center justify-center space-x-2 mt-16">
          <p className="text-sm text-gray-600">
            Powered by Wonderland Studio
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;