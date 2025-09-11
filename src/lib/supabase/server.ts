import { SongData } from '@/types/song'
import { createServerClient } from '@supabase/ssr'
import { User } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

export async function getUser(): Promise<User | null> {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) {
    return null
  }
  return user
}

export async function getLatestSongs(limit: number = 10, genre?: string, random: boolean = false): Promise<SongData[]> {
  const supabase = await createClient()

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
    .select("video_id, title, thumbnail_url, youtube_url, genre")
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