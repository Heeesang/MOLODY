export interface SongData {
  youtube_url: string;
  video_id?: string;
  title: string;
  thumbnail_url: string;
  user_id?: string;
  genre: string;
}

export interface Song extends SongData {
  id: string;
  created_at: string;
  user_id: string; 
}
