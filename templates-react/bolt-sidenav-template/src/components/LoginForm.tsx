import React, { useState } from 'react';
import { Droplets, User, Lock } from 'lucide-react';
import { User as UserType } from '../types';

interface LoginFormProps {
  onLogin: (user: UserType) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Demo users for testing
  const demoUsers = [
    { id: '1', name: 'John Owner', email: 'owner@aquastation.com', role: 'owner' as const },
    { id: '2', name: 'Sarah Manager', email: 'manager@aquastation.com', role: 'manager' as const },
    { id: '3', name: 'Mike Rider', email: 'rider@aquastation.com', role: 'delivery' as const },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple demo authentication
    const user = demoUsers.find(u => u.email === email);
    if (user) {
      onLogin(user);
    } else {
      alert('Invalid credentials. Try: owner@aquastation.com, manager@aquastation.com, or rider@aquastation.com');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Droplets className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">AquaStation Pro</h1>
            <p className="text-gray-600 mt-2">Water Refilling Station Management</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 font-medium mb-2">Demo Accounts:</p>
            <div className="space-y-1 text-xs text-gray-500">
              <p>• Owner: owner@aquastation.com</p>
              <p>• Manager: manager@aquastation.com</p>
              <p>• Delivery: rider@aquastation.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;