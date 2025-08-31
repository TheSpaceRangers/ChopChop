import type { ShoppingList } from '@/lib/supabase';

import { useCallback, useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase';

interface UseGetShoppingListsReturn {
  lists: ShoppingList[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useGetShoppingLists = (): UseGetShoppingListsReturn => {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Base URL des Edge Functions déployées
  const fetchLists = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const { data, error } =
        await supabase.functions.invoke('get-shopping-lists');
      if (error) throw error;
      const fetched = data?.lists ?? [];
      setLists(fetched);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Erreur lors du chargement des listes'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(async () => {
    await fetchLists();
  }, [fetchLists]);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  return { lists, isLoading, error, refetch };
};
