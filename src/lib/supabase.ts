import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env
  .VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Env manquantes: VITE_SUPABASE_URL et/ou VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

let anonymousInitPromise: Promise<void> | null = null;
export const ensureAuthSession = async (): Promise<void> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) return;

  if (!anonymousInitPromise) {
    anonymousInitPromise = (async () => {
      const { error } = await supabase.auth.signInAnonymously();
      if (error) {
        const status = (error as { status?: number }).status;
        if (status === 422) {
          throw new Error(
            'Anonymous sign-ins non activés dans Supabase (422). Activez-les dans Auth > Configuration, et vérifiez que "Disable new user signups" est désactivé.'
          );
        }
        throw error;
      }
    })().finally(() => {
      anonymousInitPromise = null;
    });
  }

  return anonymousInitPromise;
};

export interface Database {
  public: {
    Tables: {
      shopping_lists: {
        Row: {
          id: string;
          name: string;
          user_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          user_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          user_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      shopping_items: {
        Row: {
          id: string;
          list_id: string;
          name: string;
          quantity: number;
          completed: boolean;
          category: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          list_id: string;
          name: string;
          quantity?: number;
          completed?: boolean;
          category?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          list_id?: string;
          name?: string;
          quantity?: number;
          completed?: boolean;
          category?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export type ShoppingList =
  Database['public']['Tables']['shopping_lists']['Row'];
export type ShoppingItem =
  Database['public']['Tables']['shopping_items']['Row'];
export type NewShoppingList =
  Database['public']['Tables']['shopping_lists']['Insert'];
export type NewShoppingItem =
  Database['public']['Tables']['shopping_items']['Insert'];
