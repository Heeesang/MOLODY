import { createServerClient } from '@supabase/ssr'
import { User } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { SongData } from './song/songService'

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

export async function getLatestSongs(limit: number = 10): Promise<SongData[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("songs")
    .select("video_id, title, thumbnail_url, youtube_url, genre")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`노래 조회 실패: ${error.message}`);
  }

  return data || [];
}