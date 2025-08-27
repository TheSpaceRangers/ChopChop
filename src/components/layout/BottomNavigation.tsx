import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { Home, ShoppingCart, User } from 'lucide-react';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

import { cn } from '@/lib/utils';

const BottomNavigation: React.FC = () => {
  const location = useLocation();

  const tabs = [
    {
      path: '/',
      label: 'Accueil',
      icon: Home,
    },
    {
      path: '/lists',
      label: 'Mes Listes',
      icon: ShoppingCart,
    },
    {
      path: '/profile',
      label: 'Profil',
      icon: User,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-inset-bottom">
      <NavigationMenu className="max-w-none w-full">
        <NavigationMenuList className="flex justify-between w-full max-w-md mx-auto px-6 py-3">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = location.pathname === tab.path;

            return (
              <NavigationMenuItem key={tab.path} className="flex-1">
                <NavLink
                  to={tab.path}
                  className={cn(
                    'flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-w-0 w-full mx-2',
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  )}
                >
                  <Icon size={24} className="mb-1" />
                  <span className="text-xs font-medium truncate">
                    {tab.label}
                  </span>
                </NavLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default BottomNavigation;
