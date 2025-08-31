import type { ShoppingList } from '@/lib/supabase';

import { useCallback, useState } from 'react';

import { supabase } from '@/lib/supabase';

interface UseDeleteShoppingListReturn {
  deleteList: (id: ShoppingList['id']) => Promise<boolean>;
  isDeleting: boolean;
  error: string | null;
}

export const useDeleteShoppingList = (): UseDeleteShoppingListReturn => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteList = useCallback(
    async (id: ShoppingList['id']): Promise<boolean> => {
      try {
        setIsDeleting(true);
        setError(null);
        const { data, error } = await supabase.functions.invoke(
          'delete-shopping-list',
          {
            body: { id },
          }
        );
        if (error) throw error;
        return Boolean(data?.success);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Erreur lors de la suppression de la liste'
        );
        return false;
      } finally {
        setIsDeleting(false);
      }
    },
    []
  );

  return { deleteList, isDeleting, error };
};
