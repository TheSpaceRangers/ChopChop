import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Env manquantes: VITE_SUPABASE_URL et/ou VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getAuthHeaders = async (): Promise<HeadersInit> => {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token ?? supabaseAnonKey;
  return { Authorization: `Bearer ${token}`, apikey: supabaseAnonKey };
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
