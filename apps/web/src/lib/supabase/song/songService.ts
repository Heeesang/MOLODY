import { SupabaseClient } from "@supabase/supabase-js";

export const getSongsByUserId = async (supabase: SupabaseClient, userId: string) => {
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching songs by user id:', error);
    return [];
  }

  return data;
};
