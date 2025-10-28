import { SupabaseClient } from '@supabase/supabase-js';
import { SongData } from './types';

export async function getLatestSongs(
  supabase: SupabaseClient,
  limit: number = 10,
  genre?: string,
  random: boolean = false
): Promise<SongData[]> {
  if (random) {
    const { data, error } = await supabase.rpc('get_random_song');

    if (error || !data || data.length === 0 || !data[0]) {
      console.error('랜덤 노래 불러오기 실패:', error || '데이터 없음');
      return [];
    }

    return data ? [data[0]] : [];
  }

  let query = supabase
    .from("songs")
    .select("video_id, title, thumbnail_url, youtube_url, genre, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (genre) {
    query = query.eq('genre', genre);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`노래 조회 실패: ${error.message}`);
  }

  return data || [];
}
