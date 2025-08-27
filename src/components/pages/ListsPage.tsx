import React from 'react';

import { Plus, ShoppingCart } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ListsPage: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Mes Listes</h1>
        <Button size="sm">
          <Plus className="mr-1" size={16} />
          Nouvelle
        </Button>
      </div>

      {/* Liste des listes avec Cards */}
      <div className="space-y-3">
        {[
          {
            name: 'Courses de la semaine',
            items: 8,
            completed: 3,
            status: 'En cours',
          },
          {
            name: 'Apéritif vendredi',
            items: 5,
            completed: 0,
            status: 'Nouveau',
          },
          {
            name: "Produits d'entretien",
            items: 4,
            completed: 4,
            status: 'Terminé',
          },
        ].map((list, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ShoppingCart className="text-blue-600" size={20} />
                  <div>
                    <h3 className="font-medium text-gray-900">{list.name}</h3>
                    <p className="text-sm text-gray-600">
                      {list.completed}/{list.items} articles
                    </p>
                  </div>
                </div>
                <Badge
                  variant={list.status === 'Terminé' ? 'default' : 'secondary'}
                >
                  {list.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ListsPage;
