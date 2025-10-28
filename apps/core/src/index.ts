import { CoreSupabaseClient, SongData } from './types';

export const FONTS = {
  KanitBold: 'Kanit-Bold',
};

export async function getRandomSong(supabase: CoreSupabaseClient): Promise<SongData | null> {
  const { data, error } = await supabase.rpc<SongData[]>('get_random_song');

  if (error) {
    console.error('Error fetching random song:', error);
    return null;
  }

  if (!data || data.length === 0 || !data[0]) {
    console.warn('No random song data received.');
    return null;
  }

  return data[0] as SongData;
}
