import React, { useState } from 'react';

import { Plus, ShoppingCart, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ErrorMessage } from '@/components/ui/error-message';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

import { useCreateShoppingList } from '@/hooks/useCreateShoppingList';
import { useDeleteShoppingList } from '@/hooks/useDeleteShoppingList';
import { useGetShoppingLists } from '@/hooks/useGetShoppingLists';

const ListsPage: React.FC = () => {
  const { lists, isLoading, error, refetch } = useGetShoppingLists();
  const {
    createList,
    isCreating,
    error: createError,
  } = useCreateShoppingList();
  const {
    deleteList,
    isDeleting,
    error: deleteError,
  } = useDeleteShoppingList();
  const [name, setName] = useState('');

  const getListStats = () => {
    // Pour l'instant, on retourne des stats factices
    // On pourra les implémenter plus tard quand on aura les items
    return { completed: 0, total: 0 };
  };

  const getListStatus = (completed: number, total: number): string => {
    if (total === 0) return 'Vide';
    if (completed === total) return 'Terminé';
    if (completed === 0) return 'Nouveau';
    return 'En cours';
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const created = await createList({ name: name.trim() });
    if (created) {
      setName('');
      await refetch();
    }
  };

  const handleDelete = async (id: string) => {
    const ok = await deleteList(id);
    if (ok) await refetch();
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <LoadingSpinner size="lg" className="mt-8" />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Mes Listes</h1>
      </div>

      {/* Erreurs */}
      <ErrorMessage error={error || createError || deleteError} />

      {/* Formulaire de création */}
      <form onSubmit={handleCreate} className="flex gap-2">
        <input
          type="text"
          placeholder="Nom de la nouvelle liste"
          value={name}
          onChange={e => setName(e.target.value)}
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          aria-label="Nom de la liste"
        />
        <Button type="submit" disabled={!name.trim() || isCreating}>
          <Plus size={16} /> Créer
        </Button>
      </form>

      {/* Liste des listes avec Cards */}
      <div className="space-y-3">
        {lists.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <ShoppingCart className="mx-auto text-gray-400" size={48} />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Aucune liste
              </h3>
              <p className="mt-2 text-gray-600">
                Créez votre première liste de courses
              </p>
            </CardContent>
          </Card>
        ) : (
          lists.map(list => {
            const { completed, total } = getListStats();
            const status = getListStatus(completed, total);

            return (
              <Card
                key={list.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <ShoppingCart className="text-blue-600" size={20} />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {list.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {completed}/{total} articles
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={status === 'Terminé' ? 'default' : 'secondary'}
                      >
                        {status}
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        aria-label={`Supprimer ${list.name}`}
                        disabled={isDeleting}
                        onClick={() => handleDelete(list.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ListsPage;
