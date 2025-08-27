import React from 'react';

import { Bell, HelpCircle, Settings, User } from 'lucide-react';

const ProfilePage: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      {/* Header Profil */}
      <div className="text-center py-6">
        <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <User className="text-white" size={32} />
        </div>
        <h1 className="text-xl font-semibold text-gray-900">Mon Profil</h1>
        <p className="text-gray-600">Utilisateur ChopChop</p>
      </div>

      {/* Options */}
      <div className="space-y-2">
        {[
          { icon: Settings, label: 'Paramètres', color: 'text-gray-600' },
          { icon: Bell, label: 'Notifications', color: 'text-gray-600' },
          { icon: HelpCircle, label: 'Aide & Support', color: 'text-gray-600' },
        ].map((option, index) => {
          const Icon = option.icon;
          return (
            <button
              key={index}
              className="w-full bg-white rounded-lg p-4 shadow-sm border flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Icon className={option.color} size={20} />
                <span className="font-medium text-gray-900">
                  {option.label}
                </span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
          );
        })}
      </div>

      {/* Version */}
      <div className="text-center pt-6">
        <p className="text-sm text-gray-500">ChopChop v1.0.0</p>
      </div>
    </div>
  );
};

export default ProfilePage;
