import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { ShoppingList, NewShoppingList } from '@/lib/supabase';

interface UseShoppingListsReturn {
  lists: ShoppingList[];
  isLoading: boolean;
  error: string | null;
  createList: (name: string) => Promise<void>;
  deleteList: (id: string) => Promise<void>;
}

export const useShoppingLists = (): UseShoppingListsReturn => {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Charger les listes
  const fetchLists = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('shopping_lists')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setLists(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des listes');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Créer une nouvelle liste
  const createList = useCallback(async (name: string): Promise<void> => {
    try {
      setError(null);

      const newList: NewShoppingList = {
        name,
        user_id: 'default-user',
      };

      const { error: insertError } = await supabase
        .from('shopping_lists')
        .insert(newList);

      if (insertError) throw insertError;

      await fetchLists();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création de la liste');
    }
  }, [fetchLists]);

  // Supprimer une liste
  const deleteList = useCallback(async (id: string): Promise<void> => {
    try {
      setError(null);

      const { error: deleteError } = await supabase
        .from('shopping_lists')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      await fetchLists();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression de la liste');
    }
  }, [fetchLists]);

  // Charger les données au montage
  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  return {
    lists,
    isLoading,
    error,
    createList,
    deleteList,
  };
};
