import React from 'react';
import { Outlet } from 'react-router-dom';

import BottomNavigation from '@/components/layout/BottomNavigation';

const MobileLayout: React.FC = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-50 rounded-md">
      {/* Zone de contenu principal - prend tout l'espace disponible */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Navigation bottom fixe */}
      <BottomNavigation />
    </div>
  );
};

export default MobileLayout;
