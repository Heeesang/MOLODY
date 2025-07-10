import { supabase } from "@/lib/supabase/client";
import { getYouTubeVideoInfo } from "@/lib/youtube/youtubeApi";

export interface SongData {
  youtube_url: string;
  video_id?: string;
  title: string;
  thumbnail_url: string;
  user_id?: string;
  genre: string;
}

async function checkExistingSong(videoId: string) {
  const { data, error } = await supabase
    .from("songs")
    .select("id, youtube_url")
    .eq("video_id", videoId)
    .single();

  if (error && error.code !== "PGRST116") {
    throw new Error(`노래 조회 실패: ${error.message}`);
  }

  return data;
}

export async function insertSong(url: string, userId: string, genre: string) {
  const videoInfo = await getYouTubeVideoInfo(url);
  const existingSong = await checkExistingSong(videoInfo.videoId);

  if (existingSong) {
    return { existingSong, data: null };
  }

  const songData: SongData = {
    youtube_url: url,
    video_id: videoInfo.videoId,
    title: videoInfo.title,
    thumbnail_url: videoInfo.thumbnail,
    user_id: userId,
    genre: genre
  };

  const { data, error } = await supabase
    .from("songs")
    .insert(songData)
    .select()
    .single();

  if (error) {
    throw new Error(`노래 등록 실패: ${error.message}`);
  }

  return { existingSong: null, data };
}

