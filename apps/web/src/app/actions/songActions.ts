"use server";

import { getLatestSongs } from "@/lib/supabase/server";
import { SongData } from "@/types/song";

export async function fetchSongs(offset: number, limit: number, genre?: string): Promise<SongData[]> {
  try {
    const songs = await getLatestSongs(limit, offset, genre);
    return songs;
  } catch (error) {
    console.error("Error fetching songs:", error);
    return [];
  }
}
