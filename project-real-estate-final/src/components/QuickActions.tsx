import React from 'react';
import { Plus, Phone, Mail, FileText, Calendar } from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    { icon: Plus, label: 'Add New Lead', color: 'bg-blue-600 hover:bg-blue-700' },
    { icon: Phone, label: 'Schedule Call', color: 'bg-green-600 hover:bg-green-700' },
    { icon: Mail, label: 'Send Email', color: 'bg-yellow-600 hover:bg-yellow-700' },
    { icon: FileText, label: 'Create Listing', color: 'bg-purple-600 hover:bg-purple-700' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {actions.map((action, index) => (
            <button
              key={index}
              className={`w-full flex items-center p-3 rounded-lg text-white transition-colors ${action.color}`}
            >
              <action.icon size={16} className="mr-3" />
              <span className="font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;