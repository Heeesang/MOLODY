import { PostgrestError, PostgrestResponse, SupabaseClient } from '@supabase/supabase-js';

export interface SongData {
  video_id: string;
  title: string;
  thumbnail_url: string;
  youtube_url: string;
  genre: string;
  created_at: string; // Added created_at
}

export interface CoreSupabaseClient {
  rpc<T>(functionName: string, args?: Record<string, any>): PromiseLike<{ data: T | null; error: PostgrestError | null }>;
}
