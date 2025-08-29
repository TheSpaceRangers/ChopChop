import type { ShoppingList } from '@/lib/supabase';

import { useCallback, useEffect, useState } from 'react';

import { getAuthHeaders } from '@/lib/supabase';

interface UseGetShoppingListsReturn {
  lists: ShoppingList[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const FUNCTIONS_BASE_URL =
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;

export const useGetShoppingLists = (): UseGetShoppingListsReturn => {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Base URL des Edge Functions déployées
  const fetchLists = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(
        `${FUNCTIONS_BASE_URL}/get-shopping-lists`,
        {
          method: 'GET',
          headers: await getAuthHeaders()
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { lists: fetched } = await res.json();

      setLists(fetched || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des listes');
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