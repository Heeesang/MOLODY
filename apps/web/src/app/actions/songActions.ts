"use server";

import { getLatestSongs, createClient } from "@/lib/supabase/server";
import { SongData, Song } from "@/types/song";
import { revalidatePath } from "next/cache";

export async function fetchSongs(offset: number, limit: number, genre?: string): Promise<SongData[]> {
  try {
    const songs = await getLatestSongs(limit, offset, genre);
    return songs;
  } catch (error) {
    console.error("Error fetching songs:", error);
    return [];
  }
}

export async function fetchPendingSongs(): Promise<Song[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("songs")
    .select("video_id, title, thumbnail_url, youtube_url, genre, status, id, created_at, user_id")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching pending songs:", error);
    return [];
  }

  return data || [];
}

export async function approveSong(formData: FormData): Promise<void> {
  const songId = formData.get("songId") as string;
  const supabase = await createClient();
  const { error } = await supabase
    .from("songs")
    .update({ status: "approved" })
    .eq("id", songId);

  if (error) {
    console.error("Error approving song:", error);
  }

  revalidatePath("/admin/pending-songs");
  revalidatePath("/recommend");
}

export async function rejectSong(formData: FormData): Promise<void> {
  const songId = formData.get("songId") as string;
  const supabase = await createClient();
  const { error } = await supabase
    .from("songs")
    .update({ status: "rejected" })
    .eq("id", songId);

  if (error) {
    console.error("Error rejecting song:", error);
  }

  revalidatePath("/admin/pending-songs");
}