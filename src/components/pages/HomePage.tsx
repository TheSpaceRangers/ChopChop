import React from 'react';

import { Plus, ShoppingCart, TrendingUp } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HomePage: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center pt-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ChopChop 🛒</h1>
        <p className="text-gray-600">Gérez vos courses facilement</p>
      </div>

      {/* Actions rapides */}
      <div className="space-y-3">
        <Button className="w-full h-14 text-lg font-semibold" variant="default">
          <Plus className="mr-2" size={20} />
          Nouvelle Liste
        </Button>

        <Button variant="outline" className="w-full h-12">
          <ShoppingCart className="mr-2" size={18} />
          Voir Mes Listes
        </Button>
      </div>

      {/* Statistiques avec Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2" size={20} />
            Aperçu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">3</div>
              <div className="text-sm text-gray-600">Listes actives</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-sm text-gray-600">Articles à acheter</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Listes récentes */}
      <Card>
        <CardHeader>
          <CardTitle>Listes récentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: 'Courses de la semaine', items: 8, status: 'En cours' },
            { name: 'Apéritif vendredi', items: 5, status: 'Nouveau' },
          ].map((list, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{list.name}</p>
                <p className="text-sm text-gray-600">{list.items} articles</p>
              </div>
              <Badge
                variant={list.status === 'Nouveau' ? 'default' : 'secondary'}
              >
                {list.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
