import type { NewShoppingList, ShoppingList } from '@/lib/supabase';

import { useCallback, useState } from 'react';

import { supabase } from '@/lib/supabase';

interface UseCreateShoppingListReturn {
  createList: (
    payload: Pick<NewShoppingList, 'name'>
  ) => Promise<ShoppingList | null>;
  isCreating: boolean;
  error: string | null;
}

export const useCreateShoppingList = (): UseCreateShoppingListReturn => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createList = useCallback(
    async (
      payload: Pick<NewShoppingList, 'name'>
    ): Promise<ShoppingList | null> => {
      try {
        setIsCreating(true);
        setError(null);

        const { data, error } = await supabase.functions.invoke(
          'create-shopping-list',
          {
            body: { name: payload.name },
          }
        );
        if (error) throw error;
        return data?.list ?? null;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Erreur lors de la création de la liste'
        );
        return null;
      } finally {
        setIsCreating(false);
      }
    },
    []
  );

  return { createList, isCreating, error };
};
